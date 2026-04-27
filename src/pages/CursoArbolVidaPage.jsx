import styles from "./CursoArbolVidaPage.module.css";

const videos = [
  {
    title: "Clase 1 - Introduccion al Arbol de la Vida",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Clase 2 - Las sefirot y su integracion",
    src: "https://www.youtube.com/embed/aqz-KE-bpKQ"
  },
  {
    title: "Clase 3 - Aplicacion practica en la vida diaria",
    src: "https://www.youtube.com/embed/ysz5S6PUM-U"
  }
];

const CursoArbolVidaPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <p className={styles.kicker}>Curso online</p>
          <h1>Curso del Arbol de la Vida</h1>
          <p>
            Aqui vas a encontrar el contenido grabado del curso para avanzar a tu ritmo y repasar cada tema las
            veces que necesites.
          </p>
          <button type="button" className={styles.buyButton}>
            Comprar curso
          </button>
        </header>

        <div className={styles.videoGrid}>
          {videos.map((video) => (
            <article key={video.title} className={styles.videoCard}>
              <div className={styles.videoFrame}>
                <iframe
                  src={video.src}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h2>{video.title}</h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CursoArbolVidaPage;
