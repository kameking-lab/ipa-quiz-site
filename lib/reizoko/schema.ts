import { z } from "zod";
import { isImageData, MAX_BODY_BYTES, MAX_IMAGE_BYTES } from "@/lib/printapp/schema";

export { MAX_BODY_BYTES, MAX_IMAGE_BYTES };
const text = z.string().max(20_000);
const strings = z.array(text).max(200);
const integer = z.number().int();
const originalRecipe = z.record(z.string(), z.unknown());
const calorieOptions = {
  vibes_other: text.default(""),
  require_calorie_in_response: z.boolean().default(false),
  calorie_instruction: text.default(""),
};
// Preserve FastAPI's required fields/defaults. Known app-only fields are explicit
// so allergies never disappear when OpenAPI omits them. Unknown fields are stripped.
const preferences = {
  tools: strings.default([]), allergies: strings.default([]), vibes: strings.default([]),
  other_request: text.default(""), ...calorieOptions,
};
export const inputSchemas = {
  generate_proposals: z.object({
    fridge_pool: strings, must_use: strings, people: integer.default(2), burners: integer.default(2),
    ...preferences, target_categories: strings.default(["メイン", "副菜"]), time_limit: text.default("指定なし"),
  }),
  regenerate_category: z.object({
    category: text, fridge_pool: strings, must_use: strings, people: integer, time_limit: text,
    ...preferences,
  }),
  generate_recipe: z.object({
    menu_title: text, final_ingredients: strings, people: integer, burners: integer, time_limit: text,
    ...preferences, dining_time: text.default(""), is_prep_only: z.boolean().default(false),
    trouble_report: text.default(""), original_recipe_json: originalRecipe.optional(), instruction_override: text.default(""),
  }),
  generate_detailed_recipe: z.object({
    original_recipe_json: originalRecipe, ...preferences, final_ingredients: strings.optional(),
  }),
  generate_shopping_list: z.object({
    menu_name: text, people: integer, burners: integer, time_limit: text,
    ...preferences, advice_instruction: text.default(""),
  }),
  generate_arrange_suggestions: z.object({ menu_title: text, current_ingredients: strings, ...preferences }),
  analyze_ingredients_image: z.object({
    image_base64: z.string().min(4).max(4 * Math.ceil(MAX_IMAGE_BYTES / 3))
      .regex(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/),
    prompt: text,
  }),
} as const;
export type Action = keyof typeof inputSchemas;
export function isAction(value: string): value is Action {
  return Object.hasOwn(inputSchemas, value);
}

const nonempty = z.string().trim().min(1);
const outputStrings = z.array(nonempty);
const proposal = z.object({ title: nonempty, desc: nonempty, efficiency_note: z.string(), calorie_kcal: z.number().finite().nonnegative() });
const proposals = z.array(proposal).min(1);
const step = z.object({ step: z.number().int().positive(), desc: nonempty });
const recipe = z.object({
  ingredients_basic: outputStrings.min(1), ingredients_optional: outputStrings,
  prep_steps: z.array(step), cook_steps: z.array(step), schedule_advice: z.string(),
  calorie_kcal: z.number().finite().nonnegative(),
}).refine((value) => value.prep_steps.length + value.cook_steps.length > 0);
export const outputSchemas = {
  generate_proposals: z.record(nonempty, proposals).refine((value) => Object.keys(value).length > 0),
  regenerate_category: proposals,
  generate_recipe: recipe,
  generate_detailed_recipe: recipe,
  generate_shopping_list: z.object({ menu_name: nonempty, main_items: outputStrings, seasonings: outputStrings, advice: z.string() }),
  generate_arrange_suggestions: outputStrings,
  analyze_ingredients_image: z.object({ ingredients: outputStrings }),
} as const;

// The existing app sends raw base64 without a MIME field.
export function imageMime(data: string): string | undefined {
  const bytes = Buffer.from(data, "base64");
  return ["image/jpeg", "image/png", "image/webp"].find((mime) => isImageData(bytes, mime));
}
