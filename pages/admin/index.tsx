import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Layout,
  Space,
  Image,
  Breadcrumb,
  Row,
  Col,
  Table,
  Form,
  Input,
  Popconfirm,
  Button,
  InputNumber,
  Typography,
  Checkbox,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import Link from 'next/link';
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import FormatCurrency from '../../utils/FormatCurrency';
//style
import './styles.scss';
import { updateArrShoping } from 'slices/medicineSlice';
import FormLoginComponent from '@/components/Form/FormLoginComponent';
import PageAdminComponent from '@/components/Admin';
import { updateAccessToken, updateInforUser } from 'slices/userSlice';
import background from '../../src/assets/static/images/back-ground.png';
import clsx from 'clsx';
export interface HomePageProps {
  post: any;
}

const classContainer = {
  width: '100%',
  minWidth: '100vw',
  minHeight: '100vh',
  height: '100%',
  backgroundImage: `url("https://res.cloudinary.com/dmttpbcgv/image/upload/v1684547070/back-ground_lsanlq.png")`,
  backgroundSize: 'cover',
};
const customFormLogin: React.CSSProperties = {
  marginTop: '50px',
};

export default function HomePage({ post }: HomePageProps) {
  const dispatch = useDispatch();
  //store
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const inforUser: any = useSelector((state: RootState) => state.user.inforUser);
  //state

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) dispatch(updateAccessToken(accessToken));
    return () => {
      localStorage.setItem('accessToken', '');
      dispatch(updateAccessToken(null));
      dispatch(updateInforUser(null));
    };
  }, []);

  return (
    <div className={clsx('classContainer', accessToken == null && 'customFormLogin')}>
      {accessToken == null ? <FormLoginComponent /> : <PageAdminComponent />}
    </div>
  );
}

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
