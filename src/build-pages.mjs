// node src/build-pages.mjs
// 階層の版：pages/ に、トップ・作品（一覧）・作品ごとのページ・経歴を、日本語・English・한국어 で書き出す。
// 部品は 1枚の版（src/build.mjs）と同じ src/kit.mjs。assets/ は pages/assets/ に写す（pages/ だけで公開できるように）。
//
//   pages/index.html                 トップ：名前と紹介、点の雨、主な作品の札、ほかの作品から少し、連絡
//   pages/works/index.html           作品：主な作品7つと、ほかの作品26件（分類で絞り込む）
//   pages/works/<id>/index.html      作品ごと：見出し・画面・数字、作った理由、工夫したこと、概要、使った技術、姉妹、前後の作品
//   pages/about/index.html           経歴：所属と年表、作り方、よく使う道具
//   pages/en/…、pages/ko/…           同じ形で英語・韓国語
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as C from "./content.mjs";
import { esc, kit, PAGES, ROOT } from "./kit.mjs";

const OUT = join(ROOT, "pages");
const campus = C.groups.find((g) => g.id === "campus");
const language = C.groups.find((g) => g.id === "language");
// 作品のページの並び（前後の作品もこの順）：大学生活、言葉（作った順）。
const ORDER = [...campus.works, ...language.works];
const FILM = new Set(["kotonoha"]);
const LANG_DIR = Object.fromEntries(Object.entries(PAGES).map(([k, v]) => [k, v.dir ? `${v.dir}/` : ""]));
const depth = (p) => p.split("/").filter(Boolean).length;

// 1ページを書く。path は言語のフォルダからの位置（"" がトップ）。
function page(L, path, build) {
  const B = "../".repeat(depth(LANG_DIR[L] + path)); // サイトの根（assets がある所）まで
  const R = "../".repeat(depth(path)); // その言語のトップまで
  const K = kit(L, B, { workHref: (id) => `${R}works/${id}/` });
  const T = (v) => K.tx(v);
  const P = C.ui.pages;
  const home = R || "./";
  const { title, desc, current, main, redirect } = build({ K, T, P, R, B, home });
  const nav = [
    { href: `${R}works/`, label: T(P.works), current: current === "works" },
    { href: `${R}about/`, label: T(P.about), current: current === "about" },
    { href: "#contact", label: T(P.contact) },
  ];
  const html = `<!doctype html>
<html lang="${L}">
<head>
${K.headTags({ title, desc, path, redirect })}
</head>
<body>
<div class="page" lang="${L}">
<a class="skip" href="#main">${esc(T(C.ui.skip))}</a>
${K.header({ brandHref: home, nav, path })}
<main id="main">
${main}
</main>
${K.footer}
</div>
${K.scripts()}
</body>
</html>
`;
  const dir = join(OUT, LANG_DIR[L], path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  return html.length;
}

// ---------- 共通の部品（このファイルだけのもの） ----------
const crumbs = (K, T, P, R, trail) =>
  `<nav class="crumbs" aria-label="${esc(T({ ja: "現在地", en: "You are here", ko: "현재 위치" }))}"><ol>${[[P.top, R || "./"], ...trail]
    .map(([label, href], i, all) => (i === all.length - 1 ? `<li aria-current="page">${esc(T(label))}</li>` : `<li><a href="${href}">${esc(T(label))}</a></li>`))
    .join("")}</ol></nav>`;

// 作品の札：アイコン、名前、見出し、何のアプリか、期間と状態。札ごと押せる。
// feature の作品（ScienceTokyo App）は横いっぱいの札にして、スマホの画面を下からのぞかせる。
const FEATURE = new Set(["sciencetokyo"]);
function cards(K, T, R, B, ids) {
  return `<ul class="work-cards">
      ${ids
        .map((id) => {
          const w = C.works[id];
          const feature = FEATURE.has(id) && w.media?.kind === "phone";
          const shot = feature ? `<span class="wc-shot" aria-hidden="true"><img src="${B}${w.media.poster}" alt="" width="780" height="1688" loading="lazy" decoding="async"></span>` : "";
          return `<li${feature ? ' class="is-feature"' : ""}><a class="work-card" href="${R}works/${id}/">${K.iconImg(w.icon, 56)}<span class="wc-text"><span class="wc-name${w.wordmark ? " wordmark" : ""}"${K.nameAttr(
            w
          )}>${esc(w.name)}</span><span class="wc-tag">${T(w.tagline)}</span><span class="wc-one">${esc(T(w.oneLine))}</span><span class="wc-meta"><span class="period">${esc(
            w.period
          )}</span>${K.status(w.status)}</span></span>${shot}<span class="wc-go" aria-hidden="true">→</span></a></li>`;
        })
        .join("\n      ")}
    </ul>`;
}

// 作品ごとのページの下の、小さな連絡（トップは大きな連絡の節）。
const contactStrip = (K, T) => `<section class="section contact-strip" id="contact" aria-labelledby="contact-title">
  <div class="wrap">
    <h2 class="section-title" id="contact-title">${esc(T(C.sections.contact.title))}</h2>
    <p class="strip-lead">${esc(T(C.sections.contact.lead))}</p>
    <p class="mail"><a class="mail-address" href="mailto:${esc(C.profile.email)}">${esc(C.profile.email)}</a></p>
    <ul class="contact-links">
      ${C.profile.links.map((l) => `<li><span class="cl-label">${esc(l.label)}</span>${K.ext(l.href, esc(l.handle))}</li>`).join("\n      ")}
    </ul>
  </div>
</section>`;

// ---------- トップ ----------
function topPage(L) {
  return page(L, "", ({ K, T, P, R, B }) => ({
    redirect: true,
    main: `${K.hero()}
<section class="section" id="work" aria-labelledby="work-title">
  <div class="wrap">
    <header class="section-head section-head-row">
      <h2 class="section-title" id="work-title">${esc(T(P.mainWorks))}</h2>
      <a class="more-link" href="${R}works/">${esc(T(P.allWorks))} →</a>
    </header>
    <div class="group-head">
      <h3 class="kicker">${esc(T(campus.label))}</h3>
      <p class="group-lead">${T(campus.lead)}</p>
    </div>
    ${cards(K, T, R, B, campus.works)}
    <div class="group-head group-head-lang">
      <h3 class="kicker">${esc(T(language.label))}</h3>
      <p class="display top-chapter">${T(language.headline)}</p>
      <p class="group-lead">${T(language.lead)}</p>
    </div>
    ${cards(K, T, R, B, language.works)}
  </div>
</section>
<section class="section" id="more" aria-labelledby="more-title">
  <div class="wrap">
    <header class="section-head section-head-row">
      <h2 class="section-title" id="more-title">${esc(T(C.sections.more.title))}</h2>
      <a class="more-link" href="${R}works/#others">${esc(T(P.allWorks))} →</a>
    </header>
    <ul class="ledger">
      ${K.ledgerRows(C.ledger.filter((x) => x.pick))}
    </ul>
  </div>
</section>
${K.contactSection}`,
  }));
}

// ---------- 作品（一覧） ----------
function worksPage(L) {
  return page(L, "works/", ({ K, T, P, R, B }) => {
    const counts = Object.fromEntries(C.filters.map((f) => [f.id, C.ledger.filter((x) => x.cat === f.id).length]));
    return {
      title: T(P.works) + " — " + T(C.profile.pageTitle),
      current: "works",
      main: `<section class="section page-first" aria-labelledby="works-title">
  <div class="wrap">
    ${crumbs(K, T, P, R, [[P.works]])}
    <header class="section-head">
      <h1 class="section-title" id="works-title">${esc(T(P.works))}</h1>
      <p class="section-lead">${esc(T(P.worksLead))}</p>
    </header>
    <h2 class="sub-title">${esc(T(P.mainWorks))}</h2>
    ${cards(K, T, R, B, ORDER)}
    <h2 class="sub-title" id="others">${esc(T(C.sections.more.title))}</h2>
    <div class="filters" role="group" aria-label="${esc(T(P.filterLabel))}" hidden>
      <button type="button" data-filter="all" aria-pressed="true">${esc(T(P.filterAll))}<span class="n">${C.ledger.length}</span></button>
      ${C.filters.map((f) => `<button type="button" data-filter="${f.id}" aria-pressed="false">${esc(T(f.label))}<span class="n">${counts[f.id]}</span></button>`).join("\n      ")}
    </div>
    <div class="ledger-head" aria-hidden="true"><span>${esc(T(C.ui.ledgerHead.work))}</span><span>${esc(T(C.ui.ledgerHead.period))}</span><span>${esc(
      T(C.ui.ledgerHead.status)
    )}</span><span>${esc(T(C.ui.ledgerHead.about))}</span></div>
    <ul class="ledger">
      ${K.ledgerRows(C.ledger)}
    </ul>
  </div>
</section>
${contactStrip(K, T)}`,
    };
  });
}

// ---------- 作品ごと ----------
function workPage(L, id) {
  return page(L, `works/${id}/`, ({ K, T, P, R }) => {
    const w = C.works[id];
    const { stats, sceneHead, media, links } = K;
    // 上：見出し・文・数字・リンクと、画面（デモ・映像）。1枚の版の場面と同じ形。
    const head = sceneHead(id, "h1");
    const lead = `<p class="lead">${T(w.lead)}</p>`;
    let top;
    if (!w.media) {
      top = `<article class="scene scene-compact wp-top" aria-labelledby="${id}-h">
      ${head}
      <div class="scene-text">${lead}${stats(w)}${links(w.links)}</div>
    </article>`;
    } else if (FILM.has(id)) {
      top = `<article class="scene scene-film wp-top" aria-labelledby="${id}-h">
      <div class="scene-top">${head}${lead}</div>
      ${media(w)}
      <div class="scene-foot">${stats(w)}${links(w.links)}</div>
    </article>`;
    } else {
      top = `<article class="scene scene-split wp-top" data-side="right" aria-labelledby="${id}-h">
      <div class="scene-grid">
        <div class="scene-text">${head}${lead}${stats(w)}${links(w.links)}</div>
        ${media(w)}
      </div>
    </article>`;
    }
    // 下：1枚の版では「詳しく見る」に畳んでいたものを、見出しを付けて開いたまま。
    const section = (key, title, body) =>
      `<section class="wp-section" aria-labelledby="${id}-${key}"><h2 class="wp-h" id="${id}-${key}">${esc(T(title))}</h2><div class="wp-body">${body}</div></section>`;
    const parts = [];
    if (w.origin) parts.push(section("origin", P.origin, `<p class="wp-p">${T(w.origin)}</p>`));
    if (w.points) parts.push(section("points", C.ui.points, `<div class="points"><ul>${w.points.map((p) => `<li>${T(p)}</li>`).join("")}</ul></div>`));
    if (w.facts) parts.push(section("facts", P.facts, `<dl class="facts">${w.facts.map(([k, v]) => `<div><dt>${esc(T(k))}</dt><dd>${T(v)}</dd></div>`).join("")}</dl>`));
    if (w.tech) parts.push(section("tech", C.ui.builtWith, `<ul class="tech-list">${w.tech.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`));
    if (language.works.includes(id)) {
      // 系譜は言葉の章の見出しを指しているので、このページではこの節の見出しに付け替える。
      const here = `href="${R}works/${id}/"`;
      parts.push(section("sisters", P.sisters, K.lineage.replace(`aria-labelledby="${language.id}-h"`, `aria-labelledby="${id}-sisters"`).replace(here, `${here} aria-current="page"`)));
    }
    const i = ORDER.indexOf(id);
    const go = (other, label, cls) => {
      if (!other) return `<span class="${cls}"></span>`;
      const o = C.works[other];
      return `<a class="${cls}" href="${R}works/${other}/"><span class="pg-label">${esc(T(label))}</span><span class="pg-name${o.wordmark ? " wordmark" : ""}"${K.nameAttr(o)}>${esc(o.name)}</span></a>`;
    };
    return {
      title: `${w.name} — ${T(C.profile.pageTitle)}`,
      desc: T(w.oneLine),
      current: "works",
      main: `<div class="work-page">
  <div class="wrap">
    ${crumbs(K, T, P, R, [[P.works, `${R}works/`], [w.name]])}
    ${top}
    <div class="wp-sections">
      ${parts.join("\n      ")}
    </div>
    <nav class="pager" aria-label="${esc(T(P.works))}">${go(ORDER[i - 1], P.prev, "pg-prev")}${go(ORDER[i + 1], P.next, "pg-next")}</nav>
  </div>
</div>
${contactStrip(K, T)}`,
    };
  });
}

// ---------- 経歴 ----------
function aboutPage(L) {
  return page(L, "about/", ({ K, T, P, R }) => {
    const A = C.about;
    const toolItem = ([name, n]) => `<li>${esc(T(name))}${n !== undefined ? `<span class="n">${esc(n)}</span>` : ""}</li>`;
    return {
      title: T(P.about) + " — " + T(C.profile.pageTitle),
      current: "about",
      main: `<section class="section page-first" aria-labelledby="about-title">
  <div class="wrap">
    ${crumbs(K, T, P, R, [[P.about]])}
    <header class="section-head"><h1 class="section-title" id="about-title">${esc(T(P.about))}</h1></header>
    <div class="about-grid">
      <dl class="facts about-facts">${A.facts.map(([k, v]) => `<div><dt>${esc(T(k))}</dt><dd>${esc(T(v))}</dd></div>`).join("")}</dl>
      <div class="timeline">
        <h2 class="mini-h">${esc(T(A.timelineTitle))}</h2>
        <ol>
          ${A.timeline.map(([ym, text]) => `<li><time datetime="${ym}">${esc(K.monthLabel(ym))}</time><span>${T(text)}</span></li>`).join("\n          ")}
        </ol>
      </div>
    </div>
    <h2 class="sub-title">${esc(T(C.sections.approach.title))}</h2>
    <ul class="principles">
      ${C.approach.map((a) => `<li><h3>${esc(T(a.title))}</h3><p>${T(a.body)}</p></li>`).join("\n      ")}
    </ul>
    <div class="tools">
      <div class="tools-head"><h2 class="sub-title">${esc(T(A.toolsTitle))}</h2><p class="tools-note">${esc(T(A.toolsNote))}</p></div>
      <dl class="tool-groups">
        ${A.tools.map(([g, items]) => `<div><dt>${esc(T(g))}</dt><dd><ul>${items.map(toolItem).join("")}</ul></dd></div>`).join("\n        ")}
      </dl>
    </div>
  </div>
</section>
${contactStrip(K, T)}`,
    };
  });
}

// ---------- 書き出し ----------
rmSync(OUT, { recursive: true, force: true });
cpSync(join(ROOT, "assets"), join(OUT, "assets"), { recursive: true });
for (const L of Object.keys(PAGES)) {
  let total = topPage(L) + worksPage(L) + aboutPage(L);
  for (const id of ORDER) total += workPage(L, id);
  console.log(`${L}: ${3 + ORDER.length} pages (${(total / 1024).toFixed(0)} KB)`);
}
