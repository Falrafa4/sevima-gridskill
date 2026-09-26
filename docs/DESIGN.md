# GridSkill Design System — Style & UX Specification

> **Theme:** Authentic Tactical Editorial (Anti-AI Slop Edition)  
> **Target Audience:** Siswa & Lulusan SMK Rumpun Teknologi Informasi & Keteknikan (SIJA, RPL, TKJ, Elektronika, Mekatronika)  
> **Core Principle:** Tenang, Taktis, Berbobot, Bebas Elemen Klise AI (_Human-Crafted Workstation_).

---

## 1. Filosofi & Arah Desain

GridSkill adalah platform navigasi karier dan kurikulum proyek adaptif untuk talenta vokasi Indonesia menuju industri teknologi berkelanjutan (_Sustainable Tech, Smart Grid, Green Data Center_).

### Karakter Visual Utama:

- **Bukan AI-Slop:** Menghindari secara mutlak gradasi ungu-neon, bayangan glow menyala di mana-mana, teks berteriak huruf kapital (ALL-CAPS), dan animasi berlebihan yang mengganggu fokus kerja.
- **Layout 4-Kartu Editorial Seimbang (Bento Grid):** Mengadopsi tata letak asimetris yang tenang (Baris atas 8:4, Baris bawah 7:5) dengan batas fungsional 1px dan sudut membulat ergonomis 8px.
- **Palet Warna Slate & Spruce Terukur:** Nuansa gelap dalam yang nyaman untuk mata teknisi (`#0B1114` & `#121A1E`), garis batas `#22323A`, dan aksen penegas _Forest Emerald_ (`#10B981`) yang presisi tanpa efek _glow_.
- **Interaktivitas Berbobot (Tactile & Purposeful):** Checkbox interaktif dengan respon visual coret instan, bar kemajuan yang mencerminkan _Vocational Readiness Score_ siswa secara real-time.

---

## 2. Tokens — Colors

| Nama Token                    | Nilai Hex | Peran & Penggunaan UI                                                   |
| ----------------------------- | --------- | ----------------------------------------------------------------------- |
| `--color-bg-base`             | `#0B1114` | Latar belakang dasar kanvas aplikasi (Dark Slate/Spruce dalam)          |
| `--color-surface-card`        | `#121A1E` | Latar kartu panel utama Bento Grid                                      |
| `--color-surface-elevated`    | `#162228` | Latar kartu turunan / elevated panel di dalam kartu                     |
| `--color-surface-alt`         | `#0E1519` | Panel kontras alternatif (misal: widget indikator kesiapan)             |
| `--color-border-subtle`       | `#22323A` | Border standar fungsional 1px untuk batas kartu                         |
| `--color-border-strong`       | `#2F444E` | Border state hover / active saat kartu atau elemen disentuh             |
| `--color-text-primary`        | `#F1F5F7` | Teks judul utama dan konten penting (kontras tinggi, tidak menyilaukan) |
| `--color-text-secondary`      | `#94A8B3` | Teks penjelasan, paragraf pengantar, dan label pendukung                |
| `--color-text-muted`          | `#647B87` | Teks metadata, keterangan waktu, dan penanda pasif                      |
| `--color-accent-emerald`      | `#10B981` | Tombol CTA utama, status selesai, progress bar, indikator aktif         |
| `--color-accent-emerald-dark` | `#059669` | Hover state tombol CTA utama                                            |
| `--color-accent-amber`        | `#D97706` | Tag penanda kesenjangan kompetensi (_Skill Gap Pill_) & optimasi        |
| `--color-accent-blue`         | `#0284C7` | Badge kategori modul `Software`                                         |

---

## 3. Tokens — Typography

- **Font Utama:** `Plus Jakarta Sans`, system-ui, -apple-system, sans-serif.
- **Font Monospace (Hanya untuk ID & Kode):** `JetBrains Mono` (Hanya digunakan untuk Passport Hash/ID, tidak untuk seluruh teks).
- **Penulisan Teks (Text Case Rule):** **Wajib Sentence case** (huruf kapital di awal kalimat saja). Dilarang menggunakan UPPERCASE/ALL-CAPS pada judul kartu atau pesan informasi.

### Skala Tipografi:

| Peran          | Ukuran      | Weight    | Line Height | Keterangan                                     |
| -------------- | ----------- | --------- | ----------- | ---------------------------------------------- |
| Caption / Tag  | 10px - 11px | 500 / 600 | 1.4         | Label kategori, status pill                    |
| Body Small     | 12px        | 400 / 500 | 1.5         | Deskripsi tugas, catatan kaki                  |
| Body Regular   | 14px        | 400 / 500 | 1.6         | Teks narasi analisis kesenjangan               |
| Subheading     | 16px - 18px | 600       | 1.3         | Judul kartu panel, sub-modul                   |
| Heading Card   | 24px - 28px | 600 / 700 | 1.25        | Judul besar roadmap adaptif                    |
| Metric Display | 48px - 60px | 300 / 400 | 1.0         | Persentase _Readiness Score_ (bersih, ramping) |

---

## 4. Tokens — Spacing & Radius

- **Base Grid Unit:** 4px
- **Radius Standar:**
  - Panel & Bento Card: `rounded-lg` (`8px`)
  - Tombol Utama / Pill: `rounded-full` (`9999px`)
  - Badge & Tag Kategori: `rounded` (`4px` - `6px`)
- **Padding:**
  - Kartu Bento: `p-6` hingga `p-8` (24px - 32px)
  - Item Tugas dalam List: `p-4` (16px)
  - Input & Form: `px-3.5 py-2.5`
- **Gap:**
  - Jarak antar kartu Bento: `gap-6` (24px)
  - Jarak antar elemen dalam kartu: `space-y-3.5` hingga `space-y-6`

---

## 5. Arsitektur Layout Bento Grid (12-Column Grid)

Layout mengadaptasi struktur 4-kartu editorial yang proporsional:

```text
┌─────────────────────────────────────────────────────────────┬───────────────────────────────┐
│                                                             │                               │
│  KARTU 1: Analisis AI & Roadmap Adaptif                     │  KARTU 2: Readiness Score     │
│  (8 Kolom)                                                  │  (4 Kolom)                    │
│  - Judul Roadmap adaptif siswa vokasi                       │  - Angka metrik kesiapan (%)  │
│  - Narasi kesenjangan normatif vs industri                  │  - Solid progress bar emerald │
│  - Daftar Skill Gap Pills (amber-tinted)                    │  - Status pemenuhan syarat    │
│                                                             │                               │
├──────────────────────────────────────────────┬──────────────┴───────────────────────────────┤
│                                              │                                              │
│  KARTU 3: Checklist Modul Proyek Mandiri     │  KARTU 4: Digital Skill Passport             │
│  (7 Kolom)                                   │  (5 Kolom)                                   │
│  - Daftar 3-5 tugas proyek hasil injeksi AI  │  - Badge verifikasi kompetensi siswa         │
│  - Checkbox interaktif + strikethrough       │  - Data siswa & ID paspor verifikasi         │
│  - Badge kategori (Software/Optimization)    │  - Tombol aksi pill (Salin link CV / Unduh)  │
│                                              │                                              │
└──────────────────────────────────────────────┴──────────────────────────────────────────────┘
```

---

## 6. Anti-AI Slop Guardrails (Do's & Don'ts)

### ❌ Dilarang Keras (Don'ts):

1. **Dilarang memakai gradasi neon warna-warni:** Jangan pernah menggunakan gradasi `from-purple-500 to-lime-400` atau `from-pink-500 to-cyan-500`. Gunakan warna latar solid `#121A1E` dengan border tegas.
2. **Dilarang efek glow/bloom berlebihan:** Hindari `shadow-[0_0_30px_rgba(...)]` atau `drop-shadow-neon` yang membuat mata cepat lelah.
3. **Dilarang huruf kapital menjerit (ALL CAPS):** Hindari teks judul atau keterangan panjang dengan format `HURUF BESAR SEMUA`. Gunakan Sentence case.
4. **Dilarang animasi tanpa tujuan:** Hapus efek `animate-ping`, `animate-pulse`, atau gerak-gerik kartu tanpa ada aksi dari pengguna.
5. **Dilarang font monospace di luar fungsinya:** Gunakan font monospace hanya untuk kode hash ID sertifikat. Teks utama wajib sans-serif bersih.
6. **Dilarang teks klise AI:** Jangan gunakan kalimat klise seperti _"Transformasikan potensi tak terbatas Anda"_ atau _"Buka kekuatan AI terdepan"_. Gunakan bahasa taktis, terukur, dan berbasis data vokasi riil (SDG 4).

### ✅ Wajib Dilakukan (Do's):

1. **Prioritaskan keterbacaan (High Contrast & Clean Hierarchy):** Pastikan teks mudah dibaca dan informasi penting dapat dipahami dalam 3 detik.
2. **Berikan umpan balik interaksi instan:** Checkbox yang dicentang langsung mencoret judul tugas dan memperbarui angka persentase _Readiness Score_.
3. **Pertahankan konsistensi tombol pill:** Tombol CTA utama menggunakan bentuk pill bulat (`rounded-full`) dengan warna `bg-emerald-600` teks gelap `#0B1114` yang tebal.
4. **Gunakan tag penanda kesenjangan yang informatif:** Gunakan titik indikator kecil berwarna amber untuk setiap jurang kompetensi yang ditemukan AI.

---

## 7. Referensi Kode CSS & Token Tailwind

```css
:root {
  --bg-base: #0b1114;
  --surface-card: #121a1e;
  --surface-elevated: #162228;
  --border-subtle: #22323a;
  --border-strong: #2f444e;
  --text-primary: #f1f5f7;
  --text-secondary: #94a8b3;
  --text-muted: #647b87;
  --accent-emerald: #10b981;
  --accent-amber: #d97706;
  --accent-blue: #0284c7;
}

body {
  font-family:
    "Plus Jakarta Sans",
    system-ui,
    -apple-system,
    sans-serif;
  background-color: var(--bg-base);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background-color: var(--accent-emerald);
  color: #000000;
}

.spruce-panel {
  background-color: var(--surface-card);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
}

.spruce-panel:hover {
  border-color: var(--border-strong);
}

.pill-btn {
  border-radius: 9999px;
  transition: all 0.15s ease-in-out;
}
```
