import { useState, useEffect } from 'react';

const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);

  // avoid hydration issues - run on client
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};

export default useIsMounted;