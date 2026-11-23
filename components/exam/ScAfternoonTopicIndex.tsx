const officialBase = "https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_sc_pm_";
const linkClass = "text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

// Topic labels and reading prompts are editorial summaries of the official
// statement of purpose and examiner commentary, not reproduced exam text.
const topics = [
  { number: 1, topic: "Webアプリの攻撃と脆弱性対策", prompt: "CSPによる制御と開発工程の対策を分けて読む。" },
  { number: 2, topic: "暗号資産を扱う業務の鍵管理", prompt: "暗号・署名の役割と、鍵を扱う業務手順を対応させる。" },
  { number: 3, topic: "リモートワーク環境とVPN", prompt: "接続前後の通信と、認証の条件を構成に沿って整理する。" },
  { number: 4, topic: "企業のセキュリティ管理と復旧", prompt: "攻撃を防ぐ対策と、被害後に業務を戻す準備を分ける。" },
];

export function ScAfternoonTopicIndex() {
  return <div className="mt-4 rounded-xl border border-border p-3">
    <h3 className="text-sm font-bold">支援士の午後過去問を題材から探す：2025年度秋期</h3>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">題材を選び、公式の問題冊子で該当する問を開いて練習できます。</p>
    <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
      <a href={`${officialBase}qs.pdf`} className={linkClass} target="_blank" rel="noopener noreferrer">公式の午後問題冊子（PDF）</a>
      <a href={`${officialBase}cmnt.pdf`} className={linkClass} target="_blank" rel="noopener noreferrer">公式の採点講評（PDF）</a>
    </p>
    <div className="mt-3 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <caption className="pb-2 text-left text-xs text-muted-foreground">2025年度（令和7年度）秋期・午後 問1〜4。公式の出題趣旨・採点講評を2026年11月10日に確認。</caption>
        <thead><tr className="border-b"><th scope="col" className="p-2">問番号・題材</th><th scope="col" className="p-2">読む観点</th><th scope="col" className="p-2">公式資料</th></tr></thead>
        <tbody>{topics.map(topic => <tr key={topic.number} className="border-b align-top">
          <th scope="row" className="min-w-36 p-2 font-medium">問{topic.number}：{topic.topic}</th>
          <td className="min-w-44 p-2">{topic.prompt}</td>
          <td className="min-w-28 p-2"><a href={`${officialBase}ans.pdf#page=${topic.number}`} className={linkClass} target="_blank" rel="noopener noreferrer">問{topic.number}の出題趣旨・解答例（PDF）</a></td>
        </tr>)}</tbody>
      </table>
    </div>
  </div>;
}
