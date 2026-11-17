/** Keep historical source pins intact: remove only KP-1's invisible instrumentation.
 * The resulting source must still byte-match the previously reviewed player.
 * Behavior of the added clock/recording is tested in study-plan-activity-hook.test.tsx.
 */
export function withoutStudyPlanInstrumentation(source: string): string {
  return source.replace(/\r\n/g, "\n")
    .replace('import { useQuestionActivity } from "@/lib/study-plan/use-question-activity";\n', "")
    .replace('  const { recordAnswer: recordActivityAnswer, recordExplanation, endRef: explanationEndRef } = useQuestionActivity(question, revealed);\n', "")
    .replace('  const { recordAnswer, recordExplanation, endRef } = useQuestionActivity(question, revealed);\n', "")
    .replace('    recordExplanation();\n', "")
    .replace('      recordActivityAnswer(correct);\n', "")
    .replace('    recordAnswer(result.isCorrect);\n', "")
    .replace('      recordAnswer(correct);\n', "")
    .replaceAll('    recordAnswer(correct);\n', "")
    .replace('[index, total, onNext, recordExplanation]', '[index, total, onNext]')
    .replace('[questions.length, recordExplanation]', '[questions.length]')
    .replace('[question, history, combo, pendingAchievement, pet, recordActivityAnswer]', '[question, history, combo, pendingAchievement, pet]')
    .replaceAll('[question, revealed, history, pet, recordAnswer]', '[question, revealed, history, pet]')
    .replace('                <span ref={explanationEndRef} aria-hidden="true" className="block h-px" />\n', "")
    .replace('            <span ref={endRef} aria-hidden="true" className="block h-px" />\n', "");
}
