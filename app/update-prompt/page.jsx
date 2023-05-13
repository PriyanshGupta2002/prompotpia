"use client"
import React,{useState,useEffect} from 'react'
import { useRouter,useSearchParams } from 'next/navigation'

import Form from '@components/Form'
const UpdatePrompt = () => {
    const [submitting, setsubmitting] = useState(false) 
    const promptId = useSearchParams().get('id')
   const router = useRouter() 
    const [post, setpost] = useState({
        prompt:'',
        tag:''
    })
    useEffect(() => {
      const fetchSinglePostDetail=async()=>{
        const res = await fetch(`/api/prompt/${promptId}`)
        const data = await res.json()
        setpost({...post,prompt:data.prompt,tag:data.tag})
      }
      fetchSinglePostDetail()
    }, [promptId])
    
    const editPrompt=async(e)=>{
        e.preventDefault();
        setsubmitting(true)
        try {
            const res = await fetch(`/api/prompt/${promptId}`,{
                method:"PATCH",
                body:JSON.stringify({
                   ...post
                }),
            })
            if (res.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }finally{
            setsubmitting(false)
        }
    }
  return (
        <Form
        type="Edit"
        post={post}
        setpost={setpost}
        submitting={submitting}
        handleSubmit={editPrompt}
        />

  )
}

export default UpdatePrompt