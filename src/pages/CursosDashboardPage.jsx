import { useState } from "react";
import styles from "./CursosDashboardPage.module.css";

// ── Inline SVG icons ──────────────────────────────────────────────────────────

const PlayTriangle = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CheckCircle = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#2cb219" />
    <polyline points="7,12 10.5,15.5 17,9" fill="none" stroke="#fff" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EmptyCircle = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <circle cx="12" cy="12" r="10.5" fill="none" stroke="#2cb219" strokeWidth="1.5" />
  </svg>
);

const ClockSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="13" height="13" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const LayersSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="13" height="13" aria-hidden="true">
    <polygon points="12 2 22 8.5 12 15 2 8.5" />
    <polyline points="2 15.5 12 22 22 15.5" />
    <polyline points="2 12 12 18.5 22 12" />
  </svg>
);

const BookSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const COURSES = [
  {
    id: 1,
    title: "Árbol de la Vida",
    subtitle: "Kabbalah práctica",
    instructor: "Omar Presutti",
    thumbnail: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=900&q=80",
    totalClasses: 3,
    totalDuration: "2h 45min",
    progress: 67,
    classes: [
      {
        id: 11,
        title: "Introducción al Árbol de la Vida",
        duration: "52 min",
        completed: true,
        thumbnail: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=900&q=80",
      },
      {
        id: 12,
        title: "Las Sefirot: Esferas de la Luz",
        duration: "58 min",
        completed: true,
        thumbnail: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80",
      },
      {
        id: 13,
        title: "Caminos y Senderos Internos",
        duration: "55 min",
        completed: false,
        thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
      },
    ],
  },
  {
    id: 2,
    title: "Introspección Profunda",
    subtitle: "Meditación contemplativa",
    instructor: "Omar Presutti",
    thumbnail: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=900&q=80",
    totalClasses: 5,
    totalDuration: "3h 20min",
    progress: 0,
    classes: [],
  },
  {
    id: 3,
    title: "El Camino Interior",
    subtitle: "Despertar espiritual",
    instructor: "Omar Presutti",
    thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
    totalClasses: 4,
    totalDuration: "2h 10min",
    progress: 100,
    classes: [],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const CursosDashboardPage = () => {
  const [activeCourseId, setActiveCourseId] = useState(1);
  const [activeClassId, setActiveClassId] = useState(13);

  const course = COURSES.find((c) => c.id === activeCourseId) ?? COURSES[0];
  const activeClass =
    course.classes.find((c) => c.id === activeClassId) ?? course.classes[0] ?? null;

  const handleSelectCourse = (id) => {
    setActiveCourseId(id);
    const c = COURSES.find((c) => c.id === id);
    if (c?.classes.length) setActiveClassId(c.classes[0].id);
  };

  return (
    <section className={styles.page}>
      <div className={styles.layout}>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar} aria-label="Lista de cursos">
          <p className={styles.sidebarHeading}>Mis Cursos</p>
          <nav>
            <ul className={styles.courseNav}>
              {COURSES.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectCourse(c.id)}
                    className={`${styles.courseBtn} ${c.id === activeCourseId ? styles.courseBtnActive : ""}`}
                  >
                    <span className={styles.courseBtnIcon}>
                      {c.progress === 100 ? <CheckCircle /> : <BookSvg />}
                    </span>
                    <span className={styles.courseBtnText}>
                      <span className={styles.courseBtnTitle}>{c.title}</span>
                      <span className={styles.courseBtnMeta}>{c.progress}% completado</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* ── Main content ── */}
        <div className={styles.main}>

          {/* Course header card */}
          <div className={styles.courseCard}>
            <figure className={styles.courseThumb}>
              <img src={course.thumbnail} alt={course.title} />
            </figure>
            <div className={styles.courseInfo}>
              <p className={styles.courseTag}>{course.subtitle}</p>
              <h1 className={styles.courseTitle}>{course.title}</h1>
              <p className={styles.courseInstructor}>Por {course.instructor}</p>
              <div className={styles.courseMeta}>
                <span>
                  <LayersSvg /> {course.totalClasses} clases
                </span>
                <span>
                  <ClockSvg /> {course.totalDuration}
                </span>
              </div>
              <div className={styles.progressBlock}>
                <div className={styles.progressTop}>
                  <span>Tu progreso</span>
                  <strong className={styles.progressPct}>{course.progress}%</strong>
                </div>
                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-valuenow={course.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={styles.progressFill}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content area: module list + video player */}
          <div className={styles.content}>

            {/* Module / class list */}
            <div className={styles.moduleCard}>
              <p className={styles.panelHeading}>
                {course.classes.length > 0 ? "Clases del módulo" : "Próximamente"}
              </p>
              {course.classes.length > 0 ? (
                <ul className={styles.classesList}>
                  {course.classes.map((cls, idx) => (
                    <li key={cls.id}>
                      <button
                        type="button"
                        onClick={() => setActiveClassId(cls.id)}
                        className={`${styles.classRow} ${cls.id === activeClassId ? styles.classRowActive : ""}`}
                      >
                        <span className={styles.classNum}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className={styles.classStatus}>
                          {cls.completed ? <CheckCircle /> : <EmptyCircle />}
                        </span>
                        <span className={styles.classText}>
                          <span className={styles.classTitle}>{cls.title}</span>
                          <span className={styles.classMeta}>
                            <ClockSvg /> {cls.duration}
                          </span>
                        </span>
                        <span className={styles.classArrow}>
                          <ChevronRight />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.emptyMsg}>
                  Las clases de este curso estarán disponibles pronto.
                  Regresá a esta sección cuando estén listas.
                </p>
              )}
            </div>

            {/* Video player */}
            <div className={styles.videoCard}>
              <p className={styles.panelHeading}>Clase actual</p>
              {activeClass ? (
                <>
                  <div className={styles.player}>
                    <img
                      key={activeClass.id}
                      src={activeClass.thumbnail}
                      alt={activeClass.title}
                      className={styles.playerThumb}
                    />
                    <div className={styles.playerOverlay}>
                      <button
                        type="button"
                        className={styles.playBtn}
                        aria-label={`Reproducir: ${activeClass.title}`}
                      >
                        <PlayTriangle />
                      </button>
                    </div>
                  </div>
                  <div className={styles.videoInfo}>
                    <p className={styles.videoTitle}>{activeClass.title}</p>
                    <span className={styles.videoMeta}>
                      <ClockSvg /> {activeClass.duration}
                      {activeClass.completed && (
                        <span className={styles.completedTag}>Completada</span>
                      )}
                    </span>
                  </div>
                </>
              ) : (
                <p className={styles.emptyMsg}>
                  Seleccioná un curso con clases disponibles para ver el contenido.
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CursosDashboardPage;
