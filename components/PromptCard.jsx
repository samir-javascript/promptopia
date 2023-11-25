'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
  const PromptCard = ({post,handleTagClick,handleDelete,handleEdit}) => {
  const router = useRouter()
  const pathName = usePathname()
  const [copied,setCopied] = useState('')
  const { data: session} = useSession()

  const handleCopy = async()=> {
      setCopied(post.prompt)
      navigator.clipboard.writeText(post.prompt)
      setTimeout(()=> setCopied(''), 3000)
  }
  const handleProfileClick = ()=> {
      if(session?.user.id === post.creator._id) return router.push('/profile');
      router.push(`/profile/${post?.creator._id}?name=${post?.creator.username}`)
    }
  return (
    <div className='prompt_card'>
        <div className='flex items-start justify-between gap-5 '>
          <div onClick={handleProfileClick} className='flex gap-3 items-center justify-start flex-1 cursor-pointer'>
          <Image alt='profile' width={40} height={40} className='rounded-full'
             src={session?.user.image || '/assets/icons/user.webp'}/>
            <div className='flex flex-col'>
                 <h3 className='font-semibold text-gray-900 font-satoshi'>{post?.creator.username}</h3>
                 <p className='text-gray-500 font-normal text-base'>{post?.creator.email}</p>
            </div>
          </div>
             <div className='copy_btn flex items-center gap-1' onClick={handleCopy}>
                  <Image width={20} height={20} alt='copy' src={copied ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'} />
                  <p className='text-gray-400 text-[13px]'>{copied ? 'copied' : 'copie'}</p>
             </div>
        </div> 
         <p className='my-4 text-sm font-satoshi text-gray-700'>{post?.prompt}</p>
         {pathName === '/' ? (
             <p className='cursor-pointer blue_gradient text-sm font-inter' onClick={()=> handleTagClick(post?.tag)}> #{post?.tag} </p>
         ): (
            <p className='cursor-pointer blue_gradient text-sm font-inter'>#{post?.tag} </p>
         )}
         {session?.user.id === post?.creator._id && pathName === '/profile' && (
            <div className='flex mt-4 gap-4 border-t border-gray-300 pt-3 '>
                 <button type='button' onClick={handleEdit} className='bg-green-500 text-white text-sm py-2 px-3.5  green_gradient rounded-md border border-gray-300 font-inter'>Edit Prompt</button>
                 <button type='button' className='bg-red text-white border py-2 px-3.5 border-gray-300 rounded-md text-red-500 font-inter text-sm' onClick={handleDelete}>Delete Prompt</button>
            </div>
         )}
    </div>
  )
}

export default PromptCard