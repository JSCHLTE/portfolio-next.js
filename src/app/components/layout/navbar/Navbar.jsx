"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/providers/AuthProvider';
import { useUI } from '@/app/providers/UIProvider'
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import Theme from './Theme'
import './navbar.css'

const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [dropdown, setDropDown] = useState(false)
    const router = useRouter();
    const pathname = usePathname();

    const { user, admin, setAdmin, loading } = useAuth();
    const { navMenu, setNavMenu } = useUI();

    const ProtectedRoute = ({ children, admin }) => {
      if (admin === undefined) return <p>Loading...</p>;
      if (!admin) return router.push('/login');
      return children;
    };
    
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 25);
      }
  
      window.addEventListener('scroll', handleScroll)
  
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    const handleLogout = async () => {
      try {
        await signOut(user.auth);
        router.push('/login');
        setAdmin(undefined)
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
              <li className={`nav-link ${pathname === '/' ? 'active' : ''}`}><Link href="/">Home</Link></li>
              <li className={`nav-link ${pathname === '/about' ? 'active' : ''}`}><Link href="/about">About</Link></li>
              <li className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}><Link href="/blog">Blog</Link></li>
              <li className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}><Link href="/contact">Contact</Link></li>
              { admin ?
              <div className='admin-menu-wrapper' onMouseOver={() => setDropDown(true)} onMouseOut={() => setDropDown(false)}>
                <li className='nav-link dropdown'>Admin</li>
                <div className={`admin-menu-dropdown ${dropdown ? 'active' : ''}`}>
                  <div className='admin-menu-dropdown-inner'>
                    <li className={`nav-link ${pathname === '/admin' ? 'active' : ''}`}><Link href="/admin">Dashboard</Link></li>
                    <li className='nav-link' onClick={handleLogout}><Link href="#">Logout</Link></li>
                  </div>
                </div>
              </div>
              : ''}
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