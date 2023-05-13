"use client"
import React from 'react'
import { useEffect,useState } from 'react'
import PromptCard from './PromptCard'
import { useRouter } from 'next/navigation'



const PromptCardList=({data,handleTagClick})=>{
  return (
    <div className="mt-16 prompt_layout">
       {data?.map((post)=>(
         <PromptCard
         key={post._id}
         post={post}
         handleTagClick={()=>handleTagClick && handleTagClick(post.tag)}
         />
         ))}
    </div>
  )
}


const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const router = useRouter()
  useEffect(() => {
      const fetchPosts = async()=>{
        const res = await fetch('/api/prompt')
        const data = await res.json();
        if (searchText) {
          setPosts(data.filter((d)=>{
            if (d.prompt.includes(searchText) || d.tag.includes(searchText) || d.creator.username.includes(searchText)) {
              return d;
            }
          }))
        }else{
          setPosts(data);
        }
      }
      fetchPosts() 
  }, [searchText])

  
  const handleSearchChange=(e)=>{
    setSearchText(e.target.value)
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
  }

  const handleTagClick=(tag)=>{
    setSearchText(tag)

  }
  

  return (
    <section className='feed'>
      <form className="relative w-full flex items-center" onSubmit={handleSubmit}>
        <input type="text"
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>
      <PromptCardList
      data={posts}
      handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed