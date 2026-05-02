import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./AdminModal.module.css";

/**
 * Generic modal for the admin panel.
 * Closes on overlay click and Escape key.
 */
const AdminModal = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = "Guardar",
  submitDisabled = false,
  size = "md", // "sm" | "md" | "lg"
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <div className={`${styles.dialog} ${styles[`dialog_${size}`]}`}>
        {/* Header */}
        <div className={styles.header}>
          <h2 id="admin-modal-title" className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>{children}</div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          {onSubmit && (
            <button
              type="button"
              className={styles.submitBtn}
              onClick={onSubmit}
              disabled={submitDisabled}
            >
              {submitLabel}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AdminModal;
