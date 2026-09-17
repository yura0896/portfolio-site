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
     role      … 担当（例: "原画 / 動画 / 撮影"）
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
     featured  … true にするとトップページの「Selected Works」に載る
     credit    … 権利表記（例: "©スタジオ名 / 作品名"）。無い場合は空文字
   ===================================================================== */

window.SITE = {
  name: "CHIBA YUUKI",               // ← ローマ字表記。綴りの好みがあれば変更してください
  nameJa: "ちばゆうき",               // ← 日本語表記（不要なら空文字）
  role: "Animator / Illustrator",    // ← 肩書き
  tagline: "かわいいものを、描いて、動かす。", // ← トップの一言（15〜30字目安）
  email: "chibayuuki097@gmail.com",  // ← ★公開される連絡先。別アドレスにする場合はここを変更
  location: "Tokyo, Japan",          // ← 実際の活動拠点に変更してください
  available: true,                   // ← false にすると「現在受付停止中」表示
  // ★ 実際に運用しているアカウントだけ残し、不要な行は削除してください
  socials: [
    { label: "X",         url: "https://x.com/yourname" },
    { label: "Instagram", url: "https://instagram.com/yourname" },
    { label: "pixiv",     url: "https://pixiv.net/users/000000" },
    { label: "YouTube",   url: "https://youtube.com/@yourname" }
  ],
  // ★ 実際に対応できるものだけ残してください。できないものを載せると後で困ります
  skills: [
    { group: "アニメーション", items: ["原画", "第二原画", "動画", "レイアウト", "絵コンテ", "撮影"] },
    { group: "イラスト",       items: ["キャラクターデザイン", "ちびキャラ", "女の子イラスト", "書籍挿絵", "グッズ原画"] },
    { group: "ソフト",         items: ["CLIP STUDIO PAINT", "After Effects", "Photoshop"] }
  ],
  // ★ 独立以前の所属・卒業歴があれば、下に行を足してください（新しい順に並べる）
  career: [
    { year: "2026.9–", text: "フリーランスとして活動開始。かわいい絵柄を軸に、作画とイラストの両面で制作を受注。" }
  ]
};

window.WORKS = [
  {
    id: "sample-tv-op",
    title: "サンプル作品：TVアニメ OP 原画",
    category: "animation",
    year: 2025,
    role: "原画 / 第二原画",
    client: "サンプル制作会社",
    tags: ["TVアニメ", "アクション", "エフェクト"],
    thumb: "assets/img/placeholder-16x9.svg",
    loop: "",                                   // 例: "assets/video/sample-tv-op-loop.mp4"
    embed: { type: "youtube", id: "" },         // 例: { type:"youtube", id:"dQw4w9WgXcQ" }
    images: [],
    summary: "1カット12秒のアクションシーンを担当。エフェクト作画までを一貫して制作しました。",
    body: [
      "担当カットの狙いや、こだわったポイントをここに書きます。3〜5行程度が読まれやすい分量です。",
      "「どんな指示を受けて、どう解釈して、何を足したか」を書くと、発注側から見た再現性が伝わります。"
    ],
    featured: true,
    credit: "©サンプル制作委員会"
  },
  {
    id: "sample-character",
    title: "サンプル作品：キャラクターデザイン",
    category: "illustration",
    year: 2025,
    role: "キャラクターデザイン / 作画",
    client: "個人制作",
    tags: ["キャラデザ", "三面図", "オリジナル"],
    thumb: "assets/img/placeholder-4x3.svg",
    loop: "",
    embed: null,
    images: [
      "assets/img/placeholder-4x3.svg",
      "assets/img/placeholder-4x3.svg"
    ],
    summary: "オリジナル作品のキャラクター設定。三面図と表情集までを一式で制作。",
    body: [
      "デザインの意図、モチーフ、配色の理由などを書きます。",
      "設定画・三面図・表情集がある場合は images に並べると、実務対応力が伝わります。"
    ],
    featured: true,
    credit: ""
  },
  {
    id: "sample-mv",
    title: "サンプル作品：MV アニメーション",
    category: "animation",
    year: 2024,
    role: "監督 / 作画 / 撮影",
    client: "サンプルレーベル",
    tags: ["MV", "個人制作", "撮影処理"],
    thumb: "assets/img/placeholder-16x9.svg",
    loop: "",
    embed: { type: "vimeo", id: "" },
    images: [],
    summary: "楽曲MVを一人で制作。コンテから撮影処理まで担当しました。",
    body: [
      "制作規模・尺・スケジュールを書いておくと、依頼側が発注判断をしやすくなります。"
    ],
    featured: true,
    credit: "©サンプルレーベル"
  },
  {
    id: "sample-bg",
    title: "サンプル作品：背景美術",
    category: "illustration",
    year: 2024,
    role: "背景",
    client: "サンプル制作会社",
    tags: ["背景", "美術", "レイアウト"],
    thumb: "assets/img/placeholder-4x3.svg",
    loop: "",
    embed: null,
    images: ["assets/img/placeholder-4x3.svg"],
    summary: "劇中の主要な舞台となる背景美術を担当。",
    body: ["作品の要件や、作画のアプローチを記載します。"],
    featured: false,
    credit: "©サンプル制作委員会"
  }
];
