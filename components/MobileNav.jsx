'use client'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
 
  MenubarTrigger,
} from "@/components/ui/menubar";
import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

const MobileNav = () => {
const { data: session}  = useSession()

  return (
    <div className="z-999">
      {session?.user ? (
        <Menubar className="relative bg-transparent border-none shadow-none">
          <MenubarMenu>
            <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900">
                <Image alt='user profile' width={30} height={30} className="rounded-full object-contain" src={ '/assets/icons/user.webp'} />
            </MenubarTrigger>
            <MenubarContent className="absolute right-[-3rem] mt-3 
                   min-w-[200px] rounded-md border py-2  bg-off-white
           
      ">
              <MenubarItem>
              <Link
                href='/profile'
                className='dropdown_link'
                
              >
                My Profile
              </Link>
              </MenubarItem>
              <MenubarItem>
              <Link
                href='/create-prompt'
                className='dropdown_link'
                
              >
                Create Prompt
              </Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
              <button
                type='button'
                className='mt-5 w-full black_btn'
                onClick={signOut}
              >
                Sign Out
              </button>
              </MenubarItem>
              
              
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ) : (
          <Link href='/sign-up'>
              <button className='mt-5 w-full black_btn'>
                 Sign in
              </button>
           </Link>
      )}
    </div>
  );
};

export default MobileNav;