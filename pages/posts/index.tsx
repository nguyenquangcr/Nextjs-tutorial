import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export interface PostsProps {}

export default function PostsPage(props: PostsProps) {
  const router = useRouter();

  function goToDetailPage() {
    router.push({
      pathname: '/posts/[postId]',
      query: {
        postId: 123,
        ref: 'social',
      },
    });
  }

  return (
    <>
      <div>Posts Page</div>
      <button
        onClick={() => {
          goToDetailPage();
        }}
      >
        Go to detail page
      </button>
    </>
  );
}
