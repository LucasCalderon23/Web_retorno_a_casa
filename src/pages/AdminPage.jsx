import { useAuth } from "../context/AuthContext";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  const { user } = useAuth();

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h1>Panel Admin</h1>
        <p>Bienvenido, {user?.email}. Este espacio es solo para administradores.</p>
      </div>
    </section>
  );
};

export default AdminPage;
