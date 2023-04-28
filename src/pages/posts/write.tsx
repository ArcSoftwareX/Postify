import Editor from '@/components/Editor'
import Logo from '@/components/Logo'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Paragraph } from '@/components/ui/Paragraph'
import { trpc } from '@/utils/trpc'
import { useUser } from '@clerk/nextjs'
import { getAuth } from '@clerk/nextjs/server'
import { motion } from 'framer-motion'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const user = getAuth(req)

    if(!user.userId) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/sign-in'
            }
        }
    }
    
    return {
        props: {}
    }
}

const Write = ({}) => {
    const router = useRouter()
    const { mutate, isLoading } = trpc.posts.create.useMutation({
        onSuccess: () => {
            router.push('/posts')
        }
    })
    const title = useRef<HTMLInputElement | null>(null)
    const imageUrl = useRef<HTMLInputElement | null>(null)
    const { user } = useUser()
    const editorRef = useRef(null)

    const createPost = () => {
        if (!editorRef.current) return;
        const html = (editorRef.current as any).getEditor().getHTML()
        if(title.current && title.current.value.trim().length > 0 && imageUrl.current && imageUrl.current.value.trim().length > 0) {
            mutate({ title: title.current.value.trim(), content: html, imageUrl: imageUrl.current.value.trim() })
        }
    }

  return (
    <div className='p-10 pt-header flex flex-col min-h-screen max-w-5xl mx-auto w-full'>
        <header className='h-20 fixed top-0 inset-x-0 flex items-center justify-center px-4 backdrop-blur z-[1000]'>
            <div className='max-w-5xl w-full flex items-center'>
                <Logo noText />
                <Paragraph type='tertiary' className='ml-3 translate-y-[1px]'>Draft in <Link className='text-slate-500 hover:text-blue-500 transition-colors' href={`/@${user?.username}`}>@{ user?.username }</Link></Paragraph>
                <span className='flex-1'></span>
                <Button onClick={createPost} isLoading={isLoading} loadingTooltip='Creating your post...' size='sm' type='accent'>Publish</Button>
            </div>
        </header>
        <motion.div variants={{ visible: { opacity: 0.12 }, hidden: { opacity: 0 } }} transition={{ duration: 0.4 }} initial='hidden' animate='visible' exit='hidden' className='gradient-3'></motion.div>
        <Head>
            <title>Postify - Write</title>
        </Head>
        <Input ref={imageUrl} className='mb-2' placeholder='Image URL...' size='sm'/>
        <Input contentEditable={!isLoading} size='xxl' ref={title}  placeholder='Post title' className='mb-4' />
        <Editor ref={editorRef} active={!isLoading} />
    </div>
  )
}

export default Write