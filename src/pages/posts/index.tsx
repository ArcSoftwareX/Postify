import { trpc } from "@/utils/trpc"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { appRouter } from "@/server/routers/root";
import { transformer } from "@/utils/transformer";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { Heading } from "@/components/ui/Heading";
import { AnimatePresence, motion } from "framer-motion";
import { Paragraph } from "@/components/ui/Paragraph";
import PostCard from "@/components/PostCard";
import { PostData } from "@/types";

const Posts = () => {
  const { data } = trpc.posts.posts.useQuery(0)

  return <div className="w-screen min-h-screen p-4 md:p-10 flex flex-col items-center justify-center">
    <AnimatePresence>
      <motion.div variants={{ visible: { opacity: 0.12 }, hidden: { opacity: 0 } }} transition={{ duration: 0.4 }} initial='hidden' animate='visible' exit='hidden' className="gradient-2"></motion.div>
    </AnimatePresence>
    <Head>
      <title>Postify - Posts</title>
    </Head>
    <div className="max-w-5xl w-full h-full mx-auto">
      <Heading size='xlg' className="mb-20 text-center">Posts</Heading>
      <Paragraph type='secondary' className="mb-6">Recent posts</Paragraph>
      { data && data.map(post => <PostCard key={post.post.id} post={post as PostData}/>) }
    </div>
  </div>
}

export default Posts

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { userId: null },
    transformer
  })

  await helpers.posts.posts.prefetch(0)

  return {
    props: {
      trpcState: helpers.dehydrate(),
    }
  }
}