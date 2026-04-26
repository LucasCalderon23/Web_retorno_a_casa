import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./EntrenamientoPage.module.css";

const EntrenamientoPage = () => {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <section
      ref={elementRef}
      className={`${styles.section} reveal-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className={styles.wrapper}>
        <h1>Entrenamiento Personalizado</h1>
        <p>
          Sesiones uno a uno para profundizar tu proceso personal con acompanamiento cercano,
          herramientas practicas y objetivos claros en cada etapa.
        </p>
      </div>
    </section>
  );
};

export default EntrenamientoPage;
