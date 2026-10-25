# ポートフォリオ（塚本 諒 / Ryo Tsukamoto）

日本語・English・한국어 の静的サイト。依存パッケージなし。同じ中身から2つの版を書き出す。

- **1枚の版**（ルート）：トップ1枚に全部。作品の工夫などは「詳しく見る」に畳んである
- **階層の版**（`pages/`）：トップ → 作品（一覧）→ 作品ごとのページ、と経歴。1枚の版で畳んでいたものを、作品のページで開いて見せる

- `index.html`（日本語）、`en/index.html`、`ko/index.html` … `src/build.mjs` が書き出したもの。直接は編集しない
- `src/content.mjs` … 文章とデータ（3言語）。直すのはここ
- `src/build.mjs` … 1枚の版の書き出し
- `src/build-pages.mjs` … 階層の版の書き出し（`pages/`。`assets/` も `pages/assets/` に写すので、`pages/` だけで公開できる）
- `src/kit.mjs` … 2つの版が共通に使う部品（見出し・メディア・デモ・点の雨・連絡など）
- `src/oto-lines.json` … ことのおと のデモで描く高さの線（アプリの `public/data/f/t23.json` から8語分）
- `src/timeline.json` … ヒーローの「作ってきたもの」の点（99件）。vault の作品ノート81件の始めた月・状態に、ことのは・ことのおと・ことのえだ と、この PC（Windows）のフォルダから見つけた15件（下の「この PC から足したもの」）を足したもの。個人的なものと仕事のもの6件は名前を伏せている。点の雨の範囲は `src/kit.mjs` の `CHART_FROM`・`CHART_TO`（いまは 2025-07〜2026-10）で、列の数は月の数から決まる
- `assets/site.css` / `site.js` / `demos.js` … 見た目、動画と点の雨、4つのデモ（ことのあめ・ことのね・ことのえだ・ことのおと）
- `assets/media/` `assets/audio/` `assets/img/` … 映像・音声・画像
- `tools/sciencetokyo-day.py` … ScienceTokyo App の縦長の映像を作る（下の「素材の出どころ」）

## 直して書き出す

```bash
node src/build.mjs         # 1枚の版
node src/build-pages.mjs   # 階層の版（pages/）
```

`src/content.mjs` のうち、`ledger` の `cat`・`filters`、`approach` の `more: true`、年表の `"more"` の行、`tools` は階層の版だけが使う（作品のページの絞り込みと、経歴のページ）。1枚の版は `pick: true` の作品と、`more` の付かない行だけを出す。

確認はローカルのサーバーで（音声と動画は `file://` だと動かないことがある）。

```bash
python -m http.server 8000   # http://localhost:8000/  （階層の版は pages/ で同じように）
```

## 公開

ビルド済みの HTML を含めてそのまま置けば動く（Vercel、GitHub Pages、Cloudflare Pages のどれでも）。
公開先の URL が決まったら `src/content.mjs` の `SITE_URL` に書いてビルドし直すと、og:image（`assets/img/og.png`）と hreflang が絶対 URL で出る。

## 見た目

ことのあめ・ことのは・ことのおと と同じトークン（紙 `#fcfbf8`、墨 `#172033`、差し色 `#0a64f0`、また出会う紫 `#6a4fe0`）、
IBM Plex と、名前とアプリ名だけしっぽり明朝。区切りは罫線。グラデーション・絵文字・影は使わない（アプリのアイコンと芽の絵、
ことのあめ の雨すじは、アプリと同じく例外）。
各作品の大見出しは、本人のアプリ・紹介映像・紹介ページの言葉から取っている（「大学生活を、ひとつに。」「言の葉は、言の雨に育まれる。」など）。

色の決まり：白い紙に、墨を2色目、明るい青を1色だけ。青は押せるもの（リンク・ボタン・映像の横の場面の名前）と「運用中」にだけ使い、
見出しや見出しの上の小さなラベルは墨のまま。ほかの色はアプリ自身のもの（アイコン、映像とデモの中の画面：ことのあめ の紫、ことのね の緑、
ScienceTokyo App の初期テーマの淡い青と緑）にだけ出てくる。暗い区画は置かない。

載せすぎないように、作品ごとに見せるのは大見出し・短い文・動く画面・数字3つ・リンクまで。工夫したこと・作った理由・事実・使った技術は「詳しく見る」に畳んである。「ほかの作品」は `ledger` のうち `pick: true` のものだけを出す（全部の名前はヒーローの点に触れると出る）。

## 素材の出どころ

| ファイル | 元 |
|---|---|
| `assets/media/sciencetokyo-day.mp4` | 紹介映像は使わず、このサイトのために作った縦長の映像（35秒・780×1688）。素材は isct の `promo-video/public/film/rec/rec_z_*`：アプリに組み込んだ撮影用のデモ（ダミーのデータ、初期テーマ tsubame）を `capture/record_film.mjs` で1コマずつ操作して撮った素の録画。`tools/sciencetokyo-day.py` が、ホーム → 時間割 → キャンパスナビ → 空き教室 → 課題 の順につなぎ、止まっている間だけを詰め、押した場所の印・次のタブを押すつなぎ・ステータスバーを足す。場面の秒は `src/content.mjs` の `chapters` に写す |
| `assets/media/kotonoha.mp4` | english `promo/out/kotonoha-promo.mp4` を 1280px に縮めたもの |
| `assets/audio/ame/*.mp4` | ことのあめ のライブラリ（働き「誘う」）の音声。`pl-audio` バケットから取得し、AAC に変換（拡張子は .mp4） |
| `assets/audio/oto/<声>/*.mp3` | ことのおと の `public/audio` |
| `assets/audio/eda/*.mp3` | ことのえだ（`Desktop/keigo`）の `public/audio` から、上げてみる「ご飯、食べた？」（`src/content/rains.ts` の eat-a）の8本。わたしは女声（Leda）、返事はそれぞれの人の声。名前は `content/audio.json` の対応で付け替えた |
| `assets/img/kotonoeda.png` | ことのえだ の `public/icons/icon-512.png`（本人が選んだ絵）を 112px に縮めたもの |
| `assets/img/*.png` | 各アプリのアイコン、ことのあめ の芽の絵 |
| ことのえだ のデモの文と印（`src/content.mjs` の `demos.eda`） | ことのえだ の `src/content/rains.ts`（eat-a の4段）と `branches.ts` の語の高さ（上の語・ふだんの語・-시-）を写したもの。見た目は `climb.module.css`・`line.module.css`・`globals.css` から |
| ことのね のデモの語と字（`src/content.mjs` の `demos.ne`） | ことのね の `public/data/words.json`・`hanja-chars.json` から 學・生・大・校 とその5語を写したもの。芽と根の絵はアプリの `Sprout.tsx` と同じ形 |

ことのは のポスターは33秒のフレーム。

## この PC から足したもの

vault にない 2025年7〜12月のものを、この PC（Windows）のフォルダから足した（2026-10-25）。日付は git のコミット（日本時間）、git がないものはファイルの作成日。

| 足したもの | 出る所 | 元のフォルダ | 日付 |
|---|---|---|---|
| Poly-Lang | 点（2025-07）、ほかの作品の行、PolyLinga の「作った理由」「概要」、年表 | `~/poly-lang-app`（GitHub は poly-lang-app、旧名 my-langapp）、`OneDrive/デスクトップ/app`（企画書・`要件定義/めも.docx`・`プレゼンテーション/メモ.docx`） | 要件定義と最初のコミットが 2025-07-24 |
| 動詞活用テスト（スペイン語）、語学学習日記、11進数計算機 | 点（2025-07） | `OneDrive/デスクトップ/web`・`testet` | 2025-07-16〜22 |
| 自作問題・改題集 | 点（2025-09） | `OneDrive/デスクトップ/自作問題集` | 2025-09-11 |
| 場合の数・確率の「36ページから50ページまで」 | ほかの作品の行の文 | `OneDrive/デスクトップ/東工大/場合の数確率の参考書(りょだ作).pdf`（初版）、`趣味/場合の数・確率/場合の数・確率を極めたい.pdf` | 2024-06-24（36ページ）、2025-09-10（50ページ） |
| Programming Boot Camp | 年表（2025-11） | `~/isct-pbc-2025`（講座のリポジトリのフォーク。本人のコミットはない） | 講座は 10/25・11/08・11/15（Claude Code）・11/29 |
| Pet Park 3D、マインドマップ思考整理、AIおふろ代行サービス、LocationSNS、Seoul-JP Life Mirror | 点（2025-11） | `~/isct2025-learning-phase3`・`~/new-app-1`・`~/newapp2`・`~/newapp3`・`~/seoul-jp_app`（どれも git なし） | 2025-11-15〜22 |
| sampo | 点（2025-11）、ほかの作品の行 | `OneDrive/デスクトップ/sampo`・`散歩/企画` | 企画書 11/24、コミット 11/30〜12/01 |
| AI Daily | 点（2025-12）、ほかの作品の行 | `OneDrive/デスクトップ/anti-test`（GitHub は news） | 2025-12-02〜03 |
| SwaLo | 点（2025-12）、ほかの作品の行、ScienceTokyo App の「前に作ったもの」、年表 | `OneDrive/デスクトップ/campus-app`（12/30 までの名前は Campus Club） | 2025-12-04〜31、73コミット |
| Pronunciation Evaluator | 点（2025-12）、PolyLinga の「工夫したこと」 | `OneDrive/デスクトップ/アプリ製作/pronunciation` | 2025-12-13〜20 |
| 例文を見比べる試作 | PolyLinga の「工夫したこと」 | `OneDrive/デスクトップ/アプリ製作/poly-lang-app-pbc` | 2025-12-19 23:22〜12-20 00:36 |
| AI Trends Now | 点（2025-12） | `OneDrive/デスクトップ/ai_news_app` | 2025-12-13〜14 |
| tutoring-app の点を 2026-01 から 2025-12 へ | 点 | `OneDrive/デスクトップ/アプリ製作/tutoring-app` | 最初のコミット 2025-12-06（GitHub の main は 2026-01-17 に作り直されている） |
| PolyLinga の名前の変更 | PolyLinga の「概要」、年表 | GitHub poly-lang の 60d93ef（`layout.tsx` の title） | 2026-01-28 |

## 載せていないもの

- ことのは・ことのおと のアプリ本体へのリンク：ことのは の README にある「公開前に AI の回数をアカウント単位で数える」が済んでいないため。GitHub とページ内のデモ・映像だけ
- ScienceTokyo App の GitHub：学内アカウントを扱うアプリなので、コードへの導線は置いていない
- bus、timetable：身近な人のために作ったものなので外した
- METAL の会社名と展示の予定
- tutoring-app（Tutorin）の行と URL：実際の家庭教師の仕事と、その家庭のためのものなので、点だけ
- SwaLo の公開 URL：いまは別のアプリが出るので、GitHub だけ
- Emotion English（`アプリ製作/english-app`、2025-12）：vault の点「english」と同じものとみて、点は足していない
- Programming Boot Camp の演習そのものと、授業の課題（機械製図の Inventor、機械系基礎実験のレポート、M5Atom・Arduino の工作、C++ の数値計算）。Pet Park 3D だけは、演習に自分で3Dの公園を足したので点にした
- 2025年7月より前のもの（2024年の数学のノート、Blender など）：点の雨の範囲の外。場合の数・確率の教材だけ、行の文に初版の年月を書いた
