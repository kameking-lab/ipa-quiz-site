# 自習室チワワの追加

`*.manifest.json` をこのフォルダへ追加し、`corepack pnpm mascots:build` を実行する。`build` の前にも自動実行する。ブラウザへ生成用 PNG・プロンプト・元 manifest は送らない。

```json
{
  "version": 1,
  "items": [{
    "id": "it-domain",
    "domains": ["information-technology"],
    "study": "design/mascots-a/assets/it-study.png",
    "break": "design/mascots-a/assets/it-break.png",
    "breakLabel": "うたた寝"
  }]
}
```

資格専用は `domains` の代わりに `exams: ["fe"]`。両方も指定できる。キーは集計の exam code と `QualificationDomain` に合わせる。薬剤師は `yakuzaishi`、画像の id は `pharmacy`。重複する id・資格・分野はエラーにする。既存登録を置き換える場合は先に古い登録を外す。

解決順は資格専用 → 分野共用 → 汎用 atlas の個別タイル。VIS3A の専用 manifest を直接読み、`qualifications.<exam>.images` に `study` と `slack` が揃ったペアのみ取り込む。SHA-256も照合する。VIS3Aは `946585784` の30資格60枚、VIS3Bは `9a08b2bad` の完成済み資格別合成127ペアを使用する。制作途中の合成があれば同manifestの正確なfield対応に従って分野共用土台へ解決し、未完成の片側だけは採用しない。他資格にVIS2の服装を流用しない。

出力は256px正方形・透過WebP、quality 76。元画像には変更を加えない。既存汎用 atlas も12タイルに分け、資格検索カードのCSSも個別タイルへ向ける。ホームが旧atlasと新画像を二重に読むことを防ぐ。SSRでは寸法を確保し、クライアントで訪問seed取得後に必要な席のsrcだけを設定する。画像は `loading="lazy" decoding="async"`。集計にない席は画像要素を作らず、離席した子の元の席には空席の机画像を表示する。反転は画像外のラッパーで行い、呼吸アニメーションのtransformを保つ。

離席は資格専用の服装を優先し、共用資格はVIS3Bの正確なfield対応を使う。該当する離席素材が未完成なら元の資格の勉強中へ戻す。他資格の離席衣装は流用しない。生成索引の `away.exams` / `away.fields` / `away.examFields` を使い、部屋内の任意の服装を抽選しない。VIS3Dは `e748a56ff` の `away/manifest.json` から資格30種＋分野20種の完成50枚を取り込む。これにより登録157資格のすべてで対応する離席衣装を解決する。今後の素材もmanifest更新と再ビルドで反映する。`vacantManifest` はVIS3Eで作成した空席の机・椅子・開いた本の画像を読み、SHA-256を照合する。生成原本と全文プロンプトは `design/study-room-mascots-20261105/vacant/` に保持する。

変換処理は同時4件までに制限し、全画像の変換が成功してから索引を更新する。逐次版と並列版の既存243画像のバイト一致を確認した。

seedはタブのsessionStorageに保存し、拒否された場合はメモリで保持する。同一タブの再表示・再マウント・リロードでは固定、新規タブの訪問では抽選する。12席をシャッフルし、80%で2席・20%で1席を机での「あるある」にする。これと重ならない1席を60%の部屋で離席にする（残り40%の部屋は離席なし）。12席での期待比率は勉強中80%・机であるある15%・離席5%、離席は最大1匹。人数が少ないときは固定されたスロットの一部だけを表示する。離席素材と空席素材の両方があるときだけ離席状態を有効にする。離席した子は机領域より手前の専用の床に置き、元の席は静止した椅子・机・開いた本を表示する。状態は個人の行動の推定ではなくイラストの演出。
