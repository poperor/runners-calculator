import Link from "next/link";
import styles from "./header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">Runner&apos;s caclulator</Link>
        </div>
        <nav className={styles.nav}>
          <Link className={styles.homeLink} href="/">home</Link>
          <Link className={styles.aboutLink} href="/">about</Link>
        </nav>
    </header>
  );
};
