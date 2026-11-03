const targetQuestionId = "radio21-riku-tech2-2026-01-kiso-q01";

/** Explanatory geometry only; callers must pass their existing answer-reveal state. */
export function RikuTech2CylinderGuide({ questionId, revealed = false }: {
  questionId: string;
  revealed?: boolean;
}) {
  if (questionId !== targetQuestionId || !revealed) return null;
  return (
    <details className="my-4 min-w-0 rounded-xl border border-border bg-card p-3 text-sm leading-7 [overflow-wrap:anywhere]">
      <summary className="min-h-11 cursor-pointer py-2 font-semibold">r・a・Lの対応を見る（サイト作成の学習図）</summary>
      <p className="mt-2">原図ではありません。原問の円筒は無限長です。a と r は原問の条件、L は既存解説でガウスの法則を適用するために取る補助的な長さです。</p>
      <div className="mt-3 grid min-w-0 gap-4 lg:grid-cols-2">
        <figure className="min-w-0">
          <figcaption className="font-semibold">断面：中心軸から測る a と r</figcaption>
          <svg viewBox="0 0 320 250" role="img" aria-label="円筒を軸に垂直に切った断面。aは中心軸から円筒表面までの半径。rは同じ中心軸から円筒の外の点Pまでの距離で、rはaより大きい。" className="mt-2 h-auto w-full rounded-lg border border-border bg-white text-black">
            <circle cx="108" cy="122" r="55" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
            <circle cx="108" cy="122" r="3" fill="currentColor" />
            <text x="18" y="210" fontSize="15">中心軸（断面では点）</text>
            <path d="M104 128 L69 188" stroke="#334155" fill="none" />
            <g stroke="#1d4ed8" strokeWidth="2" fill="none">
              <path d="M108 122 V67 M102 122 H114 M102 67 H114" />
            </g>
            <text x="120" y="88" fontSize="17" fill="#1d4ed8">a：円筒半径</text>
            <g stroke="#9a3412" strokeWidth="2" fill="none">
              <path d="M108 142 H272 M108 136 V148 M272 136 V148" />
              <path d="M108 122 V133 M272 122 V133" strokeDasharray="3 3" />
            </g>
            <circle cx="272" cy="122" r="4" fill="currentColor" />
            <text x="268" y="111" fontSize="17">P</text>
            <text x="179" y="169" fontSize="17" fill="#9a3412">r（r &gt; a）</text>
            <text x="16" y="233" fontSize="14">寸法線の始点はどちらも中心軸</text>
          </svg>
        </figure>
        <figure className="min-w-0">
          <figcaption className="font-semibold">側面：解説で取る長さ L</figcaption>
          <svg viewBox="0 0 320 250" role="img" aria-label="側面の学習図。無限長の帯電円筒の一部を、同軸の半径rのガウス面で囲む。Lの寸法線はガウス面の二つの端面間の軸方向の長さを示す。Lは原問の円筒の全長ではない。" className="mt-2 h-auto w-full rounded-lg border border-border bg-white text-black">
            <path d="M114 20 V230 M166 20 V230" stroke="#334155" strokeWidth="2" />
            <path d="M140 12 V238" stroke="#64748b" strokeDasharray="3 4" />
            <path d="M65 65 V185 M215 65 V185" stroke="#9a3412" strokeWidth="2" strokeDasharray="6 4" />
            <ellipse cx="140" cy="65" rx="75" ry="18" fill="none" stroke="#9a3412" strokeWidth="2" strokeDasharray="6 4" />
            <ellipse cx="140" cy="185" rx="75" ry="18" fill="none" stroke="#9a3412" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M234 65 H272 M234 185 H272" stroke="#6b21a8" strokeDasharray="3 3" />
            <path d="M262 65 V185 M256 65 H268 M256 185 H268" stroke="#6b21a8" strokeWidth="2" />
            <text x="274" y="131" fontSize="19" fill="#6b21a8">L</text>
            <text x="12" y="39" fontSize="14">円筒は上下へ続く</text>
            <text x="15" y="220" fontSize="14" fill="#9a3412">破線：半径 r のガウス面</text>
          </svg>
        </figure>
      </div>
      <dl className="mt-3 space-y-2">
        <div><dt className="font-semibold">a〔m〕— 原問の円筒半径</dt><dd>中心軸から帯電円筒の表面までを測ります。</dd></div>
        <div><dt className="font-semibold">r〔m〕— 原問の観測距離</dt><dd>中心軸から点Pまでを測ります。原問では r &gt; a なので、Pは円筒の外にあります。</dd></div>
        <div><dt className="font-semibold">L〔m〕— 解説で選ぶ補助長</dt><dd>半径rのガウス面の二つの端面間を軸方向に測ります。既存解説の側面積 2πrL と包囲電荷 QL に同じLを使います。無限長の円筒の全長を表すものではありません。</dd></div>
      </dl>
      <p className="mt-3">色だけでなく、記号・寸法線・本文で対応を示しています。学習図はこの欄を閉じると隠せます。原問題の図は変更していません。</p>
    </details>
  );
}
