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
├── essays/            # 한글 에세이 모음
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
1. `essays/`에 한글 에세이 저장
2. 영어로 번역하여 `essays-en/`에 저장 → Dev.to 배포
3. 영어 파일명: 한글 제목의 영어 번역 (kebab-case)

### Dev.to 배포
`essays-en/`의 마크다운이 main에 push되면 GitHub Actions
(`.github/workflows/publish-essays-to-devto.yml`)가 `scripts/devto-sync/publish.js`를
실행해 Dev.to에 공개 게시한다. 세션에서 직접 API를 호출하지 않는다.

- 변경된 파일만 처리한다. `dev-to-id`가 없으면 신규 생성(POST), 있으면 본문 갱신(PUT)
- 제목은 파일 첫 `# ` 헤딩. 본문에서는 제거되고 Dev.to의 title 필드로 들어간다
- 게시 후 액션이 메타데이터를 파일에 기록하고 `[devto-sync]` 커밋으로 push한다
- 이미 커밋된 미게시 글은 push diff에 안 잡힌다. Actions 탭에서 수동 실행하면
  `dev-to-published: true` 가 없는 파일을 전부 게시한다. `files` 입력에 경로를
  공백으로 구분해 넣으면 그 파일만 게시한다
- 필요한 시크릿: `DEVTO_API_KEY` (https://dev.to/settings/extensions)

영어 에세이 파일 하단의 메타데이터:
- `<!-- dev-to-tags: leadership, management -->` - 태그 지정 (생략 시 기본값 leadership, management, career / 최대 4개)
- `<!-- dev-to-published: false -->` - 아직 게시 안됨
- `<!-- dev-to-published: true -->` - 게시됨
- `<!-- dev-to-id: 12345 -->` - Dev.to 글 ID (게시 후 기록)
- `<!-- dev-to-url: ... -->` - 게시된 글 주소 (게시 후 기록)
