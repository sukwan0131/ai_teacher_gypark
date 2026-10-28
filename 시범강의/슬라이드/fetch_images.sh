#!/bin/bash
# Higgsfield로 생성한 사례 이미지를 img/에 내려받기 (받은 뒤 build.js 실행)
cd "$(dirname "$0")"
B=https://d8j0ntlcm91z4.cloudfront.net/user_3L1rQ8uk5ltdJjFrcNuVOGQv6cg
mkdir -p img
dl(){ curl -sS -m 60 -f -o img/$1 "$B/$2" && echo "ok $1" || echo "FAIL $1"; }
dl hero.png hf_20261028_135351_768ed57e-6312-47dc-90c6-578fb78964cc.png
dl bee.png hf_20261028_135459_bd0418f0-07d8-43ac-b554-66032ccd1dde.png
dl case_agri.png hf_20261028_135215_91501db1-d542-4e33-89de-5bdb21bcc30a.png
dl case_delivery.png hf_20261028_135351_c3287b52-6155-4fa8-b6f1-d986320dbf62.png
dl case_rescue.png hf_20261028_135351_63708c1a-e66c-4019-a4f0-c1727e63d392.png
dl case_inspect.png hf_20261028_135459_47e9a5a6-6f98-438e-b2d0-84b127a4f747.png
dl case_show.png hf_20261028_135925_f6d78845-750c-406e-9444-6cb4d7d88ac1.png
dl case_uam.png hf_20261028_135727_153406c6-deba-4626-a7e5-dd6295106f17.png
# 사례 사진은 카드 비율(3.83 x 1.62)에 맞춰 가운데를 잘라 냄
python3 - <<'PY'
from PIL import Image
import glob
for p in glob.glob('img/case_*.png'):
    im = Image.open(p).convert('RGB'); w, h = im.size; r = 3.83 / 1.62
    if abs(w / h - r) < 0.01: continue
    nh = int(w / r); top = (h - nh) // 2
    im.crop((0, top, w, top + nh)).save(p)
PY
