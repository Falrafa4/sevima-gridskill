import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Award, CheckCircle2, Clock, Printer, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { pathwayService } from '../services/api';

export default function PublicPassportPage() {
  const { profileId } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadPassport() {
      setIsLoading(true);
      setErrorMsg('');

      if (!profileId || profileId === 'demo') {
        setRoadmap({
          title: 'Roadmap Akselerasi SIJA Menuju Green Data Center & Smart Grid',
          analysis_summary:
            'Siswa telah menyelesaikan rangkaian modul proyek praktis berbasis standar industri telemetri energi dan observabilitas fasilitas server.',
          tasks: [
            {
              id: '1',
              title: 'Simulasi Protokol Telemetri MQTT pada Edge Gateway',
              description: 'Konfigurasi broker MQTT Mosquitto lokal dan pengiriman data beban sensor periodik.',
              project_category: 'Software',
              estimated_hours: 3,
              is_completed: true,
            },
            {
              id: '2',
              title: 'Perancangan Dashboard Telemetri Beban Daya Mikrogrid',
              description: 'Membangun antarmuka monitoring beban puncak dan deteksi anomali.',
              project_category: 'Software',
              estimated_hours: 4,
              is_completed: true,
            },
            {
              id: '3',
              title: 'Audit Rasio PUE & Otomasi Pendinginan Server',
              description: 'Kalkulasi rasio PUE dan simulasi kendali pendinginan adaptif.',
              project_category: 'Optimization',
              estimated_hours: 2,
              is_completed: true,
            },
          ],
        });
        setIsLoading(false);
        return;
      }

      try {
        const data = await pathwayService.getRoadmap(profileId);
        setRoadmap(data);
      } catch (err) {
        setErrorMsg('Data paspor tidak ditemukan atau tautan verifikasi tidak valid.');
      } finally {
        setIsLoading(false);
      }
    }

    loadPassport();
  }, [profileId]);

  const handlePrint = () => {
    window.print();
  };

  const completedTasks = roadmap?.tasks?.filter((t) => t.is_completed) || [];
  const passportCode = profileId && profileId !== 'demo'
    ? `GS-2026-VERIFIED-${profileId.substring(0, 8).toUpperCase()}`
    : 'GS-2026-VERIFIED-883E9EBD';

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-10 max-w-4xl mx-auto flex flex-col justify-between">
      <div>
        {/* Top Action Bar (Hidden on print) */}
        <div className="mb-6 flex items-center justify-between print:hidden">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke GridSkill</span>
          </Link>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface-elevated hover:bg-border-strong text-text-primary border border-border-subtle rounded-lg text-xs font-medium transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-accent" />
            <span>Cetak / Ekspor PDF</span>
          </button>
        </div>

        {errorMsg ? (
          <div className="spruce-panel p-8 text-center max-w-md mx-auto my-12 space-y-3">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <h2 className="text-base font-semibold text-text-primary">{errorMsg}</h2>
            <Link to="/" className="inline-block text-xs text-emerald-accent hover:underline">
              Buka Beranda Utama
            </Link>
          </div>
        ) : isLoading ? (
          <div className="py-24 text-center text-text-muted space-y-3">
            <div className="w-8 h-8 mx-auto border-2 border-emerald-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs">Memverifikasi keabsahan portofolio siswa...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="spruce-panel p-6 sm:p-10 border-border-strong bg-surface shadow-2xl"
          >
            {/* Header Passport */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-elevated border border-border-strong text-emerald-accent flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-accent flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Terverifikasi Mandiri Melalui GridSkill AI Engine</span>
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    Digital Skill Passport
                  </h1>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-text-muted block">Kode Verifikasi:</span>
                <span className="font-mono text-xs text-text-primary font-semibold">{passportCode}</span>
              </div>
            </div>

            {/* Candidate Credential Info */}
            <div className="py-6 border-b border-border-subtle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 text-xs">
              <div className="p-3 bg-surface-elevated rounded-lg border border-border-subtle">
                <span className="text-text-muted block text-[11px] mb-0.5">Nama Talenta Vokasi:</span>
                <span className="font-semibold text-text-primary text-sm">Rizky Ramadhan</span>
              </div>
              <div className="p-3 bg-surface-elevated rounded-lg border border-border-subtle">
                <span className="text-text-muted block text-[11px] mb-0.5">Asal Kejuruan SMK:</span>
                <span className="font-medium text-text-primary">SIJA (Sistem Informatika)</span>
              </div>
              <div className="p-3 bg-surface-elevated rounded-lg border border-border-subtle sm:col-span-2 lg:col-span-1">
                <span className="text-text-muted block text-[11px] mb-0.5">Spesialisasi Relevan:</span>
                <span className="font-medium text-emerald-accent">Smart Energy & Green Data Center</span>
              </div>
            </div>

            {/* Pathway Summary */}
            <div className="py-6 border-b border-border-subtle">
              <h2 className="text-xs uppercase font-semibold tracking-wide text-text-muted mb-2">
                Fokus Peta Jalan Kompetensi:
              </h2>
              <h3 className="text-base font-semibold text-text-primary mb-2">{roadmap?.title}</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {roadmap?.analysis_summary}
              </p>
            </div>

            {/* Evidence List */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase font-semibold tracking-wide text-text-muted">
                  Bukti Pengerjaan Proyek Praktis (Portfolio Evidence):
                </h2>
                <span className="text-xs text-emerald-accent font-medium">
                  {completedTasks.length} Modul Tuntas Diverifikasi
                </span>
              </div>

              <div className="space-y-3">
                {completedTasks.map((t, idx) => (
                  <div
                    key={t.id || idx}
                    className="p-4 bg-surface-elevated border border-border-subtle rounded-lg flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-accent shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-text-primary">{t.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-surface border border-border-subtle text-text-muted capitalize">
                          {t.project_category}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">{t.description}</p>
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-text-muted">
                        <Clock className="w-3 h-3" />
                        <span>Estimasi Beban Kerja: {t.estimated_hours} Jam</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border-subtle text-center text-xs text-text-muted">
              Dokumen verifikasi kompetensi ini diterbitkan secara otomatis oleh GridSkill untuk menjawab target SDG 4 dalam mengatasi kesenjangan lulusan vokasi terhadap industri modern.
            </div>
          </motion.div>
        )}
      </div>

      <footer className="text-center text-xs text-text-muted py-6 print:hidden">
        GridSkill · Validated Vocational Talent Portfolio
      </footer>
    </div>
  );
}
