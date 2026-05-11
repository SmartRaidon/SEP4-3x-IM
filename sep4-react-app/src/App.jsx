import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import ComfortZonePage from "./pages/ComfortZonePage";
import ViewDataPage from "./pages/ViewDataPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

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
          </Route>

          {/* fallback / default */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;