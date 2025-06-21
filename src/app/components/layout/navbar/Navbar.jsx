"use client";

import { useState, useEffect } from 'react';
import './navbar.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Theme from './Theme'

//{ handleTheme, mode, handleBurger, navMenu, navLogin, resetUser }

const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [navMenu, setNavMenu] = useState(false);
    
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 25);
      }
  
      window.addEventListener('scroll', handleScroll)
  
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

     const router = useRouter();
    
    const handleLogout = async () => {
      try {
        await signOut(auth);
        router.push('/login');
        resetUser();
      } catch (error) {
        console.error("Logout error:", error.message);
      }
    };
  
    return (
      <nav>
        <div className={`nav-inner ${isScrolled ? `active` : ``}`}>
          <div className="nav-logo-wrapper flex-center">
            <Link href="/" className='nav-logo'><span>Jordan</span></Link>
          </div>
          
          <div className='nav-right'>
            <ul className={`nav-links ${navMenu ? `active` : ``}`}>
              <li className='nav-link'><Link href="/">Home</Link></li>
              <li className='nav-link'><Link href="/about">About</Link></li>
              <li className='nav-link'><Link href="/blog">Blog</Link></li>
              <li className='nav-link'><Link href="/contact">Contact</Link></li>
              {/* {navLogin ? <li className='nav-link'><Link href="/admin">Dashboard</Link></li> : ''}
              {navLogin ? <li className='nav-link' onClick={handleLogout}><Link href="#">Logout</Link></li> : ''} */}
            </ul>
            
            <Theme />
          
            <div className='nav-burger' onClick={() => setNavMenu(prev => !prev)}>
              <div className={`line line1 ${navMenu ? 'active' : ''}`}></div>
              <div className={`line line2 ${navMenu ? 'active' : ''}`}></div>
              <div className={`line line3 ${navMenu ? 'hide' : ''}`}></div>
            </div>
  
          </div>
        </div>
      </nav>
    )
  }
  
  export default Navbar