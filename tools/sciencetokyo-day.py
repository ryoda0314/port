# ScienceTokyo App の「一日」：初期テーマ（tsubame）で実際に操作した録画を、一本の縦長の映像につなぐ。
#   - 動いているところと押した瞬間は等速のまま。止まっている間だけを、読める長さを残して詰める
#   - 押した場所に印（指が近づいて押し、離れる）。場面の終わりには次のタブを押して、次の画面へ
#   - 端末のステータスバー（時刻は場面ごと）とホームインジケーターを足す。色は画面の上端・下端から取る
# python -I tools/sciencetokyo-day.py assets/media/sciencetokyo-day.mp4 assets/media/sciencetokyo-day.jpg chapters.json
# （chapters.json の at を src/content.mjs の chapters に写す。録画は isct の promo-video/capture/record_film.mjs が撮ったもの）
import io, json, os, subprocess, sys
from PIL import Image, ImageChops, ImageDraw, ImageFont, ImageStat

REC = "C:/Users/edama/Desktop/作成したもの/isct/promo-video/public/film/rec"
FFMPEG = "C:/Users/edama/Desktop/作成したもの/isct/promo-video/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe"
OUT, POSTER, CHAPTERS = sys.argv[1:4]

S = 2                      # 録画は 390x770 の2倍
TOP, BOTTOM = 54 * S, 20 * S
W, H = 390 * S, 770 * S + TOP + BOTTOM
INK = (23, 32, 51)
STILL = 0.15               # これより小さい差は「止まっている」
HOLD_AFTER = 26            # 変わったあと、読めるように残すコマ
HOLD_BEFORE = 9            # 押す前に残すコマ（指が近づく間）
TAB_Y = 745
TABS = {"home": 32.5, "tt": 97.5, "tasks": 162.5, "map": 227.5, "dm": 292.5, "more": 357.5}

# 場面：録画、使う範囲、ステータスバーの時刻、次の場面へ移るときに押すタブ
SCENES = [
    dict(id="home", rec="rec_z_home", start=96, end=288, clock="8:45", next="tt"),
    dict(id="timetable", rec="rec_z_tt", start=134, end=360, clock="8:46", next="map"),
    dict(id="navi", rec="rec_z_navi", start=0, end=450, clock="8:47", next="more"),
    dict(id="freeroom", rec="rec_z_free", start=120, end=330, clock="12:40", next="tasks"),
    dict(id="tasks", rec="rec_z_asgn", start=120, end=575, clock="17:20", next="home"),
]

def frames_of(rec):
    d = os.path.join(REC, rec)
    return [os.path.join(d, f) for f in sorted(f for f in os.listdir(d) if f.endswith(".jpg"))]

def plan(sc):
    """使うコマの番号の並び。止まっている区間は、前の変化のあと HOLD_AFTER、次の変化の前 HOLD_BEFORE だけ残す。"""
    files = frames_of(sc["rec"])
    log = json.load(open(os.path.join(REC, sc["rec"], "log.json"), encoding="utf-8"))["log"]
    taps = {e["f"]: e["tap"] for e in log if "tap" in e and sc["start"] <= e["f"] <= sc["end"]}
    small = [Image.open(files[i]).convert("L").resize((130, 257)) for i in range(sc["start"], sc["end"] + 1)]
    moving = [True] + [ImageStat.Stat(ImageChops.difference(a, b)).mean[0] >= STILL for a, b in zip(small, small[1:])]
    for f in taps:  # 押したコマも「動き」として扱う
        moving[f - sc["start"]] = True
    keep, i, n = [], 0, len(moving)
    while i < n:
        if moving[i]:
            keep.append(i)
            i += 1
            continue
        j = i
        while j < n and not moving[j]:
            j += 1
        run = list(range(i, j))
        if i == 0:  # 場面の頭：最初の画面を少し見せる
            run = run[-(HOLD_AFTER + HOLD_BEFORE):]
        elif j >= n:  # 場面の終わり：次のタブを押す間を含めて残す
            run = run[: HOLD_AFTER + HOLD_BEFORE + 6]
        elif len(run) > HOLD_AFTER + HOLD_BEFORE:
            run = run[:HOLD_AFTER] + run[-HOLD_BEFORE:]
        keep += run
        i = j
    return [sc["start"] + k for k in keep], taps, files

def font(size, bold=True):
    for name in (["seguisb.ttf", "segoeuib.ttf"] if bold else ["segoeui.ttf"]):
        p = os.path.join("C:/Windows/Fonts", name)
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

CLOCK = font(17 * S)

def status_bar(img, clock, bg):
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, TOP], fill=bg)
    d.text((54 * S, 30 * S), clock, font=CLOCK, fill=INK, anchor="mm")
    # 電波・Wi-Fi・電池（形だけ）
    x, y = 300 * S, 30 * S
    for k in range(4):
        h = (4 + k * 2.6) * S
        d.rounded_rectangle([x + k * 5 * S, y + 6 * S - h, x + k * 5 * S + 3 * S, y + 6 * S], radius=S, fill=INK)
    cx, cy = 333 * S, y + 6 * S
    for r, w in ((11, 2.2), (7, 2.2)):
        d.arc([cx - r * S, cy - r * S, cx + r * S, cy + r * S], 225, 315, fill=INK, width=int(w * S))
    d.ellipse([cx - 2 * S, cy - 5 * S, cx + 2 * S, cy - 1 * S], fill=INK)
    bx = 350 * S
    d.rounded_rectangle([bx, y - 6 * S, bx + 25 * S, y + 6 * S], radius=4 * S, outline=INK, width=int(1.2 * S))
    d.rounded_rectangle([bx + 2 * S, y - 4 * S, bx + 20 * S, y + 4 * S], radius=2 * S, fill=INK)
    d.rounded_rectangle([bx + 26 * S, y - 2 * S, bx + 28 * S, y + 2 * S], radius=S, fill=INK)

def home_bar(img, bg):
    d = ImageDraw.Draw(img)
    d.rectangle([0, H - BOTTOM, W, H], fill=bg)
    d.rounded_rectangle([W / 2 - 67 * S, H - 8 * S - 2.5 * S, W / 2 + 67 * S, H - 8 * S + 2.5 * S], radius=3 * S, fill=INK)

def touch(img, x, y, t):
    """指の印。t は押した瞬間を 0 とするコマ。-8..0 で近づいて小さくなり、0..14 で広がって消える。"""
    if t < -8 or t > 14:
        return
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    px, py = x * S, y * S + TOP
    if t <= 0:
        k = (t + 8) / 8                      # 0 → 1
        r = (30 - 8 * k) * S
        a = int(70 + 60 * k)
        d.ellipse([px - r, py - r, px + r, py + r], fill=INK + (int(a * 0.35),), outline=INK + (a,), width=int(1.5 * S))
    else:
        k = t / 14                           # 0 → 1、ゆるやかに止まる
        e = 1 - (1 - k) ** 3
        r = (22 + 26 * e) * S
        a = int(150 * (1 - k))
        d.ellipse([px - r, py - r, px + r, py + r], outline=INK + (a,), width=int(2 * S))
    img.alpha_composite(layer)

def edge_color(im, y):
    row = im.crop((0, y, im.width, y + 2)).resize((1, 1))
    return row.getpixel((0, 0))[:3]

proc = subprocess.Popen(
    [FFMPEG, "-v", "error", "-y", "-f", "image2pipe", "-vcodec", "bmp", "-r", "30", "-i", "-",
     "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUT],
    stdin=subprocess.PIPE,
)
chapters, total, poster_done = [], 0, False
for sc in SCENES:
    order, taps, files = plan(sc)
    chapters.append({"id": sc["id"], "at": round(total / 30, 2)})
    tab_tap = (TABS[sc["next"]], TAB_Y)
    tab_at = len(order) - 12                 # 最後から12コマ目でタブを押し、場面の終わりで次の画面へ
    for k, f in enumerate(order):
        src = Image.open(files[f]).convert("RGB")
        img = Image.new("RGBA", (W, H))
        img.paste(src, (0, TOP))
        status_bar(img, sc["clock"], edge_color(src, 1))
        home_bar(img, edge_color(src, src.height - 3))
        for tf, (tx, ty) in taps.items():
            # 出力のどのコマが押した瞬間か（詰めたあとの位置）
            if tf in order:
                touch(img, tx, ty, k - order.index(tf))
        touch(img, tab_tap[0], tab_tap[1], k - tab_at)
        rgb = img.convert("RGB")
        if not poster_done and sc["id"] == "home" and k == 20:
            rgb.save(POSTER, quality=88)
            poster_done = True
        buf = io.BytesIO()
        rgb.save(buf, "BMP")  # この ffmpeg は rawvideo を読めないので、1コマずつ BMP で渡す
        proc.stdin.write(buf.getvalue())
        total += 1
    print(sc["id"], "kept", len(order), "of", sc["end"] - sc["start"] + 1, "frames")
proc.stdin.close()
proc.wait()
json.dump({"duration": round(total / 30, 2), "chapters": chapters}, open(CHAPTERS, "w"), indent=1)
print("total", total, "frames =", round(total / 30, 1), "s")
