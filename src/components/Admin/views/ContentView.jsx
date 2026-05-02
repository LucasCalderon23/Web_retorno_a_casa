import { useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import s from "./AdminViews.module.css";

// Sections the admin can edit
const SECTIONS = [
  { key: "hero",         label: "Inicio (Hero)",   fields: ["title", "subtitle"] },
  { key: "entrenamiento", label: "Entrenamiento",  fields: ["title", "lead"] },
  { key: "estudios",     label: "Estudios",         fields: ["title", "lead"] },
  { key: "introspeccion", label: "Introspección",   fields: ["title", "lead"] },
];

const FIELD_LABELS = {
  title:    "Título principal",
  subtitle: "Subtítulo",
  lead:     "Texto introductorio",
};

// ── Section editor card ────────────────────────────────────────────────────

const SectionEditor = ({ sectionKey, fields, data, onSave }) => {
  const [draft, setDraft] = useState({ ...data });
  const [dirty, setDirty] = useState(false);

  const handleChange = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    onSave(sectionKey, draft);
    setDirty(false);
  };

  const handleReset = () => {
    setDraft({ ...data });
    setDirty(false);
  };

  return (
    <div className={s.sectionCard}>
      {fields.map((field) => (
        <div key={field} className={s.formGroupFull}>
          <label className={s.label}>{FIELD_LABELS[field] ?? field}</label>
          {field === "subtitle" || field === "lead" ? (
            <textarea
              className={s.textarea}
              value={draft[field] ?? ""}
              onChange={(e) => handleChange(field, e.target.value)}
              rows={3}
              placeholder={`Ingresá el ${FIELD_LABELS[field]?.toLowerCase() ?? field}...`}
            />
          ) : (
            <input
              className={s.input}
              value={draft[field] ?? ""}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={`Ingresá el ${FIELD_LABELS[field]?.toLowerCase() ?? field}...`}
            />
          )}
        </div>
      ))}

      <div className={s.sectionSaveRow}>
        {dirty && (
          <button
            type="button"
            className={s.btnSecondary}
            onClick={handleReset}
            style={{ marginRight: 8 }}
          >
            Descartar
          </button>
        )}
        <button
          type="button"
          className={s.btnPrimary}
          onClick={handleSave}
          disabled={!dirty}
          style={{ opacity: dirty ? 1 : 0.45 }}
        >
          {dirty ? "Guardar cambios" : "Guardado ✓"}
        </button>
      </div>
    </div>
  );
};

// ── Main view ──────────────────────────────────────────────────────────────

const ContentView = () => {
  const { content, updateContent } = useAdmin();
  const [activeTab, setActiveTab] = useState(SECTIONS[0].key);

  const activeSection = SECTIONS.find((s) => s.key === activeTab) ?? SECTIONS[0];

  return (
    <div>
      {/* Header */}
      <div className={s.viewHeader}>
        <div>
          <h2 className={s.viewTitle}>Contenido de la web</h2>
          <p className={s.viewSubtitle}>
            Editá los textos de cada sección. Los cambios se reflejan en la web pública.
          </p>
        </div>
      </div>

      {/* Section tabs */}
      <div className={s.tabs}>
        {SECTIONS.map((sec) => (
          <button
            key={sec.key}
            type="button"
            className={`${s.tab} ${activeTab === sec.key ? s.tabActive : ""}`}
            onClick={() => setActiveTab(sec.key)}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Editor for active section */}
      <SectionEditor
        key={activeSection.key}
        sectionKey={activeSection.key}
        fields={activeSection.fields}
        data={content[activeSection.key] ?? {}}
        onSave={updateContent}
      />

      {/* Info note */}
      <p style={{
        marginTop: 18,
        fontSize: "0.78rem",
        color: "var(--text-dim)",
        fontStyle: "italic",
        lineHeight: 1.7,
      }}>
        Nota: los cambios se guardan en el almacenamiento local del navegador.
        Para conectar con una base de datos en producción, integrá la función{" "}
        <code style={{ color: "var(--green)", fontStyle: "normal" }}>updateContent</code>{" "}
        de AdminContext con tu API.
      </p>
    </div>
  );
};

export default ContentView;
