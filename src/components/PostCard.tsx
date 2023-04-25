import Card from "@/ui/Card"
import Link from "next/link"
import { PostData } from "@/types"
import Image from "next/image"
import { Paragraph } from "./ui/Paragraph"

const PostCard = ({ post }: { post: PostData }) => {
  return (
    <Link href={`/posts/${post.post.id}`}>
        <Card className="flex">
            <div className="h-32 w-32 min-w-[128px] overflow-hidden">
                <Image src={`https://res.cloudinary.com/demo/image/fetch/${post.post.image_url}`} alt="Post image" height={300} width={300} className="object-cover h-full rounded-l-lg"/>
            </div>
            <div className="h-full w-full p-6">
                <h2 className="font-semibold text-xl mb-3 line-clamp-1">
                    { post.post.title }
                </h2>
                <Paragraph className="text-sm line-clamp-2">{ post.post.summary }</Paragraph>
            </div>
        </Card>
    </Link>
  )
}

export default PostCard