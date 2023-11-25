'use client'
import { useState , useEffect } from "react";
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { signIn,  useSession  } from "next-auth/react";
const SignInForm = () => {
  const { toast } = useToast()
  const router = useRouter()
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
   const { status } = useSession()
   
 
   
    const handleSubmit = async (e)=> {
      e.preventDefault()
      
      try {
        setLoading(true)
         const res = await signIn("credentials" , {
           email,
           password,
           redirect:false
         })
         if(res.error) {
          toast({
            variant: "destructive",
            title: "invalid email or password.",
          })
          return;
         }
          setLoading(false)
          router.push('/')
      } catch (error) {
         console.log(error)
      }finally{
        setLoading(false)
      }
    }
  return (
    <section className='flex flex-1 justify-center items-center flex-col py-10'>
          <div className="flex-center  flex-col sm:w-[600px] mt-10 mb-10">
        <Image width={100} height={100} className="mt-3" src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-8">Log in to your account</h2>
        <Link href='/sign-up' className="text-light-3 small-medium sm:base-regular mt-2">Don't have an account , 
        <span className="underline">Sign up Now</span> </Link>
       
        
              
                
            
       
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full mt-5">
        
           
           <label htmlFor="email">Email Address</label>
           <input required value={email} onChange={(e)=> setEmail(e.target.value)} id="email" type="email" placeholder="enter your Email address"  className="border-none
            bg-dark-4 placeholder:text-gray-500 text-white outline-none py-2 px-4 rounded-lg"/>

         <label htmlFor="password">Password</label>
           <input required value={password} onChange={(e)=> setPassword(e.target.value)} id="password" type="password" placeholder="enter your password"  className="border-none
            bg-dark-4 placeholder:text-gray-500 text-white outline-none py-2 px-4 rounded-lg"/>

            <button disabled={loading}   className="border-none outline-none py-2 px-4 capitalize bg-primary-orange text-white font-semibold
               font-inter text-base rounded-md w-fit hover:bg-primary-orange/90
            " type="submit">
                {loading ? <Image className="invert" src='/assets/icons/loader.svg' width={20} height={20} alt='loading...' /> : 'Login'}
            </button>
      </form>
      </div>
    </section>
  )
}

export default SignInForm