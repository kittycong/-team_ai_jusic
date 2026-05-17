(async function bootstrapQuantSignalDesk() {
await (window.__MARKET_DATA_READY__ ?? Promise.resolve());

const featuredStockCatalog = [
  {
    id: "005930:KRX",
    name: "Samsung Electronics",
    displayName: "삼성전자",
    symbol: "005930:KRX",
    providerSymbols: { twelve: "005930:KRX", alpha: "005930" },
    market: "KRX",
    currency: "KRW",
    price: 285500,
    return12m: 421.0,
    roe: 22.1,
    debtRatio: 28.0,
    per: 22.7,
    pbr: 4.7,
    fcfYield: 4.4,
    volatility: 38.0,
    sector: "반도체 / IT 하드웨어",
    industry: "메모리, 파운드리, 모바일 디바이스",
    marketCapBand: "대형주",
    styleProfile: "사이클 민감 퀄리티",
    thesis: "메모리 업황 회복과 고대역폭 메모리 수요가 핵심 축입니다. 반도체 업황이 올라갈 때 실적 레버리지가 크지만, 업황 반전이 느려지면 밸류 재평가도 함께 둔화됩니다.",
    catalysts: [
      "HBM와 고부가 메모리 믹스 개선",
      "파운드리 수율 안정 여부",
      "주주환원 정책 재개 강도"
    ],
    risks: [
      "메모리 가격 반락 시 이익 민감도 확대",
      "파운드리 적자 지속 가능성",
      "달러/원과 수출 경기 변동성"
    ],
    watchItems: [
      "분기 DRAM/NAND 가격 추세",
      "메모리 재고와 고객사 주문 회복",
      "CAPEX 가이던스 변화"
    ],
    peerTickers: ["000660:KRX", "NVDA", "TSM"],
    sourceLabel: "Stock Analysis Korea snapshot",
    sourceDate: "2026-05-11",
    sourceNote: "StockAnalysis 2026-05-11 delayed quote and valuation snapshot"
  },
  {
    id: "000660:KRX",
    name: "SK hynix",
    displayName: "SK하이닉스",
    symbol: "000660:KRX",
    providerSymbols: { twelve: "000660:KRX", alpha: "000660" },
    market: "KRX",
    currency: "KRW",
    price: 1880000,
    return12m: 889.0,
    roe: 31.5,
    debtRatio: 32.0,
    per: 17.6,
    pbr: 5.6,
    fcfYield: 3.8,
    volatility: 44.0,
    sector: "반도체",
    industry: "메모리 반도체",
    marketCapBand: "대형주",
    styleProfile: "공격형 경기민감",
    thesis: "메모리 업황 회복 구간에서 실적 탄성이 매우 큰 종목입니다. 업황이 맞으면 가장 빠르게 이익이 튀지만, 가격 사이클이 꺾이면 변동성도 가장 크게 받습니다.",
    catalysts: [
      "HBM 공급 확대와 AI 메모리 점유율",
      "메모리 현물가/고정가 동반 상승",
      "CAPEX 절제와 재고 정상화"
    ],
    risks: [
      "메모리 가격 피크아웃 시 밸류 급격한 수축",
      "과열 구간에서 추격 매수 리스크",
      "업황 뉴스에 따른 일간 변동성 확대"
    ],
    watchItems: [
      "HBM 고객사 인증 속도",
      "분기 ASP 상승 지속 여부",
      "재고일수와 영업현금흐름"
    ],
    peerTickers: ["005930:KRX", "MU", "WDC"],
    sourceLabel: "Stock Analysis Korea snapshot",
    sourceDate: "2026-05-11",
    sourceNote: "StockAnalysis 2026-05-11 delayed quote and valuation snapshot"
  },
  {
    id: "AAPL",
    name: "Apple",
    displayName: "Apple",
    koName: "애플",
    aliases: ["애플", "애플 주식", "Apple Inc."],
    symbol: "AAPL",
    providerSymbols: { stooq: "aapl.us", alpha: "AAPL", twelve: "AAPL" },
    market: "NASDAQ",
    currency: "USD",
    price: 292.45,
    return12m: 39.0,
    roe: 45.0,
    debtRatio: 140.0,
    per: 35.4,
    pbr: 12.4,
    fcfYield: 2.9,
    volatility: 24.0,
    sector: "소비자 플랫폼 / 디바이스",
    industry: "스마트폰, 서비스, 웨어러블",
    marketCapBand: "메가캡",
    styleProfile: "프리미엄 퀄리티",
    thesis: "하드웨어 판매보다 서비스 생태계와 자사주 매입이 밸류를 지탱하는 종목입니다. 급격한 폭발성보다는 안정적 현금창출과 브랜드 파워에 베팅하는 성격이 강합니다.",
    catalysts: [
      "서비스 매출 비중 확대",
      "AI 디바이스 교체 수요 자극",
      "대규모 자사주 매입과 마진 방어"
    ],
    risks: [
      "밸류에이션이 이미 높아 멀티플 부담 존재",
      "중국 판매 둔화와 규제 이슈",
      "신제품 사이클이 약하면 모멘텀 둔화"
    ],
    watchItems: [
      "아이폰 교체 주기 회복 여부",
      "서비스 총마진 추세",
      "중국 매출과 재고 데이터"
    ],
    peerTickers: ["MSFT", "GOOGL", "005930:KRX"],
    sourceLabel: "Finance + Stock Analysis snapshot",
    sourceDate: "2026-05-11",
    sourceNote: "Current price from finance feed on 2026-05-11; valuation context from StockAnalysis overview snapshot"
  },
  {
    id: "MSFT",
    name: "Microsoft",
    displayName: "Microsoft",
    koName: "마이크로소프트",
    aliases: ["마이크로소프트", "마소", "Microsoft Corp."],
    symbol: "MSFT",
    providerSymbols: { stooq: "msft.us", alpha: "MSFT", twelve: "MSFT" },
    market: "NASDAQ",
    currency: "USD",
    price: 411.04,
    return12m: 15.0,
    roe: 34.0,
    debtRatio: 31.0,
    per: 24.5,
    pbr: 8.7,
    fcfYield: 3.5,
    volatility: 21.0,
    sector: "소프트웨어 / 클라우드",
    industry: "생산성 소프트웨어, Azure, AI 플랫폼",
    marketCapBand: "메가캡",
    styleProfile: "대형 퀄리티 성장",
    thesis: "클라우드와 AI 인프라의 운영 레버리지, 그리고 오피스 생태계의 락인이 강점입니다. 폭발적 성장보다는 높은 수익성과 안정적 현금흐름이 같이 붙는 유형입니다.",
    catalysts: [
      "Azure 성장률 반등",
      "Copilot 수익화 가시화",
      "기업용 소프트웨어 지출 회복"
    ],
    risks: [
      "AI 투자비 증가로 단기 마진 압박",
      "대형주 밸류 재평가 시 멀티플 조정",
      "클라우드 경쟁 심화"
    ],
    watchItems: [
      "Azure 성장률과 AI 기여분",
      "영업마진 유지력",
      "엔터프라이즈 수요 둔화 신호"
    ],
    peerTickers: ["AAPL", "GOOGL", "AMZN"],
    sourceLabel: "Finance + Stock Analysis snapshot",
    sourceDate: "2026-05-11",
    sourceNote: "Current price from finance feed on 2026-05-11; valuation context from StockAnalysis overview snapshot"
  },
  {
    id: "NVDA",
    name: "NVIDIA",
    displayName: "NVIDIA",
    koName: "엔비디아",
    aliases: ["엔비디아", "엔비디아 주식회사", "NVIDIA Corporation"],
    symbol: "NVDA",
    providerSymbols: { stooq: "nvda.us", alpha: "NVDA", twelve: "NVDA" },
    market: "NASDAQ",
    currency: "USD",
    price: 219.07,
    return12m: 84.0,
    roe: 64.0,
    debtRatio: 24.0,
    per: 53.7,
    pbr: 31.0,
    fcfYield: 1.9,
    volatility: 36.0,
    sector: "반도체 / AI 인프라",
    industry: "GPU, 데이터센터, 플랫폼 소프트웨어",
    marketCapBand: "메가캡",
    styleProfile: "초고성장 모멘텀",
    thesis: "AI 투자 사이클의 핵심 수혜주입니다. 데이터센터 수요가 유지되면 실적이 빠르게 상향될 수 있지만, 기대치가 높은 만큼 작은 실망도 주가에 크게 반영됩니다.",
    catalysts: [
      "데이터센터 수주 지속",
      "신형 GPU 공급 확대",
      "AI CAPEX 사이클 장기화"
    ],
    risks: [
      "과열된 밸류에이션과 높은 기대치",
      "대형 고객사 주문 조정 가능성",
      "공급 병목 또는 경쟁 심화"
    ],
    watchItems: [
      "데이터센터 매출 성장률",
      "총마진 가이던스",
      "대형 클라우드 업체 CAPEX 계획"
    ],
    peerTickers: ["AMD", "AVGO", "005930:KRX"],
    sourceLabel: "Finance + Stock Analysis snapshot",
    sourceDate: "2026-05-11",
    sourceNote: "Current price from finance feed on 2026-05-11; valuation context from StockAnalysis overview snapshot"
  },
  {
    id: "GOOGL",
    name: "Alphabet",
    displayName: "Alphabet",
    koName: "알파벳",
    aliases: ["알파벳", "구글", "알파벳 주식회사", "Google"],
    symbol: "GOOGL",
    providerSymbols: { stooq: "googl.us", alpha: "GOOGL", twelve: "GOOGL" },
    market: "NASDAQ",
    currency: "USD",
    price: 394.0,
    return12m: 78.0,
    roe: 32.0,
    debtRatio: 10.0,
    per: 30.0,
    pbr: 8.2,
    fcfYield: 3.1,
    volatility: 26.0,
    sector: "인터넷 플랫폼",
    industry: "검색, 광고, 클라우드, 유튜브",
    marketCapBand: "메가캡",
    styleProfile: "현금부자 플랫폼",
    thesis: "검색과 광고의 현금창출력, 클라우드 레버리지, 순현금 체력이 동시에 있는 종목입니다. AI 경쟁 리스크는 있지만 밸런스가 가장 좋은 메가캡 중 하나로 볼 수 있습니다.",
    catalysts: [
      "클라우드 흑자 확대",
      "광고 경기 회복",
      "주주환원과 AI 제품 상용화"
    ],
    risks: [
      "검색 점유율 변화와 생성형 AI 경쟁",
      "규제 및 반독점 이슈",
      "광고 경기 둔화"
    ],
    watchItems: [
      "클라우드 영업이익률",
      "검색 광고 성장률",
      "규제 뉴스 흐름"
    ],
    peerTickers: ["META", "MSFT", "AAPL"],
    sourceLabel: "Finance + Stock Analysis snapshot",
    sourceDate: "2026-05-11",
    sourceNote: "Current price from finance feed on 2026-05-11; valuation context from StockAnalysis overview snapshot"
  },
  {
    id: "NOW",
    name: "ServiceNow",
    displayName: "ServiceNow",
    koName: "서비스나우",
    aliases: ["서비스나우", "서비스나우 주식", "ServiceNow Inc.", "NOW"],
    symbol: "NOW",
    providerSymbols: { stooq: "now.us", alpha: "NOW", twelve: "NOW" },
    market: "NYSE",
    currency: "USD",
    price: 95.07,
    return12m: 0,
    roe: 0,
    debtRatio: 0,
    per: 55.9,
    pbr: 0,
    fcfYield: 0,
    volatility: 28.0,
    sector: "엔터프라이즈 소프트웨어 / 워크플로 자동화",
    industry: "IT 서비스 관리, 디지털 워크플로, AI 에이전트 플랫폼",
    marketCapBand: "메가캡",
    styleProfile: "고밸류 소프트웨어 성장",
    thesis: "대형 기업의 ITSM와 업무 자동화 표준으로 자리 잡은 플랫폼 성격이 강합니다. 신규 고객 확대보다 기존 고객 지출 확대와 모듈 확장이 핵심 성장 동력이라, 해지율보다 대형 고객의 확장 속도를 보는 편이 중요합니다.",
    catalysts: [
      "Now Platform 내 AI 기능 상용화 속도",
      "대형 엔터프라이즈 고객의 모듈 확장",
      "구독 매출 성장률과 잔존가치 유지"
    ],
    risks: [
      "높은 멀티플로 인해 성장 둔화 시 밸류 압축 가능성",
      "대형 고객 예산 집행 지연 시 수주 속도 둔화",
      "세일즈포스, 마이크로소프트 등과의 플랫폼 경쟁"
    ],
    watchItems: [
      "구독 매출 성장률과 cRPO 추이",
      "AI 제품이 실제 업셀링으로 이어지는지 여부",
      "영업마진과 자유현금흐름률 유지력"
    ],
    peerTickers: ["MSFT", "CRM", "ADBE"],
    sourceLabel: "Finance snapshot + workflow software brief",
    sourceDate: "2026-05-15",
    sourceNote: "Current price and PE from finance feed on 2026-05-15; business profile summarized for enterprise workflow software context"
  }
];

const workbookHoldingsTuples = [
  ["NVDA", "엔비디아", "AI 반도체 및 가속 컴퓨팅 설계", "AI / 빅테크 / 클라우드", "core", 5],
  ["MSFT", "마이크로소프트", "클라우드 인프라 및 AI 소프트웨어", "AI / 빅테크 / 클라우드", "core", 5],
  ["AAPL", "애플", "모바일 하드웨어 및 서비스 생태계", "AI / 빅테크 / 클라우드", "core", 4],
  ["AMZN", "아마존", "글로벌 이커머스 및 AWS 클라우드", "AI / 빅테크 / 클라우드", "core", 5],
  ["GOOGL", "알파벳", "검색 엔진, 디지털 광고 및 클라우드", "AI / 빅테크 / 클라우드", "core", 5],
  ["AVGO", "브로드컴", "통신 네트워크 및 맞춤형 반도체 설계", "반도체 / AI 인프라", "core", 5],
  ["TXN", "텍사스 인스트루먼트", "아날로그 및 임베디드 반도체", "반도체 / AI 인프라", "defensive", 3],
  ["SNPS", "시노프시스", "반도체 설계 자동화(EDA) 소프트웨어", "반도체 / AI 인프라", "growth", 4],
  ["CDNS", "캐던스 디자인 시스템즈", "반도체 설계 및 검증 소프트웨어", "반도체 / AI 인프라", "growth", 4],
  ["KLAC", "KLA", "반도체 제조 공정 검사 및 계측 장비", "반도체 / AI 인프라", "growth", 3],
  ["DELL", "델", "PC, 서버 및 IT 인프라 솔루션", "반도체 / AI 인프라", "growth", 3],
  ["JBL", "자빌", "전자제품 제조 서비스 및 공급망 솔루션", "반도체 / AI 인프라", "growth", 3],
  ["ORCL", "오라클", "기업용 데이터베이스 및 클라우드 인프라", "기업 SW / SaaS / 보안", "core", 4],
  ["CRM", "세일즈포스", "클라우드 기반 고객 관계 관리(CRM)", "기업 SW / SaaS / 보안", "growth", 4],
  ["ADBE", "어도비", "창작 소프트웨어 및 디지털 마케팅", "기업 SW / SaaS / 보안", "growth", 4],
  ["NOW", "서비스나우", "IT 서비스 및 워크플로우 자동화", "기업 SW / SaaS / 보안", "growth", 5],
  ["WDAY", "워크데이", "클라우드 기반 기업 인사 및 재무 관리", "기업 SW / SaaS / 보안", "growth", 3],
  ["FFIV", "F5", "멀티 클라우드 애플리케이션 보안 및 전송", "기업 SW / SaaS / 보안", "growth", 2],
  ["ETN", "이튼", "전력 관리 솔루션 및 에너지 인프라", "산업 / 국방 / 인프라", "core", 4],
  ["MSI", "모토로라 솔루션", "공공 안전 통신 장비 및 시스템", "산업 / 국방 / 인프라", "defensive", 3],
  ["WM", "웨이스트 매니지먼트", "종합 폐기물 처리 및 재활용", "산업 / 국방 / 인프라", "defensive", 3],
  ["TDG", "트랜스디그름", "항공우주 및 방산용 특수 부품", "산업 / 국방 / 인프라", "growth", 3],
  ["BA", "보잉", "상업용 항공기 제조 및 방위산업", "산업 / 국방 / 인프라", "growth", 2],
  ["AXON", "액슨", "스마트 무기 및 법 집행용 보안 기기", "산업 / 국방 / 인프라", "growth", 4],
  ["IEX", "IDEX", "특수 펌프 및 정밀 유체 기기 제조", "산업 / 국방 / 인프라", "defensive", 2],
  ["COST", "코스트코", "회원제 창고형 할인 매장", "소비 / 플랫폼", "defensive", 4],
  ["HD", "홈디포", "주택 개량 용품 및 건축 자재 소매", "소비 / 플랫폼", "defensive", 3],
  ["NFLX", "넷플릭스", "구독형 비디오 스트리밍 플랫폼", "소비 / 플랫폼", "growth", 3],
  ["UBER", "우버", "글로벌 승차 공유 및 모빌리티 플랫폼", "소비 / 플랫폼", "growth", 3],
  ["CVNA", "카바나", "온라인 중고차 거래 플랫폼", "소비 / 플랫폼", "volatile", 2],
  ["NWSA", "뉴스 코프", "글로벌 뉴스 미디어 및 정보 서비스", "소비 / 플랫폼", "defensive", 2],
  ["ICE", "인터컨티넨탈 익스체인지", "글로벌 금융 거래소 및 데이터", "금융 / 크립토 / 데이터", "core", 3],
  ["MSTR", "마이크로스트래티지", "기업용 SW 및 비트코인 투자", "금융 / 크립토 / 데이터", "volatile", 3],
  ["COIN", "코인베이스", "암호화폐 거래 및 핀테크 플랫폼", "금융 / 크립토 / 데이터", "volatile", 3],
  ["MARA", "MARA 홀딩스", "디지털 자산 및 비트코인 채굴", "금융 / 크립토 / 데이터", "volatile", 2],
  ["DVA", "다비타", "종합 신장 투석 및 만성 질환 관리 서비스", "헬스케어 / 유틸리티", "defensive", 2],
  ["WST", "웨스트 파마슈티컬", "주사용 의약품 포장 및 전달 시스템", "헬스케어 / 유틸리티", "defensive", 2],
  ["XEL", "엑셀 에너지", "전기, 가스 유틸리티 및 신재생 에너지", "헬스케어 / 유틸리티", "defensive", 2],
  ["VTI", "뱅가드 종합 주식 시장", "미국 주식 시장 전체 분산 투자", "ETF / 자산배분", "etf", 5],
  ["VOO", "뱅가드 S&P 500", "미국 우량 대형주 500개 집중 투자", "ETF / 자산배분", "etf", 5],
  ["IEMG", "MSCI 신흥시장", "주요 신흥국 주식 시장 분산 투자", "ETF / 자산배분", "etf", 3],
  ["XLK", "기술 섹터 선택", "S&P 500 내 핵심 기술 기업 집중 투자", "ETF / 자산배분", "etf", 4],
  ["EFA", "MSCI EAFE", "미국과 캐나다 제외 선진국 시장 투자", "ETF / 자산배분", "etf", 3],
  ["IWB", "러셀 1000", "미국 주식 시장 상위 1000개 대형주 투자", "ETF / 자산배분", "etf", 4],
  ["RSP", "S&P 500 균등 가중", "S&P 500 종목을 동일 비율로 분산", "ETF / 자산배분", "etf", 4],
  ["XLI", "산업 섹터 SPDR", "미국 항공, 국방, 제조 등 산업재 투자", "ETF / 자산배분", "etf", 3],
  ["GOVT", "미국 국채", "다양한 만기의 미국 국채 분산 투자", "ETF / 자산배분", "etf", 4],
  ["COMT", "GSCI 원자재", "원유, 금속, 농산물 등 광범위한 원자재 투자", "ETF / 자산배분", "etf", 3]
];

const workbookExchangeMap = {
  AMZN: "NASDAQ", AVGO: "NASDAQ", TXN: "NASDAQ", SNPS: "NASDAQ", CDNS: "NASDAQ", KLAC: "NASDAQ",
  DELL: "NYSE", JBL: "NYSE", ORCL: "NYSE", CRM: "NYSE", ADBE: "NASDAQ", WDAY: "NASDAQ", FFIV: "NASDAQ",
  ETN: "NYSE", MSI: "NYSE", WM: "NYSE", TDG: "NYSE", BA: "NYSE", AXON: "NASDAQ", IEX: "NYSE",
  COST: "NASDAQ", HD: "NYSE", NFLX: "NASDAQ", UBER: "NYSE", CVNA: "NYSE", NWSA: "NASDAQ",
  ICE: "NYSE", MSTR: "NASDAQ", COIN: "NASDAQ", MARA: "NASDAQ", DVA: "NYSE", WST: "NYSE", XEL: "NASDAQ",
  VTI: "ETF", VOO: "ETF", IEMG: "ETF", XLK: "ETF", EFA: "ETF", IWB: "ETF", RSP: "ETF", XLI: "ETF", GOVT: "ETF", COMT: "ETF"
};

function inferWorkbookMetrics(risk, score) {
  const baseByRisk = {
    core: { return12m: 28, roe: 24, debtRatio: 38, per: 28, pbr: 7.5, fcfYield: 3.1, volatility: 24 },
    growth: { return12m: 34, roe: 18, debtRatio: 42, per: 34, pbr: 8.8, fcfYield: 2.2, volatility: 31 },
    defensive: { return12m: 16, roe: 15, debtRatio: 48, per: 21, pbr: 4.5, fcfYield: 3.8, volatility: 18 },
    volatile: { return12m: 22, roe: 9, debtRatio: 58, per: 40, pbr: 6.1, fcfYield: 1.3, volatility: 46 },
    etf: { return12m: 14, roe: 12, debtRatio: 20, per: 18, pbr: 3.2, fcfYield: 2.5, volatility: 17 }
  };

  const base = baseByRisk[risk] || baseByRisk.growth;
  const modifier = (score - 3) * 2;
  return {
    return12m: base.return12m + modifier * 2,
    roe: Math.max(4, base.roe + modifier),
    debtRatio: Math.max(10, base.debtRatio - modifier * 2),
    per: Math.max(10, base.per + (risk === "growth" ? modifier : -modifier * 0.4)),
    pbr: Math.max(1, base.pbr + modifier * 0.2),
    fcfYield: Math.max(0.6, base.fcfYield + (risk === "defensive" || risk === "etf" ? modifier * 0.15 : -modifier * 0.08)),
    volatility: Math.max(12, base.volatility + (risk === "volatile" ? modifier * 3 : modifier))
  };
}

function buildWorkbookStock([ticker, company, description, category, risk, score]) {
  const metrics = inferWorkbookMetrics(risk, score);
  const market = workbookExchangeMap[ticker] || "US";
  const providerSymbol = `${ticker.toLowerCase()}.us`;
  const riskLabel = risk === "core" ? "코어" : risk === "growth" ? "성장" : risk === "defensive" ? "방어" : risk === "volatile" ? "고변동" : "ETF";
  const styleProfile = risk === "core" ? "워크북 코어 편입" : risk === "growth" ? "워크북 성장 편입" : risk === "defensive" ? "워크북 방어 편입" : risk === "volatile" ? "워크북 고변동 편입" : "워크북 ETF 편입";

  return {
    id: ticker,
    name: ticker,
    displayName: company,
    koName: company,
    aliases: [company, ticker, category, description],
    symbol: ticker,
    providerSymbols: { stooq: providerSymbol, alpha: ticker, twelve: ticker },
    market,
    currency: "USD",
    price: null,
    ...metrics,
    sector: category,
    industry: description,
    marketCapBand: risk === "etf" ? "ETF" : score >= 4 ? "대형주 중심" : "중형주 포함",
    styleProfile,
    thesis: `${description} 테마로 워크북에서 분류된 종목입니다. 현재 앱에는 엑셀 워크북 분류와 리스크 태그를 우선 반영했고, 실제 가격은 실시간 갱신 버튼으로 다시 불러오는 구조를 권장합니다.`,
    catalysts: [
      `${category} 테마 내 자금 유입 여부`,
      `${riskLabel} 성격에 맞는 실적/수급 지속성`,
      `워크북 관심도 ${score}/5 유지 여부`
    ],
    risks: [
      "워크북 가져오기 기반이라 상세 재무 원본 검증이 추가로 필요합니다.",
      risk === "volatile" ? "가격 변동성이 큰 그룹으로 비중 관리가 우선입니다." : "테마 기대감이 선반영되면 밸류 부담이 생길 수 있습니다.",
      market === "ETF" ? "ETF는 구성 종목 변화와 자산배분 목적을 같이 봐야 합니다." : "개별 종목은 실적 시즌과 가이던스에 민감합니다."
    ],
    watchItems: [
      "실시간 가격 새로고침으로 현재가 확인",
      "최근 뉴스와 실적 일정 확인",
      `${category} 내 비교 종목 상대강도 점검`
    ],
    sourceLabel: "Imported workbook holdings snapshot",
    sourceDate: "2026-05-17",
    sourceNote: "C:/Users/휘원/Documents/Codex/2026-05-17/nvda-ceo-servicenow-now-2-1 워크북 종목군을 가져온 테마 스냅샷입니다. 가격과 상세 재무는 실시간 갱신 또는 추가 검증이 필요합니다."
  };
}

const workbookImportedStocks = workbookHoldingsTuples.map(buildWorkbookStock);

const kospiLeaderTuples = [
  ["005930", "삼성전자", "메모리, 파운드리, 모바일 디바이스", "반도체 / IT 하드웨어", "core", 5],
  ["000660", "SK하이닉스", "메모리 반도체", "반도체 / AI 인프라", "core", 5],
  ["373220", "LG에너지솔루션", "배터리 셀 및 ESS", "2차전지 / 전력 인프라", "growth", 4],
  ["207940", "삼성바이오로직스", "바이오의약품 위탁생산", "헬스케어 / 바이오", "core", 4],
  ["005380", "현대차", "완성차 및 전동화", "자동차 / 모빌리티", "core", 4],
  ["000270", "기아", "완성차 및 RV 중심 글로벌 판매", "자동차 / 모빌리티", "core", 4],
  ["105560", "KB금융", "은행 및 금융지주", "금융 / 배당", "defensive", 4],
  ["055550", "신한지주", "은행 및 금융지주", "금융 / 배당", "defensive", 4],
  ["035420", "NAVER", "검색, 커머스, 플랫폼", "인터넷 플랫폼", "growth", 4],
  ["012450", "한화에어로스페이스", "방산, 항공엔진, 우주", "산업 / 국방 / 인프라", "growth", 5],
  ["068270", "셀트리온", "바이오시밀러 및 제약", "헬스케어 / 바이오", "growth", 3],
  ["034020", "두산에너빌리티", "원전, 발전설비, 에너지 인프라", "산업 / 국방 / 인프라", "growth", 4],
  ["003670", "포스코퓨처엠", "양극재, 음극재", "2차전지 / 소재", "growth", 3],
  ["329180", "HD현대중공업", "조선 및 해양플랜트", "산업 / 조선", "growth", 4],
  ["267260", "HD현대일렉트릭", "전력기기 및 변압기", "전력 / 인프라", "growth", 4],
  ["259960", "크래프톤", "게임 및 디지털 콘텐츠", "콘텐츠 / 게임", "growth", 3],
  ["009540", "HD한국조선해양", "조선 지주 및 해양 엔지니어링", "산업 / 조선", "growth", 4],
  ["086790", "하나금융지주", "은행 및 금융지주", "금융 / 배당", "defensive", 4],
  ["024110", "기업은행", "국책은행 성격 금융", "금융 / 배당", "defensive", 3],
  ["015760", "한국전력", "전력 유틸리티", "유틸리티 / 방어", "defensive", 3],
  ["042700", "한미반도체", "반도체 후공정 장비", "반도체 / AI 인프라", "growth", 4],
  ["047810", "한국항공우주", "항공기 및 방산", "산업 / 국방 / 인프라", "growth", 3],
  ["006400", "삼성SDI", "배터리 및 전자재료", "2차전지 / 소재", "growth", 3],
  ["028260", "삼성물산", "건설, 상사, 바이오 지분", "지주 / 복합기업", "defensive", 3],
  ["010130", "고려아연", "비철금속 및 소재", "소재 / 원자재", "defensive", 3],
  ["032830", "삼성생명", "보험", "금융 / 보험", "defensive", 3],
  ["018260", "삼성SDS", "IT 서비스 및 물류 플랫폼", "기업 SW / IT서비스", "core", 3],
  ["316140", "우리금융지주", "은행 및 금융지주", "금융 / 배당", "defensive", 4],
  ["051910", "LG화학", "석유화학, 배터리 소재", "화학 / 소재", "growth", 3],
  ["138040", "메리츠금융지주", "금융지주 및 자본시장", "금융 / 배당", "core", 4]
];

function buildKospiLeaderStock([code, company, description, category, risk, score]) {
  const metrics = inferWorkbookMetrics(risk, score);
  const riskLabel = risk === "core" ? "코어" : risk === "growth" ? "성장" : "방어";
  const styleProfile = risk === "core" ? "코스피 코어 대표주" : risk === "growth" ? "코스피 성장 대표주" : "코스피 방어 대표주";

  return {
    id: `${code}:KRX`,
    name: company,
    displayName: company,
    koName: company,
    aliases: [company, code, `${code}:KRX`, category, description, "코스피", "KOSPI"],
    symbol: `${code}:KRX`,
    providerSymbols: { alpha: code, twelve: `${code}:KRX` },
    market: "KOSPI",
    currency: "KRW",
    price: null,
    ...metrics,
    sector: category,
    industry: description,
    marketCapBand: score >= 4 ? "코스피 대형주" : "코스피 중대형주",
    styleProfile,
    thesis: `${company}은(는) ${description} 축에서 코스피 대표 비교군으로 넣은 종목입니다. 현재가는 실시간 공급자 연결 전까지 비어 있을 수 있으니, 점수는 팩터 구조 중심으로 읽도록 설계했습니다.`,
    catalysts: [
      `${category} 수급과 업황 변화`,
      `${riskLabel} 성격에 맞는 실적 지속성`,
      "원화 강세/약세와 국내 증시 체제 변화"
    ],
    risks: [
      "현재 코스피 비교 테이블은 대표 30종목 스냅샷입니다.",
      "실제 재무 원본과 실시간 가격은 추가 검증이 필요할 수 있습니다.",
      risk === "growth" ? "성장 기대가 선반영되면 밸류 부담이 커질 수 있습니다." : "배당/방어 성격이어도 체제 전환기에는 변동성이 커질 수 있습니다."
    ],
    watchItems: [
      "실적 발표와 가이던스 확인",
      "외국인 수급과 원달러 흐름 확인",
      `${category} 내 상대강도 비교`
    ],
    sourceLabel: "Curated KOSPI leaders snapshot",
    sourceDate: "2026-05-17",
    sourceNote: "코스피 대표 30종목 비교 유니버스를 수동 큐레이션한 스냅샷입니다. 현재가는 비어 있을 수 있고, 비교 목적상 팩터 구조를 우선해서 보도록 설계했습니다."
  };
}

const kospiLeaderStocks = kospiLeaderTuples.map(buildKospiLeaderStock);

const marketMaster = Array.isArray(window.MARKET_MASTER?.stocks) ? window.MARKET_MASTER.stocks : [];
const marketCounts = window.MARKET_MASTER?.counts ?? { nasdaq: 0, kosdaq: 0, kospi: 0 };
const importedWorkbookCount = workbookImportedStocks.length;
const stockCatalog = (() => {
  const merged = new Map();

  const mergeStockRecord = (stock) => {
    const previous = merged.get(stock.id) ?? {};
    const next = { ...previous };

    for (const [key, value] of Object.entries(stock)) {
      if (value !== undefined) {
        next[key] = value;
      }
    }

    merged.set(stock.id, next);
  };

  for (const stock of marketMaster) {
    mergeStockRecord(stock);
  }

  for (const stock of featuredStockCatalog) {
    mergeStockRecord(stock);
  }

  for (const stock of workbookImportedStocks) {
    mergeStockRecord(stock);
  }

  for (const stock of kospiLeaderStocks) {
    mergeStockRecord(stock);
  }

  return [...merged.values()];
})();

const providerHelpText = {
  snapshot: "실시간 호출 없이 현재 내장된 실제 종목 스냅샷만 사용합니다.",
  stooq: "미국 종목만 무키로 현재가 갱신을 시도합니다. 한국 종목은 지원하지 않습니다.",
  alpha: "Alpha Vantage는 브라우저 호출이 가능하지만 API 키가 필요합니다. 글로벌 심볼 검색과 현재가 조회에 적합합니다.",
  twelve: "Twelve Data는 API 키가 필요하며 KRX 심볼 예시로 005930:KRX 형식을 공식 지원합니다."
};

const investingCapture = [
  {
    title: "Markets 공개 시그널",
    status: "captured",
    description: "Investing.com 공개 markets 페이지에서 한국어 기준으로 확인된 탐색 링크입니다. `AI가 선택한 주식`, `저평가된 주식`, `삼성전자`, `엔비디아`, `애플`이 공개 HTML에 노출되어 있었습니다.",
    links: [
      { label: "Markets", href: "https://kr.investing.com/markets/" },
      { label: "저평가된 주식", href: "https://kr.investing.com/markets/stocks/under-valued-stocks" }
    ]
  },
  {
    title: "ProPicks Top Value Stocks",
    status: "partial",
    description: "페이지 셸과 앱 번들은 내려오지만, 실제 종목 리스트는 정적 HTML에 없었습니다. 즉, 현재는 경로와 전략 카테고리 존재만 확인된 상태입니다.",
    links: [
      { label: "ProPicks", href: "https://kr.investing.com/pro/propicks" },
      { label: "Top Value", href: "https://kr.investing.com/pro/propicks/top-value-stocks" }
    ]
  },
  {
    title: "내부 API 구조 확인",
    status: "blocked",
    description: "ProPicks HTML과 번들에는 `pro.api.investing.com/finbox/propicks/v1` 및 백테스트 관련 라벨이 보였지만, 실제 종목 데이터는 세션 기반 런타임 호출로 보입니다. 그래서 로그인 없는 정적 스크래핑은 제한됩니다.",
    links: [
      { label: "InvestingPro", href: "https://kr.investing.com/pro/propicks" }
    ]
  }
];

const etfModels = [
  {
    name: "미국 코어-위성형",
    summary: "장기 성장과 방어를 같이 잡는 기본형입니다.",
    items: [
      { ticker: "VOO", label: "S&P 500 코어", weight: 35 },
      { ticker: "QQQ", label: "대형 기술 성장", weight: 20 },
      { ticker: "SCHD", label: "배당/퀄리티", weight: 15 },
      { ticker: "XLV", label: "헬스케어 방어", weight: 10 },
      { ticker: "SOXX", label: "반도체 위성", weight: 10 },
      { ticker: "BIL", label: "현금성 ETF", weight: 10 }
    ]
  },
  {
    name: "한국-미국 혼합형",
    summary: "국내 투자 친화형으로, 한국 지수와 미국 성장 축을 함께 둔 모델입니다.",
    items: [
      { ticker: "KODEX 200", label: "한국 대형주 코어", weight: 25 },
      { ticker: "TIGER 미국S&P500", label: "미국 광범위 코어", weight: 25 },
      { ticker: "TIGER 미국나스닥100", label: "미국 성장주", weight: 20 },
      { ticker: "KODEX 반도체", label: "국내 반도체 위성", weight: 10 },
      { ticker: "ACE 미국채10년", label: "금리 완충", weight: 10 },
      { ticker: "현금", label: "리스크 버퍼", weight: 10 }
    ]
  },
  {
    name: "ProPicks US20 프록시",
    summary: "실제 US20 보유종목은 마스킹되어 있어, 전략 설명과 벤치마크를 바탕으로 유사 노출을 만드는 ETF 조합입니다.",
    items: [
      { ticker: "RPV", label: "S&P 500 Pure Value 벤치마크", weight: 30 },
      { ticker: "IWD", label: "미국 대형 가치주", weight: 25 },
      { ticker: "VOE", label: "미국 중형 가치주", weight: 15 },
      { ticker: "AVUV", label: "미국 소형 가치주 보강", weight: 10 },
      { ticker: "XLE", label: "가치주 편중 섹터 대응", weight: 10 },
      { ticker: "BIL", label: "월간 리밸런싱 대기 자금", weight: 10 }
    ]
  }
];

const propicksLive = {
  strategy: "US20",
  title: "상위 가치주",
  date: "2026-05-12",
  totalReturn: "+1,253.9%",
  benchmark: "S&P 500 Pure Value",
  benchmarkReturn: "+222.5%",
  excessReturn: "+1,031.5%",
  annualReturn: "+21.6%",
  sharpe: "0.95",
  risk: "중간",
  rebalance: "월간",
  startDate: "2013-01-01",
  tradeRegion: "미국",
  marketCap: "중형주, 대형주",
  averageVolume: "> 1K",
  maxHoldings: "20",
  backgroundFilter: "주가수익비율 < 35",
  description: "AI를 활용해 미국 상장 가치주 중 저평가 가능성이 높은 종목을 추려내는 전략입니다. 페이지 설명에는 특히 주가수익비율 15배 미만의 성장 잠재 종목을 강조하고 있습니다.",
  winners: [
    {
      name: "Vistra Corp.",
      ticker: "NYSE:VST",
      pickReturn: "+82.4%",
      benchmarkAlpha: "+986.0%",
      note: "전력/유틸리티 성격의 가치주가 전략에서 강하게 작동했던 사례로 노출되었습니다."
    },
    {
      name: "Williams-Sonoma, Inc.",
      ticker: "NYSE:WSM",
      pickReturn: "+46.0%",
      benchmarkAlpha: "+148.3%",
      note: "소비재 섹터에서도 저평가-퀄리티 조합이 포착될 수 있음을 보여주는 사례입니다."
    }
  ],
  accessNote: "현재 편입 20종목 이름은 페이지에서 `XXX:XXXX` 형태로 마스킹되어 있어 계정 권한상 직접 노출되지 않았습니다."
};

const ipoWatchSnapshot = {
  asOf: "2026-05-17",
  note: "최근 공개 보도와 거래소/시장 기사 기준의 이벤트 워치리스트입니다."
};

const ipoWatchList = [
  {
    id: "spacex",
    name: "SpaceX",
    stage: "상장 추진 보도",
    badge: "watch",
    timing: "2026년 6월 관측",
    angle: "우주발사, Starlink, 위성통신, 방산/AI 인프라",
    summary: "Reuters 계열 보도 기준으로 2026년 6월 Nasdaq 상장 가능성과 SEC 검토 이슈가 함께 부각됐습니다. 확정 공시 전 단계라 기대와 규제 리스크를 같이 봐야 합니다.",
    relatedPublic: ["RKLB", "ASTS", "IRDM", "PLTR"],
    links: [
      { label: "Reuters / FT 경로", href: "https://www.investing.com/news/stock-market-news/spacex-weighs-june-2026-ipo-at-15-trillion-valuation-ft-reports-4469159" },
      { label: "SEC scrutiny", href: "https://www.investing.com/news/stock-market-news/investor-group-urges-sec-to-scrutinize-spacex-ipo-filing-avoid-conflicts-4663873" }
    ]
  },
  {
    id: "quantinuum",
    name: "Quantinuum",
    stage: "공개 IPO filing",
    badge: "filed",
    timing: "서류 공개 완료",
    angle: "양자컴퓨팅, 고성장 적자기술, Honeywell 스핀아웃",
    summary: "Honeywell 계열 양자컴퓨팅 기업 Quantinuum은 2026년 5월 초 미국 IPO 서류를 공개했습니다. 상장 일정보다 적자 구조, 기술 검증, 동종 양자주 밸류를 같이 보는 편이 중요합니다.",
    relatedPublic: ["IONQ", "RGTI", "QBTS", "HON"],
    links: [
      { label: "Reuters / Yahoo", href: "https://finance.yahoo.com/markets/stocks/articles/honeywells-quantinuum-makes-us-ipo-201627012.html" }
    ]
  },
  {
    id: "bxdc",
    name: "Blackstone Digital Infrastructure Trust",
    stage: "상장 직후",
    badge: "live",
    timing: "2026-05-14 NYSE 데뷔",
    angle: "데이터센터, AI 전력/인프라, 부동산 구조",
    summary: "Blackstone의 데이터센터 투자기구는 2026년 5월 중순 미국 IPO를 마치고 거래를 시작했습니다. AI 인프라 테마를 REIT/인프라 성격으로 보는 레퍼런스 종목입니다.",
    relatedPublic: ["BXDC", "EQIX", "DLR", "VRT"],
    links: [
      { label: "Reuters / IPO pricing", href: "https://www.investing.com/news/stock-market-news/blackstone-data-center-reit-raises-175-billion-in-us-ipo-4686917" },
      { label: "NYSE debut", href: "https://m.investing.com/news/stock-market-news/blackstone-data-center-vehicle-opens-flat-in-new-york-debut-after-175-billion-ipo-4689443?ampMode=1" }
    ]
  },
  {
    id: "stripe",
    name: "Stripe",
    stage: "비상장 대형주",
    badge: "private",
    timing: "직접 IPO 미확정",
    angle: "결제 인프라, 핀테크, 직원 유동성 이벤트",
    summary: "Stripe는 2026년 2월 직원 지분 매각에서 약 1590억 달러 가치가 거론됐지만, Reuters 보도 기준으로는 대형 비상장 상태를 더 오래 유지할 여지도 큽니다.",
    relatedPublic: ["PYPL", "SHOP", "SQ", "GPN"],
    links: [
      { label: "Reuters / valuation", href: "https://www.investing.com/news/stock-market-news/stripe-valuation-jumps-to-159-billion-in-latest-share-sale-4521419" }
    ]
  }
];

const ipoNewsFeedItems = [
  {
    date: "2026-05-16",
    tag: "SpaceX IPO",
    headline: "SpaceX 상장 일정 가속 보도",
    source: "Reuters / TradingView",
    href: "https://www.tradingview.com/news/reuters.com%2C2026%3Anewsml_L6N41S179%3A0-spacex-accelerates-ipo-timeline-targets-june-12-listing-on-nasdaq-sources-say/",
    note: "일정이 앞당겨질수록 수급 기대는 커지지만, 공모가와 지배구조 논란도 같이 커집니다."
  },
  {
    date: "2026-05-06",
    tag: "SpaceX SEC",
    headline: "연기금 자문그룹, SpaceX 공시 검토 촉구",
    source: "Reuters / Investing.com",
    href: "https://www.investing.com/news/stock-market-news/investor-group-urges-sec-to-scrutinize-spacex-ipo-filing-avoid-conflicts-4663873",
    note: "상장 기대감만이 아니라 공시 품질과 소수주주 권리도 리스크 축으로 봐야 한다는 신호입니다."
  },
  {
    date: "2026-05-08",
    tag: "Quantinuum",
    headline: "Quantinuum, 미국 IPO 서류 공개",
    source: "Reuters / Yahoo Finance",
    href: "https://finance.yahoo.com/markets/stocks/articles/honeywells-quantinuum-makes-us-ipo-201627012.html",
    note: "양자컴퓨팅 테마는 서류 공개만으로도 기존 상장 양자주 변동성을 자극하는 경우가 많습니다."
  },
  {
    date: "2026-05-13",
    tag: "AI Infra IPO",
    headline: "Blackstone 데이터센터 투자기구, 17.5억달러 IPO",
    source: "Reuters / Investing.com",
    href: "https://www.investing.com/news/stock-market-news/blackstone-data-center-reit-raises-175-billion-in-us-ipo-4686917",
    note: "AI 인프라 테마가 반도체뿐 아니라 전력·데이터센터 자산까지 확장되는 흐름을 보여줍니다."
  },
  {
    date: "2026-02-24",
    tag: "Stripe",
    headline: "Stripe, 직원 지분 매각에서 1590억달러 가치",
    source: "Reuters / Investing.com",
    href: "https://www.investing.com/news/stock-market-news/stripe-valuation-jumps-to-159-billion-in-latest-share-sale-4521419",
    note: "상장 대신 비상장 유동성 창구를 넓히는 대표 사례라, 좋은 회사가 꼭 바로 IPO 하진 않는다는 판단 기준이 됩니다."
  }
];

const form = document.querySelector("#stock-form");
const presetGrid = document.querySelector("#presetGrid");
const ipoWatchGrid = document.querySelector("#ipoWatchGrid");
const ipoNewsFeed = document.querySelector("#ipoNewsFeed");
const ipoSectionMeta = document.querySelector("#ipoSectionMeta");
const investingCaptureGrid = document.querySelector("#investingCaptureGrid");
const etfGrid = document.querySelector("#etfGrid");
const propicksSummary = document.querySelector("#propicksSummary");
const propicksWinners = document.querySelector("#propicksWinners");
const marketCoverage = document.querySelector("#marketCoverage");
const financialSummaryShell = document.querySelector("#financialSummaryShell");
const nasdaqRows = document.querySelector("#nasdaqRows");
const kospiRows = document.querySelector("#kospiRows");
const stockSuggestions = document.querySelector("#stockSuggestions");
const factorGrid = document.querySelector("#factorGrid");
const providerSelect = document.querySelector("#providerSelect");
const apiKeyInput = document.querySelector("#apiKeyInput");
const providerHelp = document.querySelector("#providerHelp");
const sourceMeta = document.querySelector("#sourceMeta");

const totalScore = document.querySelector("#totalScore");
const ringValue = document.querySelector("#ringValue");
const stanceTitle = document.querySelector("#stanceTitle");
const stanceBody = document.querySelector("#stanceBody");
const quotePrice = document.querySelector("#quotePrice");
const quoteChange = document.querySelector("#quoteChange");
const quoteTimestamp = document.querySelector("#quoteTimestamp");

const stockSearch = document.querySelector("#stockSearch");
const searchResults = document.querySelector("#searchResults");
const loadStockButton = document.querySelector("#loadStockButton");
const clearSearchButton = document.querySelector("#clearSearchButton");
const refreshQuoteButton = document.querySelector("#refreshQuoteButton");
const fullReviewButton = document.querySelector("#fullReviewButton");
const simpleStatus = document.querySelector("#simpleStatus");
const marketFilter = document.querySelector("#marketFilter");
const matchSummary = document.querySelector("#matchSummary");
const recentSelections = document.querySelector("#recentSelections");
const comparisonMeta = document.querySelector("#comparisonMeta");
const autoRefreshToggle = document.querySelector("#autoRefreshToggle");
const autoRefreshStatus = document.querySelector("#autoRefreshStatus");
const financialSummarySection = document.querySelector("#financial-summary");
const aiResearchCard = document.querySelector("#aiResearchCard");
const marketWidgetCard = document.querySelector("#marketWidgetCard");
const strategyBotCard = document.querySelector("#strategyBotCard");
const riskPortfolioCard = document.querySelector("#riskPortfolioCard");
const automationCard = document.querySelector("#automationCard");

const RECENT_SELECTIONS_KEY = "quant-signal-desk-recent";
const AUTO_REFRESH_KEY = "quant-signal-desk-auto-refresh";
const LIVE_SNAPSHOT_URL = "./live-snapshots.json";
const AUTO_REFRESH_INTERVAL_MS = 60 * 60 * 1000;
const UNIVERSE_ROW_LIMIT = 30;

let autoRefreshTimer = null;
let autoRefreshNextAt = null;

function cloneStock(stock) {
  return JSON.parse(JSON.stringify(stock));
}

function setText(node, value) {
  if (node) {
    node.textContent = value;
  }
}

let selectedStock = cloneStock(stockCatalog[0]);

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatNumber(value, currency) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  const locale = currency === "KRW" ? "ko-KR" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "KRW" ? 0 : 2
  }).format(value);
}

function isForeignStock(stock) {
  return stock.currency === "USD" || stock.market === "NASDAQ" || stock.market === "United States";
}

function getDisplayLabel(stock) {
  if (isForeignStock(stock) && stock.koName && stock.koName !== stock.displayName) {
    return stock.koName;
  }
  return stock.displayName || stock.name || stock.symbol;
}

function getSubLabel(stock) {
  if (isForeignStock(stock) && stock.koName && stock.koName !== stock.displayName) {
    return `${stock.displayName} · ${stock.symbol}`;
  }
  return `${stock.symbol}`;
}

function getActiveMarketFilter() {
  return marketFilter ? marketFilter.value : "ALL";
}

function getMarketFilterLabel(value) {
  const labels = {
    ALL: "전체",
    NASDAQ: "NASDAQ",
    KOREA: "국내 전체",
    KOSPI: "KOSPI",
    KOSDAQ: "KOSDAQ",
    KRX: "KRX 프리셋"
  };

  return labels[value] ?? value;
}

function matchesMarketFilter(stock, market) {
  if (market === "ALL") {
    return true;
  }

  const stockMarket = stock.market || "";
  const symbol = stock.symbol || "";

  if (market === "NASDAQ") {
    return stockMarket === "NASDAQ";
  }

  if (market === "KOSDAQ") {
    return stockMarket === "KOSDAQ" || symbol.endsWith(":KOSDAQ");
  }

  if (market === "KOSPI") {
    return stockMarket === "KOSPI";
  }

  if (market === "KRX") {
    return stockMarket === "KRX" || stockMarket === "Korea" || symbol.endsWith(":KRX");
  }

  if (market === "KOREA") {
    return matchesMarketFilter(stock, "KOSDAQ") || matchesMarketFilter(stock, "KOSPI") || matchesMarketFilter(stock, "KRX");
  }

  return stockMarket === market;
}

function getFilteredCatalog() {
  const market = getActiveMarketFilter();
  return stockCatalog.filter((stock) => matchesMarketFilter(stock, market));
}

function getSearchCandidates(stock) {
  return [
    stock.koName,
    stock.displayName,
    stock.name,
    stock.symbol,
    stock.symbol.replace(":KOSDAQ", "").replace(":KRX", ""),
    ...(Array.isArray(stock.aliases) ? stock.aliases : []),
    `${stock.koName} (${stock.symbol})`,
    `${stock.displayName} (${stock.symbol})`,
    `${stock.name} (${stock.symbol})`
  ]
    .filter(Boolean)
    .map((candidate) => candidate.toLowerCase());
}

function getSearchMatches(input, limit = 8) {
  const normalized = input.trim().toLowerCase();
  const preferredIds = new Set(getFilteredCatalog().map((stock) => stock.id));

  if (!normalized) {
    const visibleFeatured = featuredStockCatalog.filter((stock) => matchesMarketFilter(stock, getActiveMarketFilter()));
    return (visibleFeatured.length ? visibleFeatured : featuredStockCatalog).slice(0, limit);
  }

  const ranked = stockCatalog
    .map((stock) => {
      const candidates = getSearchCandidates(stock);
      let rank = -1;

      if (candidates.includes(normalized)) {
        rank = 0;
      } else if (candidates.some((candidate) => candidate.startsWith(normalized))) {
        rank = 1;
      } else if (candidates.some((candidate) => candidate.includes(normalized))) {
        rank = 2;
      }

      if (rank === -1) {
        return null;
      }

      return {
        stock,
        rank,
        preferred: preferredIds.has(stock.id) ? 0 : 1,
        labelLength: getDisplayLabel(stock).length
      };
    })
    .filter(Boolean)
    .sort((a, b) =>
      a.rank - b.rank ||
      a.preferred - b.preferred ||
      a.labelLength - b.labelLength ||
      a.stock.symbol.localeCompare(b.stock.symbol)
    );

  return ranked.slice(0, limit).map((entry) => entry.stock);
}

function countAvailableMetrics(stock) {
  const metrics = [
    stock.price,
    stock.return12m,
    stock.roe,
    stock.debtRatio,
    stock.per,
    stock.pbr,
    stock.fcfYield,
    stock.volatility
  ];

  return metrics.filter((value) => Number.isFinite(value) && value !== 0).length;
}

function getCoverageModel(stock) {
  const metricCount = countAvailableMetrics(stock);

  if (metricCount >= 7 && stock.thesis) {
    return {
      label: "Deep Brief",
      tone: "strong",
      description: "핵심 지표와 해석 메모가 함께 있는 종목입니다."
    };
  }

  if (metricCount >= 5) {
    return {
      label: "Quant Snapshot",
      tone: "medium",
      description: "퀀트 팩터는 충분하지만 서술형 리서치는 일부만 연결된 상태입니다."
    };
  }

  if (metricCount >= 2) {
    return {
      label: "Partial Snapshot",
      tone: "soft",
      description: "기본 검색과 일부 지표만 있어 1차 후보 선별용으로 적합합니다."
    };
  }

  return {
    label: "Master Only",
    tone: "weak",
    description: "상장 종목 마스터 정보만 있어 실전 판단용으론 부족합니다."
  };
}

function describeStyle(result) {
  const entries = Object.entries(result.factors).sort((a, b) => b[1] - a[1]);
  const top = entries[0]?.[0];

  if (top === "momentum") {
    return "모멘텀 우위";
  }
  if (top === "quality") {
    return "퀄리티 우위";
  }
  if (top === "value") {
    return "가치 우위";
  }
  if (top === "risk") {
    return "리스크 관리형";
  }
  return "균형형";
}

function getValuationRead(stock) {
  if (!(stock.per > 0) && !(stock.pbr > 0)) {
    return "밸류에이션 수치가 비어 있어 절대평가보다는 후보군 스크리닝 용도로만 보는 편이 안전합니다.";
  }

  if (stock.per > 40 || stock.pbr > 8) {
    return "이미 높은 기대가 반영된 가격대일 수 있어, 실적 미스가 나면 멀티플 압축이 크게 나타날 수 있습니다.";
  }

  if ((stock.per > 0 && stock.per <= 15) || (stock.pbr > 0 && stock.pbr <= 1.8)) {
    return "전통적 가치주에 가까운 구간으로 읽을 수 있지만, 저평가 이유가 구조적 문제인지 반드시 분리해서 봐야 합니다.";
  }

  return "극단적으로 싸지도 비싸지도 않은 중간 구간입니다. 실적 추세와 산업 사이클 확인이 중요합니다.";
}

function getQualityRead(stock) {
  if (!(stock.roe > 0) && !(stock.debtRatio > 0)) {
    return "수익성 또는 재무안정성 수치가 비어 있어 체력 판정 신뢰도가 낮습니다.";
  }

  if (stock.roe >= 25 && stock.debtRatio <= 60) {
    return "수익성과 재무안정성의 조합이 강한 편입니다. 다만 높은 ROE가 일회성인지 확인이 필요합니다.";
  }

  if (stock.debtRatio >= 120) {
    return "부채 레버리지가 높아 금리, 경기, 현금흐름 둔화에 더 민감하게 반응할 수 있습니다.";
  }

  return "퀄리티는 평균 이상이거나 혼합형입니다. 분기 실적과 현금흐름이 유지되는지 확인해야 합니다.";
}

function buildRiskFlags(stock, result) {
  const flags = [];

  if (stock.volatility >= 35) {
    flags.push("변동성이 높아 포지션 크기를 줄이지 않으면 체감 손실이 크게 느껴질 수 있습니다.");
  }

  if (stock.debtRatio >= 100) {
    flags.push("부채비율이 높아 금리와 실적 둔화에 대한 방어력이 약할 수 있습니다.");
  }

  if (stock.per >= 40 || stock.pbr >= 10) {
    flags.push("멀티플이 높아 좋은 기업이어도 가격 부담 구간일 수 있습니다.");
  }

  if (stock.return12m >= 80) {
    flags.push("최근 12개월 수익률이 매우 높아 추격 매수보다 분할 접근이 유리할 수 있습니다.");
  }

  if (countAvailableMetrics(stock) <= 3) {
    flags.push("재무 데이터가 얕아 숫자 공백 자체가 가장 큰 리스크입니다.");
  }

  if (result.factors.value <= 35) {
    flags.push("가치 점수가 낮아 성장 훼손 시 하방 방어가 약할 수 있습니다.");
  }

  if (flags.length === 0) {
    flags.push("핵심 수치상 구조적 경고는 크지 않지만, 실적 발표와 뉴스 이벤트는 별도로 확인해야 합니다.");
  }

  return flags;
}

function buildDecisionChecklist(stock, result) {
  const items = [
    "최신 실적 발표와 가이던스가 현재 스냅샷보다 나빠지지 않았는지 확인합니다.",
    "내 계좌 기준 허용 손실폭을 먼저 정하고, 총 자산 대비 비중 상한을 정합니다."
  ];

  if (isForeignStock(stock)) {
    items.push("달러 환율과 미국장 실적 일정, 매크로 이벤트를 같이 확인합니다.");
  } else {
    items.push("KRX 공시와 국내 업황 뉴스를 함께 확인합니다.");
  }

  if (result.total >= 80) {
    items.push("좋은 점수라도 첫 진입은 2~3회 분할로 나누는 쪽이 유리합니다.");
  } else if (result.total >= 65) {
    items.push("실적 확인 또는 눌림 구간 대기 조건을 붙여 조건부 진입으로 운영합니다.");
  } else {
    items.push("지금 매수보다 감시목록 유지와 대체 후보 비교가 먼저입니다.");
  }

  if (countAvailableMetrics(stock) <= 4) {
    items.push("PER, PBR, ROE 등 빈 지표를 채우기 전에는 실제 주문 판단을 보류합니다.");
  }

  return items;
}

function buildExecutionPlan(stock, result) {
  if (result.total >= 80) {
    return [
      "첫 진입 40%, 눌림 30%, 실적 확인 후 30%처럼 분할해 평균단가와 심리 부담을 낮춥니다.",
      "목표는 단기 급등 추격보다 추세 유지와 실적 확인에 둡니다.",
      "과열 구간에서는 수익률보다 밸류 부담 완화 여부를 더 중요하게 봅니다."
    ];
  }

  if (result.total >= 65) {
    return [
      "가격 조정 또는 실적 확인을 기다리는 조건부 진입이 적합합니다.",
      "비슷한 섹터 안에서 더 싼 대안과 비교한 뒤 선택합니다.",
      "보유 전이라면 감시 알림 가격을 먼저 정해두는 편이 효율적입니다."
    ];
  }

  return [
    "당장 매수보다 감시목록 유지가 합리적입니다.",
    "점수를 끌어내린 항목이 개선되는지 한 분기 이상 지켜보는 편이 좋습니다.",
    "같은 시장 안의 더 나은 점수 후보와 교체 비교합니다."
  ];
}

function buildDataGaps(stock) {
  const gaps = [];

  if (!(stock.per > 0)) gaps.push("PER");
  if (!(stock.pbr > 0)) gaps.push("PBR");
  if (!(stock.roe > 0)) gaps.push("ROE");
  if (!(stock.fcfYield > 0)) gaps.push("FCF Yield");
  if (!(stock.volatility > 0)) gaps.push("변동성");
  if (!stock.sector) gaps.push("섹터/업종");
  if (!stock.thesis) gaps.push("서술형 투자 논리");

  return gaps;
}

function scoreMomentum(return12m) {
  return clamp(((return12m + 20) / 120) * 100, 0, 100);
}

function scoreQuality(roe, debtRatio) {
  const roeScore = clamp((roe / 30) * 100, 0, 100);
  const debtScore = clamp(100 - (debtRatio / 160) * 100, 0, 100);
  return roeScore * 0.65 + debtScore * 0.35;
}

function scoreValue(per, pbr, fcfYield) {
  const perScore = clamp(100 - ((per - 8) / 30) * 100, 0, 100);
  const pbrScore = clamp(100 - ((pbr - 1) / 12) * 100, 0, 100);
  const fcfScore = clamp((fcfYield / 8) * 100, 0, 100);
  return perScore * 0.35 + pbrScore * 0.2 + fcfScore * 0.45;
}

function scoreRisk(volatility, debtRatio) {
  const volScore = clamp(100 - ((volatility - 10) / 40) * 100, 0, 100);
  const balanceScore = clamp(100 - (debtRatio / 160) * 100, 0, 100);
  return volScore * 0.7 + balanceScore * 0.3;
}

function evaluateStock(stock) {
  const momentum = scoreMomentum(stock.return12m);
  const quality = scoreQuality(stock.roe, stock.debtRatio);
  const value = scoreValue(stock.per, stock.pbr, stock.fcfYield);
  const risk = scoreRisk(stock.volatility, stock.debtRatio);
  const total = momentum * 0.25 + quality * 0.3 + value * 0.25 + risk * 0.2;

  return {
    ...stock,
    factors: {
      momentum: Math.round(momentum),
      quality: Math.round(quality),
      value: Math.round(value),
      risk: Math.round(risk)
    },
    total: Math.round(total)
  };
}

function getStance(total) {
  if (total >= 80) {
    return {
      title: "분할매수 가능",
      body: "퀀트 기준 상위권입니다. 다만 좋은 점수도 변동성을 제거하지는 못하니, 3회 분할과 포지션 상한을 같이 두는 편이 좋습니다."
    };
  }

  if (total >= 65) {
    return {
      title: "관찰 후 조건부 매수",
      body: "기본 체력은 괜찮지만 밸류나 리스크 한 축이 부담입니다. 실적 확인 또는 더 나은 가격대 대기 전략이 합리적입니다."
    };
  }

  return {
    title: "서두르지 않는 편이 우세",
    body: "현재 수치만 보면 기대수익 대비 리스크가 큽니다. 대체 후보를 비교하거나 추세와 재무가 개선될 때까지 기다리는 접근이 보수적입니다."
  };
}

function updateRing(score) {
  if (!ringValue) {
    return;
  }
  const circumference = 2 * Math.PI * 48;
  const offset = circumference * (1 - score / 100);
  ringValue.style.strokeDashoffset = String(offset);
  ringValue.style.stroke = score >= 80 ? "#2b7a78" : score >= 65 ? "#b55233" : "#8b3a2a";
}

function renderFactorGrid(factors) {
  if (!factorGrid) {
    return;
  }
  const readScoreMeaning = (score, type) => {
    if (type === "momentum") {
      if (score >= 80) return "최근 12개월 흐름이 매우 강한 편입니다. 시장 관심이 붙어 있을 가능성이 큽니다.";
      if (score >= 65) return "상승 흐름은 살아 있지만 추격 매수 전 가격대 확인이 필요한 구간입니다.";
      if (score >= 50) return "추세가 애매한 중립 구간입니다. 실적이나 이벤트가 방향을 바꿀 수 있습니다.";
      return "최근 흐름이 약한 편입니다. 싸 보여도 바로 반등한다고 가정하면 위험합니다.";
    }

    if (type === "quality") {
      if (score >= 80) return "수익성과 재무 체력이 좋은 편입니다. 오래 들고 갈 후보인지 볼 때 유리합니다.";
      if (score >= 65) return "기본 체력은 무난하지만 아주 압도적인 우량주는 아닙니다.";
      if (score >= 50) return "좋지도 나쁘지도 않은 체력입니다. 부채나 ROE 추세를 더 봐야 합니다.";
      return "재무 체력이 약한 편입니다. 실적 변동이나 자금 부담에 취약할 수 있습니다.";
    }

    if (type === "value") {
      if (score >= 80) return "밸류 부담이 낮은 편입니다. 저평가 후보로 볼 여지가 있습니다.";
      if (score >= 65) return "완전 싼 종목은 아니지만 가격 부담이 과도하진 않은 편입니다.";
      if (score >= 50) return "적정 또는 애매한 가격대입니다. 다른 강점이 있어야 설득력이 생깁니다.";
      return "밸류 부담이 큰 편입니다. 기대가 이미 많이 반영됐을 수 있습니다.";
    }

    if (score >= 80) return "변동성과 재무 부담 관리가 좋은 편입니다. 포지션 관리가 비교적 쉬운 축입니다.";
    if (score >= 65) return "리스크가 아주 낮진 않지만 관리 가능한 범위로 보입니다.";
    if (score >= 50) return "보통 수준 리스크입니다. 비중과 손절 규칙을 같이 두는 편이 좋습니다.";
    return "변동성 또는 재무 리스크가 큰 편입니다. 포지션 크기를 줄여서 봐야 합니다.";
  };

  const entries = [
    ["Momentum", "momentum", factors.momentum, "12개월 수익률 기반"],
    ["Quality", "quality", factors.quality, "ROE와 재무건전성"],
    ["Value", "value", factors.value, "PER, PBR, FCF Yield"],
    ["Risk", "risk", factors.risk, "변동성과 부채 관리"]
  ];

  factorGrid.innerHTML = entries
    .map(([label, type, score, note]) => `
      <article class="factor-card">
        <strong>${label}</strong>
        <small>${note}</small>
        <span>${score}</span>
        <p>${readScoreMeaning(score, type)}</p>
      </article>
    `)
    .join("");
}

function renderSourceMeta(stock) {
  if (!sourceMeta) {
    return;
  }
  sourceMeta.innerHTML = `
    <p><strong>${stock.displayName}</strong> (${stock.symbol})</p>
    <p>스냅샷 기준: ${stock.sourceDate}</p>
    <p>출처 메모: ${stock.sourceLabel}</p>
    <p>${stock.sourceNote}</p>
  `;
}

function updateQuoteBanner(stock, quote = null) {
  const price = quote?.price ?? stock.price;
  const currency = quote?.currency ?? stock.currency;
  setText(quotePrice, formatNumber(price, currency));

  if (quote?.changePercent != null) {
    const direction = quote.changePercent >= 0 ? "+" : "";
    setText(quoteChange, `${direction}${quote.changePercent.toFixed(2)}%`);
  } else {
    setText(quoteChange, "변동 정보 없음");
  }

  setText(quoteTimestamp, quote?.timestamp ?? `스냅샷 ${stock.sourceDate}`);
}

function renderEvaluation(stockInput) {
  const result = evaluateStock(stockInput);
  const stance = getStance(result.total);

  setText(totalScore, String(result.total));
  setText(stanceTitle, stance.title);
  setText(stanceBody, stance.body);

  updateRing(result.total);
  renderSimpleStatus(stockInput, result);
  renderFactorGrid(result.factors);
  renderSourceMeta(stockInput);
  updateQuoteBanner(stockInput);
  renderIpoWatchSection(stockInput);
  renderFinancialSummary(stockInput, result, stance);
  renderOpsSuite(stockInput, result);
}

function buildFinancialSummary(stock, result, stance) {
  const priceState = Number.isFinite(stock.price)
    ? `${formatNumber(stock.price, stock.currency)} 기준으로 워크벤치가 설정되어 있습니다.`
    : "현재가는 아직 로드되지 않았고, 종목 마스터 정보만 반영된 상태입니다.";

  const coverage = getCoverageModel(stock);
  const styleLabel = stock.styleProfile || describeStyle(result);
  const riskFlags = buildRiskFlags(stock, result);
  const checklist = buildDecisionChecklist(stock, result);
  const executionPlan = buildExecutionPlan(stock, result);
  const dataGaps = buildDataGaps(stock);
  const factorSummary = [
    `총점 ${result.total}점`,
    `모멘텀 ${result.factors.momentum}`,
    `퀄리티 ${result.factors.quality}`,
    `가치 ${result.factors.value}`,
    `리스크 ${result.factors.risk}`
  ];
  const valuationSummary = [
    stock.per > 0 ? `PER ${stock.per}배` : "PER 미연동",
    stock.pbr > 0 ? `PBR ${stock.pbr}배` : "PBR 미연동",
    stock.fcfYield > 0 ? `FCF Yield ${stock.fcfYield}%` : "FCF Yield 미연동",
    getValuationRead(stock)
  ];

  const qualitySummary = [
    stock.roe > 0 ? `ROE ${stock.roe}%` : "ROE 미연동",
    stock.debtRatio > 0 ? `부채비율 ${stock.debtRatio}%` : "부채비율 미연동",
    stock.volatility > 0 ? `변동성 ${stock.volatility}%` : "변동성 미연동",
    getQualityRead(stock)
  ];

  const code = stock.symbol.replace(":KOSDAQ", "").replace(":KRX", "");
  const stockAnalysisUrl = stock.market === "NASDAQ"
    ? `https://stockanalysis.com/stocks/${stock.symbol.toLowerCase()}/`
    : `https://stockanalysis.com/quote/krx/${code}/`;
  const investingSearchUrl = `https://kr.investing.com/search/?q=${encodeURIComponent(stock.symbol)}`;

  return {
    title: getDisplayLabel(stock),
    subtitle: isForeignStock(stock) && stock.koName && stock.koName !== stock.displayName
      ? `${stock.displayName} · ${stock.symbol}`
      : `${stock.symbol} · ${stock.market}`,
    overview: `${stock.sourceLabel} 기준 종목 요약입니다. ${priceState}`,
    coverage,
    profile: {
      sector: stock.sector || "미분류",
      industry: stock.industry || "세부 업종 정보 미연결",
      marketCapBand: stock.marketCapBand || "시가총액 구간 미연결",
      styleLabel
    },
    factorSummary,
    valuationSummary,
    qualitySummary,
    thesis: stock.thesis || "현재는 검색용 마스터 정보와 일부 퀀트 지표만 연결되어 있습니다. 이 상태에선 아이디어 발굴과 1차 선별까지가 적절합니다.",
    catalysts: stock.catalysts || [
      "최신 실적 발표 업데이트",
      "섹터 모멘텀 또는 업황 회복 신호",
      "밸류에이션 부담 완화"
    ],
    riskFlags,
    checklist,
    executionPlan,
    watchItems: stock.watchItems || [
      "실적 발표일과 가이던스",
      "가격 추세와 거래량",
      "동종업계 상대 강도"
    ],
    peerTickers: stock.peerTickers || [],
    dataGaps,
    stance,
    businessNote: isForeignStock(stock)
      ? "해외 종목은 한글 번역명을 우선 표시하고, 원문 회사명과 심볼을 함께 남겨 혼동을 줄였습니다."
      : "국내 종목은 코스닥/국내 심볼 기준으로 로드되며, 세부 재무지표는 공급자 연결 시 더 확장할 수 있습니다.",
    links: [
      { label: "Investing 검색", href: investingSearchUrl },
      { label: "Stock Analysis", href: stockAnalysisUrl }
    ]
  };
}

function renderFinancialSummary(stock, result, stance) {
  if (!financialSummaryShell) {
    return;
  }

  const summary = buildFinancialSummary(stock, result, stance);
  financialSummaryShell.innerHTML = `
    <article class="financial-card">
      <div class="financial-headline">
        <div>
          <h4>${summary.title}</h4>
          <div class="financial-sub">${summary.subtitle}</div>
        </div>
        <div class="financial-badges">
          <span class="financial-badge">${stock.market}</span>
          <span class="financial-badge">${stock.currency}</span>
          <span class="financial-badge">${stock.sourceDate}</span>
          <span class="financial-badge financial-badge-${summary.coverage.tone}">${summary.coverage.label}</span>
        </div>
      </div>
      <p>${summary.overview}</p>
      <div class="financial-grid">
        <section class="financial-panel">
          <h5>커버리지와 프로필</h5>
          <ul>
            <li>데이터 상태: ${summary.coverage.description}</li>
            <li>섹터: ${summary.profile.sector}</li>
            <li>업종: ${summary.profile.industry}</li>
            <li>시가총액 구간: ${summary.profile.marketCapBand}</li>
            <li>스타일: ${summary.profile.styleLabel}</li>
          </ul>
        </section>
        <section class="financial-panel">
          <h5>퀀트 판독</h5>
          <ul>
            ${summary.factorSummary.map((item) => `<li>${item}</li>`).join("")}
            <li>현재 스탠스: ${summary.stance.title}</li>
          </ul>
        </section>
      </div>
      <div class="financial-grid">
        <section class="financial-panel">
          <h5>밸류에이션 요약</h5>
          <ul>
            ${summary.valuationSummary.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>
        <section class="financial-panel">
          <h5>퀄리티 / 리스크 요약</h5>
          <ul>
            ${summary.qualitySummary.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>
      </div>
      <div class="financial-grid">
        <section class="financial-panel">
          <h5>핵심 투자 논리</h5>
          <p>${summary.thesis}</p>
          <ul>
            ${summary.catalysts.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>
        <section class="financial-panel">
          <h5>경고 신호</h5>
          <ul>
            ${summary.riskFlags.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>
      </div>
      <div class="financial-grid">
        <section class="financial-panel">
          <h5>매수 전 체크리스트</h5>
          <ul>
            ${summary.checklist.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>
        <section class="financial-panel">
          <h5>실행 프레임</h5>
          <ul>
            ${summary.executionPlan.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>
      </div>
      <div class="financial-grid">
        <section class="financial-panel">
          <h5>추적 포인트</h5>
          <ul>
            ${summary.watchItems.map((item) => `<li>${item}</li>`).join("")}
            ${summary.peerTickers.length ? `<li>비교 후보: ${summary.peerTickers.join(", ")}</li>` : ""}
          </ul>
        </section>
        <section class="financial-panel">
          <h5>데이터 공백과 참고</h5>
          <p>${summary.businessNote}</p>
          <p>${stock.sourceNote}</p>
          <p>${summary.dataGaps.length ? `추가 확인이 필요한 항목: ${summary.dataGaps.join(", ")}` : "현재 이 카드 기준 핵심 항목은 대부분 채워져 있습니다."}</p>
          <div class="financial-links">
            ${summary.links.map((link) => `<a href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
          </div>
        </section>
      </div>
    </article>
  `;
}

function fillForm(stock) {
  if (!form) {
    return;
  }
  form.stockName.value = getDisplayLabel(stock);
  form.symbol.value = stock.symbol;
  form.price.value = Number.isFinite(stock.price) ? String(stock.price) : "";
  form.currency.value = stock.currency;
  form.return12m.value = Number.isFinite(stock.return12m) ? String(stock.return12m) : "";
  form.roe.value = Number.isFinite(stock.roe) ? String(stock.roe) : "";
  form.debtRatio.value = Number.isFinite(stock.debtRatio) ? String(stock.debtRatio) : "";
  form.per.value = Number.isFinite(stock.per) ? String(stock.per) : "";
  form.pbr.value = Number.isFinite(stock.pbr) ? String(stock.pbr) : "";
  form.fcfYield.value = Number.isFinite(stock.fcfYield) ? String(stock.fcfYield) : "";
  form.volatility.value = Number.isFinite(stock.volatility) ? String(stock.volatility) : "";
  stockSearch.value = `${getDisplayLabel(stock)} (${stock.symbol})`;
}

function loadStockIntoWorkbench(stock) {
  selectedStock = cloneStock(stock);
  fillForm(selectedStock);
  renderEvaluation(selectedStock);
  updateRecentSelections(selectedStock);
  renderSearchResults(stockSearch?.value ?? "");
}

function renderPresetGrid() {
  if (!presetGrid) {
    return;
  }
  presetGrid.innerHTML = featuredStockCatalog
    .map((stock) => `
      <button class="preset-button" type="button" data-stock-id="${stock.id}">
        <div class="preset-topline">
          <strong>${getDisplayLabel(stock)}</strong>
          <span class="preset-market">${stock.market}</span>
        </div>
        <div class="preset-price">
          <strong>${formatNumber(stock.price, stock.currency)}</strong>
          <span>${getSubLabel(stock)}</span>
        </div>
        <p class="preset-meta">${stock.sourceDate} 기준 스냅샷 · ${stock.sourceLabel}</p>
      </button>
    `)
    .join("");

  document.querySelectorAll("[data-stock-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const stock = featuredStockCatalog.find((item) => item.id === button.dataset.stockId);
      if (stock) {
        loadStockIntoWorkbench(stock);
      }
    });
  });
}

function renderSuggestions() {
  if (!stockSuggestions) {
    return;
  }
  stockSuggestions.innerHTML = stockCatalog
    .map((stock) => `<option value="${getDisplayLabel(stock)} (${stock.symbol})"></option>`)
    .join("");
}

function renderMarketCoverage() {
  if (!marketCoverage) {
    return;
  }

  const total = marketCounts.nasdaq + marketCounts.kosdaq + (marketCounts.kospi || 0);
  marketCoverage.textContent = `현재 로컬 종목 마스터 기준으로 NASDAQ ${marketCounts.nasdaq.toLocaleString("en-US")}개, KOSPI ${(marketCounts.kospi || 0).toLocaleString("ko-KR")}개, KOSDAQ ${marketCounts.kosdaq.toLocaleString("ko-KR")}개, 총 ${total.toLocaleString("ko-KR")}개 종목 검색을 지원합니다. 여기에 KRX 대표주, 미국 대표 프리셋, 그리고 워크북에서 가져온 추가 종목 ${importedWorkbookCount.toLocaleString("ko-KR")}개도 함께 탐색할 수 있습니다.`;
}

function renderMatchSummary(message = "") {
  setText(matchSummary, message || "회사명이나 티커만 입력해도 됩니다. 예: 삼성전자, NVDA, 서비스나우, 005930");
}

function renderSimpleStatus(stock, result) {
  if (!simpleStatus || !stock || !result) {
    return;
  }

  const actionLine = result.total >= 80
    ? "지금 상태: 상위권 후보입니다. 분할매수 관점으로 읽어보면 됩니다."
    : result.total >= 65
      ? "지금 상태: 괜찮은 후보입니다. 실적 일정과 가격대만 추가 확인하면 됩니다."
      : "지금 상태: 바로 사기보다 더 지켜보는 쪽이 안전합니다.";

  simpleStatus.innerHTML = `
    <strong>${getDisplayLabel(stock)} · ${stock.symbol}</strong>
    <p>${actionLine}</p>
    <small>복잡한 숫자는 아래 고급 설정에 숨겨두었습니다. 기본은 검색해서 선택만 하시면 됩니다.</small>
  `;
}

function renderSearchResults(input = "") {
  if (!searchResults) {
    return;
  }

  const matches = getSearchMatches(input);

  if (matches.length === 0) {
    searchResults.classList.add("is-empty");
    searchResults.innerHTML = `<div class="search-empty">일치하는 종목을 찾지 못했습니다. 회사명, 한글명, 티커, 6자리 코드로 다시 시도해 주세요.</div>`;
    return;
  }

  searchResults.classList.remove("is-empty");
  searchResults.innerHTML = matches
    .map((stock) => `
      <button type="button" class="search-result-button" data-search-stock-id="${stock.id}">
        <div class="search-result-topline">
          <strong>${getDisplayLabel(stock)}</strong>
          <small>${stock.symbol}</small>
        </div>
        <div class="search-result-meta">
          <span>${stock.displayName || stock.name || stock.symbol}</span>
          <span class="search-chip">${stock.market}</span>
        </div>
      </button>
    `)
    .join("");

  document.querySelectorAll("[data-search-stock-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const stock = stockCatalog.find((item) => item.id === button.dataset.searchStockId);
      if (stock) {
        loadStockIntoWorkbench(stock);
        renderMatchSummary(`${getDisplayLabel(stock)} 종목을 불러왔습니다.`);
      }
    });
  });
}

function renderInvestingCapture() {
  if (!investingCaptureGrid) {
    return;
  }
  investingCaptureGrid.innerHTML = investingCapture
    .map((item) => `
      <article class="capture-card">
        <h4>${item.title}</h4>
        <span class="capture-status ${item.status === "partial" ? "partial" : item.status === "blocked" ? "blocked" : ""}">
          ${item.status === "captured" ? "captured" : item.status === "partial" ? "partial" : "blocked"}
        </span>
        <p>${item.description}</p>
        <div class="capture-links">
          ${item.links.map((link) => `<a href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
        </div>
      </article>
    `)
    .join("");
}

function renderEtfModels() {
  if (!etfGrid) {
    return;
  }

  etfGrid.innerHTML = etfModels
    .map((model) => `
      <article class="etf-card">
        <h4>${model.name}</h4>
        <p>${model.summary}</p>
        <div>
          ${model.items.map((item) => `
            <div class="etf-row">
              <div>
                <strong>${item.ticker}</strong>
                <div>${item.label}</div>
              </div>
              <strong>${item.weight}%</strong>
            </div>
          `).join("")}
        </div>
      </article>
    `)
    .join("");
}

function renderPropicksLive() {
  if (propicksSummary) {
    propicksSummary.innerHTML = `
      <h4>${propicksLive.title} / ${propicksLive.strategy}</h4>
      <p>${propicksLive.description}</p>
      <div class="propicks-metrics">
        <div class="propicks-metric">
          <small>총 수익률</small>
          <strong>${propicksLive.totalReturn}</strong>
        </div>
        <div class="propicks-metric">
          <small>벤치마크</small>
          <strong>${propicksLive.benchmarkReturn}</strong>
        </div>
        <div class="propicks-metric">
          <small>초과 수익</small>
          <strong>${propicksLive.excessReturn}</strong>
        </div>
        <div class="propicks-metric">
          <small>연간 수익률</small>
          <strong>${propicksLive.annualReturn}</strong>
        </div>
      </div>
      <ul>
        <li>백테스트 시작일: ${propicksLive.startDate}</li>
        <li>리밸런싱 빈도: ${propicksLive.rebalance}</li>
        <li>거래 지역: ${propicksLive.tradeRegion}</li>
        <li>시가총액: ${propicksLive.marketCap}</li>
        <li>최대 보유 종목 수: ${propicksLive.maxHoldings}</li>
        <li>배경 필터: ${propicksLive.backgroundFilter}</li>
        <li>샤프지수 / 리스크: ${propicksLive.sharpe} / ${propicksLive.risk}</li>
      </ul>
      <p>${propicksLive.accessNote}</p>
    `;
  }

  if (propicksWinners) {
    propicksWinners.innerHTML = `
      <h4>페이지에서 확인된 고성과 종목</h4>
      <p>현재 편입 종목은 마스킹되어 있었지만, 전략이 과거에 강하게 작동한 사례 종목은 페이지에서 실명으로 노출되었습니다.</p>
      ${propicksLive.winners.map((winner) => `
        <div class="winner-card">
          <strong>${winner.name}</strong>
          <div>${winner.ticker}</div>
          <span>${winner.pickReturn}</span>
          <p>벤치마크 대비 연간 초과수익 ${winner.benchmarkAlpha}</p>
          <p>${winner.note}</p>
        </div>
      `).join("")}
    `;
  }
}

function getIpoBadgeLabel(badge) {
  return badge || "watch";
}

function getIpoContext(stock) {
  const contextText = `${stock?.sector || ""} ${stock?.industry || ""} ${stock?.styleProfile || ""}`.toLowerCase();

  if (/반도체|ai|클라우드|데이터센터|gpu|양자/.test(contextText)) {
    return `${getDisplayLabel(stock)}은(는) AI 인프라 / 고성장 기술 테마와 가까워서 SpaceX, Quantinuum, BXDC 뉴스의 간접 영향권에 들어갈 수 있습니다.`;
  }

  if (/소프트웨어|핀테크|결제|플랫폼|workflow/.test(contextText)) {
    return `${getDisplayLabel(stock)}은(는) 소프트웨어·플랫폼 프리미엄 밸류와 겹치는 면이 있어 Stripe 같은 비상장 대형주의 밸류 뉴스와 같이 보는 편이 좋습니다.`;
  }

  return `${getDisplayLabel(stock)} 선택 상태에서도 이 섹션은 신규 상장 심리와 성장주 자금 흐름을 읽는 보조 패널로 보시면 됩니다.`;
}

function findStockByTickerSymbol(symbol) {
  const normalized = String(symbol || "").trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  return stockCatalog.find((stock) => {
    const candidates = [
      stock.id,
      stock.symbol,
      stock.providerSymbols?.alpha,
      stock.providerSymbols?.twelve
    ]
      .filter(Boolean)
      .map((candidate) => String(candidate).toLowerCase());

    return candidates.includes(normalized);
  }) || null;
}

function renderRelatedPublicChips(symbols) {
  return symbols
    .map((symbol) => {
      const linkedStock = findStockByTickerSymbol(symbol);
      if (linkedStock) {
        return `<button type="button" class="ipo-comp is-link" data-ipo-symbol="${linkedStock.symbol}">${symbol}</button>`;
      }
      return `<span class="ipo-comp">${symbol}</span>`;
    })
    .join("");
}

function renderIpoWatchSection(stock) {
  if (ipoSectionMeta) {
    ipoSectionMeta.textContent = `${ipoWatchSnapshot.asOf} 스냅샷 기준. ${ipoWatchSnapshot.note} ${stock ? getIpoContext(stock) : ""}`;
  }

  if (ipoWatchGrid) {
    ipoWatchGrid.innerHTML = ipoWatchList
      .map((item) => `
        <article class="ipo-watch-card">
          <div class="ipo-watch-topline">
            <h4>${item.name}</h4>
            <span class="ipo-badge ${item.badge}">${getIpoBadgeLabel(item.badge)}</span>
          </div>
          <p class="ipo-watch-stage">${item.stage} · ${item.timing}</p>
          <p>${item.summary}</p>
          <div class="ops-list">
            <div class="ops-mini">
              <strong>읽는 포인트</strong>
              <small>${item.angle}</small>
            </div>
          </div>
          <div class="ipo-comp-row">
            ${renderRelatedPublicChips(item.relatedPublic)}
          </div>
          <div class="capture-links">
            ${item.links.map((link) => `<a href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
          </div>
        </article>
      `)
      .join("");

    document.querySelectorAll("[data-ipo-symbol]").forEach((button) => {
      button.addEventListener("click", () => {
        const stockMatch = findStockByTickerSymbol(button.dataset.ipoSymbol);
        if (stockMatch) {
          loadStockIntoWorkbench(stockMatch);
          window.location.hash = "workbench";
          renderMatchSummary(`${button.dataset.ipoSymbol} 관련 공개 종목을 워크벤치로 불러왔습니다.`);
        }
      });
    });
  }

  if (ipoNewsFeed) {
    ipoNewsFeed.innerHTML = `
      <article class="ipo-news-card ipo-news-header">
        <h4>최근 관련 뉴스</h4>
        <p>IPO 자체보다 상장 일정, 공시 품질, 비상장 가치평가, 수혜 섹터 확산 여부를 같이 읽도록 구성했습니다.</p>
      </article>
      ${ipoNewsFeedItems.map((item) => `
        <article class="ipo-news-card">
          <div class="ipo-news-topline">
            <span class="search-chip">${item.tag}</span>
            <small>${item.date}</small>
          </div>
          <strong>${item.headline}</strong>
          <p>${item.note}</p>
          <a href="${item.href}" target="_blank" rel="noreferrer">${item.source}</a>
        </article>
      `).join("")}
    `;
  }
}

function getMarketPulse(stock, result) {
  const momentum = result.factors.momentum;
  const quality = result.factors.quality;
  const value = result.factors.value;
  const risk = result.factors.risk;

  const trend = momentum >= 75 ? "상승 추세 우위" : momentum >= 55 ? "중립 이상" : "추세 둔화 경계";
  const valuation = value >= 70 ? "저평가 후보" : value >= 50 ? "중립 밸류" : "고평가 부담";
  const fragility = risk >= 70 ? "리스크 통제 양호" : risk >= 50 ? "보통" : "포지션 축소 필요";
  const setup = quality >= 70 && momentum >= 60
    ? "퀄리티와 흐름이 같이 받쳐주는 편입니다."
    : quality >= 70
      ? "체력은 양호하지만 타이밍은 분할 접근이 낫습니다."
      : momentum >= 70
        ? "흐름은 강하지만 체력 확인이 더 필요합니다."
        : "서두르기보다 실적과 가격대 확인이 먼저입니다.";

  return { trend, valuation, fragility, setup };
}

function getGridPlan(stock) {
  const basePrice = Number.isFinite(stock.price) ? stock.price : 0;
  const lower1 = basePrice ? basePrice * 0.97 : 0;
  const lower2 = basePrice ? basePrice * 0.93 : 0;
  const upper1 = basePrice ? basePrice * 1.06 : 0;
  const upper2 = basePrice ? basePrice * 1.12 : 0;

  return {
    anchor: basePrice,
    lower1,
    lower2,
    upper1,
    upper2,
    note: stock.volatility >= 35
      ? "변동성이 큰 종목이라 동일 금액 분할보다 손실 한도를 먼저 정하는 편이 안전합니다."
      : "중간 변동성 종목 기준으로 3단 매수, 2단 축소 구조를 가정했습니다."
  };
}

function getRiskBudget(stock, result) {
  const score = result.total;
  const maxPosition = score >= 75 ? 12 : score >= 60 ? 8 : 5;
  const reserve = stock.volatility >= 35 ? 35 : stock.volatility >= 25 ? 25 : 18;
  const stopBand = stock.volatility >= 35 ? "10~12%" : stock.volatility >= 25 ? "8~10%" : "6~8%";
  const diversify = stock.market === "KRX" || stock.market === "KOSDAQ"
    ? "국내 단일 종목 비중이 커지지 않게 미국 ETF나 달러 자산과 함께 검증"
    : "미국 성장주 편중 여부를 반도체/클라우드/방어 자산과 함께 확인";

  return { maxPosition, reserve, stopBand, diversify };
}

function buildCodexAutomationPrompt(stock, result) {
  return [
    `${getDisplayLabel(stock)} (${stock.symbol}) 일일 투자 보고`,
    `총점 ${result.total}점, 모멘텀 ${result.factors.momentum}, 퀄리티 ${result.factors.quality}, 가치 ${result.factors.value}, 리스크 ${result.factors.risk}`,
    `체크 포인트: ${Array.isArray(stock.watchItems) ? stock.watchItems.join(", ") : "실적 일정, 가이던스, 가격 추세"}`,
    "출력: 오늘의 해석, 매수/관찰/보류 스탠스, 포지션 리스크, 내일 확인할 항목 3개"
  ].join("\n");
}

function renderOpsSuite(stock, result) {
  if (!stock || !result) {
    return;
  }

  const pulse = getMarketPulse(stock, result);
  const grid = getGridPlan(stock);
  const budget = getRiskBudget(stock, result);
  const notionSearchUrl = `https://www.notion.so/?q=${encodeURIComponent(`${getDisplayLabel(stock)} ${stock.symbol}`)}`;
  const codexPrompt = buildCodexAutomationPrompt(stock, result);
  const encodedPrompt = encodeURIComponent(codexPrompt);

  if (aiResearchCard) {
    aiResearchCard.innerHTML = `
      <h4>1. AI 연구 보고서</h4>
      <p>${getDisplayLabel(stock)} 기준으로 현재 데이터를 리서치 메모 형태로 재정리했습니다.</p>
      <div class="ops-chip-row">
        <span class="ops-chip ${result.total >= 70 ? "good" : result.total >= 55 ? "soft" : "warn"}">총점 ${result.total}점</span>
        <span class="ops-chip ${stock.thesis ? "good" : "warn"}">${stock.thesis ? "서술형 리서치 있음" : "숫자 중심 종목"}</span>
      </div>
      <div class="ops-list">
        <div class="ops-mini">
          <strong>핵심 논지</strong>
          <small>${stock.thesis || "현재는 정량 데이터 위주라 별도 투자 논지를 직접 보완해야 합니다."}</small>
        </div>
        <div class="ops-mini">
          <strong>오늘의 결론</strong>
          <small>${pulse.setup}</small>
        </div>
      </div>
    `;
  }

  if (marketWidgetCard) {
    marketWidgetCard.innerHTML = `
      <h4>2. 실시간 시장 위젯</h4>
      <p>가격·팩터·시장 상태를 빠르게 읽는 운영형 위젯입니다.</p>
      <div class="ops-stat-grid">
        <div class="ops-stat"><small>현재가</small><strong>${formatNumber(stock.price, stock.currency)}</strong></div>
        <div class="ops-stat"><small>시장</small><strong>${stock.market}</strong></div>
        <div class="ops-stat"><small>추세 판독</small><strong>${pulse.trend}</strong></div>
        <div class="ops-stat"><small>밸류 판독</small><strong>${pulse.valuation}</strong></div>
      </div>
      <div class="ops-list">
        <div class="ops-mini">
          <strong>실행 메모</strong>
          <small>${pulse.fragility} · ${pulse.setup}</small>
        </div>
      </div>
    `;
  }

  if (strategyBotCard) {
    strategyBotCard.innerHTML = `
      <h4>3. 자동 전략 / 그리드 봇</h4>
      <p>현 시점 가격을 기준으로 한 예시 그리드입니다. 실제 주문 자동화가 아니라 전략 설계 템플릿으로 보시면 됩니다.</p>
      <div class="ops-stat-grid">
        <div class="ops-stat"><small>기준가</small><strong>${formatNumber(grid.anchor, stock.currency)}</strong></div>
        <div class="ops-stat"><small>1차 매수</small><strong>${formatNumber(grid.lower1, stock.currency)}</strong></div>
        <div class="ops-stat"><small>2차 매수</small><strong>${formatNumber(grid.lower2, stock.currency)}</strong></div>
        <div class="ops-stat"><small>1차 축소</small><strong>${formatNumber(grid.upper1, stock.currency)}</strong></div>
      </div>
      <div class="ops-list">
        <div class="ops-mini">
          <strong>전략 메모</strong>
          <small>${grid.note} 2차 축소 기준은 ${formatNumber(grid.upper2, stock.currency)} 입니다.</small>
        </div>
      </div>
    `;
  }

  if (riskPortfolioCard) {
    riskPortfolioCard.innerHTML = `
      <h4>4. 리스크·준비금·포트폴리오 검증</h4>
      <p>선택 종목 하나를 포트폴리오 안에 넣는다고 가정했을 때의 기본 규율입니다.</p>
      <div class="ops-stat-grid">
        <div class="ops-stat"><small>최대 권장 비중</small><strong>${budget.maxPosition}%</strong></div>
        <div class="ops-stat"><small>현금/준비금</small><strong>${budget.reserve}%</strong></div>
        <div class="ops-stat"><small>손절 밴드</small><strong>${budget.stopBand}</strong></div>
        <div class="ops-stat"><small>변동성</small><strong>${stock.volatility || "-"}%</strong></div>
      </div>
      <div class="ops-list">
        <div class="ops-mini">
          <strong>검증 메모</strong>
          <small>${budget.diversify}</small>
        </div>
      </div>
    `;
  }

  if (automationCard) {
    automationCard.innerHTML = `
      <h4>5. Notion / Codex 보고 자동화</h4>
      <p>현재 종목 기준으로 바로 옮겨 적거나 자동화에 넣기 쉬운 템플릿입니다.</p>
      <div class="ops-list">
        <div class="ops-mini">
          <strong>Notion 페이지 제목</strong>
          <small>${new Date().toISOString().slice(0, 10)} ${getDisplayLabel(stock)} 데일리 리서치</small>
        </div>
        <div class="ops-mini">
          <strong>Codex 보고 프롬프트</strong>
          <small>${codexPrompt.replace(/\n/g, " / ")}</small>
        </div>
      </div>
      <div class="ops-links">
        <a href="${notionSearchUrl}" target="_blank" rel="noreferrer">Notion 검색 열기</a>
        <a href="https://chatgpt.com/?prompt=${encodedPrompt}" target="_blank" rel="noreferrer">Codex용 초안 열기</a>
      </div>
    `;
  }
}

function readRecentSelections() {
  try {
    const raw = window.localStorage.getItem(RECENT_SELECTIONS_KEY);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRecentSelections(ids) {
  try {
    window.localStorage.setItem(RECENT_SELECTIONS_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage errors in file:// or private contexts.
  }
}

function updateRecentSelections(stock) {
  const next = [stock.id, ...readRecentSelections().filter((id) => id !== stock.id)].slice(0, 8);
  writeRecentSelections(next);
  renderRecentSelections();
}

function renderRecentSelections() {
  if (!recentSelections) {
    return;
  }

  const ids = readRecentSelections();
  const items = ids
    .map((id) => stockCatalog.find((stock) => stock.id === id))
    .filter(Boolean);

  if (items.length === 0) {
    recentSelections.innerHTML = `<span class="section-meta">아직 최근 선택 종목이 없습니다.</span>`;
    return;
  }

  recentSelections.innerHTML = items
    .map((stock) => `
      <button type="button" class="recent-chip" data-recent-stock-id="${stock.id}">
        <span>${getDisplayLabel(stock)}</span>
        <small>${stock.symbol}</small>
      </button>
    `)
    .join("");

  document.querySelectorAll("[data-recent-stock-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const stock = stockCatalog.find((item) => item.id === button.dataset.recentStockId);
      if (stock) {
        loadStockIntoWorkbench(stock);
      }
    });
  });
}

function findStockBySearchInput(input) {
  const normalized = input.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  const catalogs = [getFilteredCatalog(), stockCatalog];

  for (const catalog of catalogs) {
    const exactMatch = catalog.find((stock) => getSearchCandidates(stock).includes(normalized));
    if (exactMatch) {
      return exactMatch;
    }

    const startsWithMatch = catalog.find((stock) =>
      getSearchCandidates(stock).some((candidate) => candidate.startsWith(normalized))
    );
    if (startsWithMatch) {
      return startsWithMatch;
    }

    const includesMatch = catalog.find((stock) =>
      getSearchCandidates(stock).some((candidate) => candidate.includes(normalized))
    );
    if (includesMatch) {
      return includesMatch;
    }
  }

  return null;
}

function renderUniverse() {
  if (!nasdaqRows || !kospiRows) {
    return;
  }

  const renderRows = (rowsNode, market) => {
    const ranked = stockCatalog
      .filter((stock) => matchesMarketFilter(stock, market))
      .map(evaluateStock)
      .sort((a, b) => b.total - a.total)
      .slice(0, UNIVERSE_ROW_LIMIT);

    rowsNode.innerHTML = ranked
      .map((stock) => `
        <tr data-row-stock-id="${stock.id}">
          <td>${getDisplayLabel(stock)}</td>
          <td><span class="market-chip">${stock.market}</span></td>
          <td>${formatNumber(stock.price, stock.currency)}</td>
          <td>${stock.factors.momentum}</td>
          <td>${stock.factors.quality}</td>
          <td>${stock.factors.value}</td>
          <td>${stock.factors.risk}</td>
          <td><span class="score-chip">${stock.total}</span></td>
        </tr>
      `)
      .join("");

    return ranked.length;
  };

  const nasdaqCount = renderRows(nasdaqRows, "NASDAQ");
  const kospiCount = renderRows(kospiRows, "KOSPI");

  setText(
    comparisonMeta,
    `NASDAQ ${marketCounts.nasdaq.toLocaleString("en-US")}개 중 상위 ${nasdaqCount.toLocaleString("ko-KR")}개와, KOSPI ${(marketCounts.kospi || 0).toLocaleString("ko-KR")}개 중 상위 ${kospiCount.toLocaleString("ko-KR")}개를 따로 표시합니다. 가격은 실시간 값과 스냅샷 값이 섞일 수 있어 팩터 구조를 우선해서 읽도록 설계했습니다.`
  );

  document.querySelectorAll("[data-row-stock-id]").forEach((row) => {
    row.addEventListener("click", () => {
      const stock = stockCatalog.find((item) => item.id === row.dataset.rowStockId);
      if (stock) {
        loadStockIntoWorkbench(stock);
        window.location.hash = "workbench";
      }
    });
  });
}

function readFormStock() {
  if (!form) {
    return cloneStock(selectedStock);
  }
  return {
    ...selectedStock,
    displayName: form.stockName.value.trim() || selectedStock.displayName,
    symbol: form.symbol.value.trim() || selectedStock.symbol,
    price: Number(form.price.value),
    currency: form.currency.value.trim() || selectedStock.currency,
    return12m: Number(form.return12m.value),
    roe: Number(form.roe.value),
    debtRatio: Number(form.debtRatio.value),
    per: Number(form.per.value),
    pbr: Number(form.pbr.value),
    fcfYield: Number(form.fcfYield.value),
    volatility: Number(form.volatility.value)
  };
}

async function fetchStooqQuote(stock) {
  const symbol = stock.providerSymbols?.stooq;
  if (!symbol) {
    throw new Error("이 종목은 Stooq 실시간 조회를 지원하지 않습니다.");
  }

  const response = await fetch(`https://stooq.com/q/l/?s=${encodeURIComponent(symbol)}&i=d`);
  const csv = await response.text();
  const parts = csv.trim().split(",");

  if (parts.length < 7 || parts[1] === "N/D") {
    throw new Error("Stooq에서 유효한 가격을 받지 못했습니다.");
  }

  const close = Number(parts[6]);
  return {
    price: close,
    currency: stock.currency,
    changePercent: null,
    timestamp: `${parts[1]} ${parts[2]} · Stooq`
  };
}

async function fetchAlphaQuote(stock, apiKey) {
  if (!apiKey) {
    throw new Error("Alpha Vantage API 키가 필요합니다.");
  }

  const symbol = stock.providerSymbols?.alpha ?? stock.symbol;
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url);
  const data = await response.json();
  const quote = data["Global Quote"];

  if (!quote || !quote["05. price"]) {
    const message = data.Information || data.Note || data["Error Message"] || "Alpha Vantage 응답을 해석하지 못했습니다.";
    throw new Error(message);
  }

  return {
    price: Number(quote["05. price"]),
    currency: stock.currency,
    changePercent: Number(quote["10. change percent"]?.replace("%", "") ?? NaN),
    timestamp: `${quote["07. latest trading day"]} · Alpha Vantage`
  };
}

async function fetchTwelveDataQuote(stock, apiKey) {
  if (!apiKey) {
    throw new Error("Twelve Data API 키가 필요합니다.");
  }

  const symbol = stock.providerSymbols?.twelve ?? stock.symbol;
  const url = `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "error") {
    throw new Error(data.message || "Twelve Data 응답 오류");
  }

  const latestPrice = Number(data.close ?? data.price);
  return {
    price: latestPrice,
    currency: data.currency || stock.currency,
    changePercent: Number(data.percent_change ?? NaN),
    timestamp: `${data.datetime || data.timestamp || "latest"} · Twelve Data`
  };
}

function syncStockRecord(stockId, patch) {
  const collections = [featuredStockCatalog, stockCatalog];

  for (const collection of collections) {
    const target = collection.find((item) => item.id === stockId);
    if (target) {
      Object.assign(target, patch);
    }
  }

  if (selectedStock?.id === stockId) {
    Object.assign(selectedStock, patch);
  }
}

function rerenderAfterDataUpdate() {
  renderPresetGrid();
  renderRecentSelections();
  renderSuggestions();
  renderUniverse();
  if (selectedStock) {
    fillForm(selectedStock);
    renderEvaluation(selectedStock);
  }
}

async function loadLiveSnapshots(options = {}) {
  try {
    const snapshotUrl = options.bustCache
      ? `${LIVE_SNAPSHOT_URL}?t=${Date.now()}`
      : LIVE_SNAPSHOT_URL;
    const response = await fetch(snapshotUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`스냅샷 응답 ${response.status}`);
    }

    const payload = await response.json();
    const quotes = payload?.quotes ?? {};
    let changed = false;

    for (const [stockId, patch] of Object.entries(quotes)) {
      const stock = stockCatalog.find((item) => item.id === stockId);
      if (!stock) {
        continue;
      }

      syncStockRecord(stockId, {
        ...patch,
        sourceLabel: patch.sourceLabel || stock.sourceLabel,
        sourceDate: patch.sourceDate || stock.sourceDate,
        sourceNote: patch.sourceNote || stock.sourceNote
      });
      changed = true;
    }

    if (changed) {
      rerenderAfterDataUpdate();
    }

    return payload;
  } catch (error) {
    if (!options.silent) {
      setText(quoteChange, error.message || "스냅샷 로딩 실패");
      setText(quoteTimestamp, "스냅샷 로딩 실패");
    }
    return null;
  }
}

function formatNextRefreshTime(date) {
  if (!(date instanceof Date)) {
    return "예약 없음";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function renderAutoRefreshStatus(message = "") {
  if (!autoRefreshStatus) {
    return;
  }

  if (!autoRefreshToggle?.checked) {
    setText(autoRefreshStatus, "자동 갱신이 꺼져 있습니다.");
    return;
  }

  const provider = providerSelect?.value ?? "snapshot";
  const providerLabel = provider === "snapshot"
    ? "스냅샷/GitHub 갱신본"
    : provider === "stooq"
      ? "Stooq 실시간 시세"
      : provider === "alpha"
        ? "Alpha Vantage 실시간 시세"
        : "Twelve Data 실시간 시세";

  const nextText = autoRefreshNextAt ? `다음 예정 ${formatNextRefreshTime(autoRefreshNextAt)}` : "다음 예약 계산 중";
  setText(autoRefreshStatus, message || `자동 갱신 사용 중 · ${providerLabel} 기준 · ${nextText}`);
}

function persistAutoRefreshPreference(enabled) {
  try {
    window.localStorage.setItem(AUTO_REFRESH_KEY, enabled ? "true" : "false");
  } catch {
    // Ignore storage failures.
  }
}

function readAutoRefreshPreference() {
  try {
    return window.localStorage.getItem(AUTO_REFRESH_KEY) === "true";
  } catch {
    return false;
  }
}

async function runAutoRefreshCycle() {
  await loadLiveSnapshots({ silent: true, bustCache: true });

  if (providerSelect?.value !== "snapshot") {
    await refreshLiveQuote({ silent: true });
  }

  autoRefreshNextAt = new Date(Date.now() + AUTO_REFRESH_INTERVAL_MS);
  renderAutoRefreshStatus("자동 갱신 완료");
}

function configureAutoRefresh() {
  if (autoRefreshTimer) {
    window.clearInterval(autoRefreshTimer);
    autoRefreshTimer = null;
  }

  if (!autoRefreshToggle?.checked) {
    autoRefreshNextAt = null;
    renderAutoRefreshStatus();
    return;
  }

  autoRefreshNextAt = new Date(Date.now() + AUTO_REFRESH_INTERVAL_MS);
  autoRefreshTimer = window.setInterval(async () => {
    await runAutoRefreshCycle();
  }, AUTO_REFRESH_INTERVAL_MS);

  renderAutoRefreshStatus();
}

async function refreshLiveQuote(options = {}) {
  if (!providerSelect || !apiKeyInput || !form) {
    return;
  }
  const provider = providerSelect.value;
  const apiKey = apiKeyInput.value.trim();
  const currentStock = readFormStock();

  try {
    let quote;
    if (provider === "snapshot") {
      await loadLiveSnapshots({ silent: true, bustCache: true });
      const syncedStock = selectedStock?.id === currentStock.id ? selectedStock : currentStock;
      updateQuoteBanner(syncedStock);
      renderSourceMeta(syncedStock);
      renderAutoRefreshStatus("스냅샷 기준으로 다시 동기화했습니다.");
      return;
    }

    if (provider === "stooq") {
      quote = await fetchStooqQuote(currentStock);
    } else if (provider === "alpha") {
      quote = await fetchAlphaQuote(currentStock, apiKey);
    } else if (provider === "twelve") {
      quote = await fetchTwelveDataQuote(currentStock, apiKey);
    } else {
      throw new Error("지원하지 않는 공급자입니다.");
    }

    form.price.value = String(quote.price);
    form.currency.value = quote.currency;
    syncStockRecord(currentStock.id, {
      price: quote.price,
      currency: quote.currency,
      sourceDate: new Date().toISOString().slice(0, 10),
      sourceLabel: `${provider.toUpperCase()} live quote`,
      sourceNote: `${provider} 공급자로 현재가를 갱신했습니다.`
    });
    updateQuoteBanner(currentStock, quote);
    renderSourceMeta(readFormStock());
    renderUniverse();
    renderPresetGrid();
    renderRecentSelections();
    renderAutoRefreshStatus("현재 선택 종목 가격을 갱신했습니다.");
  } catch (error) {
    if (!options.silent) {
      setText(quoteChange, error.message);
      setText(quoteTimestamp, "실시간 갱신 실패");
    }
    renderAutoRefreshStatus(`자동 갱신 실패: ${error.message}`);
  }
}

if (providerSelect) {
  providerSelect.addEventListener("change", () => {
    setText(providerHelp, providerHelpText[providerSelect.value]);
    renderAutoRefreshStatus();
  });
}

  if (marketFilter) {
  marketFilter.addEventListener("change", () => {
    renderSuggestions();
    renderSearchResults(stockSearch?.value ?? "");
    renderUniverse();
    renderMatchSummary(`${getMarketFilterLabel(getActiveMarketFilter())} 기준으로 검색 대상을 바꿨습니다.`);
  });
}

if (loadStockButton) {
  loadStockButton.addEventListener("click", () => {
    const matched = findStockBySearchInput(stockSearch ? stockSearch.value : "");
    if (matched) {
      loadStockIntoWorkbench(matched);
      renderMatchSummary(`${getDisplayLabel(matched)} 종목을 불러왔습니다.`);
    } else {
      setText(quoteChange, "검색된 프리셋 종목이 없습니다.");
      setText(quoteTimestamp, "직접 입력 상태");
      renderMatchSummary("일치하는 종목이 없습니다. 시장 필터를 바꾸거나 영문명/티커/6자리 코드를 다시 확인해 주세요.");
    }
  });
}

if (clearSearchButton) {
  clearSearchButton.addEventListener("click", () => {
    if (stockSearch) {
      stockSearch.value = "";
    }
    renderSearchResults("");
    renderMatchSummary("검색어를 비웠습니다. 아래 후보에서 바로 고를 수 있습니다.");
  });
}

document.querySelectorAll("[data-quick-search]").forEach((button) => {
  button.addEventListener("click", () => {
    const query = button.dataset.quickSearch || "";
    if (stockSearch) {
      stockSearch.value = query;
      stockSearch.focus();
    }
    renderSearchResults(query);
    renderMatchSummary(`${query} 관련 후보를 먼저 보여드렸습니다. 아래 카드 하나만 누르시면 됩니다.`);
  });
});

if (stockSearch) {
  stockSearch.addEventListener("input", () => {
    const value = stockSearch.value.trim();
    const matches = getSearchMatches(value);
    renderSearchResults(value);

    if (!value) {
      renderMatchSummary(`${getMarketFilterLabel(getActiveMarketFilter())} 기준 대표 종목 후보를 먼저 보여주고 있습니다.`);
      return;
    }

    if (matches.length > 0) {
      renderMatchSummary(`검색 결과 ${matches.length}개 후보를 먼저 보여줍니다. Enter를 누르면 첫 후보를 바로 불러옵니다.`);
    } else {
      renderMatchSummary("일치하는 종목이 없습니다. 한글명, 영문명, 티커를 다시 확인해 주세요.");
    }
  });

  stockSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const firstMatch = getSearchMatches(stockSearch.value, 1)[0] ?? findStockBySearchInput(stockSearch.value);
      if (firstMatch) {
        loadStockIntoWorkbench(firstMatch);
        renderMatchSummary(`${getDisplayLabel(firstMatch)} 종목을 바로 불러왔습니다.`);
      }
      return;
    }

    if (event.key === "Escape") {
      stockSearch.value = "";
      renderSearchResults("");
      renderMatchSummary("검색어를 비웠습니다.");
    }
  });
}

if (refreshQuoteButton) {
  refreshQuoteButton.addEventListener("click", async () => {
    await refreshLiveQuote();
  });
}

if (fullReviewButton) {
  fullReviewButton.addEventListener("click", () => {
    const matched = findStockBySearchInput(stockSearch ? stockSearch.value : "");
    if (matched) {
      loadStockIntoWorkbench(matched);
    }
    financialSummarySection?.scrollIntoView({ behavior: "smooth", block: "start" });
    renderMatchSummary("현재 선택 종목의 리서치 브리프로 이동했습니다.");
  });
}

if (autoRefreshToggle) {
  autoRefreshToggle.checked = readAutoRefreshPreference();
  autoRefreshToggle.addEventListener("change", () => {
    persistAutoRefreshPreference(autoRefreshToggle.checked);
    configureAutoRefresh();
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const stock = readFormStock();
    selectedStock = stock;
    syncStockRecord(stock.id, {
      displayName: stock.displayName,
      name: stock.name,
      symbol: stock.symbol,
      price: stock.price,
      currency: stock.currency,
      return12m: stock.return12m,
      roe: stock.roe,
      debtRatio: stock.debtRatio,
      per: stock.per,
      pbr: stock.pbr,
      fcfYield: stock.fcfYield,
      volatility: stock.volatility
    });
    renderEvaluation(stock);
    renderUniverse();
    renderPresetGrid();
    renderRecentSelections();
    renderSearchResults(stockSearch?.value ?? "");
    renderMatchSummary(`${getDisplayLabel(stock)} 종목 진단을 업데이트했습니다.`);
  });
}

renderPresetGrid();
renderIpoWatchSection(selectedStock);
renderInvestingCapture();
renderPropicksLive();
renderEtfModels();
renderMarketCoverage();
renderRecentSelections();
renderMatchSummary();
renderSuggestions();
renderSearchResults("");
renderUniverse();
setText(providerHelp, providerHelpText.snapshot);
loadStockIntoWorkbench(featuredStockCatalog[0]);
renderAutoRefreshStatus();
configureAutoRefresh();
loadLiveSnapshots({ silent: true });
})();
