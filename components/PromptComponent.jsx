'use client'
import Form from '@/components/Form'
import React, {useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
const PromptComponent = () => {
  const { data:session , status } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const [posts,setPosts] = useState({
    tag: '',
    prompt: ''
  })
  const [submitting,setIsSubmitting] = useState(false)
    
  const createPrompt = async(e)=>{
     e.preventDefault()
    setIsSubmitting(true)
    if(!posts.tag || !posts.prompt) {
      toast({
        variant: "destructive",
        title: "All fiels are required.",
       
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      setIsSubmitting(false)
      return;
    }
    try {
       const response = await fetch('/api/prompt/new', { cache:'no-store'}, {
          method: 'POST',
          body: JSON.stringify({
             userId: session?.user.id,
             tag: posts.tag,
             prompt: posts.prompt
          })
       })
       if(response.ok) {
        setIsSubmitting(false)
          router.push('/')
          router.refresh()
       }
    } catch (error) {
        console.log(error)
         toast({
          title: 'failed to create prompt'
         })
    }finally{
      setIsSubmitting(false)
    }
  }
  return (
    <Form  type='Create' 
       posts={posts}
       setPosts={setPosts}
       handleSubmit={createPrompt}
       submitting={submitting}
    />
  )
}

export default PromptComponent