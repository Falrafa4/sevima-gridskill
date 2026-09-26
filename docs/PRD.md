# Product Requirement Document (PRD): GridSkill
Version: 1.0 (Draft)

## 1. Project Overview
* **Nama Produk:** GridSkill
* **Tagline:** Connecting Vocational Talent to Sustainable Tech & Modern Industry
* **Domain Kasus:** SDG 4 - Quality Education (Target 4.4: Peningkatan Keterampilan Vokasi untuk Pekerjaan Layak)
* **Konteks:** Hackathon SEMESTA 8 by SEVIMA (Format Solo, durasi efektif koding 6–7 jam)
* **Core Philosophy:** Mengubah kurikulum normatif SMK menjadi modul belajar adaptif berbasis proyek nyata (*Project-Based Learning*) via *Autonomous AI Agent*.

---

## 2. Problem Statement & Data Validation
* **Isu Utama (SDG 4.4):** Kualitas pendidikan vokasi di Indonesia menghadapi kendala jurang relevansi kompetensi lulusan terhadap tuntutan industri teknologi modern.
* **Validasi Data Riil BPS & BRIN:**
  * **35,36% Vertical Mismatch (BPS Sakernas):** Lebih dari sepertiga tenaga kerja mengalami ketidaksesuaian level pendidikan (*overeducated* atau *undereducated*).
  * **72,71% Horizontal Mismatch (Sakernas BPS 2022 / BRIN Jurnal Kependudukan Indonesia):** Mayoritas mutlak lulusan SMK bekerja di luar bidang kompetensi kejuruan yang dipelajarinya di sekolah akibat kurikulum yang usang dan ketiadaan portofolio proyek terstandar.
* **Akar Masalah:** Siswa vokasi tidak memiliki panduan personal untuk memetakan kesenjangan keahlian (*skill gap*) dari materi normatif sekolah ke proyek nyata yang dibutuhkan industri masa kini.

---

## 3. Scope & Target User
* **Target Pengguna:** Siswa & lulusan SMK rumpun teknologi informasi dan keteknikan (RPL, TKJ, SIJA, Elektronika, Mekatronika).
* **Solusi GridSkill:** Platform AI Career & Learning Navigator yang memetakan keahlian dasar siswa, menghasilkan kurikulum mikro adaptif, dan menginjeksi tugas proyek terstruktur langsung ke database akun siswa secara otonom.

---

## 4. Tech Stack & Repository Structure
Sesuai regulasi kompetisi (wajib 1 repositori GitHub monorepo):
* **Frontend:** React.js (Vite, JavaScript, Tailwind CSS, Lucide Icons, Shadcn/UI primitives).
* **Backend:** FastAPI (Python 3.10+, Pydantic v2, Uvicorn, Asynchronous ASGI).
* **Database & BaaS:** Supabase (PostgreSQL, Cloud Hosted).
* **AI Engine:** Google Gemini API (Model: `gemini-1.5-flash` dengan JSON Structured Output).
* **Deployment Targets:** Vercel (Frontend root: `/frontend`), Railway (Backend root: `/backend`).

### Monorepo Directory Tree
```text
gridskill/
├── frontend/             # React.js SPA (Vite)
│   ├── src/
│   │   ├── components/   # Bento Grid, Cards, Forms, Badges
│   │   ├── services/     # Axios / Fetch API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── backend/              # FastAPI Python Microservice
│   ├── app/
│   │   ├── api/          # Endpoints (auth, profile, agent, tasks)
│   │   ├── core/         # Config, env, Supabase client
│   │   ├── schemas/      # Pydantic schemas (Gemini response validation)
│   │   ├── services/     # Gemini Agent Orchestrator
│   │   └── main.py       # FastAPI entrypoint + CORS
│   ├── requirements.txt
├── README.md
└── .gitignore

```

---

## 5. Database Schema (Supabase PostgreSQL DDL)

Eksekusi skrip SQL ini langsung di Supabase SQL Editor:

```sql
-- 1. Tabel Profil Siswa
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(100) NOT NULL,
    vocational_major VARCHAR(100) NOT NULL, -- Contoh: SIJA, RPL, TKJ
    current_skills TEXT[] DEFAULT '{}',
    target_industry VARCHAR(100) NOT NULL, -- Contoh: Smart Grid, IoT Agrotech, Green Web
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Roadmap Belajar (Aksi AI 1)
CREATE TABLE roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    analysis_summary TEXT NOT NULL,
    skill_gap_summary TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Checklist Tugas Proyek (Aksi AI 2)
CREATE TABLE project_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    project_category VARCHAR(50) NOT NULL, -- Hardware, Software, Optimization
    estimated_hours INT DEFAULT 2,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

```

---

## 6. MVP Core Features & Agentic AI Workflow

Untuk mengamankan **+10 Poin Challenge AI Agent** (minimal 2 aksi sistem mandiri) dan **+2 Poin Database**, sistem dilarang sekadar menjadi chatbot teks.

```
[Siswa Input Data Form]
         │
         ▼
[POST /api/agent/generate-pathway] (FastAPI)
         │
         ▼
[Gemini 1.5 Flash: JSON Structured Output]
         │
         ├─► [AKSI SISTEM 1]: Insert Profile & Evaluasi Gap -> tabel 'roadmaps'
         └─► [AKSI SISTEM 2]: Bulk Insert Batch Modul Proyek -> tabel 'project_tasks'
         │
         ▼
[Bento Grid Dashboard]: Real-time Render & Interactive Task Checklist

```

### Rincian Fitur:

1. **Feature 1: Vocational Profiler (Onboarding Form)**
* Input: Nama siswa, Jurusan SMK (Dropdown), Keahlian saat ini (Tags/Multiselect), dan Minat Industri Masa Depan.


2. **Feature 2: Autonomous Agentic Orchestrator (Backend Engine)**
* Prompting Gemini dengan skema output JSON ketat.
* **Aksi 1 (Save Gap Analysis):** Menyimpan ringkasan kesenjangan kompetensi normatif vs standar industri ke database.
* **Aksi 2 (Automated Task Injection):** Mengurai 3–5 modul proyek *hands-on* dan langsung mengeksekusi operasi *batch insert* ke tabel `project_tasks`.


3. **Feature 3: Bento Grid Project Checklist & Readiness Tracker**
* Dashboard interaktif menampilkan ringkasan analisis *gap*.
* Daftar tugas proyek dengan checkbox interaktif (PATCH status ke database).
* Bar progress dinamis: persentase kesiapan siswa (*Vocational Readiness Score*).


4. **Feature 4: Public Shareable Skill Badge**
* Halaman ringkasan profil verifikasi kompetensi siswa yang siap dipamerkan di CV atau portofolio.



---

## 7. API Specifications (FastAPI)

### 1. `POST /api/agent/generate-pathway`

* **Deskripsi:** Memicu autonomous agent untuk menganalisis data siswa dan mengeksekusi 2 aksi insert database.
* **Request Body:**
```json
{
  "student_name": "Rizky Ramadhan",
  "vocational_major": "SIJA",
  "current_skills": ["Networking", "Basic Linux", "IoT Arduino"],
  "target_industry": "Smart Energy & Green Data Center"
}

```


* **Gemini Structured Output Schema (Pydantic):**
```python
class TaskItem(BaseModel):
    title: str
    description: str
    project_category: str
    estimated_hours: int

class AgentOutputSchema(BaseModel):
    roadmap_title: str
    analysis_summary: str
    skill_gaps: list[str]
    tasks: list[TaskItem]

```


* **Response Status:** `201 Created`

### 2. `GET /api/roadmaps/{profile_id}`

* **Deskripsi:** Mengambil detail roadmap dan daftar tugas proyek yang telah terinjeksi.
* **Response:** Mengembalikan objek roadmap beserta relasi array `project_tasks`.

### 3. `PATCH /api/tasks/{task_id}/toggle`

* **Deskripsi:** Mengubah status `is_completed` (true/false) untuk mencatat kemajuan belajar siswa di database.

---

## 8. Frontend Design & UI/UX Guidelines

* **Gaya Antarmuka:** *Neo-Brutalist Bento Grid*.
* **Karakter Visual:**
* Border tegas (`border-2 border-slate-900`).
* Bayangan keras tanpa blur (`shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]`).
* Sudut `rounded-xl`.


* **Warna Utama:**
* Background: Slate / Off-white (`#F8FAFC`).
* Accent Pop: Cyber Lime / Acid Green (`#84CC16` atau `#A3E635`) untuk tombol CTA dan highlight status.
* Secondary: Deep Emerald (`#047857`) merefleksikan keberlanjutan dan kualitas.


* **Feedback Interaktif:** Tampilkan indikator status progres AI (step-by-step loading state: *"Menganalisis jurang kompetensi..." -> "Menyimpan roadmap..." -> "Menginjeksi checklist proyek ke database..."*).

---

## 9. Hackathon 6-Hour Timeline & Execution Checkpoints

* **Jam 00:00 - 01:15 (Scaffold & Database):** Init monorepo Vite + FastAPI, setup schema tabel Supabase, pastikan koneksi backend ke Supabase berjalan.
* **Jam 01:15 - 03:00 (AI Agent Logic):** Implementasi endpoint `/api/agent/generate-pathway` dengan Gemini 1.5 Flash + Supabase Bulk Insert. Uji via Swagger `/docs`.
* **Jam 03:00 - 04:30 (Bento Grid Frontend):** Bangun form input dan kartu dashboard checklist proyek, sambungkan API dengan Axios.
* **Jam 04:30 - 05:15 (Deploy & Testing):** Deploy FastAPI ke Railway dan React ke Vercel. Pastikan CORS bekerja dan data tidak hilang saat browser di-refresh.
* **Jam 05:15 - 06:00 (Submission Artifacts):** Stop ngoding! Rekam video demo (maks 5 menit, tunjukkan Supabase Table Editor saat data masuk), lengkapi slide deck (10 slide), dan ekspor Narasi Teknis 5 field ke PDF.

---

## 10. Rubric & Challenge Points Checklist

* [x] **Core Functionality:** Aplikasi berjalan end-to-end tanpa mock statis.
* [x] **SDG Alignment (Relevance):** Solusi tepat sasaran menjawab SDG 4.4, Vertical Mismatch (35,36%), dan Horizontal Mismatch (72,71%).
* [x] **AI Agent Challenge (+10):** Minimal 2 aksi sistem otomatis (Aksi 1: Simpan analisis gap, Aksi 2: Batch insert tasks).
* [x] **Database Persistence Challenge (+2):** Data tersimpan persisten di PostgreSQL Supabase (bukan localStorage).
* [x] **Responsive Challenge (+2):** Tampilan Bento Grid adaptif di desktop dan mobile browser.