#!/usr/bin/env bash
set -e

# ==============================================================================
# GridSkill Backend - Database Fresh & Seeding Script (Linux / macOS)
# ==============================================================================

echo "========================================================="
echo " ⚡ GridSkill Backend: Database Fresh & Migration Reset"
echo "========================================================="

# 1. Pastikan virtual environment aktif jika folder .venv tersedia
if [ -z "$VIRTUAL_ENV" ]; then
    if [ -d ".venv" ]; then
        echo "⚡ Mengaktifkan virtual environment (.venv)..."
        source .venv/bin/activate
    elif [ -d "venv" ]; then
        echo "⚡ Mengaktifkan virtual environment (venv)..."
        source venv/bin/activate
    elif [ -d "../.venv" ]; then
        echo "⚡ Mengaktifkan virtual environment (../.venv)..."
        source ../.venv/bin/activate
    else
        echo "⚠️  Virtual environment tidak ditemukan, menjalankan dengan python default..."
    fi
fi

# 2. Rollback seluruh migrasi ke titik awal (base)
echo ""
echo "🔄 [1/3] Melakukan rollback seluruh migrasi (alembic downgrade base)..."
alembic downgrade base

# 3. Jalankan kembali seluruh migrasi ke versi terbaru (head)
echo ""
echo "🚀 [2/3] Menjalankan kembali seluruh migrasi (alembic upgrade head)..."
alembic upgrade head

# 4. Jalankan database seeder jika script seed tersedia
echo ""
echo "🌱 [3/3] Menjalankan proses seeding data awal..."
if [ -f "app/database/seed.py" ]; then
    python3 -m app.database.seed
elif [ -f "backend/app/database/seed.py" ]; then
    python3 -m backend.app.database.seed
else
    echo "ℹ️  File seeder tidak ditemukan, melewati tahap seeding."
fi

echo "========================================================="
echo " ✨ Database fresh dan seeding selesai dengan sukses!"
echo "========================================================="
