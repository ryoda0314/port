// node src/build.mjs
// 1枚の版：src/content.mjs から index.html（日本語）、en/index.html、ko/index.html を書き出す。依存パッケージはない。
// 部品は src/kit.mjs（階層の版 src/build-pages.mjs と共通）。
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as C from "./content.mjs";
import { esc, kit, PAGES, ROOT } from "./kit.mjs";

function render(L) {
  const B = PAGES[L].base;
  const K = kit(L, B);
  const { tx, ext, status, monthLabel, stats, sceneHead, more, media, links } = K;

  // 横長の映像は横幅いっぱいに（ことのは）。デモとスマホの画面は文章の横に、左右を入れ替えながら。
  // 画面のない作品（PolyLinga）は、見出しと文章だけの短い行にする。
  const FILM = new Set(["kotonoha"]);
  let sideFlip = false;
  function scene(id) {
    const w = C.works[id];
    if (!w.media) {
      return `<article class="scene scene-compact" id="${id}" aria-labelledby="${id}-h">
      ${sceneHead(id)}
      <div class="scene-text">
        <p class="lead">${tx(w.lead)}</p>
        ${stats(w)}
        ${links(w.links)}
      </div>
    </article>`;
    }
    if (FILM.has(id)) {
      return `<article class="scene scene-film" id="${id}" aria-labelledby="${id}-h">
      <div class="scene-top">
        ${sceneHead(id)}
        <p class="lead">${tx(w.lead)}</p>
      </div>
      ${media(w)}
      <div class="scene-foot">${stats(w)}${links(w.links)}</div>
      ${more(w)}
    </article>`;
    }
    sideFlip = !sideFlip;
    return `<article class="scene scene-split" data-side="${sideFlip ? "right" : "left"}" id="${id}" aria-labelledby="${id}-h">
      <div class="scene-grid">
        <div class="scene-text">
          ${sceneHead(id)}
          <p class="lead">${tx(w.lead)}</p>
          ${stats(w)}
          ${links(w.links)}
        </div>
        ${media(w)}
      </div>
      ${more(w)}
    </article>`;
  }

  const campus = C.groups.find((g) => g.id === "campus");
  const language = C.groups.find((g) => g.id === "language");

  const workSection = `<section class="section section-work" id="work" aria-labelledby="work-title">
  <div class="wrap"><h2 class="section-title" id="work-title">${esc(tx(C.sections.work.title))}</h2></div>
  <div class="group group-campus" id="${campus.id}">
    <div class="wrap">
      <header class="group-head">
        <h3 class="kicker">${esc(tx(campus.label))}</h3>
        <p class="group-lead">${tx(campus.lead)}</p>
      </header>
      ${campus.works.map(scene).join("\n      ")}
    </div>
  </div>
  <div class="group group-lang" id="${language.id}">
    <div class="wrap">
      <header class="chapter-head">
        <h3 class="chapter-title" id="${language.id}-h"><span class="kicker">${esc(tx(language.label))}</span><span class="display display-xl">${tx(language.headline)}</span></h3>
        <div class="chapter-body">
          <p class="group-lead">${tx(language.lead)}</p>
          <p class="work-links">${ext(language.note.href, esc(tx(language.note.label)))}</p>
        </div>
        ${K.lineage}
      </header>
      ${language.works.map(scene).join("\n      ")}
    </div>
  </div>
</section>`;

  // ---------- ledger ----------
  const moreSection = `<section class="section" id="more" aria-labelledby="more-title">
  <div class="wrap">
    <header class="section-head">
      <h2 class="section-title" id="more-title">${esc(tx(C.sections.more.title))}</h2>
      <p class="section-lead">${esc(tx(C.sections.more.lead))}</p>
    </header>
    <div class="ledger-head" aria-hidden="true"><span>${esc(tx(C.ui.ledgerHead.work))}</span><span>${esc(tx(C.ui.ledgerHead.period))}</span><span>${esc(
      tx(C.ui.ledgerHead.status)
    )}</span><span>${esc(tx(C.ui.ledgerHead.about))}</span></div>
    <ul class="ledger">
      ${K.ledgerRows(C.ledger.filter((x) => x.pick))}
    </ul>
  </div>
</section>`;

  // ---------- approach ----------
  const approachSection = `<section class="section" id="approach" aria-labelledby="approach-title">
  <div class="wrap">
    <header class="section-head"><h2 class="section-title" id="approach-title">${esc(tx(C.sections.approach.title))}</h2></header>
    <ul class="principles">
      ${C.approach.filter((a) => !a.more).map((a) => `<li><h3>${esc(tx(a.title))}</h3><p>${tx(a.body)}</p></li>`).join("\n      ")}
    </ul>
  </div>
</section>`;

  // ---------- about ----------
  const A = C.about;
  const aboutSection = `<section class="section" id="about" aria-labelledby="about-title">
  <div class="wrap">
    <header class="section-head"><h2 class="section-title" id="about-title">${esc(tx(C.sections.about.title))}</h2></header>
    <div class="about-grid">
      <dl class="facts about-facts">${A.facts.map(([k, v]) => `<div><dt>${esc(tx(k))}</dt><dd>${esc(tx(v))}</dd></div>`).join("")}</dl>
      <div class="timeline">
        <h3 class="mini-h">${esc(tx(A.timelineTitle))}</h3>
        <ol>
          ${A.timeline.filter((r) => r[2] !== "more").map(([ym, text]) => `<li><time datetime="${ym}">${esc(monthLabel(ym))}</time><span>${tx(text)}</span></li>`).join("\n          ")}
        </ol>
      </div>
    </div>
  </div>
</section>`;

  const nav = ["work", "more", "approach", "about", "contact"].map((k) => ({ href: `#${k}`, label: tx(C.ui.nav[k]) }));

  return `<!doctype html>
<html lang="${L}">
<head>
${K.headTags({ redirect: true })}
</head>
<body>
<div class="page" lang="${L}">
<a class="skip" href="#main">${esc(tx(C.ui.skip))}</a>
${K.header({ nav })}
<main id="main">
${K.hero()}
${workSection}
${moreSection}
${approachSection}
${aboutSection}
${K.contactSection}
</main>
${K.footer}
</div>
${K.scripts()}
</body>
</html>
`;
}

for (const L of Object.keys(PAGES)) {
  const dir = join(ROOT, PAGES[L].dir);
  mkdirSync(dir, { recursive: true });
  const html = render(L);
  writeFileSync(join(dir, "index.html"), html);
  console.log(`${L}: ${join(PAGES[L].dir, "index.html")} (${(html.length / 1024).toFixed(1)} KB)`);
}
