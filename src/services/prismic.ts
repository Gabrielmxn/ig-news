import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'


export const endpoint = process.env.NEXT_PUBLIC_PRISMIC_APIENDPOINT_URL
export const repositoryName = prismic.getRepositoryName(endpoint)


// This factory function allows smooth preview setup
export function createClient(config = {} as any ) {
  const client = prismic.createClient(endpoint, {
    ...config,
  })

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}