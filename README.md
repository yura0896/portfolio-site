# ポートフォリオサイト 雛形

アニメーター / イラストレーター向けの静的ポートフォリオサイトです。
ビルド不要・依存パッケージなしで、そのまま公開できます。

---

## 1. ファイル構成

```
portfolio-site/
├─ index.html          トップ（ヒーロー / 見てほしい作品 / About抜粋 / 依頼導線）
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
  featured: true,                     // トップの「見てほしい作品」に載せるなら true
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
--bg:            #fffdfb;   /* 背景（ほんのり暖かい白） */
--bg-sub:        #eef5f4;   /* セクション背景（青緑を薄めた色） */
--fg:            #2f3a3a;   /* 文字（線画の黒に寄せた濃色） */
--sticker:       #ffffff;   /* 画像まわりの白フチ */

--accent:        #90c0c0;   /* くすんだ青緑。ボタンの塗り・枠線 */
--accent-text:   #367170;   /* 同色相の濃色。リンク・見出しの文字 */
--accent-fg:     #123030;   /* --accent の上に乗る文字 */
--accent-2:      #f7bf94;   /* 温かいオレンジ。イラスト作品のタグ、番号の丸 */
--accent-2-text: #7e3d12;   /* --accent-2 の上に乗る文字 */
```

`--accent` の `#90c0c0` は、X（@Yukishiro_Yu_Ki）のヘッダー画像から実際に抽出した色です。
画像全体の 85.9% をこの色が占めていました。白フチ（`--sticker`）も、
作品のステッカー表現に合わせてカード・詳細画像・プロフィール写真に適用しています。

### 差し色が「塗り用」と「文字用」に分かれている理由

淡い色は塗りには使えても文字には使えません。青緑をそのまま文字色にすると、
白背景でのコントラストが約 1.9:1 になり、ほぼ読めなくなります（WCAG AA の基準は 4.5:1）。

そのため、同じ色相で濃度だけを変えた変数に分けています。
**色を変えるときは必ずセットで変更してください。** 片方だけ変えると読めなくなります。

現在のコントラスト比（ライト・ダークとも全箇所 AA 基準を満たしています）:

| 箇所 | ライト | ダーク |
|---|---|---|
| 本文 | 11.6:1 | 14.3:1 |
| キャッチコピー | 6.3:1 | 8.5:1 |
| 肩書き | 5.5:1 | 9.4:1 |
| 補足テキスト | 4.8:1 | 5.2:1 |
| 主ボタン | 7.0:1 | 6.0:1 |
| 副ボタン | 11.8:1 | 11.7:1 |
| SNSリンク | 6.4:1 | 6.8:1 |
| ANIMATION タグ | 7.0:1 | 6.0:1 |
| ILLUSTRATION タグ | 5.0:1 | 8.7:1 |

ダークテーマは `:root[data-theme="dark"]` と `@media (prefers-color-scheme: dark)` の
2箇所に同じ値を書いています。**片方だけ直さないよう注意**してください。

---

## 5-2. フォント

見出しも本文も **Zen Maru Gothic**（丸ゴシック）を使っています。
Google Fonts から各HTMLの `<head>` で読み込んでいます。

```html
<link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap" rel="stylesheet">
```

Google Fonts は日本語フォントを文字コード単位に分割して配信するため、
ページに出ている文字の分だけがダウンロードされます。全字形を落とすことはありません。

別のフォントに変える場合は、**5ページすべての `<link>` と `style.css` の `--font-sans`** を
セットで書き換えてください。丸ゴシック系の候補は以下です。

| フォント | 印象 |
|---|---|
| Zen Maru Gothic（現在） | 素直で読みやすい。線が均一 |
| M PLUS Rounded 1c | より丸く、ポップ寄り |
| Kiwi Maru | やや細く、やわらかい。絵本寄り |

ネットワークが遅い環境では、フォント読み込み前にOS標準の丸ゴシック
（ヒラギノ丸ゴ / メイリオ）で表示されます（`display=swap`）。

---

## 5-3. かわいさを構成している要素

デザインを調整するとき、どこを触ると印象が変わるかの対応表です。

| 要素 | 変数・箇所 | 効果 |
|---|---|---|
| 角の丸み | `--radius` (18px) | 大きいほど柔らかい。24px 以上でかなりポップ |
| ボタンの形 | `--radius-pill` | 完全なピル型。角丸四角にすると硬くなる |
| ヒーローの光 | `.hero::before` / `::after` | 青緑とオレンジのぼかし円。`opacity` で強さを調整 |
| セクションの段差 | `.section--sub` の `border-radius` | 上端40pxの丸み。紙を重ねたような見え方 |
| ホバーの動き | `cubic-bezier(.34,1.3,.5,1)` | 少し跳ねる動き。数値を下げると落ち着く |
| プロフィール画像 | `.portrait` | 円形。`border-radius` を変えると四角に戻る |

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
