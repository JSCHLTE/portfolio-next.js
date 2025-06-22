"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useUI } from '../../providers/UIProvider';

const ScrollToTop = () => {
  const pathname = usePathname();
  const { setNavMenu } = useUI();

  useEffect(() => {
    window.scrollTo(0, 0);
    setNavMenu(false)
  }, [pathname]);

  return null;
};

export default ScrollToTop;
