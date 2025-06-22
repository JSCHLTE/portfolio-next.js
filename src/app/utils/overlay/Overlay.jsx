"use client";

import './overlay.css'
import { useUI } from '@/app/providers/UIProvider';

const Overlay = () => {

    const { setNavMenu, overlay, setOverlay } = useUI();

    const handleClick = () => {
        setNavMenu(false)
        setOverlay(false)
    }

  return (
    <div className={`overlay ${overlay ? 'active' : ''}`} onClick={handleClick}></div>
  )
}

export default Overlay