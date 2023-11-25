'use client'
import React, {useState, useEffect} from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({data, handleTagClick })=> {
   return (
      <div className='mt-16 prompt_layout'>
          {data?.map(post => (
              <PromptCard  key={post._id} post={post} handleTagClick={handleTagClick} />
          ))}
      </div>
   )
}
const Feed = () => {
  const [posts,setPosts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchResult,setSearchResult] = useState([])
  const [searchTimeOut,setSearchTimeOut] = useState(null)
 
  
  useEffect(() => {
     const fetchPrompts = async()=> {
        try {
         const response = await fetch(`/api/prompt?${Date.now()}`)
           if(response.ok) {
              const data = await response.json()
              setPosts(data)
           }
        } catch (error) {
           console.log(error)
        }
     }
     fetchPrompts()
  }, [])
  
   const filterPrompts = (searchText)=>  {
        const regex = new RegExp(searchText,'i')
        return posts.filter(item => regex.test(item.creator.username)
         || regex.test(item.tag) 
         || regex.test(item.prompt))
   }

   const handleSearchChange = async (e)=>  {
      clearTimeout(searchTimeOut)
      setSearchText(e.target.value)
      setSearchTimeOut(
         setTimeout(() => {
             const searchResult = filterPrompts(e.target.value)
             setSearchResult(searchResult)
         }, 500)
      )
   }
   const handleTagClick = async (tagName)=>  {
       setSearchText(tagName)
       const searchResult = filterPrompts(tagName)
       setSearchResult(searchResult)
   }
  return (
    <section className='feed'>
         <form className='relative w-full flex-center'>
            <input type="text" value={searchText}
             onChange={handleSearchChange} required
              placeholder='search by tag or name or a prompt...' className='search_input peer'/>
         </form>
          {searchText ? (
            <PromptCardList 
            data={searchResult}
             handleTagClick={handleTagClick} />
          ): (
            <PromptCardList data={posts} handleTagClick={handleTagClick} />
          )}
          
    </section>
  )
}

export default Feed