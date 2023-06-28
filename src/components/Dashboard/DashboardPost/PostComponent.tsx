import React, { FC } from 'react'
import Link from 'next/link'
import { Post } from '@prisma/client'
import Image from 'next/image'
type postProps = {
    post: Post
}
const PostComponent: FC<postProps> = ({ post }) => {
    return (
        <article key={post.id} className="flex flex-col gap-4">
            <Image
                width={1000}
                height={500}
                className="rounded-md max-h-96"
                src={post.imageUrl?.toString()}
                alt="post image"
            />
            <div className="rounded-lg">
                <h3 className="heading_tertiary capitalize">{post.title}</h3>
                <p>{post.slug}</p>
            </div>
            <div className="flex">
                <Link className="btn_primary" href={`/blog/${post.id}`} legacyBehavior>
                    <a className="btn_primary font-bold">Read more</a>
                </Link>
            </div>
        </article>
    )
}

export default PostComponent