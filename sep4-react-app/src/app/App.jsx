import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../features/layout/components/Layout";
import LoginPage from "../features/auth/pages/LoginPage";
import RegistrationPage from "../features/auth/pages/RegistrationPage";
import MainPage from "../features/layout/pages/MainPage";
import ComfortZonePage from "../features/scenarios/pages/ComfortZonePage";
import ViewDataPage from "../features/measurements/pages/ViewDataPage";
import SystemActionHistoryPage from "../features/system-actions/pages/SystemActionHistoryPage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import { AuthProvider } from "../features/auth/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* public routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegistrationPage />} />

          {/* protected routes */}
          <Route element={<Layout />}>
            <Route path="main" element={<ProtectedRoute> <MainPage /> </ProtectedRoute>}/>
            <Route path="comfort-zone/:roomId" element={<ProtectedRoute> <ComfortZonePage /> </ProtectedRoute>}/>
            <Route path="view-data/:roomId" element={<ProtectedRoute> <ViewDataPage /> </ProtectedRoute>}/>
            <Route path="system-actions/:roomId" element={<ProtectedRoute> <SystemActionHistoryPage /> </ProtectedRoute>}/>
          </Route>

          {/* fallback / default */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;