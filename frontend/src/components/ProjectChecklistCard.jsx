import { Clock, CheckCircle2, Circle } from 'lucide-react';

export default function ProjectChecklistCard({ tasks, onToggleTask, isToggling }) {
  const getCategoryBadgeClass = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat === 'hardware') {
      return 'text-amber-accent bg-amber-accent/15 border-amber-accent/30';
    }
    if (cat === 'optimization') {
      return 'text-emerald-accent bg-emerald-accent/15 border-emerald-accent/30';
    }
    return 'text-blue-accent bg-blue-accent/15 border-blue-accent/30';
  };

  return (
    <div className="lg:col-span-7 spruce-panel p-5 sm:p-7 lg:p-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-2 border-b border-border-subtle">
        <div>
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-text-primary">Checklist Proyek Mandiri</h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Selesaikan tugas proyek terstruktur untuk memperbarui skor kesiapan.
          </p>
        </div>
        <span className="text-xs text-text-muted bg-surface-elevated px-2.5 py-1 rounded border border-border-subtle shrink-0 ml-2">
          {tasks?.length || 0} Tugas
        </span>
      </div>

      <div className="space-y-3 sm:space-y-3.5">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3.5 sm:p-4 border rounded-lg flex items-start gap-3 sm:gap-3.5 transition-colors ${
                task.is_completed
                  ? 'bg-surface border-border-subtle opacity-85'
                  : 'bg-surface-elevated border-border-subtle hover:border-border-strong'
              }`}
            >
              <input
                type="checkbox"
                checked={task.is_completed}
                disabled={isToggling}
                onChange={() => onToggleTask(task.id)}
                className="w-4 h-4 mt-1 accent-emerald-accent rounded cursor-pointer shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <h4
                    className={`text-xs sm:text-sm font-medium transition ${
                      task.is_completed ? 'line-through text-text-muted' : 'text-text-primary'
                    }`}
                  >
                    {task.title}
                  </h4>
                  <span
                    className={`text-[10px] font-medium border px-2 py-0.5 rounded capitalize ${getCategoryBadgeClass(
                      task.project_category
                    )}`}
                  >
                    {task.project_category}
                  </span>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed mb-2 sm:mb-2.5">
                  {task.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Estimasi: {task.estimated_hours || 2} Jam</span>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    {task.is_completed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-accent" />
                        <span className="text-emerald-accent">Selesai diverifikasi</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5 text-text-muted" />
                        <span className="text-text-muted">Belum selesai</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs text-text-muted">
            Belum ada tugas proyek yang diinjeksi.
          </div>
        )}
      </div>
    </div>
  );
}
