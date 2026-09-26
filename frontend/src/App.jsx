import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function PlaceholderPage({ title, desc }) {
  return (
    <div className="min-h-screen bg-[#0B1114] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="spruce-panel max-w-md w-full p-8 rounded-xl">
        <h1 className="text-xl font-bold mb-2 text-white">{title}</h1>
        <p className="text-xs text-slate-400 mb-6">{desc}</p>
        <div className="flex justify-center gap-3">
          <a href="/login" className="px-4 py-2 bg-emerald-600 text-slate-950 font-semibold text-xs rounded-full">
            Ke Login
          </a>
          <a href="/dashboard" className="px-4 py-2 bg-[#182329] border border-[#2B3F4A] text-slate-200 text-xs rounded-full">
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
          <Route path="/" element={<PlaceholderPage title="GridSkill — Landing Page" desc="Halaman pengenalan platform dan data isu mismatch vokasi SDG 4.4." />} />
          <Route path="/login" element={<PlaceholderPage title="Login Pengguna" desc="Halaman autentikasi akun siswa & mentor." />} />
          <Route path="/register" element={<PlaceholderPage title="Daftar Akun Baru" desc="Halaman registrasi talenta vokasi baru." />} />
          
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
