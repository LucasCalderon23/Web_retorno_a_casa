import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  const { isAuthenticated, login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (mode === "login") {
        await login(formState);
      } else {
        await register(formState);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h1>{mode === "login" ? "Iniciar sesion" : "Crear cuenta"}</h1>
        <p className={styles.subtitle}>
          {mode === "login"
            ? "Accede con tu cuenta para continuar."
            : "Registrate y recibiras un email de bienvenida."}
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
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
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            minLength={8}
            value={formState.password}
            onChange={handleChange}
          />

          {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}

          <button className={styles.primaryButton} type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Procesando..."
              : mode === "login"
                ? "Ingresar"
                : "Registrarme"}
          </button>
        </form>

        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setMode((prev) => (prev === "login" ? "register" : "login"))}
        >
          {mode === "login" ? "No tengo cuenta, quiero registrarme" : "Ya tengo cuenta, quiero ingresar"}
        </button>
      </div>
    </section>
  );
};

export default AuthPage;
