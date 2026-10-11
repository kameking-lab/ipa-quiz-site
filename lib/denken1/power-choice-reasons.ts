import { withNativeChoiceReasons, type NativeChoiceSourcePart } from "./native-choice-reasons";

/** Retain the power API while sharing source and full-bank validation. */
export function withPowerChoiceReasons<T extends NativeChoiceSourcePart>(source: T, raw: unknown): T {
  return withNativeChoiceReasons(source, raw, "power");
}
