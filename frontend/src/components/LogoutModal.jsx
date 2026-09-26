import { AlertTriangle, X } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="spruce-panel max-w-sm w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-amber-accent/15 border border-amber-accent/30 text-amber-accent flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Konfirmasi Keluar</h3>
            <p className="text-xs text-text-muted">Akhiri sesi saat ini</p>
          </div>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed mb-6">
          Apakah Anda yakin ingin keluar dari akun GridSkill? Anda harus masuk kembali untuk mengakses workspace dashboard.
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-surface-elevated hover:bg-border-strong text-text-secondary hover:text-text-primary border border-border-subtle rounded-lg text-xs font-medium transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            Ya, Keluar Akun
          </button>
        </div>
      </div>
    </div>
  );
}
