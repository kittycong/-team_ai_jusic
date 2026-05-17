param(
  [int]$Port = 8000
)

$ErrorActionPreference = "Stop"

$apiRoot = $PSScriptRoot
$repoRoot = Split-Path $apiRoot -Parent | Split-Path -Parent
$venvPython = Join-Path $apiRoot ".venv\Scripts\python.exe"

if (-not (Test-Path $venvPython)) {
  & (Join-Path $apiRoot "bootstrap.ps1")
}

Push-Location $repoRoot
try {
  & $venvPython -m uvicorn apps.api.app.main:app --reload --host 127.0.0.1 --port $Port
} finally {
  Pop-Location
}
