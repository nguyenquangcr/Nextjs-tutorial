import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';
import 'antd/dist/reset.css';
import { Layout, Space, Image } from 'antd';
import notification from './notification-bar.png'
import HeaderComponent from '@/components/common/Header/header';
import BootstrapCarousel from '@/components/common/Carousel';

const { Header, Footer, Sider, Content } = Layout;
export interface HomePageProps {
  post: any;
}



const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

export default function HomePage({ post }: HomePageProps) {

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <HeaderComponent />
        <BootstrapCarousel />
        <Content style={contentStyle}>Content</Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Space>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   console.log('get static path');

//   return {
//     paths: [],
//     fallback: false,
//   };
// };


export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context: GetStaticPropsContext
) => {
  // console.log('get static props', context.params?.postId);
  // const postId = context.params?.postId;
  // console.log('postId:', postId);
  // if (!postId)
  //   return {
  //     notFound: true,
  //   };

  //server-side
  //run when build time
  // const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
  // const data = await response.json();

  return {
    props: {
      post: [],
    },

  };
};

// export async function getServerSideProps(context: any) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
