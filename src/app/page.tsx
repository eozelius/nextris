import Image from 'next/image'

import styles from './page.module.css'
import logo from '@/images/logo.png'
import Score from '@/components/Score'
import Grid from '@/components/Grid'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles['logo-container']}>
        <code>Next(.js)ris</code>
        <Image
          src={logo}
          alt='tetris logo'
          width={125}
          height={80}
        />
      </div>

      <Score />

      <Grid />

      <Footer />
    </main>
  )
}
