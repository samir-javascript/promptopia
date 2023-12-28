'use client'

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Profile from "@/components/Profile"

const MyProfilePage = ({params}) => {
  
  
  const [posts,setPosts] = useState([])
 
  const searchParams = useSearchParams()
  const username = searchParams.get('name')
  useEffect(() => {
    
        
        const fetchPosts = async()=> {
           const response = await fetch(`/api/user/${params.id}/posts` , { next: { revalidate: 3600 } })
           if(response.ok) {
              const data = await response.json()
              setPosts(data)
           }
        }
      if(params.id) {
        fetchPosts()
      }
      
  }, [params.id])
  
  return (
    <Profile data={posts} name={username} 
     desc= {` Welcome ${username}  to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination`} />
  )
}

export default MyProfilePage