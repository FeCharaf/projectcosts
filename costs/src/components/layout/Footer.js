import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <a href="https://github.com/FeCharaf" target="_blank">
            <FaGithub />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/fecharaf/" target="_blank">
            <FaInstagram />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/felipecharaf" target="_blank">
            <FaLinkedin />
          </a>
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>Costs</span> &copy; 2024
      </p>
    </footer>
  );
}

export default Footer;
