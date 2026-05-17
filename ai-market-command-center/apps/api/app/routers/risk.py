from fastapi import APIRouter

router = APIRouter()


@router.get("/portfolio")
def portfolio_risk():
    return {
        "level": "HIGH",
        "reasons": [
            "SOXL 비중 35%",
            "반도체 섹터 집중도 62%",
            "현금 비중 부족",
            "고변동성 구간 진입",
        ],
    }
