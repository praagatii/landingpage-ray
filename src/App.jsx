import { useEffect, useState } from 'react';
import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return isMobile ? <MobileApp /> : <DesktopApp />;
}
