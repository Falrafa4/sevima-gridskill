import { Award } from 'lucide-react';

export default function ReadinessCard({ tasks }) {
  const total = tasks?.length || 0;
  const completed = tasks?.filter((t) => t.is_completed)?.length || 0;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="md:col-span-4 spruce-panel p-6 sm:p-8 flex flex-col justify-between bg-surface-alt">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-wide text-text-muted font-semibold block">
            Indikator Kesiapan
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-accent font-medium">
            Live Metric
          </span>
        </div>

        <h3 className="text-xl font-medium tracking-tight text-text-primary mb-6">Vocational Readiness</h3>

        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-6xl font-light tracking-tight text-text-primary">
              {percentage}%
            </span>
            <span className="text-xs text-emerald-accent font-medium">
              {percentage >= 100 ? 'Siap Industri' : percentage > 0 ? 'Dalam Pengerjaan' : 'Mulai Tugas'}
            </span>
          </div>

          <div className="w-full bg-surface-elevated h-2.5 rounded-full overflow-hidden border border-border-subtle">
            <div
              className="bg-emerald-accent h-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="border-t border-border-subtle pt-4 text-xs text-text-secondary leading-relaxed flex items-start gap-2">
        <Award className="w-4 h-4 text-emerald-accent shrink-0 mt-0.5" />
        <p>
          <strong className="text-text-primary">{completed} dari {total}</strong> tugas proyek telah diselesaikan.
          {percentage >= 100
            ? ' Selamat! Seluruh modul proyek selesai diverifikasi.'
            : ' Selesaikan seluruh modul untuk membuka verifikasi portofolio siap kerja.'}
        </p>
      </div>
    </div>
  );
}
