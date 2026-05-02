import { useRef, useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import s from "./AdminViews.module.css";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB limit for localStorage safety

// ── Icons ──────────────────────────────────────────────────────────────────

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={s.uploadIcon} aria-hidden="true">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────

const FilesView = () => {
  const { files, addFile, deleteFile, showToast } = useAdmin();
  const [dragOver, setDragOver] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const inputRef = useRef(null);

  const processFile = (file) => {
    if (!file.type.startsWith("image/")) {
      showToast("Solo se admiten imágenes (JPG, PNG, WebP, etc.)", "error");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      showToast(`"${file.name}" supera 2 MB. Comprimí la imagen antes de subirla.`, "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      addFile({ name: file.name, dataUrl: ev.target.result, type: file.type, size: file.size });
    };
    reader.readAsDataURL(file);
  };

  const handleFiles = (fileList) => {
    Array.from(fileList).forEach(processFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleCopy = (dataUrl, name) => {
    navigator.clipboard.writeText(dataUrl).then(() => {
      showToast(`URL de "${name}" copiada al portapapeles`);
    }).catch(() => {
      showToast("No se pudo copiar al portapapeles", "error");
    });
  };

  const formatSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      {/* Header */}
      <div className={s.viewHeader}>
        <div>
          <h2 className={s.viewTitle}>Archivos e imágenes</h2>
          <p className={s.viewSubtitle}>
            Subí imágenes para usarlas en cursos y contenido. Máximo 2 MB por archivo.
          </p>
        </div>
        <button
          type="button"
          className={s.btnPrimary}
          onClick={() => inputRef.current?.click()}
        >
          + Subir imagen
        </button>
      </div>

      {/* Upload zone */}
      <div
        className={`${s.uploadZone} ${dragOver ? s.uploadZoneDragOver : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Zona de carga. Hacé click o arrastrá una imagen."
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
      >
        <UploadIcon />
        <p className={s.uploadText}>
          {dragOver ? "Soltá la imagen aquí" : "Hacé click o arrastrá una imagen"}
        </p>
        <p className={s.uploadHint}>JPG, PNG, WebP · Máximo 2 MB</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
        />
      </div>

      {/* File grid */}
      {files.length === 0 ? (
        <p className={s.empty} style={{ marginTop: 32 }}>
          No hay archivos todavía. Subí una imagen para empezar.
        </p>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 22, marginBottom: 4 }}>
            <span style={{ fontSize: "0.76rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {files.length} {files.length === 1 ? "archivo" : "archivos"}
            </span>
          </div>
          <div className={s.fileGrid}>
            {files.map((f) => (
              <div key={f.id} className={s.fileItem}>
                <img src={f.dataUrl} alt={f.name} className={s.fileImg} />
                <div className={s.fileFooter}>
                  <span className={s.fileName} title={f.name}>
                    {f.name}
                    {f.size && (
                      <span style={{ opacity: 0.5, display: "block", fontSize: "0.68rem" }}>
                        {formatSize(f.size)}
                      </span>
                    )}
                  </span>
                  <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                    <button
                      type="button"
                      className={`${s.btnIcon} ${s.btnIconNeutral}`}
                      onClick={() => handleCopy(f.dataUrl, f.name)}
                      title="Copiar URL (base64)"
                    >
                      <CopyIcon />
                    </button>
                    <button
                      type="button"
                      className={`${s.btnIcon} ${s.btnIconDanger}`}
                      onClick={() => setConfirmId(f.id)}
                      title="Eliminar"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete confirmation inline */}
      {confirmId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            padding: 20,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setConfirmId(null); }}
        >
          <div style={{
            background: "var(--card)",
            border: "1px solid var(--border-strong)",
            borderRadius: 14,
            padding: "24px 28px",
            maxWidth: 380,
            width: "100%",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          }}>
            <h3 style={{ fontFamily: '"Playfair Display", serif', color: "var(--text)", margin: "0 0 12px", fontSize: "1rem" }}>
              Eliminar archivo
            </h3>
            <p style={{ color: "var(--text)", lineHeight: 1.7, margin: "0 0 20px", fontSize: "0.88rem" }}>
              ¿Eliminar este archivo? Esta acción no se puede deshacer.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button type="button" className={s.btnSecondary} onClick={() => setConfirmId(null)}>
                Cancelar
              </button>
              <button
                type="button"
                className={s.btnDanger}
                onClick={() => { deleteFile(confirmId); setConfirmId(null); }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesView;
