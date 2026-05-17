from fastapi import APIRouter

router = APIRouter()


@router.get("/dashboard")
def get_dashboard():
    return {
        "market_regime": "Risk-On",
        "risk_level": "MEDIUM",
        "widgets": [
            {"symbol": "BTC", "price": 103200, "changePct": 2.1},
            {"symbol": "ETH", "price": 3120, "changePct": -0.4},
            {"symbol": "NVDA", "price": 219.07, "changePct": 1.8},
            {"symbol": "SOXL", "price": 64.2, "changePct": 4.2},
        ],
    }
