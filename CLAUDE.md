# CLAUDE.md

## 웹앱 작업 규칙: Whiteboard 적용

이 저장소에서 웹앱(HTML/JS 대시보드, 업무용 웹앱 등)을 **새로 만들거나 수정할 때마다** 아래를 따른다.

1. 코드 작성·커밋을 끝낸 뒤, 변경 내용을 [dev.fast Whiteboard](https://github.com/devdotfast/whiteboard)로 설명한다.
   - `whiteboard` MCP 도구(또는 `whiteboard` CLI)를 쓸 수 있으면, 먼저
     `whiteboard api session_get_instructions '{}'`를 실행해 지침을 받고 그대로 따른다.
   - 포함할 내용: 화면 구성, 데이터 흐름(입력 → 처리 → 저장/출력), 주요 함수 간 호출 순서(시퀀스 다이어그램), 이번 변경에서 에이전트가 스스로 내린 결정.
2. Whiteboard를 쓸 수 없는 환경이면(클라우드 세션 등, 로컬 데스크톱 앱에 연결 불가) 건너뛰지 말고
   `archify` 스킬로 같은 내용을 밝은 테마 HTML 아키텍처 다이어그램으로 대신 만든다.
3. 작업 보고 끝에 어떤 방식(Whiteboard / archify)으로 설명했는지 한 줄로 적는다.

### 참고
- Whiteboard 플러그인은 `.claude/settings.json`에 등록되어 있다(`whiteboard@devfast`).
- 플러그인은 로컬 PC에 Whiteboard 데스크톱 앱이 설치·실행 중일 때만 동작한다 (설치: https://install.dev.fast).
