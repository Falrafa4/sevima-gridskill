import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await register({
        full_name: fullName,
        email,
        password,
        role: 'user',
      });
      navigate('/onboarding');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registrasi gagal. Pastikan data terisi dengan benar.';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-md mx-auto my-8">
          <div className="spruce-panel p-6 sm:p-8">
            <h1 className="text-xl font-semibold text-text-primary mb-1">Daftar Akun Talenta Vokasi</h1>
            <p className="text-xs text-text-secondary mb-6">
              Buat akun untuk memulai pemetaan karier dan kurikulum proyek adaptif.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-950/40 border border-rose-800 text-rose-300 rounded text-xs leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Rizky Ramadhan"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-surface-elevated border border-border-subtle focus:border-emerald-accent text-text-primary text-xs rounded-lg outline-none transition"
                  />
                </div>
              </div>

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
                <label className="block text-xs font-medium text-text-secondary mb-1">Kata Sandi (Min. 6 Karakter)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
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
                <span>{isSubmitting ? 'Mendaftarkan Akun...' : 'Daftar dan Lanjut Onboarding'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-border-subtle text-center text-xs text-text-secondary">
              Sudah memiliki akun?{' '}
              <Link to="/login" className="text-emerald-accent hover:underline font-medium">
                Masuk Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-text-muted py-6">
        GridSkill · SDG 4.4 Vocational Learning Navigator
      </footer>
    </div>
  );
}
