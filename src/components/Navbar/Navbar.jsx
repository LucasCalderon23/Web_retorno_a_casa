import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const links = [
    { label: "Inicio", to: "/" },
    { label: "Estudios", to: "/estudios" },
    { label: "Entrenamiento", to: "/entrenamiento" },
    { label: "Introspeccion", to: "/introspeccion" }
  ];

  if (user?.role === "Admin") {
    links.push({ label: "Admin", to: "/admin" });
  }

  if (!isAuthenticated) {
    links.push({ label: "Login", to: "/auth" });
  }

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav} aria-label="Navegacion principal">
        <Link className={styles.brand} to="/" onClick={handleLinkClick}>
          <img src="/retorno-icon.svg" alt="" aria-hidden="true" className={styles.brandIcon} />
          Retorno a Casa
        </Link>

        <button
          type="button"
          className={styles.hamburger}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
          onClick={handleMenuToggle}
        >
          <span />
          <span />
          <span />
        </button>

        <ul id="main-menu" className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}>
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                onClick={handleLinkClick}
                className={({ isActive }) => (isActive ? styles.active : undefined)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          {isAuthenticated ? (
            <li>
              <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                Salir
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
