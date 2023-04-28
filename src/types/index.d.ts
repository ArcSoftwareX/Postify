import { type Post } from '@prisma/client'

export type ClickAction = "back" | "next" | "finish"

export type PostData = { post: Post; user: { username: string | null; id: string; firstName: string | null; lastName: string | null; avatar: string }; }
export type TabData = { title: string, desc: string, imageUrl: string, buttons: ({ text: string, icon?: string, clickAction: ClickAction } | { text?: string, icon: string, clickAction: ClickAction })[] }