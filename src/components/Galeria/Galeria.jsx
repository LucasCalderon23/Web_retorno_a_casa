import styles from "./Galeria.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const cards = [
  {
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80",
    alt: "Frase de introspeccion en blanco y rojo",
    title: "Momentos de introspeccion",
    text: "Frases y reflexiones que inspiran a pausar, respirar y mirar hacia adentro."
  },
  {
    image:
      "https://images.unsplash.com/photo-1517495306984-f84210f9daa8?auto=format&fit=crop&w=900&q=80",
    alt: "Libro y vela en espacio de meditacion",
    title: "Rincones de calma",
    text: "Espacios serenos para conectar con tu bienestar emocional y mental."
  },
  {
    image:
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=900&q=80",
    alt: "Persona en proceso de reflexion en la naturaleza",
    title: "Conexion con la naturaleza",
    text: "Escenarios naturales que facilitan procesos de presencia y autodescubrimiento."
  }
];

const Galeria = () => {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <section
      id="introspeccion"
      ref={elementRef}
      className={`${styles.section} reveal-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className={styles.wrapper}>
        <h2>Introspeccion</h2>
        <p className={styles.intro}>Explora nuestro viaje de autodescubrimiento.</p>
        <div className={styles.grid}>
          {cards.map((card) => (
            <article key={card.alt} className={styles.card}>
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

export default Galeria;
