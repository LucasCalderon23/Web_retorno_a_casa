import styles from "./Hero.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const Hero = () => {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <section
      id="inicio"
      ref={elementRef}
      className={`${styles.hero} reveal-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>Despierta tu sabiduria interior</h1>
          <p className={styles.subtitle}>
            Descubre un espacio donde la introspeccion se convierte en transformacion.
          </p>
          <a href="#contacto" className={styles.cta}>
            Comienza ahora
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
