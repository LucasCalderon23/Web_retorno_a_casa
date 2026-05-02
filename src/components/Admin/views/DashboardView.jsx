import { useAdmin } from "../../../context/AdminContext";
import s from "./AdminViews.module.css";

// ── Icons ─────────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ClassesIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────

const DashboardView = ({ onNavigate }) => {
  const { courses, files } = useAdmin();

  const totalClasses = courses.reduce((acc, c) => acc + c.classes.length, 0);
  const activeCourses = courses.filter((c) => c.active).length;

  // Courses sorted by createdAt desc for the recent list
  const recentCourses = [...courses]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div>
      {/* ── Stats ── */}
      <div className={s.statsGrid}>
        <div className={s.statCard}>
          <span className={s.statLabel}>Cursos totales</span>
          <span className={s.statValue}>{courses.length}</span>
          <span className={s.statSub}>En la plataforma</span>
        </div>
        <div className={s.statCard}>
          <span className={s.statLabel}>Cursos activos</span>
          <span className={s.statValue}>{activeCourses}</span>
          <span className={s.statSub}>Visibles al público</span>
        </div>
        <div className={s.statCard}>
          <span className={s.statLabel}>Clases</span>
          <span className={s.statValue}>{totalClasses}</span>
          <span className={s.statSub}>En todos los cursos</span>
        </div>
        <div className={s.statCard}>
          <span className={s.statLabel}>Archivos</span>
          <span className={s.statValue}>{files.length}</span>
          <span className={s.statSub}>Subidos</span>
        </div>
      </div>

      {/* ── Quick actions ── */}
      <div className={s.quickGrid}>
        <button type="button" className={s.quickBtn} onClick={() => onNavigate("courses")}>
          <span className={s.quickBtnIcon}><PlusIcon /></span>
          <div>
            <div>Nuevo curso</div>
            <div style={{ fontSize: "0.76rem", opacity: 0.6, marginTop: 2 }}>Agregar un curso</div>
          </div>
        </button>
        <button type="button" className={s.quickBtn} onClick={() => onNavigate("classes")}>
          <span className={s.quickBtnIcon}><ClassesIcon /></span>
          <div>
            <div>Gestionar clases</div>
            <div style={{ fontSize: "0.76rem", opacity: 0.6, marginTop: 2 }}>Agregar o editar clases</div>
          </div>
        </button>
        <button type="button" className={s.quickBtn} onClick={() => onNavigate("content")}>
          <span className={s.quickBtnIcon}><EditIcon /></span>
          <div>
            <div>Editar contenido</div>
            <div style={{ fontSize: "0.76rem", opacity: 0.6, marginTop: 2 }}>Textos e imágenes</div>
          </div>
        </button>
        <button type="button" className={s.quickBtn} onClick={() => onNavigate("files")}>
          <span className={s.quickBtnIcon}><UploadIcon /></span>
          <div>
            <div>Subir archivos</div>
            <div style={{ fontSize: "0.76rem", opacity: 0.6, marginTop: 2 }}>Imágenes y media</div>
          </div>
        </button>
      </div>

      {/* ── Recent courses ── */}
      <div className={s.card}>
        <div className={s.viewHeader}>
          <div>
            <h2 className={s.viewTitle}>Cursos recientes</h2>
            <p className={s.viewSubtitle}>Últimos cursos agregados a la plataforma</p>
          </div>
          <button
            type="button"
            className={s.btnSecondary}
            onClick={() => onNavigate("courses")}
          >
            Ver todos →
          </button>
        </div>

        {recentCourses.length === 0 ? (
          <p className={s.empty}>
            No hay cursos todavía.{" "}
            <button
              type="button"
              style={{ color: "var(--green)", background: "none", border: 0, cursor: "pointer", fontStyle: "italic" }}
              onClick={() => onNavigate("courses")}
            >
              Creá el primero.
            </button>
          </p>
        ) : (
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Título</th>
                  <th>Nivel</th>
                  <th>Clases</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentCourses.map((c) => (
                  <tr key={c.id}>
                    <td>
                      {c.image ? (
                        <img src={c.image} alt="" className={s.rowThumb} />
                      ) : (
                        <span className={s.rowThumbPlaceholder}>📷</span>
                      )}
                    </td>
                    <td style={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>
                      {c.title}
                    </td>
                    <td>
                      <span className={s.badgeOrange}>{c.level}</span>
                    </td>
                    <td>{c.classes.length}</td>
                    <td>
                      <span className={c.active ? s.badgeGreen : s.badgeGray}>
                        {c.active ? "Activo" : "Oculto"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardView;
