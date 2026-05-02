import { Navigate, Route, Routes } from "react-router-dom";
import RoleGuard from "./components/Auth/RoleGuard";
import MainLayout from "./layouts/MainLayout";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import CursoArbolVidaPage from "./pages/CursoArbolVidaPage";
import CursosDashboardPage from "./pages/CursosDashboardPage";
import EntrenamientoPage from "./pages/EntrenamientoPage";
import EstudiosPage from "./pages/EstudiosPage";
import HomePage from "./pages/HomePage";
import IntrospeccionPage from "./pages/IntrospeccionPage";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/estudios" element={<EstudiosPage />} />
        <Route path="/entrenamiento" element={<EntrenamientoPage />} />
        <Route path="/entrenamiento/curso-arbol-vida" element={<CursoArbolVidaPage />} />
        <Route path="/introspeccion" element={<IntrospeccionPage />} />
        <Route path="/cursos" element={<CursosDashboardPage />} />
        <Route
          path="/admin"
          element={
            <RoleGuard allowedRoles={["Admin"]}>
              <AdminPage />
            </RoleGuard>
          }
        />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
