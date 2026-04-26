import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useScrollReveal from "../../hooks/useScrollReveal";
import styles from "./LoginSection.module.css";

const LoginSection = () => {
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();
  const { elementRef, isVisible } = useScrollReveal();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await login(formState);
      setFormState({ email: "", password: "" });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="login"
      ref={elementRef}
      className={`${styles.section} reveal-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className={styles.wrapper}>
        <h2>Acceso</h2>
        <p className={styles.subtitle}>Inicia sesion para gestionar tu experiencia personal.</p>

        {isLoading ? (
          <p className={styles.info}>Cargando sesion...</p>
        ) : isAuthenticated ? (
          <div className={styles.sessionCard}>
            <p className={styles.info}>
              Sesion activa como <strong>{user?.email}</strong> ({user?.role || "Usuario"}).
            </p>
            <button type="button" onClick={logout} className={styles.secondaryButton}>
              Cerrar sesion
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formState.email}
              onChange={handleChange}
            />

            <label htmlFor="password">Contrasena</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              value={formState.password}
              onChange={handleChange}
            />

            {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}

            <button type="submit" disabled={isSubmitting} className={styles.primaryButton}>
              {isSubmitting ? "Ingresando..." : "Iniciar sesion"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default LoginSection;
