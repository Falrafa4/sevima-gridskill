import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function PlaceholderPage({ title, desc }) {
  return (
    <div className="min-h-screen bg-base-bg text-text-primary flex flex-col items-center justify-center p-6 text-center">
      <div className="spruce-panel max-w-md w-full p-8 rounded-xl">
        <h1 className="text-xl font-bold mb-2 text-white">{title}</h1>
        <p className="text-xs text-text-secondary mb-6">{desc}</p>
        <div className="flex justify-center gap-3">
          <a href="/dashboard" className="px-4 py-2 bg-emerald-accent text-base font-semibold text-xs pill-btn">
            Ke Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <PlaceholderPage title="Onboarding Profiler" desc="Input data kejuruan dan minat industri masa depan." />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PlaceholderPage title="Bento Grid Dashboard" desc="Workspace navigasi roadmap dan checklist proyek mandiri." />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passport/:profileId"
            element={<PlaceholderPage title="Digital Skill Passport" desc="Verifikasi portofolio publik siswa vokasi." />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
