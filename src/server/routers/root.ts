import { postsRouter } from './posts';
import { router } from '../trpc'

export const appRouter = router({
    posts: postsRouter
})
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;