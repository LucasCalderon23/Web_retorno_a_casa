import { useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import AdminModal from "../AdminModal";
import s from "./AdminViews.module.css";

const LEVELS = ["Inicial", "Intermedio", "Avanzado"];

const EMPTY_FORM = {
  title: "",
  description: "",
  image: "",
  level: "Inicial",
  active: true,
};

// ── Icons ─────────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);

// ── Course form (shared between create & edit) ─────────────────────────────

const CourseForm = ({ form, onChange }) => {
  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("La imagen supera 2 MB. Usá una más liviana o pegá una URL.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => onChange("image", ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className={s.form}>
      {/* Title */}
      <div className={s.formGroupFull}>
        <label className={s.label}>Título del curso *</label>
        <input
          className={s.input}
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Ej: Árbol de la Vida"
          autoFocus
        />
      </div>

      {/* Description */}
      <div className={s.formGroupFull}>
        <label className={s.label}>Descripción</label>
        <textarea
          className={s.textarea}
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Una descripción breve del curso..."
        />
      </div>

      {/* Image */}
      <div className={s.formGroupFull}>
        <label className={s.label}>Imagen</label>
        <div className={s.imgInputWrap}>
          {form.image ? (
            <img src={form.image} alt="preview" className={s.imgThumb} />
          ) : (
            <span className={s.imgThumbPlaceholder}>📷</span>
          )}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              className={s.input}
              value={form.image.startsWith("data:") ? "" : form.image}
              onChange={(e) => onChange("image", e.target.value)}
              placeholder="https://... (URL de imagen)"
            />
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
              — o subí un archivo (máx. 2 MB) —
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ fontSize: "0.78rem", color: "var(--text-muted)", cursor: "pointer" }}
              onChange={handleImageFile}
            />
          </div>
        </div>
      </div>

      {/* Level + Active */}
      <div className={s.formRow}>
        <div className={s.formGroup}>
          <label className={s.label}>Nivel</label>
          <select
            className={s.select}
            value={form.level}
            onChange={(e) => onChange("level", e.target.value)}
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div className={s.formGroup}>
          <label className={s.label}>Estado</label>
          <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4, cursor: "pointer" }}>
            <span className={s.toggle}>
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => onChange("active", e.target.checked)}
              />
              <span className={s.toggleTrack} />
            </span>
            <span style={{ fontSize: "0.88rem", color: form.active ? "var(--green)" : "var(--text-muted)" }}>
              {form.active ? "Activo (visible)" : "Oculto"}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

// ── Main view ──────────────────────────────────────────────────────────────

const CoursesView = ({ onNavigate }) => {
  const { courses, addCourse, updateCourse, deleteCourse, toggleCourse } = useAdmin();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = create, course object = edit
  const [form, setForm] = useState(EMPTY_FORM);
  const [confirmId, setConfirmId] = useState(null);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (course) => {
    setEditing(course);
    setForm({
      title: course.title,
      description: course.description,
      image: course.image,
      level: course.level,
      active: course.active,
    });
    setModalOpen(true);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    if (editing) {
      updateCourse(editing.id, form);
    } else {
      addCourse(form);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteCourse(id);
    setConfirmId(null);
  };

  return (
    <div>
      {/* Header */}
      <div className={s.viewHeader}>
        <div>
          <h2 className={s.viewTitle}>Gestión de cursos</h2>
          <p className={s.viewSubtitle}>Creá, editá y administrá todos tus cursos</p>
        </div>
        <button type="button" className={s.btnPrimary} onClick={openCreate}>
          <PlusIcon /> Nuevo curso
        </button>
      </div>

      {/* Table */}
      <div className={s.card} style={{ padding: 0, overflow: "hidden" }}>
        {courses.length === 0 ? (
          <p className={s.empty}>
            No hay cursos todavía.{" "}
            <button
              type="button"
              style={{ color: "var(--green)", background: "none", border: 0, cursor: "pointer", fontStyle: "italic" }}
              onClick={openCreate}
            >
              Creá el primero.
            </button>
          </p>
        ) : (
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: 20 }}>Imagen</th>
                  <th>Título</th>
                  <th>Nivel</th>
                  <th>Clases</th>
                  <th>Estado</th>
                  <th style={{ textAlign: "right", paddingRight: 20 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id}>
                    <td style={{ paddingLeft: 20 }}>
                      {c.image ? (
                        <img src={c.image} alt="" className={s.rowThumb} />
                      ) : (
                        <span className={s.rowThumbPlaceholder}>📷</span>
                      )}
                    </td>
                    <td>
                      <div style={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, marginBottom: 2 }}>
                        {c.title}
                      </div>
                      {c.description && (
                        <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 240 }}>
                          {c.description}
                        </div>
                      )}
                    </td>
                    <td><span className={s.badgeOrange}>{c.level}</span></td>
                    <td>{c.classes.length} clases</td>
                    <td>
                      <label className={s.toggle} title={c.active ? "Desactivar" : "Activar"}>
                        <input
                          type="checkbox"
                          checked={c.active}
                          onChange={() => toggleCourse(c.id)}
                        />
                        <span className={s.toggleTrack} />
                      </label>
                    </td>
                    <td style={{ paddingRight: 20 }}>
                      <div className={s.actionsRow}>
                        <button
                          type="button"
                          className={s.btnIcon}
                          onClick={() => openEdit(c)}
                          title="Editar curso"
                        >
                          <EditIcon />
                        </button>
                        <button
                          type="button"
                          className={`${s.btnIcon} ${s.btnIconDanger}`}
                          onClick={() => setConfirmId(c.id)}
                          title="Eliminar curso"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Editar curso" : "Nuevo curso"}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Guardar cambios" : "Crear curso"}
        submitDisabled={!form.title.trim()}
        size="lg"
      >
        <CourseForm form={form} onChange={handleChange} />
      </AdminModal>

      {/* Delete confirmation modal */}
      <AdminModal
        isOpen={Boolean(confirmId)}
        onClose={() => setConfirmId(null)}
        title="Eliminar curso"
        onSubmit={() => handleDelete(confirmId)}
        submitLabel="Sí, eliminar"
        size="sm"
      >
        <p style={{ color: "var(--text)", lineHeight: 1.7, margin: 0 }}>
          ¿Estás seguro? Se eliminarán también todas las clases de este curso.
          Esta acción no se puede deshacer.
        </p>
      </AdminModal>
    </div>
  );
};

export default CoursesView;
