import Link from "next/link";
import styles from "./header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
        <div className={styles.homeLink}>
          <Link href="/">Runner&apos;s caclulator</Link>
        </div>
    </header>
  );
};
