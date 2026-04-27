import useScrollReveal from "../hooks/useScrollReveal";
import { Link } from "react-router-dom";
import styles from "./EntrenamientoPage.module.css";

const cursos = [
  {
    title: "Curso del Arbol de la Vida - Nivel Inicial",
    text: "Un recorrido guiado por la estructura del Arbol de la Vida para comprender su aplicacion practica en la vida diaria.",
    image:
      "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Curso del Arbol de la Vida - Integracion",
    text: "Profundiza en senderos, sefirot y procesos internos para integrar el estudio con ejercicios de observacion personal.",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80"
  }
];

const EntrenamientoPage = () => {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <section
      ref={elementRef}
      className={`${styles.section} reveal-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className={styles.wrapper}>
        <h1>Entrenamiento</h1>
        <p className={styles.lead}>
          Programas para aplicar el conocimiento en tu camino personal con acompanamiento y practica constante.
        </p>

        <div className={styles.grid}>
          {cursos.map((curso) => (
            <article key={curso.title} className={styles.card}>
              <img src={curso.image} alt={curso.title} loading="lazy" className={styles.image} />
              <div className={styles.body}>
                <h2>{curso.title}</h2>
                <p>{curso.text}</p>
                <Link to="/entrenamiento/curso-arbol-vida" className={styles.button}>
                  Ver detalle
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EntrenamientoPage;
