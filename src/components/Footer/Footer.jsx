import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div>
          <h3>Contacto</h3>
          <p>kabalahoaecho@gmail.com</p>
        </div>
        <div>
          <h3>Suscribete</h3>
          <p>Recibe novedades y recursos para tu proceso interior.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
