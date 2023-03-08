import { useRouter } from 'next/router'
import React from 'react'

export interface PostDetailProps { }

export default function PostDetailPage(props: PostDetailProps) {
    const router = useRouter()

    return (
        <div>
            <h1>PostDetail Page</h1>
            <p>Query: {JSON.stringify(router.query)}</p>
        </div>
    )
}