'use client'
import React, {useState, useEffect} from 'react'
import PromptCard from './PromptCard'
import Loader from './Loader'


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
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/prompt`, { cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
         
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i');
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);
    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResult(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchResult(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          value={searchText}
          onChange={handleSearchChange}
          required
          placeholder='search by tag or name or a prompt...'
          className='search_input peer'
        />
      </form>
      {loading ? (
        <Loader />
      ) : searchText ? (
        <PromptCardList data={searchResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
