import { Link } from 'react-router';
import { Zap, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 spruce-panel p-6 sm:p-10 border-t border-border-subtle">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
        {/* Left Side: Brand, Description, Social */}
        <div className="md:col-span-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-surface-elevated border border-border-strong text-emerald-accent flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-base font-semibold text-text-primary tracking-tight">GridSkill</span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
            Platform AI Career & Adaptive Learning Navigator untuk talenta vokasi Indonesia.
            Mengubah materi normatif SMK menjadi modul proyek adaptif industri masa depan demi menjawab target SDG 4.
          </p>

          {/* Social Icons from Simple Icons (GitHub, LinkedIn, Instagram, Discord) */}
          <div className="flex items-center gap-2.5 pt-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-border-strong border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center transition"
              title="GitHub"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-border-strong border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center transition"
              title="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-border-strong border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center transition"
              title="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-border-strong border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center transition"
              title="Discord"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="https://sevima.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-border-strong border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center transition"
              title="SEVIMA"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="md:col-span-3 space-y-2 text-xs">
          <span className="font-semibold text-text-primary block mb-2 uppercase tracking-wider text-[11px]">
            Eksplorasi Fitur
          </span>
          <ul className="space-y-1.5 text-text-secondary">
            <li>
              <Link to="/onboarding" className="hover:text-emerald-accent transition">
                Vocational Profiler
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-emerald-accent transition">
                Bento Grid Workspace
              </Link>
            </li>
            <li>
              <Link to="/passport/demo" className="hover:text-emerald-accent transition">
                Digital Skill Passport
              </Link>
            </li>
            <li>
              <a href="#data-validation" className="hover:text-emerald-accent transition">
                Riset Mismatch Vokasi
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-2 text-xs">
          <span className="font-semibold text-text-primary block mb-2 uppercase tracking-wider text-[11px]">
            Akses & Bantuan
          </span>
          <ul className="space-y-1.5 text-text-secondary">
            <li>
              <Link to="/login" className="hover:text-emerald-accent transition">
                Masuk Akun
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-emerald-accent transition">
                Registrasi Siswa
              </Link>
            </li>
            <li>
              <span className="text-text-muted">SEMESTA Batch 8 by SEVIMA</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted">
        <p>&copy; {new Date().getFullYear()} GridSkill. Seluruh hak cipta dilindungi.</p>
        <span className="text-[11px] text-text-secondary">
          Dibuat untuk Hackathon SEMESTA Batch 8
        </span>
      </div>
    </footer>
  );
}
