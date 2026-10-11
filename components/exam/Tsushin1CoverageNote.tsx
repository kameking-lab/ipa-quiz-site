export function Tsushin1CoverageNote({ questionCount }: { questionCount: number }) {
  return (
    <p className="mt-3 text-sm text-muted-foreground">
      2026・2025年度の第一次検定を各90原問（問題A55・B35）、計{questionCount}問と全肢解説で収録しています。
      実試験では各年度、問題Aの55問から33問、問題Bの35問から27問を設問群ごとの条件に従って解答します。
      演習では各年度の全90原問を選べます。
      2025年度資料は公開保存コピーから取得し、公式サイトからの直接取得は未確認です。
    </p>
  );
}
