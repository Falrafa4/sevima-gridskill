import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { LogOut, LayoutDashboard, UserCheck, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LogoutModal from './LogoutModal';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('gridskill_theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      setIsDark(false);
    } else {
      document.documentElement.classList.remove('light');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add('light');
      localStorage.setItem('gridskill_theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('gridskill_theme', 'dark');
      setIsDark(true);
    }
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-2 sm:top-4 z-40 mb-6 sm:mb-8 spruce-panel px-3.5 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between backdrop-blur-md bg-surface/90 shadow-md">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
          <img src="/logo.webp" alt="GridSkill Logo" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
          <span className="text-sm sm:text-base font-semibold text-text-primary tracking-tight">GridSkill</span>
          <span className="text-xs text-text-muted pl-2.5 sm:pl-3 border-l border-border-subtle hidden md:inline-block">
            Vocational Navigator
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-border-strong border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center transition cursor-pointer shrink-0"
            title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-accent" /> : <Moon className="w-3.5 h-3.5 text-blue-accent" />}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition font-medium px-2 py-1 rounded"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="pl-2 sm:pl-3 border-l border-border-subtle flex items-center gap-2">
                <span className="flex items-center gap-1 text-text-primary font-medium hidden lg:inline-flex">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-accent" />
                  <span className="truncate max-w-[120px]">{user?.full_name || 'Siswa'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-surface-elevated hover:bg-border-strong text-text-secondary hover:text-text-primary border border-border-subtle rounded-lg transition cursor-pointer"
                  title="Keluar akun"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                to="/login"
                className="px-2.5 sm:px-3.5 py-1.5 text-text-secondary hover:text-text-primary font-medium transition"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-3 sm:px-4 py-1.5 bg-emerald-accent hover:bg-emerald-accent-dark text-slate-950 font-semibold pill-btn transition shrink-0"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </header>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
