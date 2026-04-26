import styles from "./Contacto.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const Contacto = () => {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <section
      id="contacto"
      ref={elementRef}
      className={`${styles.section} reveal-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className={styles.overlay}>
        <div className={styles.formContainer}>
          <h2>Contacto</h2>
          <p>Conectate con nosotros para tu viaje personal.</p>
          <form className={styles.form}>
            <label htmlFor="nombre">Nombre completo</label>
            <input id="nombre" type="text" placeholder="Escribe tu nombre completo" />

            <label htmlFor="correo">Correo electronico</label>
            <input id="correo" type="email" placeholder="Escribe tu correo electronico" />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" rows="4" placeholder="Escribe tu mensaje aqui" />

            <button type="button">Enviar mensaje</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
