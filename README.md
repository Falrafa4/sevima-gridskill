# GridSkill ⚡

> **Connecting Vocational Talent to Sustainable Tech & Modern Industry**  
> *Platform AI Career & Adaptive Learning Navigator untuk Menjembatani Kesenjangan Kompetensi Lulusan Vokasi (SDG 4.4).*

---

## 📌 Daftar Isi
1. [Tentang Project](#tentang-project)
2. [Latar Belakang & Data Riil (SDG 4.4)](#latar-belakang--data-riil-sdg-44)
3. [Tujuan Solusi](#tujuan-solusi)
4. [Tech Stack](#tech-stack)
5. [Arsitektur & Autonomous AI Agent Workflow](#arsitektur--autonomous-ai-agent-workflow)
6. [Struktur Repositori Monorepo](#struktur-repositori-monorepo)
7. [Panduan Instalasi & Menjalankan Project](#panduan-instalasi--menjalankan-project)
   - [Prasyarat Sistem](#prasyarat-sistem)
   - [Setup Backend (FastAPI)](#setup-backend-fastapi)
   - [Setup Frontend (React + Vite)](#setup-frontend-react--vite)
   - [Setup Database Supabase](#setup-database-supabase)
8. [API Endpoints Reference](#api-endpoints-reference)
9. [Changelog & Status Pengembangan](#changelog--status-pengembangan)

---

## 📖 Tentang Project

**GridSkill** adalah platform berbasis agen AI otonom (*Autonomous Agentic AI*) yang dirancang khusus untuk siswa dan lulusan Sekolah Menengah Kejuruan (SMK) rumpun keteknikan dan teknologi informasi (RPL, TKJ, SIJA, Elektronika, Mekatronika). 

Platform ini mentransformasikan silabus normatif vokasi menjadi peta jalan mikro adaptif (*adaptive micro-curriculum*) dan secara mandiri menyuntikkan tugas proyek riil (*Project-Based Learning*) berstandar industri berkelanjutan (*Sustainable Tech, Smart Grid, IoT, Green Data Center*).

---

## 📊 Latar Belakang & Data Riil (SDG 4.4)

Pendidikan vokasi di Indonesia menghadapi tantangan struktural berupa tingginya tingkat ketidaksesuaian kompetensi terhadap tuntutan industri:

* **35,36% Vertical Mismatch (BPS Sakernas):** Lebih dari sepertiga tenaga kerja mengalami ketidaksesuaian tingkat pendidikan (*overeducated* atau *undereducated*).
* **72,71% Horizontal Mismatch (Sakernas BPS / BRIN Jurnal Kependudukan Indonesia):** Mayoritas mutlak lulusan SMK bekerja di luar bidang keahlian yang dipelajari di sekolah akibat kurikulum yang usang dan minimnya portofolio proyek terstandar industri terkini.
* **Akar Masalah:** Siswa vokasi tidak memiliki instrumen personal yang memetakan kesenjangan keahlian (*skill gap*) dari materi teoritis sekolah ke proyek nyata industri masa kini.

**GridSkill hadir menjawab target SDG 4.4:** Secara substansial meningkatkan jumlah pemuda dan orang dewasa yang memiliki keterampilan relevan, termasuk keterampilan teknis dan kejuruan, untuk pekerjaan layak dan kewirausahaan.

---

## 🎯 Tujuan Solusi

1. **Pemetaan Kesenjangan Kompetensi Otomatis:** Menilai skill awal siswa dan membandingkannya dengan standar industri modern secara objektif melalui AI.
2. **Autonomous System Execution (Aksi Mandiri):** Bukan sekadar chatbot teks biasa; AI mengeksekusi multi-aksi ke database secara mandiri (menyimpan analisis kesenjangan dan melakukan *batch injection* tugas proyek).
3. **Project-Based Readiness Tracking:** Melacak progres pengerjaan proyek nyata siswa dengan dashboard *Bento Grid* dan *Readiness Score*.
4. **Verifiable Skill Evidence:** Menyediakan portofolio berbasis proyek nyata yang siap dilampirkan pada CV/LinkedIn untuk memutus rantai *mismatch* ketenagakerjaan.

---

## 🛠️ Tech Stack

### Backend
* **Framework:** FastAPI (Python 3.10+, Asynchronous ASGI)
* **Validasi Skema:** Pydantic v2 & Pydantic-Settings
* **Database ORM & Driver:** SQLAlchemy 2.0 + psycopg2-binary
* **AI Engine:** Google Gemini API (`google-genai` SDK dengan JSON Structured Output)
* **Server:** Uvicorn

### Frontend
* **Core:** React 19 + TypeScript + Vite
* **Styling & UI:** Tailwind CSS, Lucide Icons, Shadcn/UI primitives (*Neo-Brutalist Bento Grid Style*)

### Database & Cloud Platform
* **Database:** Supabase PostgreSQL
* **Deployment Targets:** Railway (Backend) & Vercel (Frontend)

---

## 🤖 Arsitektur & Autonomous AI Agent Workflow

Sistem menerapkan arsitektur *Agentic AI* dengan minimal 2 aksi sistem mandiri:

```text
[Input Siswa: Form Minat & Skill Vokasi]
                   │
                   ▼
  [POST /api/v1/agent/generate-pathway] (FastAPI)
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
│   │   │   └── v1/            # API Route controllers (agent, roadmaps, tasks)
│   │   ├── core/              # Konfigurasi Pydantic Settings & Error handling
│   │   ├── database/          # Database engine SQLAlchemy & session dependencies
│   │   ├── models/            # SQLAlchemy Database Models (profiles, roadmaps, project_tasks)
│   │   ├── schemas/           # Pydantic v2 DTOs & Gemini structured output schemas
│   │   ├── services/          # AI Orchestrator & Google GenAI clients
│   │   └── main.py            # FastAPI entry point, CORS middleware, exception handlers
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
* Python 3.10+ (Direkomendasikan Python 3.12)
* Node.js v18+ & npm/pnpm
* PostgreSQL atau Akun Supabase aktif
* Google Gemini API Key ([Dapatkan di Google AI Studio](https://aistudio.google.com/))

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

### Setup Database Supabase

Jalankan script DDL berikut pada menu **SQL Editor** di Dashboard Supabase:

```sql
-- 1. Tabel Profil Siswa
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(100) NOT NULL,
    vocational_major VARCHAR(100) NOT NULL,
    current_skills TEXT[] DEFAULT '{}',
    target_industry VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Roadmap Belajar (Aksi AI 1)
CREATE TABLE IF NOT EXISTS roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    analysis_summary TEXT NOT NULL,
    skill_gap_summary TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Checklist Tugas Proyek (Aksi AI 2)
CREATE TABLE IF NOT EXISTS project_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    project_category VARCHAR(50) NOT NULL,
    estimated_hours INT DEFAULT 2,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

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

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/` | Root informasi status aplikasi & versi |
| `GET` | `/health` | Health-check koneksi database |
| `POST` | `/api/v1/agent/generate-pathway` | Memicu AI Agent menganalisis profil dan mengeksekusi 2 aksi insert ke DB |
| `GET` | `/api/v1/roadmaps/{profile_id}` | Mengambil detail roadmap dan daftar tugas proyek siswa |
| `PATCH` | `/api/v1/tasks/{task_id}/toggle` | Mengubah status centang tugas proyek (`is_completed`) |

---

## 📝 Changelog & Status Pengembangan

- **v0.1.0 (Initial Setup):**
  - Scaffold struktur monorepo (`backend/` & `frontend/`).
  - Inisialisasi konfigurasi core backend, CORS, dan standardized exception handlers.
  - Implementasi SQLAlchemy 2.0 ORM models (`Profile`, `Roadmap`, `ProjectTask`) dengan dukungan PostgreSQL UUID & fallback SQLite lokal.
  - Implementasi skema Pydantic v2 untuk DTO dan Gemini Structured Output (`AgentOutputSchema`).
  - Penyusunan dokumentasi komprehensif `README.md`.
