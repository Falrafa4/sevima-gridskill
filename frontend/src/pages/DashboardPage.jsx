import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import RoadmapCard from '../components/RoadmapCard';
import ReadinessCard from '../components/ReadinessCard';
import ProjectChecklistCard from '../components/ProjectChecklistCard';
import SkillPassportCard from '../components/SkillPassportCard';
import { useAuth } from '../context/AuthContext';
import { pathwayService } from '../services/api';
import { AlertCircle, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [roadmapData, setRoadmapData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasNoProfile, setHasNoProfile] = useState(false);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setErrorMsg('');
    setHasNoProfile(false);

    const savedProfileId = localStorage.getItem('gridskill_current_profile_id');

    if (!savedProfileId) {
      setHasNoProfile(true);
      setIsLoading(false);
      return;
    }

    try {
      const data = await pathwayService.getRoadmap(savedProfileId);
      setRoadmapData(data);
      setTasks(data.tasks || []);
      if (data.profile) {
        setProfileData(data.profile);
      } else {
        setProfileData({
          id: data.profile_id,
          student_name: user?.full_name || 'Rizky Ramadhan',
          vocational_major: 'SIJA',
          current_skills: ['Networking', 'Basic Linux', 'IoT Arduino'],
          target_industry: 'Smart Energy & Green Data Center',
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setHasNoProfile(true);
      } else {
        setErrorMsg('Gagal memuat data roadmap. Pastikan backend terhubung.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleToggleTask = async (taskId) => {
    if (isToggling) return;
    setIsToggling(true);

    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, is_completed: !t.is_completed } : t))
    );

    try {
      await pathwayService.toggleTask(taskId);
    } catch (err) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? { ...t, is_completed: !t.is_completed } : t))
      );
      setErrorMsg('Gagal memperbarui status tugas di server.');
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex flex-col justify-between">
      <div>
        <Navbar />

        {errorMsg && (
          <div className="mb-6 p-4 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={fetchDashboardData}
              className="inline-flex items-center gap-1 px-3 py-1 bg-surface-elevated text-text-primary rounded border border-border-subtle text-xs cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Coba Lagi</span>
            </button>
          </div>
        )}

        {hasNoProfile ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="spruce-panel max-w-lg mx-auto my-12 p-8 text-center space-y-4"
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-accent/15 border border-emerald-accent/30 text-emerald-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary">
              Selamat Datang, {user?.full_name || 'Talenta Vokasi'}!
            </h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Anda belum memiliki peta jalan pembelajaran adaptif. Mari petakan kejuruan SMK dan target industri masa depan Anda agar AI dapat menghasilkan modul proyek nyata.
            </p>
            <div className="pt-2">
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-accent hover:bg-emerald-accent-dark text-slate-950 font-semibold text-xs pill-btn transition"
              >
                <span>Mulai Vocational Profiler</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ) : isLoading ? (
          <div className="py-24 text-center text-text-muted space-y-3">
            <div className="w-8 h-8 mx-auto border-2 border-emerald-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs">Memuat Bento Grid Workspace...</p>
          </div>
        ) : (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6"
          >
            <RoadmapCard roadmap={roadmapData} profile={profileData} />
            <ReadinessCard tasks={tasks} />
            <ProjectChecklistCard
              tasks={tasks}
              onToggleTask={handleToggleTask}
              isToggling={isToggling}
            />
            <SkillPassportCard profile={profileData} roadmap={roadmapData} />
          </motion.main>
        )}
      </div>

      <footer className="text-center text-xs text-text-muted py-8 mt-12 border-t border-border-subtle">
        GridSkill · Workspace Navigasi Proyek Vokasi (SDG 4)
      </footer>
    </div>
  );
}
