import { z } from "zod";

export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
export const MAX_BODY_BYTES = 3 * 1024 * 1024;
export const MAX_TEXT_CHARS = 20_000;

const imageInput = z.object({
  imageBase64: z.string().min(4).max(4 * Math.ceil(MAX_IMAGE_BYTES / 3))
    .regex(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  userPrompt: z.string().max(2000).optional(),
}).strict();

export const analysisInput = z.union([
  imageInput,
  z.object({ text: z.string().trim().min(1).max(MAX_TEXT_CHARS) }).strict(),
]);

const region = z.object({ ymin: z.number(), xmin: z.number(), ymax: z.number(), xmax: z.number() });
const redaction = z.object({
  x_percent: z.number(), y_percent: z.number(), width_percent: z.number(), height_percent: z.number(),
});
export const analysisResult = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("お知らせ"), fullText: z.string().default(""),
    events: z.array(z.object({
      eventName: z.string().trim().min(1), eventDate: z.string(),
      eventEndDate: z.string().optional(), memo: z.string().optional(),
    })).min(1),
  }),
  z.object({
    type: z.literal("テスト"), summaryTitle: z.string().default(""),
    subject: z.string().default(""), date: z.string().default(""),
    problems: z.array(z.object({
      text: z.string().trim().min(1), correctAnswer: z.string().trim().min(1),
      choices: z.array(z.string()).default([]), explanation: z.string().optional(),
      imageRegion: region.optional(),
    })),
    redaction_boxes: z.array(redaction).default([]),
  }),
]);

export function isImageData(data: Buffer, mime: string): boolean {
  if (mime === "image/jpeg") return data.length >= 3 && data.subarray(0, 3).equals(Buffer.from([255, 216, 255]));
  if (mime === "image/png") return data.length >= 8 && data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  return data.length >= 12 && data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP";
}
