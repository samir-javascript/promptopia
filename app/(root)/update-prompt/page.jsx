'use client'
import Form from '@/components/Form'
import { useState, useEffect } from 'react'
import { useRouter , useSearchParams  } from 'next/navigation'


const page = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [post,setPost] = useState({
        tag: '',
        prompt: ''
    })

    const promptId = searchParams.get('id')
      useEffect(() => {
         const getPromptDetails = async()=> {
             const response = await fetch(`/api/prompt/${promptId}`)
             if(response.ok) {
                const data = await response.json()
                setPost({
                    tag: data.tag,
                    prompt: data.prompt
                 })
             } 
         }
       if(promptId) {
          getPromptDetails()
       } 
      }, [promptId])
      

      const updatePrompt = async(e)=> {
           e.preventDefault()
           setIsSubmitting(true)
           if(!promptId) {
            alert('prompt ID is missing!')
           }
           try { 
               const response = await fetch(`/api/prompt/${promptId}`, {
                 method: 'PATCH',
                 body: JSON.stringify({
                    tag: post.tag,
                    prompt: post.prompt
                 })
               })
               if(response.ok) {
                  router.push('/')
                  router.refresh()
               }else {
                toast({
                    variant: "destructive",
                    title: "failed to update prompt.",
                  })
                  return;
               }
           } catch (error) {
            
           }
      }
  return (
    <Form  type='Edit' 
    posts={post}
    setPosts={setPost}
    handleSubmit={updatePrompt}
    submitting={isSubmitting}
    />
  )
}

export default page