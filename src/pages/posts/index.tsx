import Head from 'next/head';
import ptBR  from 'date-fns/locale/pt-BR';
import styles from './styles.module.scss';
import { createClient } from '../../services/prismic'
import { format, compareAsc, parseISO } from 'date-fns';
import {  signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

interface TypePost{
  data: { 
    id: string;
    title: string;
    content: [];
  }
}

export default function Posts({newPostsItem}) {
  const {data: session} = useSession();

  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {newPostsItem.map(post => {
             return(
              <Link href={`/posts/post/${post.uid}`} key={post.id}>
                <a>
              <time>{post.publication_date}</time>
              <strong>{post.title}</strong>
              <p>{post.content}</p>
            </a>
            </Link>
             )
          })}
         
          
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({params,  previewData }) {
  const client = createClient({ previewData, accessToken: process.env.PRISMIC_ACCESS_TOKEN })

  const documents = await client.getAllByType('publication', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
  })

  const newPostsItem = documents.map(postItem => {
    console.log(postItem)
    return(
      {
        uid: postItem.uid,
        title: postItem.data.title,
        publication_date: format(parseISO(postItem.first_publication_date), "dd 'de' MMMM 'de' yyyy",  { locale: ptBR }),
        content: postItem.data.content.find(contents => contents.type === 'paragraph')?.text ?? '', 
      }
    )
  })
  

  console.log('TEST');
  console.log(newPostsItem);
  return {
    props: { 
      newPostsItem 
    },
    revalidate: 60 * 60 * 24,
  }
}