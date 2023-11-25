'use client'
import Loader from "@/components/Loader"
import Profile from "@/components/Profile"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
const page = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [myPosts,setMyPosts] = useState([])
  const [loading,setLoding] = useState(false)
  const { data: session} = useSession()
 
  const handleDelete = async (post) => {
    // Show confirmation toast
    toast({
      variant: "destructive",
      title: "Are you sure you want to delete this prompt?",
      action: (
        <ToastAction
          altText="Confirm"
          onClick={() => {
            // Handle confirmation action here
            deletePrompt(post);
          }}
        >
          Confirm
        </ToastAction>
      ),
    });
  };

  const deletePrompt = async (post) => {
    try {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });
      const filterPrompts = myPosts.filter((item) => item._id !== post._id);
      setMyPosts(filterPrompts);
    } catch (error) {
      console.log("Something went wrong while trying to delete prompt", error);
    }
  };
  const handleEdit = async (post)=> {
      router.push(`/update-prompt?id=${post._id}`)
  }
    useEffect(() => {
      try {
         setLoding(true)
         const fetchPrompts = async()=> {
          const response = await fetch(`/api/user/${session?.user.id}/posts`)
          if(response.ok) {
             const data = await response.json()
             setMyPosts(data)
           
          }
        }
        if(session?.user.id) {
         fetchPrompts()
        }
        setLoding(false)
      } catch (error) {
         console.log(error)
      }finally{
        setLoding(false)
      }
      
      
    }, [session?.user.id])
     
     if(loading) {
        return (
          <Loader />
        )
     }
    return (
       <Profile data={myPosts}
        handleEdit={handleEdit}
         name='My'
         desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
         handleDelete={handleDelete} />
  )
}

export default page