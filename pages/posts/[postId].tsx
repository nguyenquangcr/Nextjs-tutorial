import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

export interface PostDetailProps {
  post: any;
}

export default function PostDetailPage({ post }: PostDetailProps) {
  const router = useRouter();

  if (!post) return null;

  return (
    <div>
      <h1>PostDetail Page</h1>
      <p>Query: {JSON.stringify(router.query)}</p>

      <p>{post.title}</p>
      <p>{post.author}</p>
      <p>{post.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await response.json();

  return {
    paths: data.data.map((post: any) => ({ params: { postId: post?.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostDetailProps> = async (
  context: GetStaticPropsContext
) => {
  const postId = context.params?.postId;
  if (!postId)
    return {
      notFound: true,
    };

  //server-side
  //run when build time
  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
};
