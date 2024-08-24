import Image from 'next/image';
import { Button } from '@repo/ui/button';
import styles from './page.module.css';
import { add } from '@andi-ui/number-input/add';
import { subtract } from '@andi-ui/number-input/subtract';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>add(1, 57): {add(1, 57)}</div>
        <div>subtract(1, 57): {subtract(1, 57)}</div>
      </main>
      <footer className={styles.footer}>
        <a
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/file-text.svg'
            alt='File icon'
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/window.svg'
            alt='Window icon'
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
