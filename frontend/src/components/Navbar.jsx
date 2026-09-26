import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Zap, LogOut, LayoutDashboard, UserCheck, Sun, Moon } from 'lucide-react';
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
      <header className="sticky top-4 z-40 mb-8 spruce-panel px-4 sm:px-6 py-3.5 flex items-center justify-between backdrop-blur-md bg-surface/90 shadow-md">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-elevated border border-border-strong text-emerald-accent flex items-center justify-center">
            <Zap className="w-4 h-4 text-emerald-accent" />
          </div>
          <span className="text-base font-semibold text-text-primary tracking-tight">GridSkill</span>
          <span className="text-xs text-text-muted pl-3 border-l border-border-subtle hidden sm:inline-block">
            Vocational Navigator
          </span>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-border-strong border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center transition cursor-pointer"
            title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-accent" /> : <Moon className="w-3.5 h-3.5 text-blue-accent" />}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition font-medium px-2 py-1"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="pl-3 border-l border-border-subtle flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 text-text-primary font-medium md:inline-flex">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-accent" />
                  <span>{user?.full_name || 'Siswa'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-surface-elevated hover:bg-border-strong text-text-secondary hover:text-text-primary border border-border-subtle rounded-lg transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-text-secondary hover:text-text-primary font-medium transition"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 bg-emerald-accent hover:bg-emerald-accent-dark text-slate-950 font-semibold pill-btn transition"
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
