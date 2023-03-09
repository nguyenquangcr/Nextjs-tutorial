import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export interface PostsProps {
  posts: any[];
}

export default function PostsPage({ posts }: PostsProps) {
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
      <div>Posts List Page</div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
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

export const getStaticProps: GetStaticProps<PostsProps> = async (
  context: GetStaticPropsContext
) => {
  //server-side
  //run when build time
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await response.json();

  return {
    props: {
      posts: data?.data.map((x: any) => ({
        id: x.id,
        title: x.title,
      })),
    },
  };
};
