import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Custom404: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return null;
};

export default Custom404;
