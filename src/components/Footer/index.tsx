import styles from './Footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <p className="copyright">images and content copyright Ethan Ozelius {new Date().getFullYear()} <a href="https://ethanoz.com">ethanoz.com</a></p>
    </footer>
  )
}