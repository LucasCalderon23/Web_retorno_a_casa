import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AdminProvider, useAdmin } from "../context/AdminContext";
import DashboardView from "../components/Admin/views/DashboardView";
import CoursesView from "../components/Admin/views/CoursesView";
import ClassesView from "../components/Admin/views/ClassesView";
import ContentView from "../components/Admin/views/ContentView";
import FilesView from "../components/Admin/views/FilesView";
import styles from "./AdminPage.module.css";

// ── Navigation items ───────────────────────────────────────────────────────

const NAV = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    key: "courses",
    label: "Cursos",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    key: "classes",
    label: "Clases",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
  {
    key: "content",
    label: "Contenido",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    key: "files",
    label: "Archivos",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
];

const VIEWS = {
  dashboard: DashboardView,
  courses: CoursesView,
  classes: ClassesView,
  content: ContentView,
  files: FilesView,
};

// ── Toast notification ─────────────────────────────────────────────────────

const Toast = ({ toast }) => {
  if (!toast) return null;
  const isError = toast.type === "error";
  return (
    <div
      key={toast.key}
      role="status"
      aria-live="polite"
      className={`${styles.toast} ${isError ? styles.toastError : styles.toastSuccess}`}
    >
      <span className={styles.toastIcon}>{isError ? "✕" : "✓"}</span>
      {toast.message}
    </div>
  );
};

// ── Admin shell (uses AdminContext internally) ─────────────────────────────

const AdminShell = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useAdmin();

  const CurrentView = VIEWS[activeView];
  const currentLabel = NAV.find((n) => n.key === activeView)?.label ?? "";

  const handleNavigate = (view) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  return (
    <div className={styles.shell}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>✦</span>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Retorno a Casa</span>
            <span className={styles.brandSub}>Panel de administración</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Navegación del admin">
          {NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => handleNavigate(item.key)}
              className={`${styles.navItem} ${activeView === item.key ? styles.navItemActive : ""}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <span className={styles.userAvatar}>
              {user?.email?.[0]?.toUpperCase() ?? "A"}
            </span>
            <span className={styles.userEmail}>{user?.email}</span>
          </div>
          <button type="button" onClick={logout} className={styles.logoutBtn}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            {/* Hamburger for mobile */}
            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setSidebarOpen((s) => !s)}
              aria-label="Abrir menú"
            >
              <span /><span /><span />
            </button>
            <h1 className={styles.pageTitle}>{currentLabel}</h1>
          </div>
          <time className={styles.topbarDate}>
            {new Date().toLocaleDateString("es-AR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </header>

        <div className={styles.content}>
          <CurrentView onNavigate={handleNavigate} />
        </div>
      </div>

      <Toast toast={toast} />
    </div>
  );
};

// ── Page root: wraps shell in data provider ────────────────────────────────

const AdminPage = () => (
  <AdminProvider>
    <AdminShell />
  </AdminProvider>
);

export default AdminPage;
