'use client'

import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { ToastAction } from "./ui/toast"
import { useRouter } from 'next/navigation'

const SignupForm = () => {
  const router = useRouter()
 
  const { toast } = useToast()
  const [name,setName] = useState('')
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const [loading,setLoading] = useState(false)
 
 
   

    
   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
       
      try {
        const userExists = await fetch('/api/userExists', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
           body: JSON.stringify({
              email
           })
        });
        const {user} = await userExists.json()
        if(user) {
         return toast({
            variant: "destructive",
            title: "Uh oh! user already exists.",
           
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
         
        }
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name, email, password
          })
       })
  
       if(res.ok) {
        setName('');
        setEmail('');
        setPassword('');
        setLoading(false)
        router.push('/sign-in')
       }else {
        return  toast({
          variant: "destructive",
          title: "Uh oh! Registration failed.",
         
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
       
       }
      } catch (error) {
         console.log(error)
      }finally {
        setLoading(false)
      }  
  } 

  return (
    <section className='flex flex-1 justify-center items-center flex-col py-10'>
          <div className="flex-center  flex-col sm:w-[600px] mt-10 mb-10">
          <Link href='/'><Image width={100} height={100} className="mt-3" src="/assets/images/logo.svg" alt="logo" /></Link> 
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-8">create a new account</h2>
        <Link href='/sign-in' className="text-light-3 small-medium sm:base-regular mt-2">Have an account , 
        <span className="underline">Log in Now</span> </Link>
      
       
      <form  onSubmit={handleSubmit} className="flex flex-col gap-5 w-full mt-5">
        
           
           <label htmlFor="username">Username</label>
           <input required id="username" value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="user name"  className="border-none
            bg-dark-4 placeholder:text-gray-500 text-white outline-none py-2 px-4 rounded-lg"/>
           
           <label htmlFor="email">Email Address</label>
           <input required id="email" value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="enter your Email address"  className="border-none
            bg-dark-4 placeholder:text-gray-500 text-white outline-none py-2 px-4 rounded-lg"/>

         <label htmlFor="password">Password</label>
           <input required id="password" value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="enter your password"  className="border-none
            bg-dark-4 placeholder:text-gray-500 text-white outline-none py-2 px-4 rounded-lg"/>
            <button disabled={loading} className="border-none outline-none py-2 px-4 capitalize bg-primary-orange text-white font-semibold
               font-inter text-base rounded-md w-fit hover:bg-primary-orange/90
            "  >
                 {loading ? <Image src='/assets/icons/loader.svg' width={30} height={30} alt='loading...' className="invert"/> : 'Sign up'}
            </button>
      </form>
      </div>
    </section>
  )
}

export default SignupForm