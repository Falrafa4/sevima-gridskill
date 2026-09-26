import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Cpu, Sparkles, Check, AlertCircle, ArrowRight, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { pathwayService } from '../services/api';

const VOCATIONAL_MAJORS = [
  'SIJA (Sistem Informatika, Jaringan & Aplikasi)',
  'RPL (Rekayasa Perangkat Lunak)',
  'TKJ (Teknik Komputer & Jaringan)',
  'Teknik Mekatronika',
  'Teknik Elektronika Industri',
  'Teknik Otomasi Industri',
];

const SUGGESTED_SKILLS = [
  'Python Dasar',
  'Web Development',
  'Networking',
  'Basic Linux',
  'IoT Arduino',
  'PLC & Sensor',
  'Mikrotik Routing',
  'Git & GitHub',
];

const TARGET_INDUSTRIES = [
  'Smart Energy & Green Data Center',
  'IoT & Precision Agrotech',
  'Industrial Automation & Robotics',
  'Sustainable Web & Cloud Infrastructure',
  'Electric Vehicle (EV) Systems',
];

export default function OnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState(user?.full_name || '');
  const [vocationalMajor, setVocationalMajor] = useState(VOCATIONAL_MAJORS[0]);
  const [selectedSkills, setSelectedSkills] = useState(['Python Dasar', 'Web Development']);
  const [customSkill, setCustomSkill] = useState('');
  const [targetIndustry, setTargetIndustry] = useState(TARGET_INDUSTRIES[0]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skillToRemove));
  };

  const handleAddCustomSkill = (e) => {
    if (e) e.preventDefault();
    const trimmed = customSkill.trim();
    if (!trimmed) return;

    if (!selectedSkills.includes(trimmed)) {
      setSelectedSkills([...selectedSkills, trimmed]);
      setCustomSkill('');
    } else {
      setCustomSkill('');
    }
  };

  const handleKeyDownCustomSkill = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleAddCustomSkill();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSkills.length === 0) {
      setErrorMsg('Pilih minimal satu keterampilan dasar yang Anda kuasai.');
      return;
    }

    setErrorMsg('');
    setIsAnalyzing(true);
    setLoadingStep(1);

    const stepTimer = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1800);

    try {
      const payload = {
        student_name: studentName,
        vocational_major: vocationalMajor,
        current_skills: selectedSkills,
        target_industry: targetIndustry,
      };

      const result = await pathwayService.generatePathway(payload);
      clearInterval(stepTimer);

      if (result && result.profile) {
        localStorage.setItem('gridskill_current_profile_id', result.profile.id);
      }

      navigate('/dashboard');
    } catch (err) {
      clearInterval(stepTimer);
      setIsAnalyzing(false);
      const msg = err.response?.data?.message || 'Gagal menghasilkan kurikulum adaptif. Silakan coba kembali.';
      setErrorMsg(msg);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-2xl mx-auto my-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="spruce-panel p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-accent mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Langkah 1: Vocational Profiling</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-text-primary mb-2">
              Petakan Keterampilan Vokasi Anda
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
              AI akan membandingkan materi normatif SMK Anda dengan standar kompetensi industri berkelanjutan untuk menghasilkan kurikulum mikro proyek nyata.
            </p>

            {errorMsg && (
              <div className="mb-6 p-3 bg-rose-950/40 border border-rose-800 text-rose-300 rounded text-xs leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {isAnalyzing ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-surface-elevated border border-border-strong flex items-center justify-center text-emerald-accent">
                  <Cpu className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-text-primary">
                    {loadingStep === 1 && 'Menganalisis jurang kompetensi kurikulum vs industri...'}
                    {loadingStep === 2 && 'Merancang modul tugas proyek nyata (Aksi AI 1)...'}
                    {loadingStep === 3 && 'Menginjeksi checklist proyek ke database (Aksi AI 2)...'}
                  </h3>
                  <p className="text-xs text-text-muted">Proses berlangsung secara otonom dalam beberapa detik.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Nama Lengkap Siswa</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-surface-elevated border border-border-subtle focus:border-emerald-accent text-text-primary text-xs rounded-lg outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Jurusan SMK Saat Ini</label>
                  <select
                    value={vocationalMajor}
                    onChange={(e) => setVocationalMajor(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-surface-elevated border border-border-subtle focus:border-emerald-accent text-text-primary text-xs rounded-lg outline-none transition cursor-pointer"
                  >
                    {VOCATIONAL_MAJORS.map((m) => (
                      <option key={m} value={m} className="bg-surface">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Keahlian yang Telah Dikuasai (Pilih atau Tambahkan)
                  </label>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {SUGGESTED_SKILLS.map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`text-xs px-3 py-1.5 rounded-md border transition flex items-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-accent/15 text-emerald-accent border-emerald-accent/40 font-medium'
                              : 'bg-surface-elevated text-text-secondary border-border-subtle hover:border-border-strong'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Skills added by User */}
                  {selectedSkills.filter((s) => !SUGGESTED_SKILLS.includes(s)).length > 0 && (
                    <div className="mb-3">
                      <span className="text-[11px] text-text-muted block mb-1.5">Skill Kustom Terpilih:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkills
                          .filter((s) => !SUGGESTED_SKILLS.includes(s))
                          .map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-2.5 py-1 bg-surface-elevated border border-emerald-accent/40 text-emerald-accent rounded-md flex items-center gap-1.5"
                            >
                              <span>{skill}</span>
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="text-text-muted hover:text-rose-400 transition cursor-pointer"
                                title={`Hapus ${skill}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Skill Input */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      onKeyDown={handleKeyDownCustomSkill}
                      placeholder="Ketik skill lain lalu tekan Enter atau klik Tambah (misal: Docker, Modbus)..."
                      className="flex-1 px-3.5 py-2 bg-surface-elevated border border-border-subtle focus:border-emerald-accent text-text-primary text-xs rounded-lg outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomSkill}
                      className="px-4 py-2 bg-surface-elevated hover:bg-border-strong text-text-primary border border-border-subtle rounded-lg text-xs font-medium transition shrink-0 cursor-pointer text-center"
                    >
                      + Tambah
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Target Industri Masa Depan</label>
                  <select
                    value={targetIndustry}
                    onChange={(e) => setTargetIndustry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-surface-elevated border border-border-subtle focus:border-emerald-accent text-text-primary text-xs rounded-lg outline-none transition cursor-pointer"
                  >
                    {TARGET_INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind} className="bg-surface">
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-accent hover:bg-emerald-accent-dark text-slate-950 font-semibold text-xs pill-btn transition inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Mulai Analisis & Bentuk Pathway Otonom</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <footer className="text-center text-xs text-text-muted py-6">
        GridSkill · Menjembatani Kesenjangan Kompetensi Vokasi (SDG 4)
      </footer>
    </div>
  );
}
