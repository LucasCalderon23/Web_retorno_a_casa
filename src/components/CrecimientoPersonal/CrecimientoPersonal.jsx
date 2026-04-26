import styles from "./CrecimientoPersonal.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const cards = [
  {
    title: "Talleres en Grupo",
    text: "Vive una experiencia transformadora a traves de dinamicas grupales guiadas que invitan a mirar hacia dentro y compartir el proceso en comunidad.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    alt: "Grupo en circulo durante un taller de crecimiento personal"
  },
  {
    title: "Entrenamiento Personalizado",
    text: "Sesiones uno a uno a tu medida, pensadas para acompanarte con herramientas practicas en tu camino de autoconocimiento y crecimiento interior.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    alt: "Entrenamiento personalizado con acompanamiento profesional"
  }
];

const CrecimientoPersonal = () => {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <section
      id="estudios"
      ref={elementRef}
      className={`${styles.section} reveal-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className={styles.wrapper}>
        <h2>Crecimiento Personal</h2>
        <p className={styles.intro}>
          Explora tu interior y transforma tu vida con nuestros programas de entrenamiento.
        </p>

        <div className={styles.grid}>
          {cards.map((card, index) => (
            <article
              key={card.title}
              id={index === 1 ? "entrenamiento" : undefined}
              className={styles.card}
            >
              <img src={card.image} alt={card.alt} loading="lazy" className={styles.image} />
              <div className={styles.body}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CrecimientoPersonal;
