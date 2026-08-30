# Creator Stack Picker

制作・自動化の要件を選ぶと、**先に比較すべきツールカテゴリ**を整理する静的Webアプリです。特定サービスを押し売りするランキングではなく、要件から候補群を絞るための小さな判断補助ツールです。

## What it does

- 制作 / 自動化の目的から比較カテゴリを整理
- 目的を1つ以上選んだ時だけ候補を出し、優先度だけではランキングしない
- 外部ライブラリなしで動作
- GitHub PagesやローカルHTTPサーバーでそのまま利用可能
- 広告の有無と候補ロジックを分離
- 利用回数などの軽量usage情報はブラウザ内だけで扱う

## Quick start

`index.html` をブラウザで開くか、ローカルHTTPサーバーを使います。

```bash
python3 -m http.server 8000
```

## Usage / privacy boundary

usage計測はローカル側の軽量状態だけを扱い、ツール選択内容を外部サービスへ送信する前提ではありません。

- [ローカルusage計測の境界](docs/usage-metrics.md)

## Verification

```bash
node --check app.js
node tests/test_usage.js
```

GitHub Actionsでもusage境界と基本構文を継続確認します。

## Monetization boundary

アプリはアフィリエイトなしでも役立つことを優先します。`affiliate-config.js` の収益リンクは承認済みプログラムだけを明示付きで有効化し、候補判定そのものを報酬額で変えません。

有効化された収益URLは `http` / `https` だけを受け入れます。危険なschemeや壊れたURLはPRリンクとして使わず、固定の公式URLへフォールバックします。その場合は広告扱いにもせず、ランキング・usage計測は変えません。

## Non-goals

- 特定サービスの性能保証
- 実利用レビューを装うこと
- 「これを選べば成功する」という断定
- 未承認アフィリエイトの混入

MIT License.
