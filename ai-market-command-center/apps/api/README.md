# API App

FastAPI 기반 수집/분석 API 초안입니다.

예상 책임:

- 시장 위젯 데이터 제공
- AI 리포트 생성 트리거
- 포트폴리오 리스크 계산 API
- Notion export 작업 큐 연계

실행:

1. `powershell -ExecutionPolicy Bypass -File .\bootstrap.ps1`
2. `powershell -ExecutionPolicy Bypass -File .\run.ps1`

확인:

- Health: `http://127.0.0.1:8000/health`
- OpenAPI Docs: `http://127.0.0.1:8000/docs`
