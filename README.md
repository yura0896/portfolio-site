# ポートフォリオサイト 雛形

アニメーター / イラストレーター向けの静的ポートフォリオサイトです。
ビルド不要・依存パッケージなしで、そのまま公開できます。

---

## 1. ファイル構成

```
portfolio-site/
├─ index.html          トップ（ヒーロー / 代表作 / About抜粋 / 依頼導線）
├─ works.html          作品一覧（All / Animation / Illustration で絞り込み）
├─ work.html           作品詳細（?id=作品ID で内容が切り替わる共通テンプレート）
├─ about.html          プロフィール / スキル / 経歴
├─ contact.html        依頼方法 / 依頼の流れ
├─ README.md           このファイル
└─ assets/
   ├─ css/style.css    全体のスタイル（配色は先頭の :root 変数で一括変更）
   ├─ js/data.js       ★ 作品データとサイト情報。更新するのは基本ここだけ
   ├─ js/main.js       共通処理（原則さわらない）
   ├─ img/             サムネイル・静止画・プロフィール画像
   └─ video/           ループプレビュー用の軽量mp4
```

---

## 2. 作品を1件追加する手順

1. 素材を置く
   - サムネイル → `assets/img/`
   - ループプレビュー動画（任意）→ `assets/video/`
2. `assets/js/data.js` を開き、`window.WORKS = [` の**直後**にブロックを1つ追加する
3. ブラウザで `works.html` を開いて表示を確認する

```js
{
  id: "2026-action-cut",              // 半角英数とハイフン。他と重複させない
  title: "TVアニメ『◯◯』OP 原画",
  category: "animation",              // "animation" または "illustration"
  year: 2026,
  role: "原画 / エフェクト作画",
  client: "株式会社◯◯",
  tags: ["TVアニメ", "アクション"],
  thumb: "assets/img/2026-action-cut.jpg",
  loop:  "assets/video/2026-action-cut-loop.mp4",   // 無ければ ""
  embed: { type: "youtube", id: "動画ID" },          // 無ければ null
  images: [],
  summary: "一覧に出る1〜2行の紹介文。",
  body: ["詳細ページの本文。段落ごとに配列で区切る。"],
  featured: true,                     // トップの「代表作」に載せるなら true
  credit: "©◯◯製作委員会"
},
```

**配列の順番＝サイト上の表示順**です。新しい作品ほど上に置きます。

---

## 3. 素材の仕様

| 用途 | 形式 | サイズ | 目安容量 |
|---|---|---|---|
| 動画サムネ (`thumb`) | JPEG / WebP | 1600 × 900 (16:9) | 300KB 以下 |
| イラストサムネ (`thumb`) | JPEG / WebP | 1600 × 1200 (4:3) | 300KB 以下 |
| 詳細ページ画像 (`images`) | JPEG / WebP | 長辺 2000px | 500KB 以下 |
| ループ動画 (`loop`) | mp4 (H.264) | 幅 960px / 3〜6秒 / 無音 | **3MB 以下** |
| プロフィール画像 | JPEG / PNG | 900 × 900 (1:1) | 300KB 以下 |
| OGP画像 (`og-image.jpg`) | JPEG | 1200 × 630 | 300KB 以下 |

> `loop` は一覧のホバー時にだけ読み込まれます（`preload="none"`）。
> それでも件数が増えると重くなるため、必ず 3MB 以下に圧縮してください。

---

## 4. 動画の扱い（ハイブリッド方式）

- **一覧ページ** … 自前の軽量ループmp4（`loop`）。無音・短尺で、作画の質感だけを見せる。
- **詳細ページ** … YouTube または Vimeo の埋め込み（`embed`）。本編はフル尺。

`embed` の書き方：

| 配信方法 | 書き方 |
|---|---|
| YouTube | `{ type: "youtube", id: "dQw4w9WgXcQ" }`（URLの `v=` 以降） |
| Vimeo | `{ type: "vimeo", id: "123456789" }`（URL末尾の数字） |
| 自前mp4 | `{ type: "mp4", id: "assets/video/xxx.mp4" }` |
| 動画なし | `null` |

YouTube は**限定公開**でも埋め込み可能です。検索に出したくない実績はこれを使います。

---

## 5. 配色を変える

`assets/css/style.css` 冒頭の `:root` にある変数を書き換えるだけで全体に反映されます。

```css
--accent: #b4472a;   /* 差し色（リンク・ボタン・強調） */
--bg:     #ffffff;   /* 背景 */
--fg:     #14130f;   /* 文字 */
```

ダークテーマは `:root[data-theme="dark"]` と `@media (prefers-color-scheme: dark)` の
2箇所に同じ値を書いています。**片方だけ直さないよう注意**してください。

---

## 6. 公開手順（Cloudflare Pages）

このフォルダは git リポジトリとして初期化済みです。

### 6-1. GitHub にリポジトリを作る

1. https://github.com/new を開く
2. Repository name に `portfolio-site` と入力
3. **Private** を選ぶ（公開されるのは Cloudflare 側のサイトだけで、コードは非公開で問題ありません）
4. README / .gitignore / license は**追加しない**（このフォルダに既にあるため）
5. 「Create repository」

### 6-2. push する

作成後の画面に出る URL を使って、次を実行します（`<ユーザー名>` は自分のもの）。

```bash
git remote add origin https://github.com/<ユーザー名>/portfolio-site.git
git branch -M main
git push -u origin main
```

### 6-3. Cloudflare Pages に接続する

1. https://dash.cloudflare.com でアカウントを作る（無料）
2. 「Workers & Pages」→「Create」→「Pages」→「Connect to Git」
3. GitHub を認可し、`portfolio-site` を選ぶ
4. ビルド設定は**すべて空欄のまま**
   - Framework preset: `None`
   - Build command: 空欄
   - Build output directory: `/`
5. 「Save and Deploy」

1〜2分で `portfolio-site-xxx.pages.dev` の URL が発行されます。

### 6-4. 独自ドメインを割り当てる

1. ドメインを取得する（お名前.com / ムームードメイン / Cloudflare Registrar など。`.com` で年1,500円前後）
2. Cloudflare Pages のプロジェクト →「Custom domains」→「Set up a domain」
3. 画面の指示どおり DNS を設定する

HTTPS 証明書は自動で発行されます。

### 6-5. 以降の更新

`data.js` を編集して push すれば、1〜2分で自動的に反映されます。

```bash
git add -A
git commit -m "作品を追加"
git push
```

ビルド不要な構成なので、Netlify / Vercel / GitHub Pages でも同じ手順で公開できます。

---

## 7. 公開前チェックリスト

- [ ] `data.js` の `SITE` を自分の情報に差し替えた（名前・肩書き・メール・SNS）
- [ ] サンプル作品（`sample-` で始まるID）を全て削除した
- [ ] 各HTMLの `<title>` と `description` を実際の内容にした
- [ ] `assets/img/og-image.jpg` を用意し、`index.html` の OGP URL を本番URLにした
- [ ] 守秘義務のある案件を誤って載せていないか、日を変えて見直した
- [ ] クレジット表記（`credit`）が権利元の指定どおりか確認した
- [ ] スマホ実機で表示を確認した
- [ ] メールアドレスのリンクが正しく開くか確認した
