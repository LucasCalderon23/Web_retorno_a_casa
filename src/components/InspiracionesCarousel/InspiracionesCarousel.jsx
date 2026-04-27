import { useEffect, useMemo, useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import styles from "./InspiracionesCarousel.module.css";

const slides = [
  {
    src: "/estudios/semana-lenguaje.png",
    alt: "Reflexion sobre el lenguaje y la unidad"
  },
  {
    src: "/estudios/semana-tetzave.png",
    alt: "Porcion de la Torah Tetzave"
  },
  {
    src: "/estudios/semana-visible.png",
    alt: "Reflexion sobre habitar el proceso"
  },
  {
    src: "/estudios/semana-valor.png",
    alt: "Mensaje sobre valor personal"
  },
  {
    src: "/estudios/semana-crecimiento.png",
    alt: "Mensaje sobre crecimiento personal"
  }
];

const AUTO_CHANGE_MS = 4500;

const InspiracionesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { elementRef, isVisible } = useScrollReveal();
  const totalSlides = useMemo(() => slides.length, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalSlides);
    }, AUTO_CHANGE_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [totalSlides]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % totalSlides);
  };

  return (
    <section
      ref={elementRef}
      className={`${styles.section} reveal-section ${isVisible ? "is-visible" : ""}`}
      aria-label="Carrusel de inspiraciones"
    >
      <div className={styles.wrapper}>
        <h2>Inspiraciones de la semana</h2>
        <p className={styles.subtitle}>Mensajes para acompanar tu proceso antes de cerrar la pagina.</p>

        <div className={styles.carousel}>
          <button type="button" className={styles.arrow} onClick={showPrevious} aria-label="Imagen anterior">
            &#10094;
          </button>

          <div className={styles.imageContainer}>
            <img src={slides[activeIndex].src} alt={slides[activeIndex].alt} loading="lazy" className={styles.image} />
          </div>

          <button type="button" className={styles.arrow} onClick={showNext} aria-label="Imagen siguiente">
            &#10095;
          </button>
        </div>

        <div className={styles.dots} aria-hidden="true">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ir a inspiracion ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InspiracionesCarousel;
