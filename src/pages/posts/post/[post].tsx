import { PrismicRichText } from '@prismicio/react';
import { format, parseISO } from 'date-fns';
import ptBR  from 'date-fns/locale/pt-BR';
import styles from './styles.module.scss';

import Head from 'next/head';
import { createClient } from '../../../services/prismic';

export default function Post( {postFatory} ){
  console.log(postFatory)
  return(
    <>
      <Head>
        <title>{postFatory.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{postFatory.title}</h1>
          <time>{postFatory.createdAt}</time>
          <div className={styles.pastContent}>
            <PrismicRichText field={postFatory.content} />
          </div>
        </article>
      </main>
    </>
    
  )
}


export async function getServerSideProps({req, params, previewData}) {

  const client = createClient({ previewData, accessToken: process.env.PRISMIC_ACCESS_TOKEN })

  const onePost = await client.getByUID('publication', params.post)

  const postFatory = {
    uid: onePost.uid,
    publication_date:  format(parseISO(onePost.first_publication_date), "dd 'de' MMMM 'de' yyyy",  { locale: ptBR }),
    title: onePost.data.title,
    content: onePost.data.content, 
  }
  return {
    props: { 
      postFatory
    }
  }
}