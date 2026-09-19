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
  location: "Tokyo, Japan",          // ← 実際の活動拠点に変更してください
  available: true,                   // ← false にすると「現在受付停止中」表示
  // ★ 他にアカウントがあれば行を足してください（pixiv / Instagram / YouTube など）。
  //    リンク切れは印象が悪いので、運用していないものは載せないこと。
  socials: [
    { label: "X", url: "https://x.com/Yukishiro_Yu_Ki" }
  ],
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
    id: "sample-tv-op",
    title: "サンプル作品：TVアニメ 第二原画",
    category: "animation",
    year: 2025,
    role: "第二原画",
    client: "サンプル制作会社",
    tags: ["TVアニメ", "アクション", "第二原画"],
    thumb: "assets/img/placeholder-16x9.svg",
    loop: "",                                   // 例: "assets/video/sample-tv-op-loop.mp4"
    embed: { type: "youtube", id: "" },         // 例: { type:"youtube", id:"dQw4w9WgXcQ" }
    images: [],
    summary: "アクションシーン3カットの第二原画を担当。ラフ原のニュアンスを保ちつつ清書しました。",
    body: [
      "担当カットの狙いや、こだわったポイントをここに書きます。3〜5行程度が読まれやすい分量です。",
      "「どんな指示を受けて、どう解釈して、何を足したか」を書くと、発注側から見た再現性が伝わります。"
    ],
    featured: true,
    credit: "©サンプル制作委員会"
  },
  {
    id: "sample-goods",
    title: "サンプル作品：アクリルスタンド原画",
    category: "illustration",
    year: 2025,
    role: "グッズ原画",
    client: "個人制作",
    tags: ["グッズ", "ちびキャラ", "オリジナル"],
    thumb: "assets/img/placeholder-4x3.svg",
    loop: "",
    embed: null,
    images: [
      "assets/img/placeholder-4x3.svg",
      "assets/img/placeholder-4x3.svg"
    ],
    summary: "オリジナルキャラのアクリルスタンド用原画。ちびキャラ3種をセットで制作。",
    body: [
      "デザインの意図、モチーフ、配色の理由などを書きます。",
      "グッズは仕様（サイズ・白フチの有無・入稿形式）も書いておくと、発注側が判断しやすくなります。"
    ],
    featured: true,
    credit: ""
  },
  {
    id: "sample-mv",
    title: "サンプル作品：短尺アニメーション",
    category: "animation",
    year: 2024,
    role: "作画 / 短尺アニメーション",
    client: "サンプルレーベル",
    tags: ["短尺", "個人制作", "ループ"],
    thumb: "assets/img/placeholder-16x9.svg",
    loop: "",
    embed: { type: "vimeo", id: "" },
    images: [],
    summary: "SNS投稿用の15秒ループアニメーション。作画から書き出しまで個人で制作。",
    body: [
      "制作規模・尺・スケジュールを書いておくと、依頼側が発注判断をしやすくなります。"
    ],
    featured: true,
    credit: "©サンプルレーベル"
  },
  {
    id: "sample-icon",
    title: "サンプル作品：SNSアイコン",
    category: "illustration",
    year: 2024,
    role: "アイコン制作",
    client: "サンプル制作会社",
    tags: ["アイコン", "SNS素材", "ちびキャラ"],
    thumb: "assets/img/placeholder-4x3.svg",
    loop: "",
    embed: null,
    images: ["assets/img/placeholder-4x3.svg"],
    summary: "配信者向けのSNSアイコン。表情差分3種をセットで制作しました。",
    body: ["作品の要件や、作画のアプローチを記載します。"],
    featured: false,
    credit: "©サンプル制作委員会"
  }
];
