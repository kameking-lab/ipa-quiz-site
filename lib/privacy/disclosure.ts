// Shared public copy; keep aligned with optional account sync and lib/rate-limit.ts.
export const HISTORY_PRIVACY_COPY = "匿名利用の学習履歴・回答履歴はブラウザのlocalStorageに保存します。任意ログイン後に同期を利用すると、対象の履歴・ブックマーク等をアカウントに紐付けてサーバーへ送信します。";
export const AI_RATE_LIMIT_PRIVACY_COPY = "AI等のAPIの不正利用防止のためIPアドレスを取得します。KVが設定された環境では、IPアドレスを含む制限用キー・利用回数を一時保存し、最終書込みから最大48時間で期限を迎えます。";
export const AI_RESPONSE_CACHE_PRIVACY_COPY = "同じ送信の二重処理を避けるため、生成済みのAI回答をサーバーの一時保存先（Upstash）に最終書込みから最大90秒保管します。識別にはIPアドレスと質問・設定を組み合わせたハッシュを使い、質問本文やIPの生データをこの識別キーに記録しません。入力内容がAI回答に含まれた場合、その内容も一時保管の対象です。";
