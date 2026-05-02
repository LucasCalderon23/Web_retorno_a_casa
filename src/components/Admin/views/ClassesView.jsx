import { useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import AdminModal from "../AdminModal";
import s from "./AdminViews.module.css";

const EMPTY_FORM = { title: "", videoUrl: "", duration: "" };

// ── Icons ─────────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const UpIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const DownIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ── Class form ─────────────────────────────────────────────────────────────

const ClassForm = ({ form, onChange }) => (
  <div className={s.form}>
    <div className={s.formGroupFull}>
      <label className={s.label}>Título de la clase *</label>
      <input
        className={s.input}
        value={form.title}
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="Ej: Introducción al Árbol de la Vida"
        autoFocus
      />
    </div>
    <div className={s.formGroupFull}>
      <label className={s.label}>Video (URL de YouTube, Vimeo, etc.)</label>
      <input
        className={s.input}
        value={form.videoUrl}
        onChange={(e) => onChange("videoUrl", e.target.value)}
        placeholder="https://www.youtube.com/watch?v=..."
      />
    </div>
    <div className={s.formGroup} style={{ minWidth: 140, flex: "0 0 auto" }}>
      <label className={s.label}>Duración</label>
      <input
        className={s.input}
        value={form.duration}
        onChange={(e) => onChange("duration", e.target.value)}
        placeholder="Ej: 52 min"
      />
    </div>
  </div>
);

// ── Main view ──────────────────────────────────────────────────────────────

const ClassesView = () => {
  const { courses, addClass, updateClass, deleteClass, moveClass } = useAdmin();

  // Selected course id
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [confirmId, setConfirmId] = useState(null);

  const selectedCourse = courses.find((c) => c.id === courseId) ?? null;
  const classes = selectedCourse?.classes ?? [];

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (cls) => {
    setEditing(cls);
    setForm({ title: cls.title, videoUrl: cls.videoUrl, duration: cls.duration });
    setModalOpen(true);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !courseId) return;
    if (editing) {
      updateClass(courseId, editing.id, form);
    } else {
      addClass(courseId, form);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteClass(courseId, id);
    setConfirmId(null);
  };

  return (
    <div>
      {/* Header */}
      <div className={s.viewHeader}>
        <div>
          <h2 className={s.viewTitle}>Gestión de clases</h2>
          <p className={s.viewSubtitle}>Administrá las clases dentro de cada curso</p>
        </div>
        <button
          type="button"
          className={s.btnPrimary}
          onClick={openCreate}
          disabled={!courseId || courses.length === 0}
        >
          <PlusIcon /> Agregar clase
        </button>
      </div>

      {/* Course selector */}
      <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <label style={{ fontSize: "0.77rem", color: "var(--text-muted)", letterSpacing: "0.09em", textTransform: "uppercase" }}>
          Curso
        </label>
        {courses.length === 0 ? (
          <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontStyle: "italic" }}>
            No hay cursos. Creá uno primero en la sección Cursos.
          </span>
        ) : (
          <select
            className={s.coursePicker}
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.classes.length} clases)
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Class list */}
      {!selectedCourse ? (
        <div className={s.card}>
          <p className={s.empty}>Seleccioná un curso para ver sus clases.</p>
        </div>
      ) : classes.length === 0 ? (
        <div className={s.card}>
          <p className={s.empty}>
            Este curso no tiene clases todavía.{" "}
            <button
              type="button"
              style={{ color: "var(--green)", background: "none", border: 0, cursor: "pointer", fontStyle: "italic" }}
              onClick={openCreate}
            >
              Agregá la primera.
            </button>
          </p>
        </div>
      ) : (
        <div className={s.classList}>
          {classes.map((cls, idx) => (
            <div key={cls.id} className={s.classRow}>
              {/* Order indicator */}
              <span className={s.classOrder}>{String(idx + 1).padStart(2, "0")}</span>

              {/* Info */}
              <div className={s.classInfo}>
                <div className={s.classTitle}>{cls.title}</div>
                <div className={s.classMeta}>
                  {cls.duration && <span>{cls.duration}</span>}
                  {cls.duration && cls.videoUrl && <span style={{ opacity: 0.4 }}> · </span>}
                  {cls.videoUrl && (
                    <a
                      href={cls.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--green)", textDecoration: "none" }}
                    >
                      Ver video ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className={s.actionsRow}>
                <button
                  type="button"
                  className={`${s.btnIcon} ${s.btnIconNeutral}`}
                  onClick={() => moveClass(courseId, cls.id, "up")}
                  disabled={idx === 0}
                  title="Subir"
                  style={{ opacity: idx === 0 ? 0.3 : 1 }}
                >
                  <UpIcon />
                </button>
                <button
                  type="button"
                  className={`${s.btnIcon} ${s.btnIconNeutral}`}
                  onClick={() => moveClass(courseId, cls.id, "down")}
                  disabled={idx === classes.length - 1}
                  title="Bajar"
                  style={{ opacity: idx === classes.length - 1 ? 0.3 : 1 }}
                >
                  <DownIcon />
                </button>
                <button
                  type="button"
                  className={s.btnIcon}
                  onClick={() => openEdit(cls)}
                  title="Editar"
                >
                  <EditIcon />
                </button>
                <button
                  type="button"
                  className={`${s.btnIcon} ${s.btnIconDanger}`}
                  onClick={() => setConfirmId(cls.id)}
                  title="Eliminar"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Editar clase" : "Agregar clase"}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Guardar cambios" : "Agregar clase"}
        submitDisabled={!form.title.trim()}
      >
        <ClassForm form={form} onChange={handleChange} />
      </AdminModal>

      {/* Delete confirmation */}
      <AdminModal
        isOpen={Boolean(confirmId)}
        onClose={() => setConfirmId(null)}
        title="Eliminar clase"
        onSubmit={() => handleDelete(confirmId)}
        submitLabel="Sí, eliminar"
        size="sm"
      >
        <p style={{ color: "var(--text)", lineHeight: 1.7, margin: 0 }}>
          ¿Eliminar esta clase? Esta acción no se puede deshacer.
        </p>
      </AdminModal>
    </div>
  );
};

export default ClassesView;
