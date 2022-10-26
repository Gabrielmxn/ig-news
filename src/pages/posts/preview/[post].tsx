import { PrismicRichText } from '@prismicio/react';
import { format, parseISO } from 'date-fns';
import ptBR  from 'date-fns/locale/pt-BR';
import styles from '../post/styles.module.scss';

import Head from 'next/head';
import { createClient } from '../../../services/prismic';
import { getSession, useSession } from 'next-auth/react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PostPreview( {postFatory} ){
 const {data: session } = useSession();
  const router = useRouter();
 useEffect(() => {
  if(session?.activeSubscription){
    router.push(`/posts/post/${postFatory.uid}`)
  }
 }, [session])
  return(
    <>
      <Head>
        <title>{postFatory.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{postFatory.title}</h1>
          <time>{postFatory.createdAt}</time>
          <div className={`${styles.pastContent} ${styles.previewContent}`}>
            <PrismicRichText field={postFatory.content} />
          </div>
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
    
  )
}


export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}


export const getStaticProps: GetStaticProps = async ({params, previewData}) => {
 const { post } = params;

  const client = createClient({ previewData, accessToken: process.env.PRISMIC_ACCESS_TOKEN })

  const onePost = await client.getByUID('publication', post as string)

  const postFatory = {
    uid: onePost.uid,
    publication_date:  format(parseISO(onePost.first_publication_date), "dd 'de' MMMM 'de' yyyy",  { locale: ptBR }),
    title: onePost.data.title,
    content: onePost.data.content.splice(0,2), 
  }
  return {
    props: { 
      postFatory
    },
    redirect: 60 * 30
  }
}

