'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav';
import { useSession , signOut } from 'next-auth/react';
const Navbar = () => {
     const {data:session, status} = useSession()
     console.log(session)
      const pathName = usePathname()
  return (
    <nav className='flex items-center justify-between w-full mb-16 pt-3'>
         <Link href='/' className=' flex flex-center gap-2'>
             <Image  src='/assets/images/logo.svg' width={30} height={30} alt='Promptopia' className='object-contain' />
              <p className='logo_text'>Promptopia</p>
         </Link>

         <div className='sm:flex hidden'>
             {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    {pathName === '/' && (
                         <>
                        <Link href='/create-prompt' className='black_btn'>
                            Create Post
                         </Link>
                         <button onClick={signOut} className='outline_btn' type='button'>
                         Sign Out
                      </button>
                      </>
                    )}
                    
                    
                       <Link href='/profile'>
                            <Image alt='profile' src='/assets/icons/user.webp' width={30} height={30} className='rounded-full object-contain' />
                        </Link>
                   
                </div>
             ) : (
              <>
         
            
              <Link href='/sign-up'>
              <button className='mt-5 w-full black_btn'>
                Sign in
              </button>
               </Link>
            
        </>
             )}
         </div>

         <div className='sm:hidden flex'>
             <MobileNav />
         </div>
    </nav>
  )
}

export default Navbar