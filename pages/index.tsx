import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

export default function IndexPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.push('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loading-container">
      <ClipLoader loading={loading} size={35} color={'#ffffff'} />
    </div>
  );
}
