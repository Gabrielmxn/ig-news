import Link from 'next/link';
import { useRouter } from 'next/router';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

interface TypePageSelect{
  home: boolean;
  post: boolean;
}
export function Header(){
  const { asPath } = useRouter()
  
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="Logo" />
        <nav>
          <Link href="/">
            <a className={asPath === '/' ? styles.active : ''}>Home</a>
          </Link>
          <Link href="/posts">
            <a className={asPath === '/posts' ? styles.active : ''}>Post</a>
          </Link>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}