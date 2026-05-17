from fastapi import FastAPI

from .routers.market import router as market_router
from .routers.research import router as research_router
from .routers.risk import router as risk_router

app = FastAPI(
    title="AI Market Command Center API",
    description="시장 위젯, AI 리포트, 리스크 분석을 위한 MVP API",
    version="0.1.0",
)

app.include_router(market_router, prefix="/market", tags=["market"])
app.include_router(research_router, prefix="/research", tags=["research"])
app.include_router(risk_router, prefix="/risk", tags=["risk"])


@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-market-command-center-api"}
