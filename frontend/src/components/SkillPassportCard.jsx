import { useState } from 'react';
import { Award, Copy, Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

export default function SkillPassportCard({ profile, roadmap }) {
  const [copied, setCopied] = useState(false);

  const passportId = profile?.id
    ? `GS-2026-${(profile.vocational_major || 'SMK').substring(0, 4).toUpperCase()}-${profile.id.substring(0, 8).toUpperCase()}`
    : 'GS-2026-VOKASI-DEMO';

  const shareUrl = `${window.location.origin}/passport/${profile?.id || 'demo'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="md:col-span-5 spruce-panel p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <span className="text-[10px] uppercase tracking-wide text-text-muted font-semibold block mb-1">
          Bukti Portofolio Mandiri
        </span>
        <h3 className="text-lg font-semibold tracking-tight text-text-primary mb-4">Digital Skill Passport</h3>

        <div className="p-6 bg-surface-elevated border border-border-subtle rounded-lg text-center my-2">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-surface border border-border-strong text-emerald-accent flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-text-primary">
            {profile?.target_industry ? `${profile.target_industry} Specialist` : 'Green Tech Specialist'}
          </h4>
          <p className="text-xs text-text-secondary mt-1">
            {profile?.student_name || 'Rizky Ramadhan'} · {profile?.vocational_major || 'SMK Vokasi'}
          </p>
          <div className="mt-3 text-[11px] text-text-muted font-mono bg-surface py-1 px-2.5 rounded border border-border-subtle inline-block">
            ID: {passportId}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border-subtle flex flex-wrap gap-2.5">
        <button
          onClick={handleCopyLink}
          className="flex-1 py-2.5 px-4 bg-emerald-accent hover:bg-emerald-accent-dark text-base font-semibold text-xs pill-btn text-center transition inline-flex items-center justify-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Tautan Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Salin Tautan CV</span>
            </>
          )}
        </button>

        <Link
          to={`/passport/${profile?.id || 'demo'}`}
          className="px-4 py-2.5 bg-surface hover:bg-surface-elevated text-text-primary border border-border-subtle text-xs pill-btn font-medium transition inline-flex items-center gap-1.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Lihat Paspor</span>
        </Link>
      </div>
    </div>
  );
}
