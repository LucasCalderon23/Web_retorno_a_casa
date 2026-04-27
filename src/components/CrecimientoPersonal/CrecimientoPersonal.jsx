import styles from "./CrecimientoPersonal.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const cards = [
  {
    title: "Clases virtuales del Zohar por Zoom",
    text: "Sumate a encuentros online para estudiar Zohar con guia en vivo, espacio de preguntas y material para seguir profundizando durante la semana.",
    image: "/cursos/rosh-jodesh.png",
    alt: "Invitacion a clases virtuales del Zohar"
  },
  {
    title: "Shabbat los viernes por la noche",
    text: "Compartimos un espacio de union y presencia para recibir Shabbat en comunidad, con reflexiones, canto y conexion espiritual.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    alt: "Mesa encendida para celebrar Shabbat"
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
        <h2>Estudios</h2>
        <p className={styles.intro}>
          Espacios de aprendizaje para sostener la practica espiritual en comunidad.
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
