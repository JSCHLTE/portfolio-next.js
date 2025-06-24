"use client";

import { usePathname } from 'next/navigation';
import './overlay.css'
import { useUI } from '@/app/providers/UIProvider';

const Overlay = () => {
  
    const { navMenu, setNavMenu, overlay, setOverlay, deleteWarn, setDeleteWarn } = useUI();

    const handleClick = () => {
      if(navMenu) setNavMenu(false)
      if(deleteWarn) setDeleteWarn(false)
      setOverlay(false)
    }

  return (
    <div className={`overlay ${overlay ? 'active' : ''}`} onClick={handleClick}></div>
  )
}

export default Overlay