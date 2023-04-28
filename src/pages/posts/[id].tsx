import { Heading } from '@/components/ui/Heading'
import Icon from '@/components/ui/Icon'
import { Paragraph } from '@/components/ui/Paragraph'
import { appRouter } from '@/server/routers/root'
import { PostData } from '@/types'
import { transformer } from '@/utils/transformer'
import { trpc } from '@/utils/trpc'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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
        <Head>
            <title>Postify - Post not found</title>
        </Head>
        <Icon className='scale-[2.5] mr-8 text-red-500'>error</Icon>
        <div>
            <Heading size='lg' className='block'>Post not found</Heading>
            <Paragraph type='secondary'>Failed to find post</Paragraph>
        </div>
    </div>
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
        <Head>
            <title>Postify - { data.post.title }</title>
        </Head>
        <div className='max-w-5xl w-full mx-auto'>
            <Image src={`https://res.cloudinary.com/demo/image/fetch/${data.post.image_url}`} alt='Post Image' height={150} width={150} className='rounded-lg object-cover aspect-square mb-6' />
            <Heading size='xlg' className='mb-6'>{ data.post.title }</Heading>
            <Paragraph type='secondary' className='mb-10'>{ data.post.summary }</Paragraph>
            <div className='prose w-full max-w-5xl' dangerouslySetInnerHTML={{ __html: data.post.content }}></div>
        </div>
    </div>
  )
}

export default Post