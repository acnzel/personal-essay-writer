# Project Instructions

## Git 작업 규칙

### 작업 전 동기화 (필수)
파일 수정이나 commit 전에 항상 원격 저장소와 동기화:
```bash
git fetch -p && git pull
```

### 자동 실행 권한
다음 작업들은 사용자 확인 없이 자동 실행:
- 파일 읽기/쓰기/수정
- Git 명령어 (add, commit, push, status, log, diff)
- 파일 복사/이동

### Commit 규칙
- 영어로 작성
- 변경 내용 요약 후 상세 설명
- Co-authored-by 포함

## 에세이 시스템

### 파일 구조
```
.claude/skills/personal-essay/data/
├── style-guide.md     # 스타일 가이드 (현재 버전)
├── feedback-log.md    # 피드백 기록
├── essays/            # 한글 에세이 모음 → Notion 배포
├── essays-en/         # 영어 에세이 모음 → Dev.to 배포
└── style-history/     # 스타일 가이드 버전 이력
```

### 에세이 추가 시
1. `essays/`에 마크다운 파일 저장
2. 스타일 분석 후 `style-guide.md` 업데이트
3. `feedback-log.md`에 기록
4. `style-history/`에 새 버전 저장
5. GitHub에 commit & push

### 스타일 가이드 버전 관리
- 업데이트 시 버전 번호 증가
- `style-history/style-guide_YYYYMMDD_vX.X.md` 형식으로 저장

### 다국어 배포 워크플로우
한글 에세이 작성 시 자동으로 영어 번역본 생성:
1. `essays/`에 한글 에세이 저장 → Notion 배포
2. 영어로 번역하여 `essays-en/`에 저장 → Dev.to 배포
3. 영어 파일명: 한글 제목의 영어 번역 (kebab-case)

### Dev.to 배포
영어 에세이를 Dev.to에 게시:
```bash
# API 키 필요 (https://dev.to/settings/extensions)
curl -X POST https://dev.to/api/articles \
  -H "Content-Type: application/json" \
  -H "api-key: ${DEVTO_API_KEY}" \
  -d '{
    "article": {
      "title": "Article Title",
      "body_markdown": "Article content...",
      "published": false,
      "tags": ["leadership", "management"]
    }
  }'
```

영어 에세이 파일 하단의 메타데이터:
- `<!-- dev-to-published: false -->` - 아직 게시 안됨
- `<!-- dev-to-published: true -->` - 게시됨
- `<!-- dev-to-id: 12345 -->` - Dev.to 글 ID (게시 후 기록)
