import { Sparkles, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function RoadmapCard({ roadmap, profile }) {
  const navigate = useNavigate();

  return (
    <div className="md:col-span-8 spruce-panel p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-text-secondary mb-3">
          <span className="uppercase tracking-wide text-[10px] font-semibold text-emerald-accent flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analisis Mandiri AI · Gemini 1.5 Flash</span>
          </span>
          <span className="text-text-muted">
            Target: {profile?.target_industry || 'Smart Energy & Green Tech'}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary mb-3 leading-snug">
          {roadmap?.title || 'Roadmap Akselerasi Vokasi Menuju Industri Masa Depan'}
        </h2>

        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-normal">
          {roadmap?.analysis_summary ||
            'Siswa memiliki fondasi dasar kejuruan normatif. Kurikulum mikro ini dirancang untuk menutup jurang kesenjangan keahlian industri nyata melalui proyek mandiri terstruktur.'}
        </p>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">
            Kesenjangan Kompetensi yang Diidentifikasi (Skill Gaps):
          </p>
          <div className="flex flex-wrap gap-2">
            {roadmap?.skill_gap_summary && roadmap.skill_gap_summary.length > 0 ? (
              roadmap.skill_gap_summary.map((gap, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1.5 bg-surface-elevated text-amber-accent border border-amber-accent/30 rounded-md flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-accent"></span>
                  <span>{gap}</span>
                </span>
              ))
            ) : (
              <span className="text-xs text-text-muted italic">Tidak ada kesenjangan khusus.</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted">
        <span>
          Modal Awal: <strong className="text-text-secondary">{profile?.current_skills?.join(', ') || '-'}</strong>
        </span>
        <button
          onClick={() => navigate('/onboarding')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface-elevated hover:bg-border-strong text-text-primary border border-border-subtle text-xs pill-btn font-medium transition"
        >
          <RefreshCw className="w-3.5 h-3.5 text-emerald-accent" />
          <span>Perbarui Profil</span>
        </button>
      </div>
    </div>
  );
}
