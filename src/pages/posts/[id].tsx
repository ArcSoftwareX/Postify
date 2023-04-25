import { Heading } from '@/components/ui/Heading'
import { Paragraph } from '@/components/ui/Paragraph'
import { appRouter } from '@/server/routers/root'
import { PostData } from '@/types'
import { transformer } from '@/utils/transformer'
import { trpc } from '@/utils/trpc'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: 'blocking' }
}
  
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params?.id;

    if(typeof id !== 'string') throw new Error('No id')

    const ssr = createServerSideHelpers({
        ctx: { userId: null },
        router: appRouter,
        transformer
    })

    await ssr.posts.getById.prefetch(id)

    return {
        props: {
            trpcState: ssr.dehydrate()
        }
    }
}

const Post = () => {
    const { id } = useRouter().query
    const { data, error } = trpc.posts.getById.useQuery(typeof id === 'string' ? id : '')

    if(!data) return <div className='h-screen w-screen flex items-center justify-center'>
        not found
    </div>
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
        <Head>
            <title>Postify - { data.post.title }</title>
        </Head>
        <div className='max-w-5xl w-full mx-auto'>
            <Heading size='xlg' className='mb-6'>{ data.post.title }</Heading>
            <Paragraph type='secondary' className='mb-10'>{ data.post.summary }</Paragraph>
            <Paragraph>{ data.post.content }</Paragraph>
        </div>
    </div>
  )
}

export default Post