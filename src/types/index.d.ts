import { type Post } from '@prisma/client'

export type PostData = { post: Post; user: { username: string | null; id: string; firstName: string | null; lastName: string | null; avatar: string }; }