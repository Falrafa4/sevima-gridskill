import { Link } from 'react-router';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen p-3.5 sm:p-6 lg:p-8 max-w-7xl mx-auto flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="spruce-panel p-6 sm:p-10 lg:p-12 mb-6 sm:mb-8 relative overflow-hidden"
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-emerald-accent bg-emerald-accent/10 border border-emerald-accent/20 px-3 py-1 rounded-full mb-3 sm:mb-4">
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">SDG 4 Quality Education · Vocational Navigator</span>
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary mb-3 sm:mb-4 leading-tight">
              Menjembatani Kesenjangan Lulusan Vokasi Menuju Industri Berkelanjutan
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-text-secondary leading-relaxed mb-6 sm:mb-8">
              Mengubah silabus normatif SMK menjadi kurikulum mikro adaptif berbasis proyek nyata.
              Didukung oleh AI otonom untuk mengevaluasi skill gap dan menyuntikkan tugas proyek terukur langsung ke workspace belajar siswa.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-emerald-accent hover:bg-emerald-accent-dark text-slate-950 font-semibold text-xs sm:text-sm pill-btn transition text-center shadow-xs"
              >
                <span>{isAuthenticated ? 'Buka Dashboard Workspace' : 'Mulai Navigasi Karier'}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <a
                href="#data-validation"
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 bg-surface-elevated hover:bg-border-strong text-text-primary border border-border-subtle text-xs sm:text-sm pill-btn font-medium transition text-center"
              >
                <TrendingUp className="w-4 h-4 text-emerald-accent shrink-0" />
                <span>Pelajari Data Validasi</span>
              </a>
            </div>
          </div>
        </motion.section>

        {/* Real Data Validation Section (SDG 4) */}
        <section id="data-validation" className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="spruce-panel p-5 sm:p-7 lg:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-accent block mb-1">
                Data Sakernas BPS
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-text-primary mb-2">35,36%</div>
              <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5 sm:mb-2">Vertical Mismatch Ketenagakerjaan</h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Lebih dari sepertiga tenaga kerja vokasi mengalami ketidaksesuaian tingkat pendidikan, baik berstatus overeducated maupun undereducated terhadap kebutuhan posisi industri.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="spruce-panel p-5 sm:p-7 lg:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-accent block mb-1">
                Kajian BRIN & BPS 2022
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-text-primary mb-2">72,71%</div>
              <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5 sm:mb-2">Horizontal Mismatch Lulusan SMK</h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Mayoritas lulusan SMK terpaksa bekerja di luar kompetensi kejuruannya akibat kurikulum yang belum terstandarisasi dengan kebutuhan proyek teknologi modern.
              </p>
            </div>
          </motion.div>
        </section>

        {/* How Autonomous Agent Works */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="spruce-panel p-5 sm:p-7 lg:p-8 mb-6 sm:mb-8"
        >
          <h2 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">Cara Kerja GridSkill Autonomous Agent</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 text-xs text-text-secondary">
            <div className="p-3.5 sm:p-6 bg-surface-elevated rounded-lg border border-border-subtle">
              <div className="flex text-lg items-center gap-3 text-emerald-accent font-bold mb-1">
                <BookOpen className="w-6 h-6 shrink-0" />
                <span>Vocational Profiling</span>
              </div>
              <p>Siswa mengisi data kejuruan, keterampilan dasar saat ini, dan minat industri berkelanjutan (Smart Grid, DCIM, IoT).</p>
            </div>
            <div className="p-6 bg-surface-elevated rounded-lg border border-border-subtle">
              <div className="flex text-lg items-center gap-3 text-emerald-accent font-bold mb-1">
                <Cpu className="w-6 h-6 shrink-0" />
                <span>Dua Aksi Sistem Otomatis</span>
              </div>
              <p>Gemini AI menganalisis jurang kompetensi, menyimpan roadmap ke database, dan menginjeksi 3-5 modul proyek.</p>
            </div>
            <div className="p-6 bg-surface-elevated rounded-lg border border-border-subtle sm:col-span-2 lg:col-span-1">
              <div className="flex text-lg items-center gap-3 text-emerald-accent font-bold mb-1">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span>Verifiable Skill Passport</span>
              </div>
              <p>Checklist pengerjaan proyek menaikkan Vocational Readiness Score dan menerbitkan paspor sertifikat digital.</p>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}
