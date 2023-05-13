"use client"
import React,{useState,useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'


const UserProfile = ({params}) => {

  const {data:session} = useSession()
  const [userPosts, setUserPosts] = useState([])
  const userId = params.id
  useEffect(() => {
    const fetchPosts=async()=>{
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setUserPosts(data)
    }
    if(session?.user?.id){
      fetchPosts()
    }
  }, [])
  const router = useRouter()
  

const handleEdit=async(id)=>{
  router.push(`/update-prompt?id=${id}`)
}

const handleDelete=async(id)=>{
  const res = await fetch(`api/prompt/${id}`,{
    method:"DELETE"
  })
  if (res.ok) {
    router.push('/')
  }
}
  return (
   <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={userPosts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
   />
  )
}

export default UserProfile