import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';

function PlaceholderPage({ title, desc }) {
  return (
    <div className="min-h-screen bg-base text-text-primary flex flex-col items-center justify-center p-6 text-center">
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
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
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
