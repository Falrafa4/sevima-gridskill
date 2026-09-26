# GridSkill ⚡

> **Connecting Vocational Talent to Sustainable Tech & Modern Industry**  
> _Platform AI Career & Adaptive Learning Navigator untuk Menjembatani Kesenjangan Kompetensi Lulusan Vokasi (SDG 4)._

---

## 📌 Daftar Isi

1. [Tentang Project](#tentang-project)
2. [Latar Belakang & Data Riil (SDG 4)](#latar-belakang--data-riil-sdg-44)
3. [Tujuan Solusi](#tujuan-solusi)
4. [Tech Stack](#tech-stack)
5. [Arsitektur & Autonomous AI Agent Workflow](#arsitektur--autonomous-ai-agent-workflow)
6. [Struktur Repositori Monorepo](#struktur-repositori-monorepo)
7. [Panduan Instalasi & Menjalankan Project](#panduan-instalasi--menjalankan-project)
   - [Prasyarat Sistem](#prasyarat-sistem)
   - [Setup Backend (FastAPI)](#setup-backend-fastapi)
   - [Migrasi Database & Seeding (db-fresh)](#migrasi-database--seeding-db-fresh)
   - [Setup Frontend (React + Vite)](#setup-frontend-react--vite)
8. [API Endpoints Reference](#api-endpoints-reference)
9. [Changelog & Status Pengembangan](#changelog--status-pengembangan)

---

## 📖 Tentang Project

**GridSkill** adalah platform berbasis agen AI otonom (_Autonomous Agentic AI_) yang dirancang khusus untuk siswa dan lulusan Sekolah Menengah Kejuruan (SMK) rumpun keteknikan dan teknologi informasi (RPL, TKJ, SIJA, Elektronika, Mekatronika).

Platform ini mentransformasikan silabus normatif vokasi menjadi peta jalan mikro adaptif (_adaptive micro-curriculum_) dan secara mandiri menyuntikkan tugas proyek riil (_Project-Based Learning_) berstandar industri berkelanjutan (_Sustainable Tech, Smart Grid, IoT, Green Data Center_).

---

## 📊 Latar Belakang & Data Riil (SDG 4)

Pendidikan vokasi di Indonesia menghadapi tantangan struktural berupa tingginya tingkat ketidaksesuaian kompetensi terhadap tuntutan industri:

- **35,36% Vertical Mismatch (BPS Sakernas):** Lebih dari sepertiga tenaga kerja mengalami ketidaksesuaian tingkat pendidikan (_overeducated_ atau _undereducated_).
- **72,71% Horizontal Mismatch (Sakernas BPS / BRIN Jurnal Kependudukan Indonesia):** Mayoritas mutlak lulusan SMK bekerja di luar bidang keahlian yang dipelajari di sekolah akibat kurikulum yang usang dan minimnya portofolio proyek terstandar industri terkini.
- **Akar Masalah:** Siswa vokasi tidak memiliki instrumen personal yang memetakan kesenjangan keahlian (_skill gap_) dari materi teoritis sekolah ke proyek nyata industri masa kini.

**GridSkill hadir menjawab target SDG 4:** Secara substansial meningkatkan jumlah pemuda dan orang dewasa yang memiliki keterampilan relevan, termasuk keterampilan teknis dan kejuruan, untuk pekerjaan layak dan kewirausahaan.

---

## 🎯 Tujuan Solusi

1. **Pemetaan Kesenjangan Kompetensi Otomatis:** Menilai skill awal siswa dan membandingkannya dengan standar industri modern secara objektif melalui AI.
2. **Autonomous System Execution (Aksi Mandiri):** Bukan sekadar chatbot teks biasa; AI mengeksekusi multi-aksi ke database secara mandiri (menyimpan analisis kesenjangan dan melakukan _batch injection_ tugas proyek).
3. **Project-Based Readiness Tracking:** Melacak progres pengerjaan proyek nyata siswa dengan dashboard _Bento Grid_ dan _Readiness Score_.
4. **Verifiable Skill Evidence:** Menyediakan portofolio berbasis proyek nyata yang siap dilampirkan pada CV/LinkedIn untuk memutus rantai _mismatch_ ketenagakerjaan.

---

## 🛠️ Tech Stack

### Backend

- **Framework:** FastAPI (Python 3.10+, Asynchronous ASGI)
- **Validasi Skema:** Pydantic v2 & Pydantic-Settings
- **Database ORM & Migrasi:** SQLAlchemy 2.0 + Alembic + psycopg2-binary
- **Keamanan:** JSON Web Token (PyJWT) + PBKDF2-HMAC-SHA256 / Bcrypt
- **AI Engine:** Google Gemini API (`google-genai` SDK dengan JSON Structured Output)
- **Server:** Uvicorn

### Frontend

- **Core:** React 19 + TypeScript + Vite
- **Styling & UI:** Tailwind CSS, Lucide Icons, Shadcn/UI primitives (_Neo-Brutalist Bento Grid Style_)

### Database & Cloud Platform

- **Database:** Supabase PostgreSQL
- **Deployment Targets:** Railway (Backend) & Vercel (Frontend)

---

## 🤖 Arsitektur & Autonomous AI Agent Workflow

Sistem menerapkan arsitektur _Agentic AI_ dengan minimal 2 aksi sistem mandiri:

```text
[Input Siswa: Form Minat & Skill Vokasi]
                   │
                   ▼
  [POST /api/v1/agent/generate-pathway] (FastAPI, JWT Protected)
                   │
                   ▼
[Gemini 1.5 Flash: JSON Structured Output Engine]
                   │
      ┌────────────┴────────────┐
      ▼                         ▼
[AKSI SISTEM 1]           [AKSI SISTEM 2]
Simpan Evaluasi Gap     Bulk Insert 3-5 Modul Proyek
-> Tabel 'roadmaps'     -> Tabel 'project_tasks'
      │                         │
      └────────────┬────────────┘
                   ▼
   [Persistensi PostgreSQL Supabase]
                   │
                   ▼
[Interactive Bento Grid Dashboard (React Vite)]
```

---

## 📂 Struktur Repositori Monorepo

```text
gridskill/
├── docs/
│   └── PRD.md                 # Spesifikasi detail Product Requirement Document
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/            # API Route controllers (auth, agent, roadmaps, tasks)
│   │   │   └── deps.py        # Dependency injection (JWT bearer authentication & current_user)
│   │   ├── core/              # Konfigurasi Pydantic Settings, exceptions, dan security/JWT
│   │   ├── database/          # Database engine SQLAlchemy, get_db, dan seeder
│   │   ├── models/            # SQLAlchemy Models (users, profiles, roadmaps, project_tasks)
│   │   ├── schemas/           # Pydantic v2 DTOs (auth, agent, profile, roadmap, task)
│   │   ├── services/          # AI Orchestrator & AuthService
│   │   └── main.py            # FastAPI entry point, CORS middleware, exception handlers
│   ├── migrations/            # Alembic database migrations environment & versions
│   ├── scripts/               # Script reset database (db-fresh.sh & db-fresh.ps1)
│   ├── tests/                 # Pytest automated test suite
│   ├── alembic.ini            # Konfigurasi Alembic
│   ├── pytest.ini             # Konfigurasi Pytest
│   ├── requirements.txt       # Dependencies Python
│   ├── .env.example           # Contoh environment variables backend
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/        # Bento Grid, Cards, Forms, Badges
│   │   ├── services/          # API Client (Axios / Fetch)
│   │   ├── types/             # TypeScript interface definitions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── README.md
```

---

## 🚀 Panduan Instalasi & Menjalankan Project

### Prasyarat Sistem

- Python 3.10+ (Direkomendasikan Python 3.12)
- Node.js v18+ & npm/pnpm
- PostgreSQL atau Akun Supabase aktif
- Google Gemini API Key ([Dapatkan di Google AI Studio](https://aistudio.google.com/))

---

### Setup Backend (FastAPI)

1. **Masuk ke direktori backend:**

   ```bash
   cd backend
   ```

2. **Buat dan aktifkan virtual environment:**

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate    # Linux / macOS
   # atau: .venv\Scripts\activate # Windows
   ```

3. **Install dependensi:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Konfigurasi Environment Variables:**
   Salin berkas `.env.example` menjadi `.env`:

   ```bash
   cp .env.example .env
   ```

   Lalu lengkapi isinya:

   ```env
   APP_NAME="GridSkill Backend API"
   ENVIRONMENT="development"
   CORS_ORIGINS="*"

   # JWT Security
   JWT_SECRET="ganti_dengan_rahasia_acak_panjang"
   JWT_ALGORITHM="HS256"
   ACCESS_TOKEN_EXPIRE_MINUTES=1440

   # Supabase Direct PostgreSQL Connection (Transaction / Session pooler)
   DATABASE_URL="postgresql+psycopg2://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"

   # Google AI Studio API Key
   GEMINI_API_KEY="AIzaSy..."
   GEMINI_MODEL="gemini-1.5-flash"
   ```

5. **Jalankan Backend Server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   Buka dokumentasi interaktif Swagger API di: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Migrasi Database & Seeding (db-fresh)

Untuk mereset database ke kondisi bersih, menjalankan seluruh migrasi Alembic, dan menginjeksi data seeder awal:

- **Linux / macOS:**
  ```bash
  cd backend
  chmod +x scripts/db-fresh.sh
  ./scripts/db-fresh.sh
  ```

- **Windows PowerShell:**
  ```powershell
  cd backend
  .\scripts\db-fresh.ps1
  ```

> *Catatan: Script `db-fresh` sudah dilengkapi auto-chdir sehingga dapat dieksekusi baik dari folder `backend/` maupun dari dalam `backend/scripts/`.*

**Kredensial Akun Seeder Awal:**

- **Admin:** `admin@gridskill.id` / `adminpassword123`
- **Siswa Contoh:** `siswa@gridskill.id` / `siswapassword123`

---

### Setup Frontend (React + Vite)

1. **Masuk ke direktori frontend:**

   ```bash
   cd frontend
   ```

2. **Install dependensi node:**

   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Aplikasi web dapat diakses pada [http://localhost:5173](http://localhost:5173).

---

## 📡 API Endpoints Reference

| Method  | Endpoint                         | Akses         | Deskripsi                                                                |
| ------- | -------------------------------- | ------------- | ------------------------------------------------------------------------ |
| `GET`   | `/`                              | Publik        | Root informasi status aplikasi & versi                                   |
| `GET`   | `/health`                        | Publik        | Health-check koneksi database                                            |
| `POST`  | `/api/v1/auth/register`          | Publik        | Registrasi akun pengguna baru & penerbitan token JWT                     |
| `POST`  | `/api/v1/auth/login`             | Publik        | Login pengguna & penerbitan token JWT                                    |
| `GET`   | `/api/v1/auth/me`                | 🔒 Bearer JWT | Mengambil profil pengguna yang sedang login                              |
| `POST`  | `/api/v1/agent/generate-pathway` | 🔒 Bearer JWT | Memicu AI Agent menganalisis profil dan mengeksekusi 2 aksi insert ke DB |
| `GET`   | `/api/v1/roadmaps/{profile_id}`  | 🔒 Bearer JWT | Mengambil detail roadmap dan daftar tugas proyek siswa                   |
| `PATCH` | `/api/v1/tasks/{task_id}/toggle` | 🔒 Bearer JWT | Mengubah status centang tugas proyek (`is_completed`)                    |

---

## 📝 Changelog & Status Pengembangan

- **v0.2.0 (Authentication, Migrations & Security):**
  - Implementasi Autentikasi Pengguna menggunakan JWT (PyJWT) dan PBKDF2-HMAC-SHA256.
  - Penambahan tabel `users` dengan relasi 1:1 ke tabel `profiles`.
  - Pemasangan middleware proteksi API pada endpoint agent, roadmap, dan task toggle.
  - Setup database migrations menggunakan Alembic (`alembic.ini`, `migrations/env.py`, `0001_initial_schema.py`).
  - Penambahan idempotent database seeder (`app/database/seed.py`) dengan akun Admin dan Siswa demo.
  - Penambahan script otomasi `scripts/db-fresh.sh` dan `scripts/db-fresh.ps1`.
  - Penambahan pengujian unit & integrasi untuk seluruh skenario auth dan proteksi route.
- **v0.1.0 (Initial Setup):**
  - Scaffold struktur monorepo (`backend/` & `frontend/`).
  - Inisialisasi konfigurasi core backend, CORS, dan standardized exception handlers.
  - Implementasi SQLAlchemy 2.0 ORM models (`Profile`, `Roadmap`, `ProjectTask`).
  - Implementasi skema Pydantic v2 untuk DTO dan Gemini Structured Output (`AgentOutputSchema`).
