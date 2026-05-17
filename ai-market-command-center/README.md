# AI Market Command Center

개인용 AI 시장 분석 및 포트폴리오 인텔리전스 플랫폼의 MVP 코드베이스입니다.

핵심 원칙:

- 투자 권유가 아닌 의사결정 보조
- 모든 실행성 액션은 사람 승인 필요
- 시장/뉴스/리스크/전략/보고를 하나의 리서치 데스크로 통합

구성:

- `apps/web`: Next.js 기반 대시보드
- `apps/api`: FastAPI 기반 수집·리포트 API 초안
- `packages/db`: Prisma 스키마와 DB 접근 계층
- `packages/ai`: AI 리포트 타입과 프롬프트 인터페이스
- `packages/analytics`: 퀀트 점수 계산 로직
- `services/*`: 수집기, 지표, 리포트, 전략, 리스크, Notion export 엔진
- `docs/`: 제품/시스템 설계 문서

현재 상태:

- MVP 아키텍처 문서화 완료
- 데이터 모델 초안 완료
- AI 리포트 / 리스크 / 그리드 전략 엔진 베이스 구현
- 웹 대시보드 초안 구현
- 실제 API 키, DB, Notion 토큰, 스케줄러 연결은 후속 작업 필요

빠른 시작:

1. `C:\Users\휘원\Downloads\codex-tools\pnpm-11.1.2\pnpm.exe install`
2. `C:\Users\휘원\Downloads\codex-tools\pnpm-11.1.2\pnpm.exe build:web`
3. `C:\Users\휘원\Downloads\codex-tools\pnpm-11.1.2\pnpm.exe setup:api`
4. `C:\Users\휘원\Downloads\codex-tools\pnpm-11.1.2\pnpm.exe dev:web`
5. 별도 터미널에서 `C:\Users\휘원\Downloads\codex-tools\pnpm-11.1.2\pnpm.exe dev:api`

검증된 로컬 주소:

- Web: `http://localhost:3000`
- API docs: `http://127.0.0.1:8000/docs`
- API health: `http://127.0.0.1:8000/health`

데이터/운영 메모:

- Prisma 스키마는 `packages/db/prisma/schema.prisma`에 연결되어 있습니다.
- API는 `apps/api/.venv` 가상환경을 사용합니다.
- 초기 버전은 실행 주문을 하지 않으며, 모든 액션은 사람 승인을 전제로 설계되어 있습니다.
