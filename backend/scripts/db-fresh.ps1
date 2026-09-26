# ==============================================================================
# GridSkill Backend - Database Fresh & Seeding Script (Windows PowerShell)
# ==============================================================================

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host " ⚡ GridSkill Backend: Database Fresh & Migration Reset (PowerShell)" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan

# 1. Pindah working directory ke root folder backend (lokasi alembic.ini)
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$BackendDir = Split-Path -Parent $ScriptDir
Set-Location $BackendDir
Write-Host "📂 Working directory: $BackendDir" -ForegroundColor Gray

# 2. Pastikan virtual environment aktif
if (-not $env:VIRTUAL_ENV) {
    if (Test-Path ".venv\Scripts\Activate.ps1") {
        Write-Host "⚡ Mengaktifkan virtual environment (.venv)..." -ForegroundColor Yellow
        & .venv\Scripts\Activate.ps1
    } elseif (Test-Path "venv\Scripts\Activate.ps1") {
        Write-Host "⚡ Mengaktifkan virtual environment (venv)..." -ForegroundColor Yellow
        & venv\Scripts\Activate.ps1
    } else {
        Write-Host "⚠️  Virtual environment tidak ditemukan, menggunakan python default." -ForegroundColor Yellow
    }
}

# 3. Rollback seluruh migrasi ke titik awal (base)
Write-Host "`n🔄 [1/3] Melakukan rollback seluruh migrasi (alembic downgrade base)..." -ForegroundColor Yellow
alembic downgrade base
if ($LASTEXITCODE -ne 0) {
    Write-Error "Gagal melakukan rollback migrasi."
    exit $LASTEXITCODE
}

# 4. Jalankan kembali seluruh migrasi ke versi terbaru (head)
Write-Host "`n🚀 [2/3] Menjalankan kembali seluruh migrasi (alembic upgrade head)..." -ForegroundColor Yellow
alembic upgrade head
if ($LASTEXITCODE -ne 0) {
    Write-Error "Gagal menjalankan migrasi."
    exit $LASTEXITCODE
}

# 5. Jalankan seeder
Write-Host "`n🌱 [3/3] Menjalankan proses seeding data awal..." -ForegroundColor Yellow
if (Test-Path "app\database\seed.py") {
    python -m app.database.seed
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Gagal melakukan seeding data."
        exit $LASTEXITCODE
    }
} else {
    Write-Host "ℹ️  File seeder app\database\seed.py tidak ditemukan." -ForegroundColor Gray
}

Write-Host "`n=========================================================" -ForegroundColor Green
Write-Host " ✨ Database fresh dan seeding selesai dengan sukses!" -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Green
