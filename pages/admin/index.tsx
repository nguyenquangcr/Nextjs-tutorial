import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { notFound } from 'next/navigation';
import { useRouter, } from 'next/router';
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
import HeaderComponent from '@/components/common/Header/header';
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
export interface HomePageProps {
  post: any;
}

const classContainer: React.CSSProperties = {
  width: '100%',
  minWidth: '100vw',
  minHeight: '100vh',
  height: '100%',
  background: 'rgb(248, 249, 250)'
};

export default function HomePage({ post }: HomePageProps) {
  //store
  const user = useSelector((state: RootState) => state.medicine.user);
  //state
  const [checkLogin, setcheckLogin] = useState(false)

  useEffect(() => {
    if (user?.username == 'admin' && user?.password == 'admin') setcheckLogin(true)
  }, [user])

  return (<div style={classContainer}>{checkLogin == false ? <FormLoginComponent /> : <PageAdminComponent />}</div>);
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
