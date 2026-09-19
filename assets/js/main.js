/* =====================================================================
   共通スクリプト
   ---------------------------------------------------------------------
   基本的にこのファイルを編集する必要はありません。
   作品を増やす／プロフィールを直すときは assets/js/data.js を編集します。
   ===================================================================== */
(function () {
  "use strict";

  var SITE  = window.SITE  || {};
  var WORKS = window.WORKS || [];

  var CATEGORY_LABEL = { animation: "Animation", illustration: "Illustration" };

  /* ---------- ユーティリティ ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function byId(id) {
    for (var i = 0; i < WORKS.length; i++) if (WORKS[i].id === id) return WORKS[i];
    return null;
  }

  /* ---------- テーマ切替（ライト / ダーク） ---------- */
  function initTheme() {
    var KEY = "pf-theme";
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }
    $$("[data-action='toggle-theme']").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var isDark = document.documentElement.getAttribute("data-theme") === "dark" ||
          (!document.documentElement.getAttribute("data-theme") &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);
        var next = isDark ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
      });
    });
  }

  /* ---------- スマホ用ナビ ---------- */
  function initNav() {
    var toggle = $("[data-action='toggle-nav']");
    var nav = $("#nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });
  }

  /* ---------- ヘッダー / フッター / 共通テキストの流し込み ---------- */
  function initChrome() {
    $$("[data-site]").forEach(function (el) {
      var key = el.getAttribute("data-site");
      var val = SITE[key];
      if (val == null || val === "") return;
      if (el.tagName === "A" && key === "email") {
        el.href = "mailto:" + val;
        el.textContent = val;
      } else {
        el.textContent = val;
      }
    });

    $$("[data-socials]").forEach(function (el) {
      el.innerHTML = (SITE.socials || []).map(function (s) {
        return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.label) + "</a>";
      }).join("");
    });

    /* もう1つの窓口へのリンク（SITE.extraLink）。未設定ならブロックごと消す */
    $$("[data-extra-link]").forEach(function (el) {
      var link = SITE.extraLink;
      if (!link || !link.url) {
        if (el.parentNode) el.parentNode.removeChild(el);
        return;
      }
      el.innerHTML =
        '<p class="eyebrow">' + esc(link.label || "Links") + "</p>" +
        (link.note ? '<p style="margin:10px 0 16px;font-size:14px;color:var(--fg-muted)">' + esc(link.note) + "</p>" : "") +
        '<a class="btn btn--ghost" href="' + esc(link.url) + '" target="_blank" rel="noopener noreferrer">' +
        esc(link.linkText || "ページを見る →") + "</a>";
    });

    $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

    $$("[data-available]").forEach(function (el) {
      var ok = SITE.available !== false;
      el.setAttribute("data-available", String(ok));
      el.textContent = ok ? "現在お仕事を受け付けています" : "現在お仕事の受付を停止しています";
    });

  }

  /* ---------- 作品カード ---------- */
  function cardHTML(w) {
    var media = '<img src="' + esc(w.thumb) + '" alt="' + esc(w.title) + '" loading="lazy" decoding="async">';
    if (w.loop) {
      media += '<video src="' + esc(w.loop) + '" muted loop playsinline preload="none" aria-hidden="true"></video>';
    }
    return '' +
      '<a class="card" href="work.html?id=' + encodeURIComponent(w.id) + '" data-category="' + esc(w.category) + '">' +
        '<div class="card__media">' +
          '<span class="card__type">' + esc(CATEGORY_LABEL[w.category] || w.category) + "</span>" +
          media +
        "</div>" +
        '<div class="card__body">' +
          '<p class="card__meta">' + esc(w.year) + (w.client ? " ・ " + esc(w.client) : "") + "</p>" +
          '<h3 class="card__title">' + esc(w.title) + "</h3>" +
          '<p class="card__summary">' + esc(w.summary) + "</p>" +
        "</div>" +
      "</a>";
  }

  // ホバー時だけループ動画を読み込む（一覧を軽く保つための仕組み）
  function bindHoverVideos(root) {
    $$(".card", root).forEach(function (card) {
      var video = $("video", card);
      if (!video) return;
      var loaded = false;
      function play() {
        if (!loaded) { video.preload = "auto"; video.load(); loaded = true; }
        video.setAttribute("data-ready", "true");
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      }
      function stop() { video.pause(); video.removeAttribute("data-ready"); }
      card.addEventListener("mouseenter", play);
      card.addEventListener("focus", play);
      card.addEventListener("mouseleave", stop);
      card.addEventListener("blur", stop);
    });
  }

  function renderGrid(container, list) {
    if (!container) return;
    if (!list.length) {
      container.innerHTML = '<p class="empty">該当する作品がありません。</p>';
      return;
    }
    container.innerHTML = list.map(cardHTML).join("");
    bindHoverVideos(container);
  }

  /* ---------- トップページ ---------- */
  function initHome() {
    var featured = WORKS.filter(function (w) { return w.featured; }).slice(0, 6);
    renderGrid($("#featured-grid"), featured.length ? featured : WORKS.slice(0, 6));
  }

  /* ---------- 作品一覧ページ ---------- */
  function initWorks() {
    var grid = $("#works-grid");
    if (!grid) return;

    function apply(filter) {
      var list = filter === "all" ? WORKS : WORKS.filter(function (w) { return w.category === filter; });
      renderGrid(grid, list);
      $$(".filter").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === filter));
      });
      var count = $("#works-count");
      if (count) count.textContent = list.length + " 件";
    }

    $$(".filter").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        apply(f);
        // ローカルで直接ファイルを開いた場合は履歴を書き換えられないため、失敗しても無視する
        try {
          history.replaceState(null, "", f === "all" ? location.pathname : location.pathname + "?category=" + f);
        } catch (e) {}
      });
    });

    var initial = new URLSearchParams(location.search).get("category");
    apply(initial === "animation" || initial === "illustration" ? initial : "all");
  }

  /* ---------- 作品詳細ページ ---------- */
  function playerHTML(w) {
    var e = w.embed;
    if (!e || !e.type || !e.id) {
      return '<div class="player player--empty">本編の埋め込みが未設定です。<br>data.js の embed に YouTube / Vimeo の動画ID、または mp4 のパスを入れてください。</div>';
    }
    if (e.type === "youtube") {
      return '<div class="player"><iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(e.id) +
        '?rel=0" title="' + esc(w.title) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
    }
    if (e.type === "vimeo") {
      return '<div class="player"><iframe src="https://player.vimeo.com/video/' + encodeURIComponent(e.id) +
        '" title="' + esc(w.title) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
    }
    return '<div class="player"><video src="' + esc(e.id) + '" controls playsinline preload="metadata" poster="' + esc(w.thumb) + '"></video></div>';
  }

  function initDetail() {
    var root = $("#detail");
    if (!root) return;

    var id = new URLSearchParams(location.search).get("id");
    var w = id ? byId(id) : null;

    if (!w) {
      root.innerHTML = '<div class="wrap section"><h1 class="section-title">作品が見つかりませんでした</h1>' +
        '<p class="section-lead">URL が間違っているか、作品が削除された可能性があります。</p>' +
        '<a class="btn" href="works.html">作品一覧へ戻る</a></div>';
      return;
    }

    document.title = w.title + " | " + (SITE.name || "Portfolio");

    var idx = WORKS.indexOf(w);
    var prev = WORKS[idx - 1];
    var next = WORKS[idx + 1];

    var main = w.category === "animation"
      ? playerHTML(w)
      : '<img src="' + esc(w.thumb) + '" alt="' + esc(w.title) + '" style="width:100%;border:1px solid var(--border);border-radius:var(--radius)">';

    var stills = (w.images && w.images.length)
      ? '<div class="stills">' + w.images.map(function (src) {
          return '<img src="' + esc(src) + '" alt="' + esc(w.title) + ' の画像" loading="lazy" decoding="async">';
        }).join("") + "</div>"
      : "";

    // 動画作品でも embed がある場合、一覧用サムネと重複するので images のみ追加表示
    var bodyHTML = (w.body || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

    root.innerHTML = '' +
      '<div class="wrap detail__head">' +
        '<a class="back" href="works.html">← 作品一覧</a>' +
        '<p class="eyebrow">' + esc(CATEGORY_LABEL[w.category] || w.category) + " ・ " + esc(w.year) + "</p>" +
        '<h1 class="detail__title">' + esc(w.title) + "</h1>" +
        '<p class="section-lead" style="margin-bottom:0">' + esc(w.summary) + "</p>" +
        ((w.tags && w.tags.length)
          ? '<div class="detail__tags">' + w.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>"
          : "") +
      "</div>" +
      '<div class="wrap">' + main + "</div>" +
      '<div class="wrap section" style="padding-block:clamp(32px,5vw,56px)">' +
        '<div class="detail__layout">' +
          "<div>" + bodyHTML + stills +
            (w.credit ? '<p class="credit">' + esc(w.credit) + "</p>" : "") +
          "</div>" +
          '<dl class="spec">' +
            "<div><dt>制作年</dt><dd>" + esc(w.year) + "</dd></div>" +
            "<div><dt>担当</dt><dd>" + esc(w.role) + "</dd></div>" +
            "<div><dt>クライアント</dt><dd>" + esc(w.client) + "</dd></div>" +
            "<div><dt>区分</dt><dd>" + esc(CATEGORY_LABEL[w.category] || w.category) + "</dd></div>" +
          "</dl>" +
        "</div>" +
        '<nav class="pager">' +
          (prev ? '<a href="work.html?id=' + encodeURIComponent(prev.id) + '">← ' + esc(prev.title) + "</a>" : "<span></span>") +
          (next ? '<a href="work.html?id=' + encodeURIComponent(next.id) + '">' + esc(next.title) + " →</a>" : "<span></span>") +
        "</nav>" +
      "</div>";
  }

  /* ---------- プロフィールページ ---------- */
  function initAbout() {
    var skills = $("#skills");
    if (skills) {
      skills.innerHTML = (SITE.skills || []).map(function (g) {
        return '<div class="skill-group"><h3>' + esc(g.group) + "</h3><div class=\"chips\">" +
          g.items.map(function (i) { return '<span class="chip">' + esc(i) + "</span>"; }).join("") +
          "</div></div>";
      }).join("");
    }
    var career = $("#career");
    if (career) {
      career.innerHTML = (SITE.career || []).map(function (c) {
        return "<li><b>" + esc(c.year) + "</b><span>" + esc(c.text) + "</span></li>";
      }).join("");
    }
  }

  /* ---------- 起動 ---------- */
  function boot() {
    initTheme();
    initNav();
    initChrome();
    var page = document.body.getAttribute("data-page");
    if (page === "home")   initHome();
    if (page === "works")  initWorks();
    if (page === "work")   initDetail();
    if (page === "about")  initAbout();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
