from fastapi import APIRouter

router = APIRouter()


@router.get("/sample-report")
def sample_report():
    return {
        "symbol": "NVDA",
        "actionLabel": "Watch",
        "confidenceScore": 78,
        "summary": "AI 인프라 수요는 강하지만 기대치도 높아 분할 접근이 유효합니다.",
        "bullishDrivers": [
            "데이터센터 수요 유지",
            "AI 인프라 지출 확대",
            "추세와 거래량 동반"
        ],
        "bearishDrivers": [
            "고밸류 부담",
            "기대치 과열",
            "대형 고객 주문 민감도"
        ],
    }
