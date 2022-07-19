import { PrismicRichText } from '@prismicio/react';
import { format, parseISO } from 'date-fns';
import ptBR  from 'date-fns/locale/pt-BR';

import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router'
import { createClient } from '../../../services/prismic';

export default function Post( {postFatory} ){
  console.log(postFatory)
  return(
    <>
      <h2>{postFatory.title}</h2>
      <PrismicRichText field={postFatory.content} />
    </>
    
  )
}


export async function getServerSideProps({params, previewData}) {

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