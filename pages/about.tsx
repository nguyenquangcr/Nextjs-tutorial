import { useRouter } from 'next/router';
import React from 'react';

export interface AboutProps {}

export default function AboutPage(props: AboutProps) {
  const router = useRouter();

  //   useEffect(() => {
  //     //check query available
  //   }, [])

  console.log('About query:', router.query);

  return <div>About Page</div>;
}

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
