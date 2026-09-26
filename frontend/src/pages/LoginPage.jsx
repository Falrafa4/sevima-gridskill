import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Mail, Lock, Sparkles, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAccount = () => {
    setEmail('siswa@gridskill.id');
    setPassword('siswapassword123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-md mx-auto my-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="spruce-panel p-6 sm:p-8 shadow-xl"
          >
            <h1 className="text-xl font-semibold text-text-primary mb-1">Masuk ke Akun GridSkill</h1>
            <p className="text-xs text-text-secondary mb-6">
              Akses roadmap adaptif dan checklist proyek vokasi mandiri Anda.
            </p>

            <div className="mb-6 p-3 bg-surface-elevated border border-border-strong rounded-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-accent shrink-0" />
                <div>
                  <span className="text-emerald-accent font-medium block">Akun Demo Juri / Penilai:</span>
                  <span className="text-text-muted text-[11px]">siswa@gridskill.id</span>
                </div>
              </div>
              <button
                type="button"
                onClick={fillDemoAccount}
                className="px-2.5 py-1 bg-surface hover:bg-border-subtle text-text-primary border border-border-subtle rounded text-[11px] font-medium transition cursor-pointer"
              >
                Gunakan Demo
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-950/40 border border-rose-800 text-rose-300 rounded text-xs leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Alamat Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-surface-elevated border border-border-subtle focus:border-emerald-accent text-text-primary text-xs rounded-lg outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Kata Sandi</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-surface-elevated border border-border-subtle focus:border-emerald-accent text-text-primary text-xs rounded-lg outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-text-muted hover:text-text-primary transition cursor-pointer"
                    title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-emerald-accent hover:bg-emerald-accent-dark text-slate-950 font-semibold text-xs pill-btn transition mt-2 disabled:opacity-50 inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{isSubmitting ? 'Memproses Masuk...' : 'Masuk ke Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-border-subtle text-center text-xs text-text-secondary">
              Belum memiliki akun?{' '}
              <Link to="/register" className="text-emerald-accent hover:underline font-medium">
                Daftar Akun Baru
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="text-center text-xs text-text-muted py-6">
        GridSkill · Vocational Learning Navigator
      </footer>
    </div>
  );
}
