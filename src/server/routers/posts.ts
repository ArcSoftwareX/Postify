import { router, publicProcedure, privateProcedure } from '../trpc';
import { z } from 'zod'
import { prisma } from '../prisma';
import { hf } from '@/utils/huggingface';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { TRPCError } from '@trpc/server';

export const postsRouter = router({
    posts: publicProcedure.input(z.number().min(0).int('Page should be an integer')).query(async ({ input }) => {
        const posts = await prisma.post.findMany({
            orderBy: {
                created_at: 'desc'
            },
            take: 20,
            skip: 20 * (input - 1 < 0 ? 0 : input - 1)
        })

        const users = (await clerkClient.users.getUserList({
            userId: posts.map(p => p.user_id)
        })).map(user => ({ username: user.username, firstName: user.firstName, lastName: user.lastName, id: user.id }))

        return posts.map(p => ({ post: { ...p, summary: p.summary.replaceAll('<n>', '\n').replaceAll(' .', '.') }, user: users.find(user => user.id === p.user_id) }))
    }),
    create: privateProcedure.input(z.object({ title: z.string().min(10).max(400), content: z.string().min(10).max(10000), imageUrl: z.string().url('Image URL should be a valid URL').min(10) })).mutation(async ({ ctx, input }) => {
        const summary = (await hf.summarization({ model: 'google/pegasus-cnn_dailymail', inputs: input.content })).summary_text
        const classification = (await hf.textClassification({ model: 'distilbert-base-uncased-finetuned-sst-2-english', inputs: input.content }))[0].label

        return await prisma.post.create({
            data: {
                content: input.content,
                summary,
                title: input.title,
                user_id: ctx.userId!,
                classification,
                image_url: input.imageUrl
            }
        })
    }),
    getById: publicProcedure.input(z.string().min(0).max(100)).query(async ({ input }) => {
        const post = await prisma.post.findUnique({ where: { id: input } })

        if(!post) throw new TRPCError({ code: 'NOT_FOUND' })

        const user = await clerkClient.users.getUser(post.user_id)

        if(!user) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })

        return { post: { ...post, summary: post.summary.replaceAll('<n>', '\n').replaceAll(' .', '.') }, user: { username: user.username, firstName: user.firstName, lastName: user.lastName, avatar: user.profileImageUrl } }
    })
})