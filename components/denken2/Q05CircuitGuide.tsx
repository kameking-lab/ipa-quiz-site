import { createElement } from "react";

function Fraction({ numerator, denominator }: { numerator: string; denominator: string }) {
  return createElement("math", { "aria-hidden": true },
    createElement("mfrac", null,
      createElement("mn", null, numerator),
      createElement("mn", null, denominator),
    ),
  );
}

const ORIGINAL = "/images/denken3/2026-upper-native/theory-q05-p08.jpg";

/** Only for 2026 upper theory Q5: the source page is retained without alteration. */
export function CircuitOriginalGuide() {
  return <section aria-label="原問の回路図と部品" className="mt-6 rounded-xl border border-border p-4">
    <h2 className="font-semibold">原問の回路図</h2>
    <p className="mt-2 text-sm">原本画像の回路付近を拡大しています。全体は下の公式問題の原本画像で確認できます。</p>
    <svg viewBox="300 320 310 300" role="img" aria-label="原問の回路図。上側の負荷抵抗 R は 0.5 オームで左右の共通線の間につながる。その下の4本の枝は左右の共通線の間に並列につながり、各枝は左に内部抵抗 r 0.1 オーム、右に起電力 E 9 ボルトの電池を直列に持つ。4個の電池は同じ向き。" className="mt-3 h-auto w-full max-w-xl bg-white">
      <image href={ORIGINAL} x="0" y="0" width="897" height="1258" />
    </svg>
    <a className="mt-2 inline-flex min-h-11 items-center text-sm text-primary underline" href={ORIGINAL} target="_blank" rel="noopener noreferrer">原本ページ全体を開く</a>
    <h3 className="mt-3 font-semibold">部品と接続</h3>
    <div className="mt-2 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm leading-7">
        <caption className="text-left font-semibold">原問の部品と値</caption>
        <thead><tr><th scope="col">部品</th><th scope="col">記号と値</th><th scope="col">個数</th></tr></thead>
        <tbody>
          <tr><th scope="row">電池の起電力</th><td>E = 9 V</td><td>4</td></tr>
          <tr><th scope="row">各電池の内部抵抗</th><td>r = 0.1 Ω</td><td>4</td></tr>
          <tr><th scope="row">負荷抵抗</th><td>R = 0.5 Ω</td><td>1</td></tr>
        </tbody>
      </table>
    </div>
    <p className="mt-2 text-sm leading-7">各枝は電池と内部抵抗を直列に接続し、4本の枝は同じ向きで共通端子間に並列接続。負荷抵抗 R もその共通端子間に接続します。</p>
    <details className="mt-3 text-sm leading-7">
      <summary className="cursor-pointer font-semibold">原図の記号の見方</summary>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>長方形は抵抗を表します。</li>
        <li>長さの異なる2本の平行線は電池を表し、長い線の側が正極です。</li>
        <li>線上の黒丸は、その位置で線が接続されていることを示します。</li>
      </ul>
    </details>
  </section>;
}

/** A site-created learning aid, shown only after the existing reveal control. */
export function CircuitEquivalentGuide() {
  return <section aria-label="等価回路の学習補助" className="my-4 rounded-xl border border-border p-4">
    <h3 className="font-semibold">等価回路の学習補助</h3>
    <p className="mt-2">以下はサイト作成の補助図で、原図ではありません。同じ起電力・同じ向きの4枝をまとめています。</p>
    <div className="mt-3 min-w-0 rounded-lg border border-border bg-muted/40 p-3 text-sm leading-7 [overflow-wrap:anywhere]">
      <p className="font-semibold">要点</p>
      <p>同じ向き・同じ起電力の電池を並列にすると、起電力は 9 V のまま。内部抵抗は r ÷ 4 = 0.025 Ω。</p>
    </div>
    <svg viewBox="0 0 420 160" role="img" aria-label="等価回路。9 Vの電源と合成内部抵抗0.025オーム、負荷抵抗0.5オームが直列。" className="mt-3 h-auto w-full max-w-lg bg-white text-black">
      <g fill="none" stroke="currentColor" strokeWidth="3"><path d="M50 80 V30 H130 M190 30 H260 M320 30 H370 V130 H50 V100"/><rect x="130" y="20" width="60" height="20"/><rect x="260" y="20" width="60" height="20"/><path d="M35 80 H65 M42 100 H58"/></g>
      <g fill="currentColor" fontSize="14"><text x="115" y="16">r/4 = 0.025 Ω</text><text x="260" y="16">R = 0.5 Ω</text><text x="70" y="100">E = 9 V</text><text x="19" y="75">+</text><text x="19" y="112">−</text></g>
    </svg>
    <p className="mt-4 font-semibold">詳説</p>
    <ol className="mt-3 list-decimal space-y-2 pl-5">
      <li>同じ向き・同じ起電力の電池を並列にすると、起電力は 9 V のまま。内部抵抗は r ÷ 4 = 0.025 Ω。</li>
      <li>全抵抗は 0.025 + 0.5 = 0.525 Ω。</li>
      <li>電流は I = 9 ÷ 0.525 = <Fraction numerator="120" denominator="7" />（120 ÷ 7）A。</li>
      <li>負荷の電力は P = I²R = <Fraction numerator="7200" denominator="49" />（7200 ÷ 49）W ≈ 146.94 W。最も近い値は (5) 147 W。</li>
    </ol>
    <p className="mt-4">内部抵抗を0 Ωと仮定した場合でも、負荷電力は最大 9² ÷ 0.5 = 162 W です。</p>
    <div className="mt-2 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm leading-7">
        <caption className="text-left font-semibold">選択肢と計算結果の比較</caption>
        <thead><tr><th scope="col">選択肢</th><th scope="col">値</th><th scope="col">比較</th></tr></thead>
        <tbody>
          <tr><th scope="row">1</th><td>820 W</td><td>上限 162 W を超える</td></tr>
          <tr><th scope="row">2</th><td>4 050 W</td><td>上限 162 W を超える</td></tr>
          <tr><th scope="row">3</th><td>253 W</td><td>上限 162 W を超える</td></tr>
          <tr><th scope="row">4</th><td>50 W</td><td>計算結果約 146.94 W と異なる</td></tr>
          <tr><th scope="row">5</th><td>147 W</td><td>計算結果約 146.94 W に最も近い（正解）</td></tr>
        </tbody>
      </table>
    </div>
  </section>;
}
