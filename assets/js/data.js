/* =====================================================================
   作品データ / サイト情報  ★ 更新するのは基本このファイルだけ ★
   ---------------------------------------------------------------------
   新しい作品を足すときは WORKS 配列の先頭に { ... } を1つ追加します。
   （先頭 = サイト上でも先頭に表示されます）

   各項目の意味:
     id        … URL用のID。半角英数とハイフンのみ。他と重複させない。
     title     … 作品タイトル
     category  … "animation"（動画） または "illustration"（静止画）
     year      … 制作年（数値）
     role      … 担当（例: "第二原画" / "グッズ原画"）
     client    … クライアント名。個人制作は "個人制作"
     tags      … 検索・分類用のキーワード（配列）
     thumb     … 一覧サムネイル画像のパス（推奨 1600x900 / JPEG or WebP）
     loop      … 一覧でホバー時に再生する軽量ループ動画（任意 / mp4 / 3MB以下）
     embed     … 詳細ページで再生する本編。{ type:"youtube"|"vimeo"|"mp4", id:"..." }
                 youtube → 動画IDのみ（例 "dQw4w9WgXcQ"）
                 vimeo   → 動画IDのみ（例 "123456789"）
                 mp4     → assets/video/ からの相対パス
     images    … 静止画作品の画像、またはメイキング画像（配列 / 任意）
     summary   … 一覧・OGPで使う1〜2行の紹介文
     body      … 詳細ページの本文。段落を配列で（HTML不可・プレーンテキスト）
     featured  … true にするとトップページの「見てほしい作品」に載る
     credit    … 権利表記（例: "©スタジオ名 / 作品名"）。無い場合は空文字
   ===================================================================== */

window.SITE = {
  name: "CHIBA YUUKI",               // ← ローマ字表記。綴りの好みがあれば変更してください
  nameJa: "ちばゆうき",               // ← 日本語表記（不要なら空文字）
  role: "Animator / Illustrator",    // ← 肩書き
  tagline: "かわいいを描いて動かす",      // ← トップの一言（15〜30字目安）
  email: "chibayuuki097@gmail.com",  // ← ★公開される連絡先。別アドレスにする場合はここを変更
  location: "Japan",                 // ← 本人の指示で国名のみ。都道府県は出さない
  available: true,                   // ← false にすると「現在受付停止中」表示
  // ★ 他にアカウントがあれば行を足してください（pixiv / Instagram / YouTube など）。
  //    リンク切れは印象が悪いので、運用していないものは載せないこと。
  socials: [
    { label: "X", url: "https://x.com/Yukishiro_Yu_Ki" }
  ],
  // ★ Contact ページ下部に出る、もう1つの窓口へのリンク。
  //    やめるときは extraLink: null にすれば、そのブロックごと消えます。
  extraLink: {
    label: "つなぐ",
    note: "つなぐにもプロフィールを置いています。あわせてご覧ください。",
    linkText: "つなぐのプロフィールを見る →",
    url: "https://tsunagu.cloud/users/chiba_yuuki97"
  },
  // ★ 実際に対応できるものだけ残してください。できないものを載せると後で困ります
  skills: [
    { group: "アニメーション", items: ["第二原画", "GIFアニメ", "短尺アニメーション"] },
    { group: "イラスト",       items: ["ちびキャラ", "女の子イラスト", "グッズ原画", "アイコン・SNS素材"] },
    { group: "ソフト",         items: ["CLIP STUDIO PAINT"] }
  ],
  // ★ 独立以前の所属・卒業歴があれば、下に行を足してください（新しい順に並べる）
  career: [
    { year: "2026.9–", text: "フリーランスとして活動開始。かわいい絵柄を軸に、作画とイラストの両面で制作を受注。" }
  ]
};

window.WORKS = [
  {
    id: "2026-voltaction-mv",
    title: "VOLTACTION ”マジ！Magic！PEACH！” Official MV",
    category: "animation",
    year: 2026,
    role: "参加",
    client: "SATELLITE8 inc.",
    tags: ["MV"],
    thumb: "assets/img/2026-voltaction-mv.jpg",
    loop: "",
    embed: { type: "youtube", id: "q-WSr-39PAA" },
    images: [],
    summary: "",
    body: [],
    featured: true,
    credit: ""
  },
  {
    id: "2026-ochamura-oyasumi",
    title: "おちゃむら スタンプアニメーション",
    category: "animation",
    year: 2026,
    role: "GIFアニメ",
    client: "個人制作",
    tags: [],
    thumb: "assets/img/2026-ochamura-oyasumi.gif",
    loop: "",
    embed: null,
    images: [],
    summary: "",
    body: [],
    featured: true,
    credit: ""
  },
  {
    id: "2026-amomo-swimsuit",
    title: "あもも（水着ver.）",
    category: "illustration",
    year: 2026,
    role: "ちびキャラ",
    client: "個人制作",
    tags: [],
    thumb: "assets/img/2026-amomo-swimsuit.jpg",
    loop: "",
    embed: null,
    images: [],
    summary: "",
    body: [],
    featured: false,
    credit: ""
  },
  {
    id: "2026-yoisama-swimsuit",
    title: "宵さま（水着ver.）",
    category: "illustration",
    year: 2026,
    role: "ちびキャラ",
    client: "個人制作",
    tags: [],
    thumb: "assets/img/2026-yoisama-swimsuit.jpg",
    loop: "",
    embed: null,
    images: [],
    summary: "",
    body: [],
    featured: false,
    credit: ""
  },
  {
    id: "2026-shirotora-oyasumi",
    title: "シロトラ スタンプアニメーション",
    category: "animation",
    year: 2026,
    role: "GIFアニメ",
    client: "個人制作",
    tags: [],
    thumb: "assets/img/2026-shirotora-oyasumi.gif",
    loop: "",
    embed: null,
    images: [],
    summary: "",
    body: [],
    featured: false,
    credit: ""
  },
  {
    id: "2026-chiyo-stamp",
    title: "花谷木ちよ様スタンプアニメーション",
    category: "animation",
    year: 2026,
    role: "GIFアニメ",
    client: "個人制作",
    tags: [],
    thumb: "assets/img/2026-chiyo-stamp.gif",
    loop: "",
    embed: null,
    images: [],
    summary: "",
    body: [],
    featured: true,
    credit: ""
  },
  {
    id: "2026-imomochi-oyasumi",
    title: "いももち スタンプアニメーション",
    category: "animation",
    year: 2026,
    role: "GIFアニメ",
    client: "個人制作",
    tags: [],
    thumb: "assets/img/2026-imomochi-oyasumi.gif",
    loop: "",
    embed: null,
    images: [],
    summary: "",
    body: [],
    featured: false,
    credit: ""
  },
  {
    id: "2026-celestium-outfit-01",
    title: "Celestium（私服ver.）",
    category: "illustration",
    year: 2026,
    role: "ちびキャラ",
    client: "個人制作",
    tags: [],
    thumb: "assets/img/2026-celestium-outfit-01.jpg",
    loop: "",
    embed: null,
    images: [],
    summary: "",
    body: [],
    featured: false,
    credit: ""
  },
  {
    id: "2026-fizzel",
    title: "Fizzel",
    category: "illustration",
    year: 2026,
    role: "ちびキャラ",
    client: "個人制作",
    tags: [],
    thumb: "assets/img/2026-fizzel.jpg",
    loop: "",
    embed: null,
    images: [],
    summary: "",
    body: [],
    featured: false,
    credit: ""
  },
  {
    id: "2025-fybi-01",
    title: "Fybi",
    category: "illustration",
    year: 2025,
    role: "ちびキャラ",
    client: "個人制作",
    tags: [],
    thumb: "assets/img/2025-fybi-01.jpg",
    loop: "",
    embed: null,
    images: [],
    summary: "",
    body: [],
    featured: false,
    credit: ""
  }
];
