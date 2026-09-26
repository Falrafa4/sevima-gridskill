#!/usr/bin/env bash
set -e

# ==============================================================================
# GridSkill Backend - Database Fresh & Seeding Script (Linux / macOS)
# ==============================================================================

echo "========================================================="
echo " ⚡ GridSkill Backend: Database Fresh & Migration Reset"
echo "========================================================="

# 1. Pastikan direktori kerja berpindah ke root folder backend (tempat alembic.ini berada)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$BACKEND_DIR"
echo "📂 Working directory disetel ke: $BACKEND_DIR"

# 2. Pastikan virtual environment aktif
if [ -z "$VIRTUAL_ENV" ]; then
    if [ -d ".venv" ]; then
        echo "⚡ Mengaktifkan virtual environment (.venv)..."
        source .venv/bin/activate
    elif [ -d "venv" ]; then
        echo "⚡ Mengaktifkan virtual environment (venv)..."
        source venv/bin/activate
    else
        echo "⚠️  Virtual environment tidak ditemukan, menjalankan dengan python default..."
    fi
fi

# 3. Rollback seluruh migrasi ke titik awal (base)
echo ""
echo "🔄 [1/3] Melakukan rollback seluruh migrasi (alembic downgrade base)..."
alembic downgrade base

# 4. Jalankan kembali seluruh migrasi ke versi terbaru (head)
echo ""
echo "🚀 [2/3] Menjalankan kembali seluruh migrasi (alembic upgrade head)..."
alembic upgrade head

# 5. Jalankan database seeder
echo ""
echo "🌱 [3/3] Menjalankan proses seeding data awal..."
if [ -f "app/database/seed.py" ]; then
    python3 -m app.database.seed
else
    echo "ℹ️  File seeder app/database/seed.py tidak ditemukan, melewati tahap seeding."
fi

echo "========================================================="
echo " ✨ Database fresh dan seeding selesai dengan sukses!"
echo "========================================================="
