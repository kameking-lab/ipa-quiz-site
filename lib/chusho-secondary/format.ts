export const chushoCasePath = (year: number, key: string) => `/chusho-secondary/${year}/${key}`;
export const chushoQuestionPath = (year: number, key: string, number: number) => `${chushoCasePath(year, key)}/q${number}`;
export const INDEPENDENT_EXAMPLE_NOTICE = "解答例・解説・自己確認項目は、公式問題と出題趣旨を参考に当サイトが独自に作成しました。公式の模範解答や採点基準ではありません。";
