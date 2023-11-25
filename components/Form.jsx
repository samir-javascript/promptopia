import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Form = ({handleSubmit,type,submitting,posts,setPosts}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'> <span className='blue_gradient'> {type} Post</span> </h1>
        <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <form onSubmit={handleSubmit} 
        className='w-full max-w-2xl flex flex-col mt-10 glassmorphism gap-7'
      >
           <label htmlFor="">
              <span className='font-satoshi font-semibold text-base text-gray-500'>your Ai prompt</span>
              <textarea placeholder='Write your prompt here...' value={posts.prompt}
               onChange={(e)=> setPosts({...posts, prompt: e.target.value}) }
               className='form_textarea' required />
           </label>
           <label htmlFor="">
              <span className='font-satoshi font-semibold text-base text-gray-500'>Tag {' '} <span className='font-normal'> #marketing, e-commerce, web </span></span>
              <input placeholder='#Tag' value={posts.tag}
               onChange={(e)=> setPosts({...posts, tag: e.target.value}) }
               className='form_input' required />
           </label>
           <div className='flex-end gap-4 mx-3 mb-4'>
               <Link href={'/'}>
                  Cancel
               </Link>
               <button className='black_btn' type='submit' disabled={submitting}>
                      {submitting ? <Image className='invert object-contain' src='/assets/icons/loader.svg' width={35} height={35} alt='loading...' /> :  `${type}`}
               </button>
           </div>
      </form>
    </section>
  )
}

export default Form