# AI Market Command Center — 제품 및 시스템 설계

## 목적

이 시스템은 개인 투자자를 위한 기관형 리서치 데스크다. 직접 매수 추천이나 자동 주문이 목적이 아니라, 시장 체제 변화와 리스크를 더 빨리 읽고 더 적은 잡음으로 투자 판단을 돕는 것이 목적이다.

## 제품 원칙

- 투자 권유 금지
- 모든 실행성 액션은 사용자 승인 필요
- AI 출력은 초안이며 항상 검토 대상
- 시장, 포트폴리오, 전략, 보고를 분리하지 않고 하나의 운영 콘솔로 연결

## MVP 범위

Phase 1에 맞춰 다음을 우선 구현한다.

- Watchlist
- 실시간/지연 가격 수집 레이어
- 메인 Dashboard
- AI Research Report 생성
- Portfolio Risk Summary
- Notion Export용 데이터 구조

## 핵심 모듈

### 1. AI 연구 보고서

입력:

- 가격
- 거래량
- 기술 지표
- 뉴스
- 거시 환경
- 펀더멘털
- 포트폴리오 노출

출력:

- 한 줄 요약
- 상승 요인
- 하락 요인
- 기술적 분석
- 펀더멘털 분석
- 리스크 분석
- 액션 라벨
- 신뢰도 점수

허용 액션 라벨:

- Buy Candidate
- Hold
- Watch
- Reduce Risk

### 2. 시장 데이터 위젯

대시보드 핵심 정보:

- 실시간 가격
- 등락률
- 거래량
- 변동성
- 시장 체제
- 리스크 상태
- 즐겨찾기 자산

### 3. Strategy Lab

MVP에서는 자동매매를 넣지 않는다.

지원 전략:

- Grid Trading 시뮬레이션
- RSI, MA, MACD, Breakout, Momentum 기반 룰 전략

### 4. 포트폴리오 리스크 엔진

분석 항목:

- 종목 집중도
- 섹터 편중
- 변동성 노출
- 레버리지 노출
- 최대 손실 시나리오
- 유동성 리스크
- 상관관계 리스크

### 5. Notion 연동

자동 보고 대상:

- Watchlist
- Daily Brief
- AI Reports
- Strategy Logs

## 아키텍처 선택

### 프론트엔드

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui 확장 가능 구조
- Recharts / Lightweight Charts 연결 가능 구조

### 백엔드

- FastAPI
- PostgreSQL
- Prisma는 TypeScript 레이어에서 사용
- Redis / 큐는 후속 단계

### AI 스택

- OpenAI API 우선
- Claude 패턴 참조 가능
- 다중 에이전트는 후속 단계

## Anthropic financial-services 참고 반영

Anthropic의 `financial-services` 저장소는 다음 원칙을 강하게 강조한다:

- 리서치 산출물은 항상 사람 검토 전제
- 투자 추천이나 거래 실행 금지
- 에이전트는 analyst work product를 초안화하는 역할

본 시스템도 동일하게 다음 정책을 따른다:

- 모든 리포트는 draft
- human approval required
- execution path 제거

출처:

- https://github.com/anthropics/financial-services

## 모노레포 구조

```bash
ai-market-command-center/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── ui/
│   ├── db/
│   ├── ai/
│   └── analytics/
├── services/
│   ├── collectors/
│   ├── indicators/
│   ├── ai-research/
│   ├── strategy-engine/
│   ├── risk-engine/
│   └── notion-export/
├── prompts/
├── docs/
└── infra/
```

## 다음 단계

1. 환경 변수 표준화
2. Prisma migration
3. 실제 데이터 소스 연결
4. 뉴스/거시/온체인 수집 파이프라인
5. Notion API 실제 연동
6. 일일 브리프 스케줄러 연결
