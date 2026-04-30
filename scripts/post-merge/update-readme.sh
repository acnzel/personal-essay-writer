#!/bin/bash
set -euo pipefail

ESSAY_DIR=".claude/skills/personal-essay/data/essays"
STYLE_GUIDE=".claude/skills/personal-essay/data/style-guide.md"
README="README.md"

essay_count=$(find "$ESSAY_DIR" -name "*.md" -type f | wc -l)

style_version=$(grep -oP '버전: \K[0-9]+\.[0-9]+' "$STYLE_GUIDE" | tail -1)
if [ -z "$style_version" ]; then
  style_version=$(grep -oP 'v\K[0-9]+\.[0-9]+' "$STYLE_GUIDE" | tail -1)
fi

essay_list=""
index=1
while IFS= read -r line; do
  title=$(echo "$line" | sed 's/^[[:space:]]*[0-9]*\.[[:space:]]*//' | sed 's/^"//' | sed 's/".*$//')
  year=$(echo "$line" | grep -oP '\(\K[^)]+' || echo "")
  if [ -n "$year" ]; then
    essay_list+="${index}. ${title} (${year})\n"
  else
    essay_list+="${index}. ${title}\n"
  fi
  index=$((index + 1))
done < <(grep -P '^\s+\d+\.' "$STYLE_GUIDE" | head -"$essay_count")

sed -i "s/스타일 가이드 (v[0-9]*\.[0-9]*)/스타일 가이드 (v${style_version})/" "$README"
sed -i "s/에세이 모음 ([0-9]*개)/에세이 모음 (${essay_count}개)/" "$README"
sed -i "s/등록된 에세이 ([0-9]*개)/등록된 에세이 (${essay_count}개)/" "$README"

start_line=$(grep -n "^## 등록된 에세이" "$README" | cut -d: -f1)
if [ -n "$start_line" ]; then
  end_line=$(awk "NR>$start_line && /^## /{print NR; exit}" "$README")
  if [ -z "$end_line" ]; then
    end_line=$(wc -l < "$README")
    end_line=$((end_line + 1))
  fi

  {
    head -n "$start_line" "$README"
    echo ""
    echo -e "$essay_list"
  } > "${README}.tmp"

  tail -n +"$end_line" "$README" >> "${README}.tmp"
  mv "${README}.tmp" "$README"
fi

echo "README.md updated: ${essay_count} essays, style guide v${style_version}"
