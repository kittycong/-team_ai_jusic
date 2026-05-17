from pydantic import BaseModel


class AssetSnapshot(BaseModel):
    symbol: str
    asset_type: str
    sector: str
    price: float
    change_pct: float
    volume_shock: float
