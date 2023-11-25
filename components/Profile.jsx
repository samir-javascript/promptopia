import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({data,name,handleDelete,handleEdit,desc}) => {
  return (
    <section className='w-full'>
          <h1 className='head_text blue_gradient text-left'>{name} Profile </h1>
          <p className='desc text-left'>{desc}. </p>
          <div className='mt-16 prompt_layout'>
               {data.map(post => (
                  <PromptCard post={post} key={post._id} handleDelete={()=> handleDelete(post)}
                   handleEdit={()=> handleEdit(post)} />
               ))}
          </div>
    </section>
  )
}

export default Profile