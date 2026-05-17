param()

$ErrorActionPreference = "Stop"

$apiRoot = $PSScriptRoot
$venvPython = Join-Path $apiRoot ".venv\Scripts\python.exe"

function Resolve-Python {
  if (Test-Path $venvPython) {
    return $venvPython
  }

  $candidates = @(
    "python",
    "py",
    "C:\Users\휘원\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
  )

  foreach ($candidate in $candidates) {
    try {
      if ($candidate -eq "py") {
        & $candidate -3 --version *> $null
        return "$candidate -3"
      }

      & $candidate --version *> $null
      return $candidate
    } catch {
      continue
    }
  }

  throw "Python runtime not found. Install Python 3.12+ or adjust apps/api/bootstrap.ps1."
}

$pythonCommand = Resolve-Python

if (-not (Test-Path $venvPython)) {
  Write-Host "Creating API virtual environment..."
  if ($pythonCommand -eq "py -3") {
    py -3 -m venv (Join-Path $apiRoot ".venv")
  } else {
    & $pythonCommand -m venv (Join-Path $apiRoot ".venv")
  }
}

Write-Host "Installing API dependencies..."
& $venvPython -m pip install --upgrade pip
& $venvPython -m pip install -r (Join-Path $apiRoot "requirements.txt")

Write-Host "API bootstrap complete."
