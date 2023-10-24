import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng đến trang /home
    router.push('/home');
  }, []);

  return <div>Redirecting...</div>;
}
