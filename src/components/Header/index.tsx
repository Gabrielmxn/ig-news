import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

interface TypePageSelect{
  home: boolean;
  post: boolean;
}
export function Header(){
  const router = useRouter()
  
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="Logo" />
        <nav>
          <Link href="/">
            <a className={router.asPath === '/' ? styles.active : ''}>Home</a>
          </Link>
          <Link href="/posts">
            <a className={router.asPath === '/posts' ? styles.active : ''}>Post</a>
          </Link>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}