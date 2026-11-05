# ASC6: Simulatorのランタイムと端末を実行時に選択

対象: `asc-kakomon-v1.0.0-b2-r20261105-03`、Codemagic build
`6aec3b266a1999f83b78dc93`、修正前コミット `67fad9748`。
作成直後の端末に `runtime profile not found using "System" match policy` があり、
WKWebView待機に進む前に起動が失敗した。SDKの版とインストール済みSimulator runtimeは別に確認する。

`asc_capture.sh` はDebugビルドとAppium導入の前に
`python3 -u scripts/asc_capture.py --check-simulators` を実行する。
以下のJSON全体を既存の秘密値マスク付き `diagnostics/capture.log` と標準出力へ残す。

```sh
xcrun simctl list runtimes --json
xcrun simctl list devicetypes --json
```

`isAvailable=true` のiOS runtimeをバージョンの数値順で確認し、必要な原寸サイズの
device typeが `supportedDeviceTypes` に含まれる組み合わせを選ぶ。
device typeの `minRuntimeVersion` / `maxRuntimeVersion`（数値またはString）も照合する。
古いsimctlで `supportedDeviceTypes` がない場合は、上下限の両方が確認できる端末だけを使う。
対応リストが空の場合、対応外・利用不能の場合、互換性情報が不足する場合は推測で作成しない。
最新runtimeに適合する端末がない場合は、そのサイズで利用可能な最新の互換runtimeを使う。

撮影時にも一覧を取り直して選択する。`simctl create` には両方のidentifierを明示し、
直後に `simctl list devices --json` から作成したUDIDの `isAvailable` と
`availabilityError` を確認する。利用不能ならboot/Appiumに進まず証拠を残し、
その回に作った端末だけをshutdown/deleteする。ホスト全体の端末削除・resetは行わない。
選択した端末名・type ID・runtime ID・版・buildはログと各画像のmanifestへ保存する。

## サイズと端末候補

[ASC1 §8](../../../../Documents/Codex/2026-11-02/task-2/asc1-kakomon-listing.md)に従い、
既定は中型Dynamic Islandと6.9インチ相当の各5枚、合計10枚を維持する。
`capture.json` の `name` は従来の説明用ラベルで、実際の選択はwidth/heightを基準とする。

| 縦向きpx | 候補（左から優先。同じruntimeで複数対応するとき） | 既定 |
|---|---|---|
| 1206×2622 | iPhone 16 Pro / 17 Pro / 17 | iphone-medium |
| 1320×2868 | iPhone 16 Pro Max / 17 Pro Max | iphone-large |
| 1242×2688 | iPhone 11 Pro Max / XS Max | 任意の6.5インチ枠用 |
| 1284×2778 | iPhone 14 Plus / 13 Pro Max / 12 Pro Max | 任意のFace ID大型枠用 |

6.5インチ枠はASC1で追加扱いのため、自動で撮影セットを増やしていない。
必要時に `capture.json` にそのサイズの端末枠を追加すれば選択可能。
未知の端末や別寸法への自動フォールバックはしない。新機種はApple仕様で寸法と表示種別を
確認してから `asc_simulators.py` の対応表へ追加する。画像のリサイズは行わず、
既存の `asc_validate.py --screenshots` が実ファイルの寸法・RGB・枚数・SHA-256を検証する。

寸法の一次資料:
[iPhone 16 Pro / Pro Max](https://support.apple.com/en-us/121031)、
[iPhone 17 Pro](https://support.apple.com/en-ae/125090)、
[iPhone 17](https://www.apple.com/iphone-17/specs/)、
[iPhone 17 Pro Max](https://support.apple.com/en-la/125091)、
[App Store screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/)。

## 組み合わせがない場合の復旧

自動ダウンロードは行わない。まずログの `isAvailable`、`supportedDeviceTypes`、
runtimeの版・buildとdevice typeの上下限を確認する。Xcodeの選択先も確認する。

```sh
xcode-select -p
xcodebuild -version
xcrun --sdk iphonesimulator --show-sdk-version
df -h / /Library/Developer
```

必要な場合はXcode Settings → Componentsから互換runtimeを追加する。
CLIの場合はAppleが案内する `xcodebuild -downloadPlatform iOS` を使える。
CIで試す際の運用上限例は、開始前の空き25GiB以上、取得・導入は最大900秒、1回のみ。
これはAppleが保証する必要容量ではなく作業予算であり、展開時の空き容量も監視する。
時間・空き容量が足りなければ、取得を繰り返さずランタイムを備えたMacイメージへ切り替える。

```sh
# Apple Silicon worker用。IntelではarchitectureVariant arm64を指定しない。
python3 - <<'PY'
import shutil, subprocess
if shutil.disk_usage('/Library/Developer').free < 25 * 1024**3:
    raise SystemExit('Not enough download/install disk budget (25 GiB)')
subprocess.run(['xcodebuild', '-downloadPlatform', 'iOS', '-architectureVariant', 'arm64'],
               check=True, timeout=900)
PY
python3 -u scripts/asc_capture.py --check-simulators
```

必要ならAppleの `-buildVersion` で互換OSを指定できるが、取得可能な版は選択したXcodeに依存する。
SDKがあるだけでruntime導入済みとは扱わず、導入後も上記2つのsimctl JSONで再確認する。
既存runtimeの削除や `-downloadAllPlatforms` はこの復旧では使用しない。
[Apple: additional Xcode components](https://developer.apple.com/documentation/xcode/downloading-and-installing-additional-xcode-components/)

## Windows検証

```powershell
python -m unittest discover -s mobile/scripts -p 'asc*test.py' -v
python mobile/scripts/asc_validate.py
bash -n mobile/scripts/asc_capture.sh
git diff --check
```

simctl JSON例からの数値順、互換端末への代替、6.9/任意6.5の寸法、利用不能runtime、
非iOS、OS上下限、互換情報なし、端末限定runtime、作成直後availabilityError、
診断ログとcleanup、作成を伴わないpreflightを単体テストする。
Windowsの結果はMacでのboot・WDA/WKWebView接続・実画像撮影の成功を示さない。
