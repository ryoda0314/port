// サイトの文章とデータ。ここを書き換えて `node src/build.mjs` を実行すると、
// index.html（日本語）、en/index.html、ko/index.html が書き出される。
// 文章は t(日本語, English, 한국어) の順に書く。中に HTML を書いてよい（自分で書く文章なので、エスケープしない）。
// 日本語の文の中に韓国語や中国語を入れるときは <span lang="ko"> / <span lang="zh-CN"> で囲むと、その言語の書体になる。

export const t = (ja, en, ko) => ({ ja, en, ko });

// 公開先が決まったら書く（例: "https://ryoda.dev/"）。書くと og:url / og:image / hreflang が絶対 URL で出る。
export const SITE_URL = "";

export const UPDATED = "2026-10-25";

export const profile = {
  name: t("塚本 諒", "Ryo Tsukamoto", "Ryo Tsukamoto"),
  roman: "Ryo Tsukamoto",
  pageTitle: t("塚本 諒 / Ryo Tsukamoto", "Ryo Tsukamoto", "Ryo Tsukamoto"),
  description: t(
    "東京科学大学で機械工学を学ぶ塚本 諒の作品。大学生活のアプリ ScienceTokyo App と、語学アプリ ことのあめ・ことのね・ことのえだ・ことのは・ことのおと など。",
    "Work by Ryo Tsukamoto, a mechanical engineering student at Institute of Science Tokyo: ScienceTokyo App for campus life, and the language apps Kotonoame, Kotonone, Kotonoeda, Kotonoha and Kotonooto.",
    "도쿄과학대학에서 기계공학을 공부하는 Ryo Tsukamoto의 작품. 대학 생활 앱 ScienceTokyo App과 어학 앱 ことのあめ·ことのね·ことのえだ·ことのは·ことのおと 등."
  ),
  affiliation: t(
    "東京科学大学 工学院・機械工学（学部）",
    "Mechanical engineering (undergraduate), Institute of Science Tokyo",
    "도쿄과학대학 공학원 기계공학(학부)"
  ),
  intro: t(
    "東京科学大学の工学院で、機械工学を学んでいる。大学生活で不便だと思ったことを解くアプリと、語学のアプリを中心に、AI エージェントと組んで作っている。",
    "I study mechanical engineering at the School of Engineering, Institute of Science Tokyo. Mostly I build apps for the things that bother me in university life, and apps for learning languages, working together with AI coding agents.",
    "도쿄과학대학 공학원에서 기계공학을 공부하고 있다. 대학 생활에서 불편하다고 느낀 것을 해결하는 앱과 어학 앱을 중심으로, AI 에이전트와 함께 만들고 있다."
  ),
  email: "ryo.tsukamoto24@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/ryoda0314", handle: "ryoda0314" },
    { label: "X", href: "https://x.com/RH__328", handle: "@RH__328" },
    { label: "note", href: "https://note.com/ryoda_", handle: "ryoda_" },
  ],
};

export const ui = {
  skip: t("本文へ", "Skip to content", "본문으로"),
  navLabel: t("ページ内", "On this page", "페이지 안"),
  langLabel: t("言語", "Language", "언어"),
  nav: {
    work: t("作品", "Work", "작품"),
    more: t("ほかの作品", "More", "그 밖의 작품"),
    approach: t("作り方", "How I work", "만드는 방식"),
    about: t("経歴", "About", "이력"),
    contact: t("連絡", "Contact", "연락"),
  },
  email: t("メール", "Email", "메일"),
  status: {
    live: t("運用中", "Live", "운영 중"),
    dev: t("開発中", "In development", "개발 중"),
    paused: t("休止", "Paused", "보류"),
    done: t("完成", "Done", "완성"),
    proto: t("試作", "Prototype", "프로토타입"),
  },
  // 作品ごとの工夫・由来・技術は、これを押すと開く。
  more: t("詳しく見る", "More detail", "자세히 보기"),
  points: t("工夫したこと", "What went into it", "공들인 부분"),
  builtWith: t("使った技術", "Built with", "사용 기술"),
  play: t("再生", "Play", "재생"),
  pause: t("一時停止", "Pause", "일시정지"),
  soundOn: t("音を出す", "Sound on", "소리 켜기"),
  soundOff: t("音を消す", "Sound off", "소리 끄기"),
  copy: t("コピー", "Copy", "복사"),
  copied: t("コピーしました", "Copied", "복사됨"),
  external: t("（新しいタブで開く）", " (opens in a new tab)", "(새 탭에서 열림)"),
  updated: t("更新", "Updated", "업데이트"),
  // 階層の版（pages/）のページの言葉。
  pages: {
    works: t("作品", "Work", "작품"),
    about: t("経歴", "About", "이력"),
    contact: t("連絡", "Contact", "연락"),
    top: t("トップ", "Top", "처음"),
    mainWorks: t("主な作品", "Main work", "주요 작품"),
    allWorks: t("すべての作品", "All work", "모든 작품"),
    worksLead: t(
      "主な作品7つと、ほかに作ったものから26件。期間と状態は2026年10月時点。名前だけなら、トップの点に触れると全部出る。",
      "Seven main works and 26 others. Periods and status as of October 2026. Every name appears when you point at the dots on the top page.",
      "주요 작품 7개와, 그 밖에 만든 것 중 26건. 기간과 상태는 2026년 10월 기준. 이름만이라면 첫 페이지의 점에 손을 대면 전부 나온다."
    ),
    origin: t("作った理由", "Why I made it", "만든 이유"),
    facts: t("概要", "At a glance", "개요"),
    sisters: t("姉妹アプリ", "Sister apps", "자매 앱"),
    prev: t("前の作品", "Previous", "이전 작품"),
    next: t("次の作品", "Next", "다음 작품"),
    filterAll: t("すべて", "All", "전체"),
    filterLabel: t("分類で絞り込む", "Filter by kind", "분류로 좁히기"),
  },
  ledgerHead: {
    work: t("作品", "Work", "작품"),
    period: t("期間", "Period", "기간"),
    status: t("状態", "Status", "상태"),
    about: t("内容", "About", "내용"),
  },
};

// 主な作品のまとまり。ヒーローの目次と「作品」の節は、この順に並ぶ。
export const groups = [
  {
    id: "campus",
    label: t("大学生活", "Campus life", "대학 생활"),
    lead: t(
      "学生として困ったことから作っている。",
      "Built from problems I run into as a student.",
      "학생으로서 곤란했던 것에서 만든다."
    ),
    works: ["sciencetokyo"],
  },
  {
    id: "language",
    label: t("言葉", "Languages", "언어"),
    // ことのあめ の紹介ページの見出し。本人の note の「『分かる』と『できる』の間には、かなり距離がある」から。
    headline: t(
      "「分かる」と「できる」の<br>あいだを埋める。",
      "Closing the gap between<br>knowing and being able to.",
      "'아는 것'과 '할 수 있는 것'<br>사이를 메운다."
    ),
    lead: t(
      "2025年7月に、韓国語をほぼゼロから始めた。似た文を集めて共通しているところを推測し、言いたいことを言ってみて直してもらい、知らない語はスマホのメモに自分で打った。1年後には、韓国の友だちと何時間も電話するようになっていた。この学び方を、アプリにしている。",
      "In July 2025 I started Korean from almost zero. I collected similar sentences and guessed what they shared, tried saying what I wanted to say and had it corrected, and typed unknown words into my phone's notes myself. A year later I was spending hours on the phone with Korean friends. These apps turn that way of learning into something other people can use.",
      "2025년 7월, 한국어를 거의 처음부터 시작했다. 비슷한 문장을 모아 공통된 부분을 추측하고, 하고 싶은 말을 해 보고 고쳐 받고, 모르는 단어는 휴대폰 메모에 직접 쳤다. 1년 뒤에는 한국 친구와 몇 시간씩 통화하게 되었다. 이렇게 배운 방식을 앱으로 만들고 있다."
    ),
    note: {
      label: t(
        "この1年のことは note に書いた",
        "I wrote about that year on note (in Japanese)",
        "이 1년의 이야기는 note에 썼다(일본어)"
      ),
      href: "https://note.com/ryoda_/n/n4e69c14a99cb",
    },
    lineage: {
      steps: [
        // 日付は作り始めた日（日本時間）。各フォルダで最初に作り始めた会話と、git の最初のコミットから。姉妹は作った順。
        // 初代の Poly-Lang は主な作品ではない（アイコンも作品のページもない）ので、点線の枠に mark の字を入れて、GitHub へつなぐ。
        { name: "Poly-Lang", mark: "PL", href: "https://github.com/ryoda0314/poly-lang-app", date: "2025-07-24", role: t("初代の試作", "First prototype", "첫 프로토타입") },
        { work: "polylinga", date: "2025-12-19", role: t("2代目", "Second version", "두 번째 버전") },
        { work: "kotonoame", date: "2026-10-03", role: t("作り直し", "The rebuild", "다시 만든 것") },
        { work: "kotonooto", date: "2026-10-19", role: t("中国語の音", "Chinese sounds", "중국어 소리"), sister: true },
        { work: "kotonoha", date: "2026-10-21", role: t("英語", "English", "영어"), sister: true },
        { work: "kotonone", date: "2026-10-21", role: t("韓国語の漢字語", "Sino-Korean words", "한국어 한자어"), sister: true },
        { work: "kotonoeda", date: "2026-10-24", role: t("韓国語の上の語", "Korean honorifics", "한국어 높임말"), sister: true },
      ],
    },
    works: ["polylinga", "kotonoame", "kotonooto", "kotonoha", "kotonone", "kotonoeda"],
  },
];

export const works = {
  sciencetokyo: {
    name: "ScienceTokyo App",
    // 大見出しは、どれも本人のアプリや紹介映像・紹介ページの言葉から。
    tagline: t("大学生活を、<br>ひとつに。", "All of campus life, in one app.", "대학 생활을 하나로."),
    stats: [
      ["875", t("コミット", "commits", "커밋")],
      ["30+", t("機能", "features", "기능")],
      ["5", t("言語", "languages", "언어")],
    ],
    icon: "sciencetokyo-app.png",
    oneLine: t("東京科学大学の学生向けアプリ", "An app for students at Science Tokyo", "도쿄과학대학 학생을 위한 앱"),
    period: "2026-03-03 〜",
    status: "live",
    platform: t("iOS（App Store）・Web", "iOS (App Store), Web", "iOS(App Store)·웹"),
    lead: t(
      "東京科学大学の学生のためのアプリ。大学の LMS から時間割・課題・教材・成績を取り込み、その上に学内だけの SNS、キャンパスナビ、生活の道具を載せた。ひとりで開発・運営している。大学の公式アプリではなく、学生が作った学生のためのアプリ。",
      "An app for students at Institute of Science Tokyo. It pulls timetables, assignments, course materials and grades from the university's LMS, and puts a campus-only social network, campus navigation and everyday tools on top. I build and run it on my own. It isn't an official university app; it's an app made by a student, for students.",
      "도쿄과학대학 학생을 위한 앱. 대학 LMS에서 시간표·과제·교재·성적을 가져오고, 그 위에 교내 전용 SNS, 캠퍼스 내비, 생활 도구를 얹었다. 혼자 개발하고 운영한다. 대학 공식 앱이 아니라, 학생이 만든 학생을 위한 앱이다."
    ),
    facts: [
      [
        t("主な機能", "Features", "주요 기능"),
        t(
          "時間割、課題と提出、教材、成績、学内 SNS と DM、3D のキャンパスナビ、空き教室など30以上",
          "Over 30, including timetables, assignments and submission, course materials, grades, a campus social network and DMs, 3D campus navigation and free classrooms",
          "시간표, 과제와 제출, 교재, 성적, 교내 SNS와 DM, 3D 캠퍼스 내비, 빈 강의실 등 30개 이상"
        ),
      ],
      [
        t("コミット", "Commits", "커밋"),
        t("875（2026年3月3日〜10月21日）", "875 (March 3 to October 21, 2026)", "875회(2026년 3월 3일~10월 21일)"),
      ],
      [t("規模", "Size", "규모"), t("API ルート108本、画面50", "108 API routes, 50 screens", "API 라우트 108개, 화면 50개")],
      [
        t("言語", "Languages", "언어"),
        t("日本語・英語・中国語・韓国語・トキポナ", "Japanese, English, Chinese, Korean, Toki Pona", "일본어·영어·중국어·한국어·토키포나"),
      ],
      [
        t("届出", "Registration", "신고"),
        t(
          "メッセージ機能のため、電気通信事業を届け出た（2026年5月受理）",
          "Registered as a telecommunications business because of its messaging (accepted May 2026)",
          "메시지 기능 때문에 전기통신사업을 신고했다(2026년 5월 수리)"
        ),
      ],
      // campus-app（2025-12-04〜31）。コードは引き継いでいない。
      [
        t("前に作ったもの", "Built before it", "이전에 만든 것"),
        t(
          "2025年12月の、大学のメールで入る学内 SNS「SwaLo」（73コミット）。チャットと DM、学内の居場所の共有を、ここで先に作った",
          "SwaLo, a campus social network joined with a university email, in December 2025 (73 commits). Chat, DMs and sharing where you are on campus were built there first",
          "2025년 12월의, 대학 메일로 가입하는 교내 SNS 'SwaLo'(73커밋). 채팅과 DM, 교내 위치 공유를 여기서 먼저 만들었다"
        ),
      ],
    ],
    points: [
      t(
        "大学の LMS は、サーバーからの取得を拒否する。そこで LMS の API はブラウザから呼び、サーバーは変換と保存だけを受け持つ形にした。締切の通知も、アプリからの課題提出も、この上に作った。",
        "The university's LMS refuses requests that come from a server. So the app calls the LMS API from the browser, and the server only converts and stores the data. Deadline notifications and in-app submission are built on top of that.",
        "대학 LMS는 서버에서 오는 요청을 거부한다. 그래서 LMS API는 브라우저에서 부르고, 서버는 변환과 저장만 맡게 했다. 마감 알림도, 앱에서 과제를 제출하는 기능도 이 위에 만들었다."
      ),
      t(
        "大学アカウントの資格情報について、外部から「暗号化していても、鍵を運営者が持つなら取り出せる」と指摘された。もっともだったので、サーバーには置かず、端末の Keychain / Keystore に置く方式へ切り替えた。",
        "Someone outside pointed out that encrypted university credentials can still be read by whoever holds the key. They were right, so I stopped keeping credentials on the server and moved them to the device's Keychain / Keystore.",
        "외부에서 \"암호화해도 운영자가 키를 가지고 있으면 꺼낼 수 있다\"는 지적을 받았다. 맞는 말이라서, 대학 계정 정보는 서버에 두지 않고 기기의 Keychain / Keystore에 두는 방식으로 바꿨다."
      ),
      t(
        "セキュリティ監査（24件）と、4回のペネトレーションテスト（26件を修正）を受けて直した。",
        "It went through a security audit (24 findings) and four rounds of penetration testing (26 fixes).",
        "보안 감사(24건)와 4차례의 침투 테스트(26건 수정)를 받고 고쳤다."
      ),
      t(
        "キャンパスナビの 3D 地図は、国土地理院の標高データから地形を切り出し、階段・橋・通り抜けを手で足せるエディタを作って描いている。",
        "The 3D campus map cuts its terrain from GSI elevation data. Stairs, bridges and passages are added by hand in an editor I built for it.",
        "캠퍼스 내비의 3D 지도는 국토지리원 표고 데이터로 지형을 잘라 내고, 계단·다리·통로를 손으로 더할 수 있는 에디터를 만들어 그린다."
      ),
      t(
        "紹介映像は Remotion で7本作った。ここで流れているのは、その1本。",
        "I made seven promo videos with Remotion. The one playing here is one of them.",
        "소개 영상은 Remotion으로 7편 만들었다. 여기서 재생되는 것도 그중 하나다."
      ),
    ],
    tech: ["Next.js", "React", "Supabase", "Capacitor", "MapLibre GL", "Leaflet", "Puppeteer", "OpenAI API", "Remotion"],
    links: [
      { label: t("sciencetokyo.app", "sciencetokyo.app", "sciencetokyo.app"), href: "https://sciencetokyo.app" },
      { label: t("App Store", "App Store", "App Store"), href: "https://apps.apple.com/jp/app/sciencetokyo-app/id6761738741" },
    ],
    // 縦長の、スマホの画面そのものの映像（tools/sciencetokyo-day.py で作る）。場面の名前は映像に焼き込まず、横に並べる。
    media: {
      kind: "phone",
      src: "assets/media/sciencetokyo-day.mp4",
      poster: "assets/media/sciencetokyo-day.jpg",
      width: 780,
      height: 1688,
      label: t("ScienceTokyo App を操作している画面", "ScienceTokyo App being used", "ScienceTokyo App을 조작하는 화면"),
      // at は映像の中で場面が始まる秒（tools/sciencetokyo-day.py が書き出す）。時刻は映像のステータスバーと同じ。
      chapters: [
        { at: 0, clock: "8:45", name: t("ホーム", "Home", "홈"), note: t("今日の授業と締切", "Today's classes and deadlines", "오늘의 수업과 마감") },
        { at: 4.57, clock: "8:46", name: t("時間割", "Timetable", "시간표"), note: t("授業の教材とチャット", "Course materials and class chat", "수업 자료와 채팅") },
        { at: 11.37, clock: "8:47", name: t("キャンパスナビ", "Campus navigation", "캠퍼스 내비"), note: t("教室まで 3D で案内", "3D directions to the room", "강의실까지 3D로 안내") },
        { at: 20.63, clock: "12:40", name: t("空き教室", "Free classrooms", "빈 강의실"), note: t("いま空いている部屋", "Rooms that are free now", "지금 비어 있는 방") },
        { at: 26.37, clock: "17:20", name: t("課題", "Assignments", "과제"), note: t("アプリから提出", "Submitted from the app", "앱에서 제출") },
      ],
      caption: t(
        "アプリに組み込んだ撮影用のデモ（ダミーのデータ）を実際に操作して録り、画面が止まっている間だけを詰めた（35秒）。場面の名前を押すと、そこから流れる。",
        "Recorded by actually using the app in its built-in demo mode (dummy data), with only the still moments shortened (35 s). Pick a scene to jump to it.",
        "앱에 넣어 둔 촬영용 데모(더미 데이터)를 실제로 조작해 녹화하고, 화면이 멈춰 있는 동안만 줄였다(35초). 장면 이름을 누르면 거기서부터 재생된다."
      ),
    },
  },

  polylinga: {
    name: "PolyLinga",
    // アプリの紹介アニメーションの言葉（translations.ts の intro_awarenessLabel）から。英語もアプリのまま。
    tagline: t("自分で気づく。<br>だから身につく。", "Notice for yourself. That's how it sticks.", "스스로 깨달으면, 몸에 익는다."),
    stats: [
      ["490", t("コミット", "commits", "커밋")],
      ["20+", t("機能", "features", "기능")],
      ["11", t("画面の言語", "interface languages", "화면 언어")],
    ],
    icon: "polylinga.png",
    oneLine: t("例文・AI 添削・音声の多言語学習 PWA", "A multilingual learning PWA with example sentences, AI correction and audio", "예문·AI 첨삭·음성의 다국어 학습 PWA"),
    period: "2025-12-19 〜 2026-06-26",
    status: "paused",
    platform: t("Web（PWA）・iOS", "Web (PWA), iOS", "웹(PWA)·iOS"),
    lead: t(
      "似た例文を見比べて共通点に自分で気づく学び方を、AI の添削とネイティブの音声で支える PWA。8つの言語を学べて、画面は11言語。いまは ことのあめ として作り直している。",
      "A PWA for learning by comparing similar sentences and noticing the shared part yourself, backed by AI correction and native-speaker audio. It teaches 8 languages, with the interface in 11. I'm now rebuilding it as Kotonoame.",
      "비슷한 예문을 비교해 공통점을 스스로 알아차리는 학습을 AI 첨삭과 원어민 음성으로 돕는 PWA. 8개 언어를 배울 수 있고, 화면은 11개 언어. 지금은 ことのあめ로 다시 만들고 있다."
    ),
    // 前の版 Poly-Lang の企画（Desktop/app の 要件定義/めも.docx、2025-07-24）と、その夏のメモ（プレゼンテーション/メモ.docx）から。
    origin: t(
      "最初の形は、韓国語を始めた2025年7月の Poly-Lang。7月24日の1日で、企画書と要件定義を書いた。その夏のメモには、母語を覚える流れ（インプット → 分析 → 応用 → 修正 → 繰り返し）を大人がまねる、とある。30ほどのフレーズを眺めて規則に気づき、短い文を自分で作り、AI に直された文と見比べる。忘れても、また作って直してもらえばいい。それを12月に作り直したのが PolyLinga。",
      "Its first form was Poly-Lang, in July 2025, the month I started Korean: on the 24th I wrote its plan and requirements in a single day. A memo from that summer says adults can copy the way we learn our first language: input, analysis, use, correction, repeat. Look over about 30 phrases and notice the rules, make short sentences yourself, and compare them with the AI's corrections. If you forget, make the sentence again and have it corrected again. PolyLinga is what I rebuilt from it in December.",
      "처음 모습은 한국어를 시작한 2025년 7월의 Poly-Lang이다. 7월 24일 하루 만에 기획서와 요구 사항 정의를 썼다. 그해 여름의 메모에는 모어를 익히는 흐름(인풋 → 분석 → 응용 → 수정 → 반복)을 어른이 따라 한다고 적혀 있다. 30개쯤의 문장을 훑어보며 규칙을 알아차리고, 짧은 문장을 직접 만들어, AI가 고친 문장과 비교한다. 잊어도 다시 만들어 고쳐 받으면 된다. 그것을 12월에 다시 만든 것이 PolyLinga다."
    ),
    // 見比べる画面は poly-lang-app-pbc（2025-12-19 夜）、発音は pronunciation（2025-12-13〜20）で先に試した。
    points: [
      t(
        "似た例文を並べる画面は、作り直す直前の夜に、小さなアプリで先に試した。選んだ語を必ず含む例文だけを最大8文並べ、4文に満たなければ出さないことにした。",
        "The screen that lines up similar sentences was tried first in a small app, the night before the rebuild. It showed only sentences that really contain the word you picked, up to eight, and nothing at all if there were fewer than four.",
        "비슷한 예문을 늘어놓는 화면은 다시 만들기 직전 밤에 작은 앱으로 먼저 시험했다. 고른 단어가 반드시 들어간 예문만 최대 8개 늘어놓고, 4개가 안 되면 보여 주지 않기로 했다."
      ),
      t(
        "発音の評価は、Whisper の書き起こしと手本の文字の差で測るやり方と、Azure の音素ごとの評価を、別のアプリで並べて比べてから入れた。",
        "Before adding pronunciation scoring, I set two methods side by side in a separate app: Whisper's transcript compared letter by letter with the model sentence, and Azure's phoneme-level assessment.",
        "발음 평가는 Whisper로 받아 적은 글과 본보기 문장의 차이로 재는 방식과, Azure의 음소 단위 평가를 별도의 앱에서 나란히 비교한 뒤에 넣었다."
      ),
    ],
    facts: [
      [
        t("前の版", "Earlier version", "이전 버전"),
        t(
          "Poly-Lang（2025年7月〜12月）。17言語の基本フレーズ、AI の添削、読み上げ",
          "Poly-Lang (July to December 2025): basic phrases in 17 languages, AI correction, read-aloud",
          "Poly-Lang(2025년 7월~12월). 17개 언어의 기본 문장, AI 첨삭, 음성 읽기"
        ),
      ],
      [t("名前", "Name", "이름"), t("2026年1月に Poly-Lang から PolyLinga へ", "Renamed from Poly-Lang to PolyLinga in January 2026", "2026년 1월에 Poly-Lang에서 PolyLinga로")],
    ],
    tech: ["Next.js", "Supabase", "OpenAI API", "Gemini TTS", "Azure Speech", "Capacitor", "Stripe"],
    links: [{ label: t("GitHub", "GitHub", "GitHub"), href: "https://github.com/ryoda0314/poly-lang" }],
  },

  kotonoame: {
    name: "ことのあめ",
    wordmark: true,
    tagline: t("言の葉は、<br>言の雨に育まれる。", "Words grow in a rain of words.", "말의 잎은 말의 비로 자란다."),
    stats: [
      ["4,000+", t("組の例文", "sentence sets", "쌍의 예문")],
      ["4", t("言語", "languages", "언어")],
      ["9", t("実行時の依存", "runtime dependencies", "실행 시 의존")],
    ],
    sub: t("言の雨", "Kotonoame, rain of words", "言の雨, 말의 비"),
    icon: "kotonoame.png",
    oneLine: t("同じかたちの例文が、音声付きで雨のように降る", "Sentences sharing one pattern fall like rain, with audio", "같은 형태의 예문이 음성과 함께 비처럼 내린다"),
    period: "2026-10-03 〜",
    status: "dev",
    platform: t("Web", "Web", "웹"),
    lead: t(
      "同じかたちの短い文が、音声付きで雨のように降ってくる。共通しているところに自分で気づいたら、そのかたちで自分のことを言ってみて、AI に直してもらう。知らない語は自分の指で打ってメモする。忘れても、また降ってくる。",
      "Short sentences that share one pattern fall like rain, each with its audio. Once you notice what they have in common, you try the pattern on something of your own and an AI corrects it. You type unknown words into your notes yourself. If you forget, they fall again.",
      "같은 형태의 짧은 문장이 음성과 함께 비처럼 내린다. 공통된 부분을 스스로 알아차리면, 그 형태로 내 이야기를 해 보고 AI에게 고쳐 받는다. 모르는 단어는 직접 손으로 쳐서 메모한다. 잊어도 다시 내린다."
    ),
    points: [
      t(
        "例文は、友だち同士で送るような日常の文を4,000組以上、先に用意した。日英韓中の4言語でそろえてあるので、どの言語の組み合わせでも同じ雨を降らせられる（いまは日本語を話す人向けに公開している）。",
        "I prepared more than 4,000 sets of everyday sentences, the kind friends send each other, aligned across Japanese, English, Korean and Chinese, so any pair of languages can get the same rain. For now it's open to Japanese speakers.",
        "예문은 친구끼리 보내는 일상적인 문장을 4,000쌍 넘게 미리 준비했다. 일·영·한·중 4개 언어로 맞춰 두어서, 어떤 언어 조합이든 같은 비를 내리게 할 수 있다(지금은 일본어 화자용으로 공개하고 있다)."
      ),
      t(
        "学習中に AI を呼ぶのは、添削だけ。例文の音声は先に作っておき、1秒あたりの音の数を測って、速すぎるものは作り直した。",
        "While you learn, the only AI call is the correction. The audio is generated in advance; I measure sounds per second and regenerate clips that come out too fast.",
        "학습 중에 AI를 부르는 것은 첨삭뿐이다. 예문 음성은 미리 만들어 두고, 1초당 소리 수를 재서 너무 빠른 것은 다시 만들었다."
      ),
      t(
        "「書いてみる」のヒント文を意味の近さだけで選ぶと、言い方ではなく話題（カフェ、ラーメン）が同じ文が出た。かたちごとに文の意味ベクトルを平均すると話題が打ち消し合い、言い方が残る。それも順位に加えた。",
        "Picking hint sentences by meaning alone brought up sentences on the same topic (cafés, ramen) rather than the same way of saying things. Averaging the sentence embeddings of each pattern cancels the topics out and leaves the phrasing, so that goes into the ranking too.",
        "'써 보기'의 힌트 문장을 의미의 가까움만으로 고르면, 말투가 아니라 화제(카페, 라멘)가 같은 문장이 나왔다. 형태별로 문장 의미 벡터를 평균하면 화제가 서로 상쇄되고 말투가 남는다. 그것도 순위에 더했다."
      ),
    ],
    tech: ["Next.js", "React", "Supabase", "OpenAI API", "Gemini TTS"],
    links: [
      { label: t("アプリを開く", "Open the app", "앱 열기"), href: "https://polylinga.vercel.app" },
      { label: t("GitHub", "GitHub", "GitHub"), href: "https://github.com/ryoda0314/polylinga" },
    ],
    media: {
      kind: "demo",
      demo: "ame",
      caption: t(
        "ことのあめ の「浴びる」を、アプリの例文と音声で再現した。",
        "Kotonoame's rain screen, recreated with the app's own sentences and audio.",
        "ことのあめ의 '맞기' 화면을 앱의 예문과 음성으로 재현했다."
      ),
    },
  },

  kotonone: {
    name: "ことのね",
    wordmark: true,
    tagline: t("覚えた韓国語を、<br>漢字の根でつなぐ。", "Linking the Korean you know by its hanja roots.", "외운 한국어를 한자의 뿌리로 잇는다."),
    stats: [
      ["21,200", t("語の辞書", "dictionary words", "단어 사전")],
      ["3,400", t("字", "characters", "글자")],
      [t("9割", "90%", "90%"), t("の語に日本語の意味", "of words have Japanese meanings", "의 단어에 일본어 뜻")],
    ],
    sub: t("言の根　旧 <span lang=\"ko\">한자 도감</span>（2026-06-01 〜）", "Kotonone, roots of words (formerly <span lang=\"ko\">한자 도감</span>, from 2026-06-01)", "言の根, 말의 뿌리(구 한자 도감, 2026-06-01 ~)"),
    icon: "kotonone.png",
    oneLine: t("韓国語の漢字語を、打ってあつめる", "Collecting Sino-Korean words by typing them", "한국어 한자어를 쳐서 모은다"),
    period: "2026-10-21 〜",
    status: "dev",
    platform: t("Web（PWA）", "Web (PWA)", "웹(PWA)"),
    lead: t(
      "覚えた韓国語の漢字語を、自分の指でハングルで打つ。すると語が漢字の根に分かれ（<span lang=\"ko\">학</span>｜學｜<span lang=\"ko\">배울 학</span>｜ガク・まなぶ）、前に集めた語とつながり、集めた字だけで読める語が見つかる。<span lang=\"ko\">학생</span>（學生）と <span lang=\"ko\">대학</span>（大學）を集めた人は、習っていない <span lang=\"ko\">대학생</span>（大學生）がもう読める。",
      "You type a Sino-Korean word you've learned, in hangul, with your own fingers. It splits into its hanja roots (<span lang=\"ko\">학</span> | 學 | <span lang=\"ko\">배울 학</span> | gaku, manabu), links to words you collected before, and shows words you can now read from the characters you have. Collect <span lang=\"ko\">학생</span> (學生) and <span lang=\"ko\">대학</span> (大學), and <span lang=\"ko\">대학생</span> (大學生), which you never studied, is already readable.",
      "외운 한국어 한자어를 직접 한글로 친다. 그러면 단어가 한자의 뿌리로 나뉘고(학｜學｜배울 학｜ガク・まなぶ), 전에 모은 단어와 이어지며, 모은 글자만으로 읽을 수 있는 단어가 나타난다. 학생(學生)과 대학(大學)을 모은 사람은 배우지 않은 대학생(大學生)을 이미 읽을 수 있다."
    ),
    origin: t(
      "韓国語の辞書の語は半分以上が漢字語で、その漢字は日本語とほぼ同じ。しかも韓国語では、漢字をほぼ一字一音で読む（學 はどの語でも <span lang=\"ko\">학</span>）。だから1字の音を知ると、その字が入った語すべての音が分かり、覚えることが足し算から掛け算になる。",
      "More than half the words in a Korean dictionary are Sino-Korean, and their characters are almost the same as in Japanese. Korean also reads each character with almost a single sound (學 is <span lang=\"ko\">학</span> in every word). So knowing one character's sound gives you the sound of every word it appears in, and learning turns from addition into multiplication.",
      "한국어 사전 단어의 절반 이상은 한자어이고, 그 한자는 일본어와 거의 같다. 게다가 한국어는 한자를 거의 한 글자 한 소리로 읽는다(學은 어느 단어에서나 학). 그래서 한 글자의 소리를 알면 그 글자가 든 모든 단어의 소리를 알게 되고, 외우는 것이 덧셈에서 곱셈이 된다."
    ),
    points: [
      t(
        "まだ集めていない語の漢字は ？？ で伏せておき、ハングルを自分の指で打ってあつめると、答え合わせとして漢字が開く。ボタン一つでは集めない。",
        "The hanja of words you haven't collected stay hidden as ？？. When you type the hangul yourself to collect a word, its characters open as the answer. Nothing is collected with a single tap.",
        "아직 모으지 않은 단어의 한자는 ？？로 가려 두고, 한글을 직접 쳐서 모으면 답 맞추기처럼 한자가 열린다. 버튼 하나로는 모으지 않는다."
      ),
      t(
        "1語あつめるたびに、読める語が何語増えたかを大きく見せる。だから星やレア度は付けない。画数の多さは字の値打ちではない。前の版の <span lang=\"ko\">한자 도감</span> は図鑑を埋める収集だったが、集めることを目的から結果に変えた。",
        "Each word you collect shows, in large type, how many more words you can now read. So there are no stars or rarity: more strokes don't make a character worth more. The earlier version, <span lang=\"ko\">한자 도감</span>, was about filling a field guide; here collecting is the result, not the goal.",
        "단어를 하나 모을 때마다 읽을 수 있는 단어가 몇 개 늘었는지 크게 보여 준다. 그래서 별이나 희귀도는 없다. 획수가 많다고 글자의 가치가 높은 건 아니다. 이전 버전인 한자 도감은 도감을 채우는 수집이었지만, 모으는 것을 목적이 아니라 결과로 바꿨다."
      ),
      t(
        "辞書は公開データ（kengdic、Unihan、<span lang=\"ko\">한국어기초사전</span>、JMdict）から約21,200語・約3,400字を作り、約9割の語に日本語の意味を付けた。アカウントなしで、端末の中だけで動く。",
        "The dictionary, about 21,200 words and 3,400 characters, is built from open data (kengdic, Unihan, the Basic Korean Dictionary, JMdict), with Japanese meanings for about 90% of the words. It runs entirely on the device, with no account.",
        "사전은 공개 데이터(kengdic, Unihan, 한국어기초사전, JMdict)로 약 21,200단어·약 3,400자를 만들었고, 약 90%의 단어에 일본어 뜻을 붙였다. 계정 없이 기기 안에서만 동작한다."
      ),
      t(
        "「文で出会う」では ことのあめ の例文が降ってきて、集めた語に文の中でまた出会う。ことのあめ が文の「かたち」を横に並べるなら、ことのね は語の「字」を縦に並べる。",
        "In Meet in sentences, Kotonoame's example sentences fall and you meet your collected words again inside them. Where Kotonoame lines up sentences by their pattern, Kotonone lines up words by their characters.",
        "'문장에서 만나기'에서는 ことのあめ의 예문이 내리고, 모은 단어를 문장 속에서 다시 만난다. ことのあめ가 문장의 '형태'를 옆으로 늘어놓는다면, ことのね는 단어의 '글자'를 세로로 늘어놓는다."
      ),
    ],
    tech: ["Vite", "React", "TypeScript", "Dexie (IndexedDB)", "PWA", "Vitest"],
    links: [
      { label: t("アプリを開く", "Open the app", "앱 열기"), href: "https://hanja-xi.vercel.app" },
      { label: t("GitHub", "GitHub", "GitHub"), href: "https://github.com/ryoda0314/hanja" },
    ],
    media: {
      kind: "demo",
      demo: "ne",
      caption: t(
        "ことのね の「あつめる」を、アプリの辞書のデータで再現した。この4字だけでできた語は辞書に5語あり、どの順にあつめてもアプリと同じだけ増える。",
        "Kotonone's Collect screen, recreated with the app's own dictionary data. The dictionary has five words made only of these four characters, so any order gives the same gains as the app.",
        "ことのね의 '모으기' 화면을 앱의 사전 데이터로 재현했다. 이 네 글자로만 된 단어는 사전에 5개뿐이라, 어떤 순서로 모아도 앱과 똑같이 늘어난다."
      ),
    },
  },

  kotonoeda: {
    name: "ことのえだ",
    wordmark: true,
    // 見出しと本文は、アプリの紹介画面の言葉（keigo の src/lib/i18n/ja.ts の intro）から。
    tagline: t("友だちに言えることを、<br>目上の人にも。", "What you can say to friends, to your elders too.", "친구에게 하는 말을, 윗사람에게도."),
    stats: [
      ["36", t("上の語", "raised words", "높임 어휘")],
      ["113", t("降ってくる文", "lines in the rain", "내리는 문장")],
      ["16", t("場面", "scenes", "장면")],
    ],
    sub: t("言の枝", "Kotonoeda, branches of words", "言の枝, 말의 가지"),
    icon: "kotonoeda.png",
    oneLine: t("目上の人に使う韓国語の語を、文と人と声で", "Korean honorific words, through sentences, people and voices", "윗사람에게 쓰는 한국어 어휘를 문장과 사람과 목소리로"),
    period: "2026-10-24 〜",
    status: "dev",
    platform: t("Web（PWA）", "Web (PWA)", "웹(PWA)"),
    lead: t(
      "友だちとの<span lang=\"ko\">반말</span>なら話せる。でも、先生や友だちのおばあさんの前だと、言葉が出てこない。足りないのは語尾ではなく、<span lang=\"ko\">말씀・잡수시다</span> のような語。同じひとことが相手を替えて段を上り、上の語にはいつも ふだんの語が添えてある。人と場面が渡されたら、自分ならどう返すかを言ってみる。",
      "You can talk with friends in casual Korean, but in front of a teacher or a friend's grandmother the words don't come. What's missing isn't the endings but words like <span lang=\"ko\">말씀</span> and <span lang=\"ko\">잡수시다</span>. The same message climbs as the listener changes, and every raised word has its everyday word beside it. Given a person and a situation, you try saying what you'd reply.",
      "친구와 반말로는 말할 수 있다. 그런데 선생님이나 친구 할머니 앞에서는 말이 안 나온다. 부족한 건 어미가 아니라 말씀·잡수시다 같은 어휘다. 같은 한마디가 상대를 바꾸며 단을 오르고, 높임 어휘에는 늘 평소의 말이 곁에 붙어 있다. 사람과 상황이 주어지면, 나라면 어떻게 대답할지 말해 본다."
    ),
    origin: t(
      "韓国語には、友だちとの<span lang=\"ko\">반말</span>から入った。チャットから電話、会って話すまで進んで、使う言葉になった。ただ、それは友だちとの言葉だった。教科書から入る人は<span lang=\"ko\">해요</span>体から始めて、<span lang=\"ko\">반말</span>はあとになる。逆の道を来た人が目上の人の前で足りないのは、語尾ではなく語。",
      "I came into Korean through casual speech with friends. It went from chat to calls to meeting in person, and it became a language I use. But it was a language for friends. People who start from a textbook begin with polite endings and learn casual speech later. For someone who came the other way, what's missing in front of elders isn't the endings but the words.",
      "한국어는 친구와의 반말로 시작했다. 채팅에서 전화, 직접 만나서 이야기하는 데까지 가서 쓰는 말이 되었다. 다만 그건 친구와의 말이었다. 교과서로 시작하는 사람은 해요체부터 배우고 반말은 나중이다. 반대 길로 온 사람이 윗사람 앞에서 부족한 건 어미가 아니라 어휘다."
    ),
    points: [
      t(
        "語尾は話す相手で、上の語は話の中の人で決まる。友だちとの<span lang=\"ko\">반말</span>でも、話に出てくる祖母は上げる（<span lang=\"ko\">할머니 주무셔</span>）。だから文ごとに、誰に話しているかと、誰のことかを添えている。",
        "The ending follows the listener; the raised word follows the person in the sentence. Even in casual speech with a friend, a grandmother you mention is raised (<span lang=\"ko\">할머니 주무셔</span>). So every line says who it's spoken to, and who it's about.",
        "어미는 듣는 상대로, 높임 어휘는 이야기 속 사람으로 정해진다. 친구와 반말을 해도 이야기에 나오는 할머니는 높인다(할머니 주무셔). 그래서 문장마다 누구에게 하는 말인지, 누구 이야기인지를 붙였다."
      ),
      t(
        "上の語は決まりのある語なので、自分で探し当てることにはこだわらず、段そのものを見せる。ただ講座や表にはせず、文と人と声で見せる。日本語の尊敬語と謙譲語の組（おっしゃる／申し上げる）は、韓国語にもある（<span lang=\"ko\">말씀하시다／말씀드리다</span>）。",
        "Raised words follow rules, so instead of having you discover them, the app shows the steps themselves, but through sentences, people and voices rather than lessons or tables. The pairs of Japanese honorific and humble verbs have Korean counterparts (<span lang=\"ko\">말씀하시다 / 말씀드리다</span>).",
        "높임 어휘는 규칙이 있는 말이라서, 스스로 찾아내는 데 고집하지 않고 단 자체를 보여 준다. 다만 강의나 표로 만들지 않고, 문장과 사람과 목소리로 보여 준다. 일본어 존경어와 겸양어의 짝(おっしゃる／申し上げる)은 한국어에도 있다(말씀하시다／말씀드리다)."
      ),
      t(
        "AI が直した文の印は、そのまま信じない。語ごとの判定で確かめてから出す（<span lang=\"ko\">반드시・진지하게</span> のような似た語には反応しない）。人ごとに Gemini の声があり、作った音声は書き起こして、台本どおりでなければ作り直す。",
        "The words the AI marks in a corrected sentence aren't taken on trust: each is checked by the app's own matcher, which ignores look-alikes such as <span lang=\"ko\">반드시</span> and <span lang=\"ko\">진지하게</span>. Each person has their own Gemini voice, and every clip is transcribed and remade if it doesn't say its line.",
        "AI가 고친 문장의 표시는 그대로 믿지 않는다. 어휘마다 판정해서 확인한 뒤에 내보낸다(반드시·진지하게 같은 비슷한 말에는 반응하지 않는다). 사람마다 Gemini 목소리가 있고, 만든 음성은 받아 적어서 대본대로가 아니면 다시 만든다."
      ),
    ],
    tech: ["Next.js", "React", "Supabase", "OpenAI API", "Gemini TTS"],
    links: [{ label: t("GitHub", "GitHub", "GitHub"), href: "https://github.com/ryoda0314/keigo" }],
    media: {
      kind: "demo",
      demo: "eda",
      caption: t(
        "ことのえだ の「上げてみる」を、アプリの文と声で再現した。相手を替えると同じひとことが段を上り、相手はそれぞれの声で返す。",
        "Kotonoeda's Raise it, recreated with the app's own lines and voices. Change the listener and the same message climbs; each person answers in their own voice.",
        "ことのえだ의 '높여 보기'를 앱의 문장과 목소리로 재현했다. 상대를 바꾸면 같은 한마디가 단을 오르고, 상대는 각자의 목소리로 답한다."
      ),
    },
  },

  kotonoha: {
    name: "ことのは",
    wordmark: true,
    tagline: t("借りた言葉が、<br>自分の言葉になるまで。", "Until borrowed words become your own.", "빌린 말이 내 말이 될 때까지."),
    stats: [
      ["32", t("表現", "expressions", "표현")],
      ["12", t("会話", "conversations", "대화")],
      ["4", t("人の友だち", "friends to talk to", "명의 친구")],
    ],
    sub: t("言の葉", "Kotonoha, leaves of words", "言の葉, 말의 잎"),
    icon: "kotonoha.png",
    oneLine: t("日本語を混ぜて言ってみる、英語のアプリ", "English you try out, with Japanese mixed in", "일본어를 섞어 말해 보는 영어 앱"),
    period: "2026-10-21 〜",
    status: "dev",
    platform: t("Web", "Web", "웹"),
    lead: t(
      "読めば分かる英語を、使える英語に。短い会話に出会い、気になった表現を借りて、自分のことを日本語も混ぜて言ってみる。意図を保ったまま英語に直してもらい、相手はその中身に返事をする。",
      "For English you can read but can't yet use. You meet short conversations, borrow an expression that catches your eye, and say something about yourself, mixing in Japanese where you need to. It's corrected into English with your intent kept, and your partner replies to what you actually said.",
      "읽으면 아는 영어를, 쓸 수 있는 영어로. 짧은 대화를 만나고, 마음에 걸린 표현을 빌려, 일본어를 섞어서라도 내 이야기를 해 본다. 의도를 지킨 채 영어로 고쳐 받고, 상대는 그 내용에 답한다."
    ),
    points: [
      t(
        "入口は「出会う」「話す」「場面で言う」の3つ。どこから入っても、表現を開く、それで言ってみる、直してもらう、という同じ操作につながる。",
        "There are three ways in: Meet, Talk and Say it in a scene. Whichever you choose leads to the same steps: open an expression, try it, get it corrected.",
        "입구는 '만나기' '말하기' '장면에서 말하기' 세 개. 어디로 들어가든 표현을 열고, 그걸로 말해 보고, 고쳐 받는 같은 흐름으로 이어진다."
      ),
      t(
        "相手は留学生という設定の4人の友だち。それぞれに予定や意見があり、声も違う。表現は32、会話は12、場面は12で、どの表現も2つ以上の会話か場面に出てくる。",
        "Your partners are four friends, international students with their own plans and opinions, each with a different voice. There are 32 expressions, 12 conversations and 12 scenes, and every expression turns up in at least two of them.",
        "상대는 유학생이라는 설정의 친구 네 명. 각자 일정과 의견이 있고 목소리도 다르다. 표현은 32개, 대화는 12개, 장면은 12개이며, 모든 표현이 두 개 이상의 대화나 장면에 나온다."
      ),
      t(
        "AI の答えは、そのまま見せない。日本語で補ったところが本当に学習者の文にあるか、英語の部分がその文の中にあるかを毎回確かめてから出す。",
        "The AI's answer is never shown as is. Each time, the app checks that the Japanese it says you used is really in your sentence, and that each English piece is really in the sentence it points to.",
        "AI의 답은 그대로 보여 주지 않는다. 일본어로 보충한 부분이 정말 학습자의 문장에 있는지, 영어 조각이 그 문장 안에 있는지를 매번 확인한 뒤에 내보낸다."
      ),
      t(
        "点数・連続記録・バッジは出さない。「出会った」「開いた」「AI が補った」「自分から使った」を分けて記録し、助けを借りたあとで自分から使えたことを「できたこと」として残す。",
        "No scores, streaks or badges. It records whether you met an expression, opened it, had the AI supply it, or used it on your own, and keeps the times you used one yourself after having had help as things you can now do.",
        "점수·연속 기록·배지는 없다. '만났다' '열었다' 'AI가 보충했다' '스스로 썼다'를 나눠 기록하고, 도움을 받은 뒤 스스로 쓸 수 있게 된 것을 '할 수 있게 된 것'으로 남긴다."
      ),
    ],
    tech: ["Next.js", "React", "Supabase", "OpenAI API", "Gemini TTS", "Remotion"],
    links: [{ label: t("GitHub", "GitHub", "GitHub"), href: "https://github.com/ryoda0314/kotonoha" }],
    media: {
      kind: "video",
      src: "assets/media/kotonoha.mp4",
      poster: "assets/media/kotonoha.jpg",
      ratio: "wide",
      width: 1280,
      height: 720,
      label: t("ことのは の紹介映像", "Kotonoha promo film", "ことのは 소개 영상"),
      caption: t(
        "紹介映像（77秒）。画面はアプリの CSS と文言から描き直している。",
        "Promo film (77 s). The screens are redrawn from the app's own CSS and copy.",
        "소개 영상(77초). 화면은 앱의 CSS와 문구로 다시 그렸다."
      ),
    },
  },

  kotonooto: {
    name: "ことのおと",
    wordmark: true,
    tagline: t("知っている違いと、<br>聞こえる違いは別のもの。", "Knowing a difference is not the same as hearing it.", "아는 차이와 들리는 차이는 다르다."),
    stats: [
      ["292", t("語の組", "word pairs", "단어 쌍")],
      ["98.4%", t("音声の合格率", "of clips passed the checks", "음성 합격률")],
      ["0.11", t("半音（Praat との誤差の中央値）", "semitones, median error against Praat", "반음(Praat과의 오차 중앙값)")],
    ],
    sub: t("言の音", "Kotonooto, sound of words", "言の音, 말의 소리"),
    icon: "kotonooto.png",
    oneLine: t("中国語の声調を、聞き分けて言えるように", "Hearing and saying Chinese tones", "중국어 성조를 구별해 듣고 말하기"),
    period: "2026-10-19 〜",
    status: "dev",
    platform: t("Web", "Web", "웹"),
    lead: t(
      "中国語の声調とピンインを、耳で聞き分けて、口で言えるようにする。1か所だけ違う語の組が4つの声で降ってきて、聞き比べる。どっちだったか選ぶとすぐに答えが分かり、言ってみると自分の声の高さが線になって手本に重なる。",
      "For hearing Chinese tones and pinyin apart, and saying them. Pairs of words that differ in one place fall in four voices for you to compare. Pick which one you heard and the answer shows at once; say a word and the pitch of your voice is drawn as a line over the model's.",
      "중국어 성조와 병음을 귀로 구별하고 입으로 말할 수 있게 한다. 한 군데만 다른 단어 쌍이 네 가지 목소리로 내리고, 비교해 듣는다. 어느 쪽이었는지 고르면 바로 답을 알 수 있고, 말해 보면 내 목소리의 높낮이가 선이 되어 본보기 위에 겹친다."
    ),
    origin: t(
      "韓国語の <span lang=\"ko\">딸기</span>（いちご）を1時間近く直してもらううちに、ある瞬間 <span lang=\"ko\">ㄷ</span> と <span lang=\"ko\">ㄸ</span> が違う音に聞こえるようになった。日本語で区別しない違いは、知っていても聞こえない。中国語の2声と3声、有気音と無気音、-n と -ng も同じ形をしている。",
      "A native speaker corrected my Korean <span lang=\"ko\">딸기</span> (strawberry) for almost an hour, and at one moment <span lang=\"ko\">ㄷ</span> and <span lang=\"ko\">ㄸ</span> started to sound like different sounds. Differences that Japanese doesn't make can't be heard even when you know about them. Chinese second and third tones, aspirated and unaspirated consonants, and -n and -ng work the same way.",
      "한국어 '딸기' 발음을 한 시간 가까이 고쳐 받다가, 어느 순간 ㄷ과 ㄸ이 다른 소리로 들리기 시작했다. 일본어에서 구별하지 않는 차이는 알고 있어도 들리지 않는다. 중국어의 2성과 3성, 유기음과 무기음, -n과 -ng도 같은 모양이다."
    ),
    points: [
      t(
        "語の音声は Gemini TTS の4つの声（女性2・男性2）で作り、機械で検査した。音の高さが狙った声調の線に近いか、音声認識で狙った語に聞こえるかを確かめて、1,648本のうち1,622本が通った。残りは人が聞いて決める。",
        "Each word's audio comes from four Gemini TTS voices (two female, two male) and is checked by machine: is the pitch close to the intended tone's line, and does speech recognition hear the intended word? 1,622 of 1,648 clips passed. A person listens to the rest and decides.",
        "단어 음성은 Gemini TTS의 네 가지 목소리(여성 2·남성 2)로 만들고 기계로 검사했다. 음 높이가 목표 성조의 선에 가까운지, 음성 인식으로 목표 단어로 들리는지 확인해, 1,648개 중 1,622개가 통과했다. 나머지는 사람이 듣고 정한다."
      ),
      t(
        "声の高さは、端末の中で10ミリ秒ごとに測る。推定は自作で、Praat と比べた誤差の中央値は0.11半音。手本の線と学習者の線を、同じコードで描いている。",
        "Pitch is measured on the device every 10 ms with an estimator I wrote; against Praat its median error is 0.11 semitones. The model's line and the learner's line are drawn by the same code.",
        "목소리 높낮이는 기기 안에서 10밀리초마다 잰다. 추정은 직접 만들었고, Praat과 비교한 오차의 중앙값은 0.11반음. 본보기 선과 학습자의 선을 같은 코드로 그린다."
      ),
      t(
        "正答率や点数は出さない。聞き分けられるようになるのはある日ふいに起こるので、「この日から分かれて聞こえている」という日付を残す。",
        "No accuracy rates or scores. Hearing a difference tends to arrive suddenly one day, so the app keeps the date from which you've been hearing it apart.",
        "정답률이나 점수는 보여 주지 않는다. 구별해 들을 수 있게 되는 것은 어느 날 갑자기 일어나기 때문에, '이날부터 나뉘어 들린다'는 날짜를 남긴다."
      ),
    ],
    tech: ["Next.js", "React", "Web Audio", "Gemini TTS", "OpenAI API"],
    links: [{ label: t("GitHub", "GitHub", "GitHub"), href: "https://github.com/ryoda0314/chinese" }],
    media: {
      kind: "demo",
      demo: "oto",
      caption: t(
        "2声と3声の組を、アプリと同じ4つの声で。線は、その音声から測った高さ。",
        "Second- and third-tone pairs in the app's four voices. The lines are the pitch measured from those clips.",
        "2성과 3성 쌍을 앱과 같은 네 가지 목소리로. 선은 그 음성에서 잰 높낮이다."
      ),
    },
  },
};

// ほかの作品。1枚の版は pick: true のものだけ出す（全部の名前は、ヒーローの点に触れると出る）。階層の版の「作品」のページは全部を
// cat（filters の id）で絞り込めるように出す。links は公開されているものだけ。
export const filters = [
  { id: "campus", label: t("大学生活", "Campus life", "대학 생활") },
  { id: "lang", label: t("語学", "Languages", "어학") },
  { id: "write", label: t("書く・考える", "Writing & thinking", "쓰기·생각") },
  { id: "tools", label: t("道具・教材", "Tools & teaching", "도구·교재") },
  { id: "research", label: t("3D・ゲーム・研究", "3D, games & research", "3D·게임·연구") },
];

const gh = (repo) => ({ label: t("GitHub", "GitHub", "GitHub"), href: `https://github.com/ryoda0314/${repo}` });

export const ledger = [
  {
    pick: true,
    cat: "campus",
    name: t("TextNext", "TextNext", "TextNext"),
    period: "2025-12 〜",
    status: "live",
    about: t(
      "東京科学大学の学生どうしで教科書を受け渡す、学内限定のフリマ。共同開発で、2026年5月から参加。",
      "A campus-only marketplace for passing textbooks between students at Institute of Science Tokyo. Co-developed; I joined in May 2026.",
      "도쿄과학대학 학생끼리 교과서를 주고받는 교내 전용 중고 장터. 공동 개발로, 2026년 5월부터 참여."
    ),
    links: [{ label: t("textnext.jp", "textnext.jp", "textnext.jp"), href: "https://textnext.jp" }],
  },
  {
    cat: "campus",
    name: t("TextNext 他大版", "TextNext for other universities", "TextNext 타 대학판"),
    period: "2026-10",
    status: "dev",
    about: t(
      "大学のメールのドメインで、大学ごとにマーケットを分けた作り直し。",
      "A rebuild that gives each university its own market, split by email domain.",
      "대학 메일 도메인으로 대학마다 장터를 나눈 재구축."
    ),
    links: [gh("textnext_all")],
  },
  {
    pick: true,
    cat: "campus",
    name: t("学祭モバイルオーダー", "Festival Mobile Order", "축제 모바일 오더"),
    period: "2026-10 〜",
    status: "dev",
    about: t(
      "学祭の模擬店で、客がスマホで注文して QR を出し、レジはそれを読んで現金で会計するだけにする。紹介映像、運用の PDF、提案スライドまで作った。",
      "For school-festival food stalls: customers order on their phones and show a QR code, and the register just scans it and takes cash. I also made a promo film, an operations PDF and pitch slides.",
      "학교 축제 노점에서 손님이 휴대폰으로 주문해 QR을 띄우고, 계산대는 그걸 읽어 현금으로 계산만 하게 한다. 소개 영상, 운영 PDF, 제안 슬라이드까지 만들었다."
    ),
    links: [{ label: t("開く", "Open", "열기"), href: "https://gakusai-order.pages.dev" }],
  },
  {
    pick: true,
    cat: "campus",
    name: t("学生バイトの壁シミュレーター", "Part-time Income Wall Simulator", "아르바이트 연 수입 벽 시뮬레이터"),
    period: "2026-08",
    status: "done",
    about: t(
      "年収の壁で手取りがどう変わるかを、2026年の制度で計算する。制度の値は一次資料と突き合わせた。",
      "Calculates how Japan's income thresholds change take-home pay under the 2026 rules, with every figure checked against primary sources.",
      "일본의 '연 수입의 벽'으로 실수령액이 어떻게 바뀌는지 2026년 제도로 계산한다. 제도 수치는 1차 자료와 대조했다."
    ),
  },
  // ここから4件（SwaLo・Poly-Lang・sampo・AI Daily）は、この PC（Windows）のフォルダから足したもの。
  // SwaLo の公開 URL はいま別のアプリが出るので、GitHub だけ。
  {
    cat: "campus",
    name: t("SwaLo", "SwaLo", "SwaLo"),
    period: "2025-12",
    status: "paused",
    about: t(
      "大学のメールで入る、東京科学大学の学生向けの SNS。チャットの4言語翻訳、AI ニュースの毎朝の要約、学内の建物の階ごとの居場所共有まで作った。ScienceTokyo App の3か月前。",
      "A social network for Science Tokyo students, joined with a university email. It got as far as chat translation into four languages, a morning AI news digest, and sharing which floor of which campus building you're on. Three months before ScienceTokyo App.",
      "대학 메일로 가입하는 도쿄과학대학 학생용 SNS. 채팅의 4개 언어 번역, 매일 아침 AI 뉴스 요약, 교내 건물의 층별 위치 공유까지 만들었다. ScienceTokyo App보다 3개월 앞서."
    ),
    links: [gh("campus-app")],
  },
  {
    cat: "lang",
    name: t("Poly-Lang", "Poly-Lang", "Poly-Lang"),
    period: "2025-07 〜 12",
    status: "paused",
    about: t(
      "最初の語学アプリ。韓国語を始めた月に、企画書と要件定義を1日で書いて作り始めた。17言語の基本フレーズを音声つきで眺め、自分で作った文を AI に直してもらう。12月に PolyLinga として作り直した。",
      "My first language app, started the month I began Korean, with its plan and requirements written in a single day. You look over basic phrases in 17 languages with audio, and an AI corrects sentences you make yourself. In December I rebuilt it as PolyLinga.",
      "첫 어학 앱. 한국어를 시작한 달에 기획서와 요구 사항 정의를 하루 만에 쓰고 만들기 시작했다. 17개 언어의 기본 문장을 음성과 함께 훑어보고, 직접 만든 문장을 AI에게 고쳐 받는다. 12월에 PolyLinga로 다시 만들었다."
    ),
    links: [gh("poly-lang-app")],
  },
  {
    cat: "lang",
    name: t("Wordtock", "Wordtock", "Wordtock"),
    period: "2026-05 〜 08",
    status: "paused",
    about: t(
      "英語は書いて使えるように、韓国語は単語帳型にと、言語ごとに学び方を分けた語彙アプリ。",
      "A vocabulary app with a different method per language: English for writing and using, Korean as a word book.",
      "영어는 써서 쓸 수 있게, 한국어는 단어장형으로, 언어마다 배우는 방식을 나눈 어휘 앱."
    ),
    links: [gh("word")],
  },
  {
    cat: "lang",
    name: t("langpack", "langpack", "langpack"),
    period: "2026-01",
    status: "done",
    about: t(
      "PolyLinga のために作った、9言語・498件の基本フレーズ。",
      "498 basic phrases in nine languages, made for PolyLinga.",
      "PolyLinga를 위해 만든 9개 언어·498개의 기본 문장."
    ),
  },
  {
    cat: "lang",
    name: t("jp-key", "jp-key", "jp-key"),
    period: "2026-03",
    status: "proto",
    about: t(
      "左手で子音、右手で母音を打つ、自作の日本語入力配列。",
      "A Japanese keyboard layout of my own: consonants on the left hand, vowels on the right.",
      "왼손으로 자음, 오른손으로 모음을 치는 직접 만든 일본어 입력 배열."
    ),
  },
  {
    cat: "write",
    name: t("聖書を読んで考えたこと", "Thoughts from Reading the Bible", "성경을 읽고 생각한 것"),
    period: "2026-03",
    status: "done",
    about: t(
      "聖書を原文で読み、事実・考察・問いを14章にまとめた、日本語と韓国語のサイト。",
      "A site in Japanese and Korean: reading the Bible in its original languages, in 14 chapters of facts, reflections and questions.",
      "성경을 원문으로 읽고 사실·고찰·질문을 14장으로 정리한 일본어·한국어 사이트."
    ),
    links: [{ label: t("開く", "Open", "열기"), href: "https://ryoda0314.github.io/bible/" }, gh("bible")],
  },
  {
    cat: "write",
    name: t("小説執筆", "Novels", "소설 집필"),
    period: "2026-02 〜 05",
    status: "done",
    about: t(
      "企画とルールを決め、本文は Claude のエージェントが書いた異世界小説。6作・全271話。",
      "Isekai novels whose plans and rules I set, with the text written by Claude agents. Six works, 271 chapters.",
      "기획과 규칙을 정하고, 본문은 Claude 에이전트가 쓴 이세계 소설. 6작품, 전 271화."
    ),
  },
  {
    cat: "write",
    name: t("トロッコ", "Trolley", "트롤리"),
    period: "2026-03",
    status: "proto",
    about: t(
      "「人は先に選び、あとから意味を読む」を体験させるサイト。",
      "A site that lets you experience choosing first and reading meaning into the choice afterwards.",
      "'사람은 먼저 고르고, 나중에 의미를 읽는다'를 체험하게 하는 사이트."
    ),
  },
  {
    pick: true,
    cat: "tools",
    name: t("ずんだもん解説メーカー", "Zundamon Explainer Maker", "즌다몬 해설 메이커"),
    period: "2026-07 〜 10",
    status: "done",
    about: t(
      "台本1枚から、音声・字幕・図・板書のある解説動画を自動で作る。46本を書き出した。",
      "Turns one script into an explainer video with voices, subtitles, diagrams and board writing. 46 videos rendered so far.",
      "대본 한 장으로 음성·자막·도표·판서가 있는 해설 영상을 자동으로 만든다. 46편을 뽑았다."
    ),
  },
  {
    cat: "tools",
    name: t("場合の数・確率を極めたい", "Mastering Counting & Probability", "경우의 수·확률 정복"),
    period: "2025-09 〜",
    status: "dev",
    // 教材の PDF は 2024-06-24 の初版36ページ（東工大/場合の数確率の参考書(りょだ作).pdf）から、2025-09-10 の版で50ページ。
    about: t(
      "受験のときにまとめたものを、後輩向けの LaTeX 教材と解説動画にしている。教材は2024年6月の初版36ページから、50ページまで書き足した。",
      "Turning my exam-prep notes into LaTeX materials and explainer videos for younger students. The material has grown from a 36-page first edition in June 2024 to 50 pages.",
      "수험 때 정리한 것을 후배용 LaTeX 교재와 해설 영상으로 만들고 있다. 교재는 2024년 6월의 초판 36쪽에서 50쪽까지 늘렸다."
    ),
  },
  {
    cat: "tools",
    name: t("mp4cut", "mp4cut", "mp4cut"),
    period: "2026-08",
    status: "done",
    about: t(
      "mp4 の切り取りと確認だけができる動画編集ソフト。",
      "A video editor that can only cut and preview mp4 files.",
      "mp4 자르기와 확인만 할 수 있는 동영상 편집 프로그램."
    ),
  },
  {
    cat: "tools",
    name: t("ちょうど5", "Chōdo 5", "ちょうど5"),
    period: "2026-08",
    status: "done",
    about: t(
      "完全に解析した CPU と遊べる、指遊び。",
      "A finger game played against a fully solved CPU.",
      "완전히 분석한 CPU와 겨루는 손가락 놀이."
    ),
  },
  {
    cat: "tools",
    name: t("自作 Claude Code スキル", "Claude Code skills", "Claude Code 스킬"),
    period: "2026-07 〜 09",
    status: "live",
    about: t(
      "失敗から学んだことを書き込んだ3つのスキル（LP 制作、解説動画、音声合成）。",
      "Three skills holding what I learned from failures: landing pages, explainer videos and speech synthesis.",
      "실패에서 배운 것을 적어 넣은 3개의 스킬(LP 제작, 해설 영상, 음성 합성)."
    ),
  },
  {
    pick: true,
    cat: "tools",
    name: t("LP 制作", "Landing pages", "랜딩 페이지"),
    period: "2026-07",
    status: "done",
    about: t(
      "架空の企業などのランディングページ14件。",
      "Fourteen landing pages, mostly for fictional companies.",
      "가상 기업 등의 랜딩 페이지 14건."
    ),
  },
  {
    cat: "tools",
    name: t("sampo", "sampo", "sampo"),
    period: "2025-11 〜 12",
    status: "paused",
    about: t(
      "散歩の SNS。歩いた道を GPS で記録し、地図を約250m四方のマスに分けて、歩いて通ったマスを数える。企画書を書いてから約1週間で公開した。",
      "A social network for walks. It records your route by GPS, divides the map into squares about 250 m across, and counts the squares you've walked through. Published about a week after I wrote its plan.",
      "산책 SNS. 걸은 길을 GPS로 기록하고, 지도를 약 250m 사방의 칸으로 나눠 걸어서 지나간 칸을 센다. 기획서를 쓰고 약 1주일 만에 공개했다."
    ),
    links: [{ label: t("開く", "Open", "열기"), href: "https://sampoapp.vercel.app" }, gh("sampo")],
  },
  {
    cat: "tools",
    name: t("AI Daily", "AI Daily", "AI Daily"),
    period: "2025-12",
    status: "done",
    about: t(
      "生成 AI のニュースをまとめる。AI 企業のブログとニュースサイトの RSS 9本を集め、重要度の点数で並べて、AI が要約する。一晩で作って公開した。",
      "Generative AI news in one place: it gathers nine RSS feeds from AI companies' blogs and news sites, ranks the posts by an importance score, and has an AI summarize them. Built and published in one night.",
      "생성 AI 뉴스를 모은다. AI 기업 블로그와 뉴스 사이트의 RSS 9개를 모아 중요도 점수로 늘어놓고, AI가 요약한다. 하룻밤에 만들어 공개했다."
    ),
    links: [{ label: t("開く", "Open", "열기"), href: "https://news-chi-roan.vercel.app" }, gh("news")],
  },
  {
    pick: true,
    cat: "research",
    name: t("METAL", "METAL", "METAL"),
    period: "2025-08 〜",
    status: "dev",
    about: t(
      "Meta Quest 3 の MR の中で金属板を研磨し、その動きを記録・再生して、実物大のロボットへつなぐ研磨作業のデジタルツイン。研究と業務で開発している。",
      "A digital twin of metal polishing: polish a metal plate in mixed reality on Meta Quest 3, record and replay the motion, and pass it to a full-size robot arm. Developed for research and for work.",
      "Meta Quest 3의 MR 안에서 금속판을 연마하고, 그 움직임을 기록·재생해 실물 크기 로봇으로 잇는 연마 작업 디지털 트윈. 연구와 업무로 개발하고 있다."
    ),
    links: [gh("metal")],
  },
  {
    cat: "research",
    name: t("Overcooked-RS", "Overcooked-RS", "Overcooked-RS"),
    period: "2026-04 〜 05",
    status: "paused",
    about: t(
      "研究室の、マルチエージェント強化学習のための環境。Rust で書いた。",
      "An environment for multi-agent reinforcement learning in my lab, written in Rust.",
      "연구실의 멀티 에이전트 강화 학습용 환경. Rust로 작성했다."
    ),
  },
  {
    pick: true,
    cat: "research",
    name: t("Head-Tracked 3D Box Illusion", "Head-Tracked 3D Box Illusion", "Head-Tracked 3D Box Illusion"),
    period: "2025-12 〜",
    status: "dev",
    about: t(
      "頭の位置に合わせて、画面が箱の中をのぞく窓に見える立体錯視。",
      "A 3D illusion that follows your head so the screen looks like a window into a box.",
      "머리 위치에 맞춰 화면이 상자 속을 들여다보는 창처럼 보이는 입체 착시."
    ),
    links: [{ label: t("開く", "Open", "열기"), href: "https://3d-display.vercel.app" }, gh("3D-display")],
  },
  {
    cat: "research",
    name: t("Minecraft 忠実再現版", "Minecraft Recreation", "Minecraft 재현판"),
    period: "2026-07",
    status: "done",
    about: t("ブラウザで動く Minecraft の再現。", "Minecraft rebuilt to run in the browser.", "브라우저에서 돌아가는 Minecraft 재현."),
  },
  {
    cat: "research",
    name: t("RY3D", "RY3D", "RY3D"),
    period: "2026-01",
    status: "proto",
    about: t(
      "iPhone の LiDAR から、PC でリアルタイムに3D 再構成する。",
      "Real-time 3D reconstruction on a PC from an iPhone's LiDAR.",
      "iPhone LiDAR로 PC에서 실시간 3D 재구성."
    ),
  },
  {
    cat: "research",
    name: t("rikoda", "rikoda", "rikoda"),
    period: "2026-05",
    status: "proto",
    about: t(
      "卒業研究の候補「口笛錯覚」の実験環境。",
      "An experiment setup for a thesis candidate: the whistling illusion.",
      "졸업 연구 후보 '휘파람 착각'의 실험 환경."
    ),
  },
];

export const sections = {
  work: { title: ui.nav.work },
  more: {
    title: ui.nav.more,
    lead: t(
      "主な作品のほかに作ったものから。期間と状態は2026年10月時点。",
      "A selection of other things I've made. Periods and status as of October 2026.",
      "주요 작품 외에 만든 것 중에서. 기간과 상태는 2026년 10월 기준."
    ),
  },
  approach: { title: ui.nav.approach },
  about: { title: ui.nav.about },
  contact: {
    title: ui.nav.contact,
    lead: t("メールか X で。", "Email or X.", "메일이나 X로."),
    headline: t("連絡は、<br>メールか X で。", "Get in touch<br>by email or on X.", "연락은<br>메일이나 X로."),
  },
};

// ヒーローの「作ってきたもの」：点ひとつが作品ひとつ（src/timeline.json。vault の作品ノート81件と、その後の ことのは・ことのおと・ことのえだ、
// この PC のフォルダから足した15件）。範囲は src/kit.mjs の CHART_FROM・CHART_TO。
export const chart = {
  label: t("2025年7月から作ってきたもの", "Things I've made since July 2025", "2025년 7월부터 만든 것"),
  note: t(
    "点ひとつが、作品ひとつ。始めた月に積もる。アイコンは主な作品。触れると名前が出る。",
    "One dot, one project, stacked in the month it began. Icons mark the main work. Point at a dot to see its name.",
    "점 하나가 작품 하나. 시작한 달에 쌓인다. 아이콘은 주요 작품. 점에 손을 대면 이름이 나온다."
  ),
  legend: {
    live: t("運用中", "Live", "운영 중"),
    making: t("開発中・完成", "In development or done", "개발 중·완성"),
    resting: t("休止・試作", "Paused or prototype", "보류·프로토타입"),
  },
  hidden: t("（名前は載せていない作品）", "(name left out)", "(이름은 싣지 않은 작품)"),
  summary: t("月ごとの数", "Projects per month", "월별 작품 수"),
};

// more: true のものは、階層の版の「経歴」のページにだけ出す。
export const approach = [
  {
    more: true,
    title: t("不便から作る", "Start from an annoyance", "불편에서 시작한다"),
    body: t(
      "大学生活で面倒だと思ったことから作る。ScienceTokyo App の機能の多くは、履修登録や課題の締切のように、自分が学生として困ったことから足してきた。作るなら、既存のアプリで足りるものより、自分で作るからこそできるものを作りたい。",
      "I build from what bothers me in university life. Most of ScienceTokyo App's features, like help with course registration and assignment deadlines, came from problems I had as a student. If I'm going to build something, I want it to be something only building it myself makes possible, not something an existing app already covers.",
      "대학 생활에서 귀찮다고 느낀 것에서 만든다. ScienceTokyo App 기능의 대부분은 수강 신청이나 과제 마감처럼 내가 학생으로서 곤란했던 것에서 더해 왔다. 만든다면 기존 앱으로 충분한 것보다, 직접 만들기 때문에 할 수 있는 것을 만들고 싶다."
    ),
  },
  {
    title: t("流れに入らない機能は作らない", "If it doesn't fit the flow, it doesn't get built", "흐름에 들어가지 않는 기능은 만들지 않는다"),
    body: t(
      "PolyLinga は機能を広げすぎて、操作が難しくなった。ことのあめでは「浴びる → 気づく → 言ってみる → また出会う」の流れに入らない機能は作らないと決め、やらないことを先に書いた。",
      "PolyLinga grew so many features that it became hard to use. For Kotonoame I decided that nothing outside the flow of soaking in, noticing, saying it and meeting again gets built, and I wrote down what it won't do first.",
      "PolyLinga는 기능을 너무 넓혀 조작이 어려워졌다. ことのあめ에서는 '맞는다 → 알아차린다 → 말해 본다 → 다시 만난다'의 흐름에 들어가지 않는 기능은 만들지 않기로 하고, 하지 않을 것을 먼저 적었다."
    ),
  },
  {
    title: t("確かめてから書く", "Check before writing it down", "확인하고 나서 쓴다"),
    body: t(
      "一次資料と実機で確かめ、事実と推測を分けて書く。ScienceTokyo App の教科書データベースでは、推測した ISBN を「検索で何か返った」だけで正しいとした結果、30件以上が別の本になっていた。それからは、タイトルと著者が一致するのを確かめてから紐付けている。",
      "I check against primary sources and real devices, and keep facts apart from guesses. In ScienceTokyo App's textbook database I once accepted guessed ISBNs just because a search returned something, and more than 30 pointed to the wrong book. Since then a book is linked only after its title and author match.",
      "1차 자료와 실제 기기로 확인하고, 사실과 추측을 나눠 쓴다. ScienceTokyo App의 교과서 데이터베이스에서 추측한 ISBN을 '검색 결과가 나왔다'는 것만으로 맞다고 했더니 30건 넘게 다른 책이었다. 그 뒤로는 제목과 저자가 일치하는지 확인하고 나서 연결한다."
    ),
  },
  {
    title: t("AI と組む。決めるのは自分", "Work with AI, decide myself", "AI와 함께 만들고, 정하는 건 나"),
    body: t(
      "実装の多くは Claude Code や Codex に任せている。何を作るか、何を削るか、どう見えるべきかは自分で決めて、納得するまで作り直させる。AI に書かせた文章は、そのまま出さない。",
      "I leave much of the implementation to Claude Code and Codex. What to build, what to cut and how it should look are my calls, and I have things redone until they're right. I don't publish text an AI wrote as is.",
      "구현의 많은 부분은 Claude Code나 Codex에 맡긴다. 무엇을 만들지, 무엇을 뺄지, 어떻게 보여야 할지는 내가 정하고, 납득할 때까지 다시 만들게 한다. AI가 쓴 글은 그대로 내보내지 않는다."
    ),
  },
  {
    more: true,
    title: t("画面は本当に動かす", "Show screens that really move", "화면은 진짜로 움직인다"),
    body: t(
      "紹介映像では、スクリーンショットを並べるより、実際に動く画面を見せたい。このサイトのデモも、アプリの本物の例文と音声で動かしている。",
      "In promo videos I'd rather show screens actually moving than a row of screenshots. The demos on this site also run on the apps' real sentences and audio.",
      "소개 영상에서는 스크린숏을 늘어놓기보다 실제로 움직이는 화면을 보여 주고 싶다. 이 사이트의 데모도 앱의 진짜 예문과 음성으로 움직인다."
    ),
  },
];

export const about = {
  facts: [
    [t("所属", "School", "소속"), t(
      "東京科学大学（旧 東京工業大学）工学院、機械工学（学部）",
      "Institute of Science Tokyo (formerly Tokyo Institute of Technology), School of Engineering, mechanical engineering (undergraduate)",
      "도쿄과학대학(구 도쿄공업대학) 공학원, 기계공학(학부)"
    )],
    [t("研究", "Research", "연구"), t(
      "ロボットアーム（川崎重工 RS007N）の遠隔操作",
      "Teleoperation of a robot arm (Kawasaki RS007N)",
      "로봇 팔(가와사키 RS007N)의 원격 조작"
    )],
    [t("言語", "Languages", "언어"), t(
      "日本語（母語）、英語、韓国語、中国語（初級）",
      "Japanese (native), English, Korean, Chinese (beginner)",
      "일본어(모어), 영어, 한국어, 중국어(초급)"
    )],
  ],
  timelineTitle: t("これまで", "So far", "지금까지"),
  timeline: [
    [
      "2025-07",
      t(
        "韓国語をほぼゼロから始める。同じ月に、最初の語学アプリ Poly-Lang の企画書と要件定義を1日で書き、作り始める",
        "Start Korean from almost zero. The same month, write the plan and requirements for my first language app, Poly-Lang, in a single day, and start building it",
        "한국어를 거의 처음부터 시작. 같은 달에 첫 어학 앱 Poly-Lang의 기획서와 요구 사항 정의를 하루 만에 쓰고 만들기 시작"
      ),
    ],
    ["2025-08", t("Unity を始める。のちの METAL になる", "Start Unity; it later becomes METAL", "Unity 시작. 나중에 METAL이 된다")],
    // 講座は 10/25・11/08・11/15（Claude Code）・11/29。11/16 から new-app-1 ほかを作っている（このPCのフォルダの作成日）。
    [
      "2025-11",
      t(
        "東京科学大学の Programming Boot Camp（全4回）を受講する。Claude Code を使う回の翌日から、小さなアプリを次々に作りはじめる",
        "Take Science Tokyo's Programming Boot Camp (four sessions). From the day after the Claude Code session, start building small apps one after another",
        "도쿄과학대학의 Programming Boot Camp(전 4회)를 수강. Claude Code를 쓰는 회차 다음 날부터 작은 앱을 잇달아 만들기 시작"
      ),
    ],
    ["2025-12", t("東京科学大学の学生向けの SNS「SwaLo」を作る", "Build SwaLo, a social network for Science Tokyo students", "도쿄과학대학 학생용 SNS 'SwaLo'를 만든다"), "more"],
    ["2025-12", t("Poly-Lang を作り直しはじめる。翌月、名前を PolyLinga にする", "Start rebuilding Poly-Lang; the next month it's renamed PolyLinga", "Poly-Lang을 다시 만들기 시작. 다음 달 이름을 PolyLinga로 바꾼다"), "more"],
    ["2026-03", t("ScienceTokyo App を作り始める。この月だけで401コミット", "Start ScienceTokyo App, with 401 commits in that month alone", "ScienceTokyo App을 만들기 시작. 이달에만 401커밋")],
    ["2026-04", t("ScienceTokyo App を App Store に申請する。電気通信事業を届け出る（5月に受理）", "Submit ScienceTokyo App to the App Store; register as a telecommunications business (accepted in May)", "ScienceTokyo App을 App Store에 신청. 전기통신사업 신고(5월에 수리)")],
    ["2026-06", t("韓国語の漢字語を集める <span lang=\"ko\">한자 도감</span> を作る", "Build <span lang=\"ko\">한자 도감</span>, for collecting Sino-Korean words", "한국어 한자어를 모으는 한자 도감을 만든다"), "more"],
    ["2026-07", t("ずんだもん解説メーカーを作る", "Build the Zundamon Explainer Maker", "즌다몬 해설 메이커를 만든다"), "more"],
    ["2026-08", t("研磨作業のデジタルツイン（METAL）を、業務としても開発しはじめる", "Start developing the polishing digital twin (METAL) as paid work too", "연마 작업 디지털 트윈(METAL)을 업무로도 개발하기 시작")],
    ["2026-09", t("韓国へ行く", "Travel to Korea", "한국에 간다"), "more"],
    ["2026-10", t("PolyLinga を ことのあめ として、<span lang=\"ko\">한자 도감</span> を ことのね として作り直し、ことのおと・ことのは・ことのえだ を作る", "Rebuild PolyLinga as Kotonoame and <span lang=\"ko\">한자 도감</span> as Kotonone, and build Kotonooto, Kotonoha and Kotonoeda", "PolyLinga를 ことのあめ로, 한자 도감을 ことのね로 다시 만들고, ことのおと·ことのは·ことのえだ를 만든다")],
  ],
  // 道具の一覧は、階層の版の「経歴」のページにだけ出す（1枚の版では、使った技術は各作品の「詳しく見る」にある）。
  toolsTitle: t("よく使う道具", "Tools I use", "자주 쓰는 도구"),
  toolsNote: t(
    "数字は、その技術を使った作品の数（vault の作品ノートで数えた。2026年10月中旬時点）。",
    "Numbers show how many of my projects use it (counted from my project notes, mid-October 2026).",
    "숫자는 그 기술을 쓴 작품 수(작품 노트로 셈. 2026년 10월 중순 기준)."
  ),
  tools: [
    [t("Web", "Web", "웹"), [["Next.js", 36], ["TypeScript", "20+"], ["React", 19], ["Supabase", 18], [t("素の HTML・JavaScript", "Plain HTML & JavaScript", "순수 HTML·JavaScript"), 17], ["Tailwind CSS", 12], ["Vite", 8]]],
    [t("アプリにする", "Native & desktop", "앱으로 만들기"), [["PWA"], ["Capacitor"], ["Swift・WidgetKit"], ["Expo"], ["Electron"], ["Tauri"]]],
    [t("3D・XR・地図", "3D, XR & maps", "3D·XR·지도"), [["Unity 6（Meta Quest 3）"], ["three.js"], ["MapLibre GL"], ["Leaflet"], ["MediaPipe"]]],
    [t("映像・音声", "Video & audio", "영상·음성"), [["Remotion"], ["VOICEVOX"], ["Gemini TTS"], ["Azure Speech"], ["ffmpeg"]]],
    [t("AI", "AI", "AI"), [["OpenAI API"], ["Claude Code"], ["Codex"]]],
    [t("そのほか", "Other", "그 밖"), [["Rust（Bevy, burn）"], ["Python"], ["C++（ROS 2）"], ["MATLAB"], ["Arduino"], ["LaTeX"]]],
  ],
};

// デモ。文と音声は ことのあめ のライブラリのもの（働き「誘う」）。訳は表示言語で出す。
export const demos = {
  ame: {
    rains: {
      ko: {
        label: t("韓国語", "Korean", "한국어"),
        pattern: "-(으)ㄹ래?",
        sentences: [
          { text: "내일 카페 갈래?", mark: "갈래", audio: "ko-0" },
          { text: "오늘 밤 라멘 먹을래?", mark: "먹을래", audio: "ko-1" },
          { text: "오늘 노래방 갈래?", mark: "갈래", audio: "ko-2" },
          { text: "불꽃놀이 보러 갈래?", mark: "갈래", audio: "ko-3" },
        ],
      },
      en: {
        label: t("英語", "English", "영어"),
        pattern: "Wanna …?",
        sentences: [
          { text: "Wanna go to a café tomorrow?", mark: "Wanna", audio: "en-0" },
          { text: "Wanna grab ramen tonight?", mark: "Wanna", audio: "en-1" },
          { text: "Wanna go to karaoke today?", mark: "Wanna", audio: "en-2" },
          { text: "Wanna go see the fireworks?", mark: "Wanna", audio: "en-3" },
        ],
      },
      zh: {
        label: t("中国語", "Chinese", "중국어"),
        pattern: "要不要…？",
        sentences: [
          { text: "明天要不要去咖啡厅？", pinyin: "míng tiān yào bu yào qù kā fēi tīng", mark: "要不要", audio: "zh-0" },
          { text: "今晚要不要吃拉面？", pinyin: "jīn wǎn yào bu yào chī lā miàn", mark: "要不要", audio: "zh-1" },
          { text: "今天要不要去唱歌？", pinyin: "jīn tiān yào bu yào qù chàng gē", mark: "要不要", audio: "zh-2" },
          { text: "要不要去看烟花？", pinyin: "yào bu yào qù kàn yān huā", mark: "要不要", audio: "zh-3" },
        ],
      },
    },
    // 訳。4つの雨で同じ順番。mark はその訳の中で対応するところ（雨の言語ごと）。
    glosses: {
      ja: [
        { text: "明日カフェ行かない？", mark: { ko: "行かない？", en: "ない？", zh: "ない？" } },
        { text: "今夜ラーメン食べない？", mark: { ko: "食べない？", en: "ない？", zh: "ない？" } },
        { text: "今日カラオケ行かない？", mark: { ko: "行かない？", en: "ない？", zh: "ない？" } },
        { text: "花火見に行かない？", mark: { ko: "行かない？", en: "ない？", zh: "ない？" } },
      ],
      en: [
        { text: "Wanna go to a café tomorrow?", mark: { ko: "Wanna go", zh: "Wanna" } },
        { text: "Wanna grab ramen tonight?", mark: { ko: "Wanna grab", zh: "Wanna" } },
        { text: "Wanna go to karaoke today?", mark: { ko: "Wanna go", zh: "Wanna" } },
        { text: "Wanna go see the fireworks?", mark: { ko: "Wanna go", zh: "Wanna" } },
      ],
      ko: [
        { text: "내일 카페 갈래?", mark: { en: "갈래", zh: "갈래" } },
        { text: "오늘 밤 라멘 먹을래?", mark: { en: "먹을래", zh: "먹을래" } },
        { text: "오늘 노래방 갈래?", mark: { en: "갈래", zh: "갈래" } },
        { text: "불꽃놀이 보러 갈래?", mark: { en: "갈래", zh: "갈래" } },
      ],
    },
    // 最初に開く雨。表示言語と同じ言語は避ける。
    first: { ja: "ko", en: "ko", ko: "en" },
    strings: {
      tab: t("浴びる", "Rain", "맞기"),
      sources: t("雨の言葉", "Language of the rain", "비의 언어"),
      introTitle: t("雨が来ています", "Rain is coming", "비가 오고 있어요"),
      introMeta: t("4つの文が、音声付きで降ってきます", "Four sentences will fall, with audio", "문장 4개가 음성과 함께 내려요"),
      start: t("浴びる", "Soak in", "비 맞기"),
      soundNote: t("音が出ます", "Sound on", "소리가 나요"),
      fresh: t("はじめてのかたち", "A new pattern", "처음 보는 형태"),
      reveal: t("共通しているところは？", "What do they share?", "공통된 부분은?"),
      revealed: t("共通していたところ", "What they shared", "공통된 부분"),
      function: t("誘う", "Inviting", "권유하기"),
      answerNote: t(
        "文の中と訳の中で、同じ色のところが対応しています。",
        "The same colour marks the matching part in each sentence and its translation.",
        "문장과 번역에서 같은 색인 부분이 서로 대응해요."
      ),
      again: t("もう一度降らせる", "Let it rain again", "다시 내리게 하기"),
      playSentence: t("この文を再生", "Play this sentence", "이 문장 재생"),
    },
  },
  oto: {
    // 2声と3声。アプリと同じく、組ごとに声を変える（Kore, Erinome, Charon, Iapetus）。
    pairs: [
      ["da4xue2-858b", "da4xue3-7c72"],
      ["yu2-9246", "yu3-8995"],
      ["mai2-2c49", "mai3-b6c5"],
      ["tang2-3d8c", "tang3-a854"],
    ],
    voices: [
      { id: "kore", name: "Kore", sex: "f" },
      { id: "erinome", name: "Erinome", sex: "f" },
      { id: "charon", name: "Charon", sex: "m" },
      { id: "iapetus", name: "Iapetus", sex: "m" },
    ],
    glosses: {
      "da4xue2-858b": t("大学", "university", "대학"),
      "da4xue3-7c72": t("大雪", "heavy snow", "폭설"),
      "yu2-9246": t("魚", "fish", "물고기"),
      "yu3-8995": t("雨", "rain", "비"),
      "mai2-2c49": t("埋める", "bury", "묻다"),
      "mai3-b6c5": t("買う", "buy", "사다"),
      "tang2-3d8c": t("砂糖", "sugar", "설탕"),
      "tang3-a854": t("横になる", "lie down", "눕다"),
    },
    strings: {
      steps: [t("聞き比べる", "Compare", "비교해 듣기"), t("聞き分ける", "Tell apart", "구별하기"), t("文の中で", "In sentences", "문장 속에서"), t("言ってみる", "Say it", "말해 보기")],
      lead: t(
        "1か所だけ違う語の組が、いくつもの声で降ってきます。どこが違うか、聞き比べてみて。",
        "Pairs of words that differ in one place fall in several voices. Listen and compare where they differ.",
        "한 군데만 다른 단어 쌍이 여러 목소리로 내려요. 어디가 다른지 비교해 들어 보세요."
      ),
      start: t("聞き比べる", "Compare", "비교해 듣기"),
      again: t("もう一度流す", "Play again", "다시 재생"),
      soundNote: t("音が出ます。語を押すと、別の声でもう一度。", "Sound on. Tap a word to hear it again in another voice.", "소리가 나요. 단어를 누르면 다른 목소리로 다시 들려요."),
      lineTitle: t("高さの線", "Pitch line", "높낮이 선"),
      model: t("手本", "Model", "본보기"),
      partner: t("組の相手", "Its pair", "짝"),
      voice: t("声", "Voice", "목소리"),
      female: t("女性", "female", "여성"),
      male: t("男性", "male", "남성"),
      difference: t("この雨の違い：2声と3声", "This rain's difference: 2nd vs 3rd tone", "이번 비의 차이: 2성과 3성"),
      lineLabel: t("の高さの線", " pitch line", "의 높낮이 선"),
    },
  },
  // 語と字は ことのね の辞書（public/data/words.json・hanja-chars.json）から。學・生・大・校 だけでできた語は辞書にこの5語。
  // 意味はアプリと同じく日本語（英語のページだけ英語）。
  ne: {
    collectible: ["학생", "대학", "학교"],
    words: {
      "학생": { hanja: "學生", jp: "学生", gloss: t("児童、生徒、学生", "student", "児童、生徒、学生") },
      "대학": { hanja: "大學", jp: "大学", gloss: t("大学、学部", "university, college", "大学、学部") },
      "학교": { hanja: "學校", jp: "学校", gloss: t("学校", "school", "学校") },
      "대학생": { hanja: "大學生", jp: "大学生", gloss: t("学生、大学生", "university student", "学生、大学生") },
      "대학교": { hanja: "大學校", jp: "大学校", gloss: t("大学", "university", "大学") },
    },
    chars: {
      "學": { jp: "学", hun: "배울", eum: "학", ja: "ガク・まなぶ" },
      "生": { hun: "날", eum: "생", ja: "セイ・いきる" },
      "大": { hun: "큰", eum: "대", ja: "ダイ・おお" },
      "校": { hun: "학교", eum: "교", ja: "コウ・くらべる" },
    },
    strings: {
      tab: t("あつめる", "Collect", "모으기"),
      title: t("覚えた語を、打ってあつめる", "Type a word you've learned to collect it", "외운 단어를 쳐서 모으기"),
      label: t("覚えた漢字語", "A Sino-Korean word you've learned", "외운 한자어"),
      submit: t("しらべる", "Look up", "찾기"),
      examples: t("たとえば", "Try", "예를 들어"),
      steps: [
        t("覚えた漢字語を、ハングルで打つ", "Type a Sino-Korean word you've learned, in hangul", "외운 한자어를 한글로 친다"),
        t(
          "漢字の根に分かれる。日本語の読みと並べると、音の対応が見えてくる",
          "It splits into hanja roots. Beside the Japanese readings, the sound correspondences start to show",
          "한자의 뿌리로 나뉜다. 일본어 읽기와 나란히 두면 소리의 대응이 보이기 시작한다"
        ),
        t(
          "集めた字だけで読める語が見つかる。打ってあつめると、根が深くなる",
          "You find words you can read from the characters you have. Collecting them deepens the roots",
          "모은 글자만으로 읽을 수 있는 단어가 나타난다. 쳐서 모으면 뿌리가 깊어진다"
        ),
      ],
      // {n} 数、{s} 英語の複数形の s、{w} 語、{을}{은} 韓国語の助詞（語の最後の音節にパッチムがあるかで変わる）
      firstRoots: t("はじめての字が{n}字。読める語は、次の語から増えていきます。", "{n} new character{s}. Readable words start growing from the next word.", "처음 보는 글자가 {n}자예요. 읽을 수 있는 단어는 다음 단어부터 늘어나요."),
      known: t("集めた字だけでできた語。もう読めていた語です。", "Made only of characters you have: you could already read it.", "모은 글자로만 된 단어예요. 이미 읽을 수 있었던 단어예요."),
      beforeHead: t("あつめると、読める語が", "Collect it and you can read", "모으면 읽을 수 있는 단어가"),
      beforeTail: t("語増えます", "more word{s}", "개 늘어나요"),
      collect: t("あつめる", "Collect", "모으기"),
      collected: t("「{w}」をあつめました。", "Collected {w}.", "'{w}'{을} 모았어요."),
      already: t("「{w}」はもうあつめています。", "You've already collected {w}.", "'{w}'{은} 이미 모았어요."),
      rootNew: t("はじめての字", "New character", "처음 보는 글자"),
      rootAgain: t("また出会った字", "Met again", "다시 만난 글자"),
      rootAgainCount: t("{n}語目", "word {n}", "{n}번째 단어"),
      afterTail: t("語、読めるようになりました", "more word{s} you can now read", "개, 읽을 수 있게 됐어요"),
      linked: t("とつながりました", "links to", "에 이어졌어요"),
      next: t("次の語を打つ", "Type the next word", "다음 단어 치기"),
      readable: t("集めた字で読める語が{n}語", "{n} word{s} readable from your characters", "모은 글자로 읽을 수 있는 단어 {n}개"),
      readableNote: t("習っていない語も、字の音をつなげれば読めます。", "Even words you never studied can be read by joining the characters' sounds.", "배우지 않은 단어도 글자의 소리를 이으면 읽을 수 있어요."),
      notInDemo: t(
        "このデモで調べられるのは、學・生・大・校 でできた5語（학생・대학・학교・대학생・대학교）です。アプリでは約21,200語から探せます。",
        "This demo knows the five words made of 學, 生, 大 and 校 (학생, 대학, 학교, 대학생, 대학교). The app searches about 21,200.",
        "이 데모에서 찾을 수 있는 건 學·生·大·校로 된 다섯 단어(학생·대학·학교·대학생·대학교)예요. 앱에서는 약 21,200단어에서 찾을 수 있어요."
      ),
      restart: t("はじめから", "Start over", "처음부터"),
    },
  },
  // ことのえだ の上げてみる「ご飯、食べた？」（keigo の src/content/rains.ts の eat-a）。わたしの声はアプリの女声（Leda）、
  // 返事はそれぞれの人の声。marks は [文の中の字, 種類, 上に添える語]：raised は上の語（ふだんの語を上に）、si は -시-、base は ふだんの語。
  eda: {
    title: t("ご飯、食べた？", "Have you eaten?", "밥 먹었어?"),
    me: t("わたし", "Me", "나"),
    steps: [
      {
        to: "서준",
        said: { ko: "밥 먹었어?", ja: "ご飯食べた？", en: "Have you eaten?", marks: [["밥", "base"], ["먹었", "base"]], audio: "eat-a.1" },
        reply: { ko: "아직. 같이 먹을래?", ja: "まだ。一緒に食べる？", en: "Not yet. Want to eat together?", marks: [["먹을", "base"]], audio: "eat-a.1r" },
      },
      {
        to: "지은 선배",
        said: { ko: "선배, 밥 먹었어요?", ja: "先輩、ご飯食べました？", en: "Sunbae, have you eaten?", marks: [["밥", "base"], ["먹었", "base"]], audio: "eat-a.2" },
        reply: { ko: "아니, 아직. 같이 먹을래?", ja: "ううん、まだ。一緒に食べる？", en: "No, not yet. Want to eat together?", marks: [["먹을", "base"]], audio: "eat-a.2r" },
      },
      {
        to: "박 교수님",
        said: { ko: "교수님, 식사하셨어요?", ja: "教授、お食事はされましたか？", en: "Professor, have you had your meal?", marks: [["식사", "raised", "밥"], ["하셨", "si", "하다"]], audio: "eat-a.3" },
        reply: { ko: "네, 먹었어요. 학생도 먹었어요?", ja: "ええ、食べましたよ。あなたも食べましたか？", en: "Yes, I have. Have you eaten too?", marks: [["먹었", "base"]], audio: "eat-a.3r" },
      },
      {
        to: "할머니",
        said: { ko: "할머니, 진지 잡수셨어요?", ja: "おばあちゃん、ご飯は召し上がりましたか？", en: "Grandma, have you had your meal?", marks: [["진지", "raised", "밥"], ["잡수셨", "raised", "먹다"]], audio: "eat-a.4" },
        reply: { ko: "그래, 먹었다. 너는 먹었니?", ja: "ああ、食べたよ。あんたは食べたかい？", en: "Yes, I have. Have you eaten?", marks: [["먹었", "base"]], audio: "eat-a.4r" },
      },
    ],
    strings: {
      tab: t("上げてみる", "Raise it", "높여 보기"),
      up: t("上げる", "Raise it to", "높이기"),
      top: t("いちばん上まで上がりました", "That's as high as it goes.", "가장 위까지 올라왔어요."),
      again: t("はじめから", "Start over", "처음부터"),
      soundNote: t("音が出ます", "Plays sound", "소리가 나요"),
      play: t("この文を聞く", "Hear this line", "이 문장 듣기"),
    },
  },
};
