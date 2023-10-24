// import HeaderComponent from '@/components/common/header';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

//if you don't want component render server side -> use dynamic and {ssr: false}
const Header = dynamic(() => import('@/components/common/Header/index'), { ssr: false });

export interface AboutProps {}

export default function AboutPage(props: AboutProps) {
  const router = useRouter();
  //state
  const [postList, setPostList] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const res = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
      const data = await res.json();
      setPostList(data.data);
    })();
  }, []);

  const hanleNextClick = () => {
    router.push(
      {
        pathname: '/about',
        query: {
          page: (Number(router.query?.page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div>
      About Page
      <Header />
      <ul className="post-list">
        {postList?.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={hanleNextClick}>Next page</button>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

// export async function getServerSideProps() {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
