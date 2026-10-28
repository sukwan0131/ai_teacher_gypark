#!/bin/bash
set -e
cd "$(dirname "$0")"
# 실행 전: npm install 후, S를 pptx 스킬 경로로 맞추기
S=/root/.claude/skills/synced/a4bf06c9-3183-4480-a8ec-e18e2c3f050b_f4c9972e-8b54-4a78-9932-4454cb15f343/pptx
NODE_PATH=$PWD/node_modules SKILL_DIR=$S node build.js 드론이란_시범강의.pptx
python3 $S/scripts/office/validate.py 드론이란_시범강의.pptx
python3 $S/scripts/office/soffice.py --headless --convert-to pdf 드론이란_시범강의.pptx >/dev/null 2>&1
rm -f slide-*.jpg; pdftoppm -jpeg -r ${RES:-80} 드론이란_시범강의.pdf slide
