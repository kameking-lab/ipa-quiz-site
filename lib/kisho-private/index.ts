/** Private local reader only. Do not import this module from a public route or question barrel. */
import rawJson from "@/data/qualification-staging/kisho-65-66-private/raw-combined.json";
import sourceJson from "@/data/qualification-staging/kisho-65-66-private/source-pages.json";
import { correctedField, correctedQuestion, KISHO_PRIVATE_FIELD_HOLDS } from "./overrides";
import type { ImageAsset, ImageResolver, PrivateQuestion, RawCombined, RawField, SourceManifest } from "./types";

function requireValid(value: unknown, message: string): asserts value {
  if (!value) throw new Error(`Kisho private reader: ${message}`);
}

function freezeDeep<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.values(value).forEach(freezeDeep);
    Object.freeze(value);
  }
  return value;
}

export const KISHO_RAW_COMBINED = freezeDeep(rawJson as RawCombined);
export const KISHO_SOURCE_MANIFEST = freezeDeep(sourceJson as SourceManifest);

function validateAssetPath(asset: ImageAsset): void {
  requireValid(asset.private === true && /^[a-f\d]{64}$/u.test(asset.sha256) && asset.width > 0 && asset.height > 0,
    `invalid private asset ${asset.assetId}`);
  requireValid(asset.preparedPath === `prepared-assets/${asset.assetId}` && !asset.preparedPath.split(/[\\/]/u).includes("..")
    && !/(?:^|\/)public(?:\/|$)/u.test(asset.preparedPath), `unsafe asset path ${asset.assetId}`);
}

export function adaptKishoPrivate(raw: RawCombined, source: SourceManifest): readonly PrivateQuestion[] {
  requireValid(raw.publicationAllowed === false && source.publicationAllowed === false && source.schemaVersion === 1,
    "publication flags or manifest version changed");
  requireValid(raw.questions.length === 78 && source.questions.length === 78 && raw.answerFields.length === 237
    && source.answerFields.length === 237 && source.assets.length === 130, "expected 78 originals / 237 fields / 130 assets");
  const assets = new Map<string, ImageAsset>();
  for (const asset of source.assets) {
    validateAssetPath(asset);
    requireValid(!assets.has(asset.assetId), `duplicate asset ${asset.assetId}`);
    assets.set(asset.assetId, asset);
  }
  const sourceQuestions = new Map(source.questions.map((question) => [question.questionId, question]));
  const fieldKeys = new Set<string>();
  const sourceFieldKeys = new Set<string>();
  for (const field of source.answerFields) {
    const key = `${field.questionId}/${field.field}`;
    requireValid(field.private === true && !sourceFieldKeys.has(key), `duplicate or public source field ${key}`);
    sourceFieldKeys.add(key);
  }
  const answerFields = new Map<string, RawField>();
  for (const field of raw.answerFields) {
    const key = `${field.questionId}/${field.field}`;
    requireValid((field.path === undefined || field.path === field.field) && !fieldKeys.has(key) && typeof field.officialAnswer === "string"
      && typeof field.explanation === "string", `invalid raw field ${key}`);
    fieldKeys.add(key);
    answerFields.set(key, correctedField(field));
  }
  requireValid(fieldKeys.size === sourceFieldKeys.size && [...fieldKeys].every((key) => sourceFieldKeys.has(key)), "field identities differ");
  const questionIds = new Set<string>();
  const questions = raw.questions.map((originalQuestion): PrivateQuestion => {
    const question = correctedQuestion(originalQuestion);
    requireValid(question.exam === "kisho" && question.license === "JMBSC-permission-required"
      && !questionIds.has(question.id), `invalid raw question ${question.id}`);
    questionIds.add(question.id);
    const ref = sourceQuestions.get(question.id);
    requireValid(ref && ref.private === true && ref.rightsPermissionVerified === false
      && ref.questionId === question.id && ref.session === question.session && ref.qNumber === question.qNumber,
    `missing or mismatched source ${question.id}`);
    requireValid(ref.questionPages.length > 0 && ref.officialAnswerPages.length > 0, `missing source pages ${question.id}`);
    for (const page of [...ref.questionPages, ...ref.officialAnswerPages, ...ref.figurePages]) {
      const asset = assets.get(page.assetId);
      requireValid(page.private === true && asset && page.preparedPath === asset.preparedPath
        && page.sourcePdf === asset.sourcePdf && page.physicalPage === asset.physicalPage,
      `page/asset mismatch ${question.id}/${page.assetId}`);
    }
    for (const id of ref.imageAssetIds) requireValid(assets.has(id), `missing figure ${id}`);
    const fields = source.answerFields.filter((field) => field.questionId === question.id).map((field) => {
      const rawField = answerFields.get(`${question.id}/${field.field}`);
      requireValid(rawField, `missing raw field ${question.id}/${field.field}`);
      requireValid(field.officialAnswer === rawField.officialAnswer,
      `source answer differs ${question.id}/${field.field}`);
      for (const page of field.officialAnswerPages) requireValid(assets.has(page.assetId), `missing field source ${page.assetId}`);
      if (field.officialAnswerImageAssetId) requireValid(assets.has(field.officialAnswerImageAssetId), `missing answer diagram ${field.officialAnswerImageAssetId}`);
      return { raw: rawField, source: field };
    });
    if (question.type === "multiple-choice") {
      requireValid(fields.length === 0 && question.choices && Object.keys(question.choices).length === 5
        && Object.hasOwn(question.choices, question.answer), `invalid multiple-choice item ${question.id}`);
    } else {
      requireValid(question.type === "descriptive" && fields.length > 0, `invalid practical item ${question.id}`);
    }
    return freezeDeep({ raw: question, source: ref, fields, publicationAllowed: false as const, publicGo: false as const });
  });
  requireValid(questionIds.size === sourceQuestions.size && questions.filter((q) => q.raw.type === "multiple-choice").length === 60
    && questions.filter((q) => q.raw.type === "descriptive").length === 18, "question coverage differs");
  return freezeDeep(questions);
}

export const KISHO_PRIVATE_QUESTIONS = adaptKishoPrivate(KISHO_RAW_COMBINED, KISHO_SOURCE_MANIFEST);
export const KISHO_PRIVATE_ASSETS = new Map(KISHO_SOURCE_MANIFEST.assets.map((asset) => [asset.assetId, asset]));
export const KISHO_PRIVATE_HOLD_QUESTION_IDS = new Set(KISHO_PRIVATE_FIELD_HOLDS.map((hold) => hold.questionId));
export const KISHO_PRIVATE_COUNTS = Object.freeze({
  candidates: KISHO_PRIVATE_QUESTIONS.length,
  academic: 60,
  practical: 18,
  answerFields: 237,
  publicationAllowed: false,
  publicGo: false,
});

/** Only the academic multiple-choice sessions have machine grading. */
export function gradeKishoAcademic(question: PrivateQuestion, selection: string): boolean | null {
  if (question.raw.type !== "multiple-choice") return null;
  if (!question.raw.choices || !Object.hasOwn(question.raw.choices, selection)) return null;
  return selection === question.raw.answer;
}

export function resolveKishoPrivateImage(asset: ImageAsset, resolver: ImageResolver): string {
  validateAssetPath(asset);
  const image = resolver(asset);
  requireValid(/^data:image\/png;base64,[A-Za-z0-9+/]+=*$/u.test(image) || /^blob:[^\s]+$/u.test(image),
    "private local PNG/blob resolver required");
  return image;
}
