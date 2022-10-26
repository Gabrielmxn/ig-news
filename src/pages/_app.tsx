import type { AppProps } from 'next/app'
import { Header } from '../components/Header';
import { SessionProvider  as NextAuthProvider } from 'next-auth/react';
import '../styles/global.scss';
import Link from 'next/link'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import {  repositoryName } from '../services/prismic'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <PrismicProvider
    internalLinkComponent={({ href, children, ...props }) => (
      <Link href={href}>
        <a {...props}>
          {children}
        </a>
      </Link>
    )}
    >
      <NextAuthProvider session={pageProps.session}>
        <Header />
        <PrismicPreview repositoryName={repositoryName}>
        <Component {...pageProps} />
      </PrismicPreview>
      </NextAuthProvider>
    </PrismicProvider>
   
  )
}

export default MyApp
