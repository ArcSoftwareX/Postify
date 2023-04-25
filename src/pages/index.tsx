import { buttonVariants } from '@/components/ui/Button'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <motion.div variants={{ visible: { opacity: 0.12 }, hidden: { opacity: 0 } }} transition={{ duration: 0.4 }} initial='hidden' animate='visible' exit='hidden' className='gradient'></motion.div>
      <Head>
        <title>Postify - AI powered posts</title>
      </Head>
      <div className='h-screen w-screen flex flex-col items-center justify-center px-4'>
        <h1 className='font-bold text-5xl bg-gradient-to-r from-orange-300 to-rose-500 text-transparent bg-clip-text p-1 mb-6 text-center'>Explore a smart way to create posts</h1>
        <p className='font-semibold text-black/50 mb-20 text-center'>Postify lets you create and share posts with AI-powered tools</p>
        <div className='flex gap-4'>
          <SignedIn>
            <Link href='/posts' className={buttonVariants({ size: 'lg', type: 'accent' })}>
              View posts
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href='/auth/sign-in' className={buttonVariants({ size: 'lg', type: 'accent' })}>
              Get started
            </Link>
          </SignedOut>
          <Link href='/about' className={buttonVariants({ size: 'lg' })}>
            Learn more
          </Link>
        </div>
      </div>
    </>
  )
}
