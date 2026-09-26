# GridSkill Monorepo — AI Agent Guidelines & Coding Standards

Dokumen ini berfungsi sebagai instruksi acuan utama (*System Prompt & Context Contract*) bagi seluruh AI Agent yang beroperasi dan memodifikasi repositori **GridSkill**.

AI Agent **WAJIB membaca, memahami, dan mematuhi** setiap aturan di bawah ini sebelum membuat atau mengubah kode.

---

## 1. Project Context & Identity
* **Nama Proyek:** GridSkill
* **Tagline:** Connecting Vocational Talent to Sustainable Tech & Modern Industry
* **Domain & Dampak:** SDG 4 - Quality Education (Target 4.4: Peningkatan Keterampilan Vokasi untuk Pekerjaan Layak). Mengatasi isu nasional *Vertical Mismatch* (35,36%) dan *Horizontal Mismatch* (72,71%).
* **Konteks:** Hackathon SEMESTA 8 by SEVIMA.
* **Arsitektur Repositori:** Monorepo (`backend/` FastAPI + `frontend/` React JSX Vite).

---

## 2. Connected Documentation (Source of Truth)
Sebelum mengeksekusi tugas apapun, AI Agent **WAJIB merujuk pada dokumen berikut**:
* **Product Requirements Document (PRD):** `@docs/PRD.md` — Spesifikasi fitur, alur agen otonom, dan kontrak API.
* **Design System & UX Guidelines:** `@docs/DESIGN.md` — Panduan visual mutlak (*Authentic Tactical Editorial Bento*), palet warna baku, dan aturan anti-AI slop.

---

## 3. Aturan Mutlak Batas Kode (Strict LOC Limit: 300 - 400 Baris)

> ⚠️ **ATURAN MUTLAK (HARD CEILING):**  
> Setiap file kode (`.jsx`, `.js`, `.py`, `.css`) **TIDAK BOLEH MELEBIHI 300 BARIS** (batas toleransi maksimal mentok di 400 baris).

### Aturan Dekomposisi File:
1. **Dilarang Keras Membuat "God Component" / Monolithic File:**
   - Dilarang menaruh seluruh markup dashboard, state, form modal, dan kalkulasi di dalam satu file `App.jsx`.
   - File utama `App.jsx` bertindak murni sebagai **orchestrator** (penyusun komponen) dengan panjang ideal 100–150 baris.
2. **Pecah Menjadi Komponen-Komponen Terfokus (Single Responsibility Principle):**
   - Kartu Bento 1 (Analisis Gap & Roadmap) $\rightarrow$ `src/components/RoadmapCard.jsx` (~100 baris).
   - Kartu Bento 2 (Skor Kesiapan) $\rightarrow$ `src/components/ReadinessCard.jsx` (~70 baris).
   - Kartu Bento 3 (Checklist Proyek) $\rightarrow$ `src/components/ProjectChecklistCard.jsx` (~120 baris).
   - Kartu Bento 4 (Paspor Portofolio) $\rightarrow$ `src/components/SkillPassportCard.jsx` (~90 baris).
   - Form Onboarding Siswa $\rightarrow$ `src/components/OnboardingModal.jsx` (~130 baris).
   - Navbar $\rightarrow$ `src/components/Navbar.jsx` (~60 baris).
3. **Pemisahan Logika & API:**
   - Seluruh logika pemanggilan API Axios dipisahkan ke `src/services/api.js`.
   - Logika autentikasi dan penyimpanan token disimpan di modul tersendiri, bukan dicampur di komponen tampilan.

---

## 4. Kepatuhan Desain Mutlak (@docs/DESIGN.md)

Frontend wajib menerapkan gaya **Authentic Tactical Editorial Bento** yang bebas dari elemen klise buatan AI (*Anti-AI Slop*).

### A. Palet Warna Baku (Haram Mengarang Warna Baru):
* **Background Canvas:** `#0B1114` (Dark Slate/Spruce dalam).
* **Surface Card:** `#121A1E` & `#162228` (Warna solid, bukan glassmorphism berlebihan).
* **Border Fungsional:** `1px solid #22323A` (hover `#2F444E`).
* **Aksen Utama (Progress & Tombol):** `#10B981` (Forest Emerald).
* **Aksen Skill Gap:** `#D97706` / `text-amber-300` (Warm Amber).
* **Aksen Badge Kategori:** `#0284C7` / `text-sky-300` (Sky Blue).

### B. Anti-AI Slop Guardrails:
* ❌ **Dilarang memakai gradasi neon ungu/lime:** Jangan pernah menggunakan gradasi `from-purple-500 to-lime-400`.
* ❌ **Dilarang efek glow/bloom:** Jangan gunakan drop-shadow menyala yang menyilaukan mata.
* ❌ **Dilarang teks ALL-CAPS menjerit:** Gunakan **Sentence case** untuk judul dan teks informasi.
* ❌ **Dilarang animasi tanpa tujuan:** Hindari `animate-ping`, `animate-pulse`, atau gerak-gerik kartu tanpa aksi pengguna.
* ❌ **Dilarang teks klise AI:** Hindari jargon marketing kosong (*"Buka potensi tak terbatas"*). Gunakan bahasa teknis taktis berbasis data vokasi.
* ✅ **Wajib Tombol Pill Bulat:** Tombol CTA utama menggunakan `rounded-full` dengan background `#10B981` dan teks gelap tebal.

### C. Proporsi Bento Grid Seimbang (12-Column Grid):
* **Baris Atas (Rasio 8:4):**
  - Kartu Kiri (8 Col): Analisis AI & Roadmap Adaptif.
  - Kartu Kanan (4 Col): Indikator *Vocational Readiness Score*.
* **Baris Bawah (Rasio 7:5):**
  - Kartu Kiri (7 Col): Checklist Modul Proyek Mandiri (interaktif).
  - Kartu Kanan (5 Col): Digital Skill Passport.

---

## 5. Standar Kode Frontend (React 19 + JSX + Vite + Tailwind v4)

1. **Format File:** Menggunakan format **`.jsx` dan `.js`** (bukan `.tsx` / TypeScript).
2. **Prop Validation & Defaults:** Gunakan penamaan prop yang deskriptif dan berikan nilai *default* yang aman.
3. **Interaktivitas Instan:** Saat checkbox tugas proyek di klik:
   - Judul tugas langsung dicoret (*strikethrough*).
   - Nilai *Readiness Score* otomatis bertambah/berkurang secara real-time.
   - Panggil API `PATCH /api/v1/tasks/{task_id}/toggle` di background.
4. **Desain Responsif:** Layout Bento Grid wajib runtuh secara proporsional menjadi 1 kolom di layar mobile (`grid-cols-1 md:grid-cols-12`).

---

## 6. Standar Kode Backend (FastAPI + SQLAlchemy + Supabase)

1. **Arsitektur Modular:** Kode terpisah rapi di `app/api/`, `app/core/`, `app/models/`, `app/schemas/`, `app/services/`.
2. **Asynchronous & Type Hints:** Gunakan `async def` untuk endpoint I/O, Pydantic v2 untuk serialisasi, dan dependency injection `get_db` & `get_current_user`.
3. **Idempotent Migrations & Seeding:**
   - Perubahan skema dikelola via Alembic (`alembic.ini` dan `migrations/`).
   - Seeder di `app/database/seed.py` bersifat idempoten (tidak menduplikasi data jika sudah ada).
   - Eksekusi reset database wajib mendukung script `scripts/db-fresh.sh` (Linux/macOS) dan `scripts/db-fresh.ps1` (Windows).
4. **Graceful Fallback AI:** Modul `gemini_service.py` wajib memiliki *deterministic fallback* berbasis data kejuruan siswa jika kuota/API key habis, agar aplikasi tetap 100% andal saat demo juri.

---

## 7. Checklist Verifikasi AI Agent Sebelum Melaporkan Selesai

Setiap kali menyelesaikan perubahan kode, AI Agent wajib memverifikasi:
- [ ] Apakah ada file yang melebihi **300–400 baris**? (Jika ada, wajib pecah sekarang).
- [ ] Apakah warna, border, dan radius sudah sesuai dengan **`docs/DESIGN.md`**?
- [ ] Apakah ada elemen AI-slop (gradasi neon, teks ALL-CAPS menjerit, glow)? (Jika ada, hapus).
- [ ] Apakah file frontend menggunakan ekstensi **`.jsx` / `.js`**?
- [ ] Apakah pengujian fungsional dan sintaksis berjalan tanpa error?
