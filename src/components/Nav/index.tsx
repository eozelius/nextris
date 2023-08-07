import Link from 'next/link';
import styles from './nav.module.css';

export default function Nav () {
  return (
    <nav className={styles['nav-container']}>
      <ol>
        <li>
          <Link href="/">
            Next(.js)ris
          </Link>
        </li>
        
        <li>
          <a href="https://ethanoz.com">
            ethanoz.com
          </a>
        </li>
        <li>
          <Link href="/about">
            About
          </Link>
        </li>
      </ol>
    </nav>
  )
};
