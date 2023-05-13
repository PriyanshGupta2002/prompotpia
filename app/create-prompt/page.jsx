"use client"
import React,{useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'
const CreatePrompt = () => {
    const [submitting, setsubmitting] = useState(false)
   const router = useRouter() 
    const {data:session} = useSession()
    const [post, setpost] = useState({
        prompt:'',
        tag:''
    })
    const createPrompt=async(e)=>{
        e.preventDefault();
        setsubmitting(true)
        try {
            const res = await fetch('/api/prompt/new',{
                method:"POST",
                body:JSON.stringify({
                   ...post,
                    creator:session?.user?.id,
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
        type="Create"
        post={post}
        setpost={setpost}
        submitting={submitting}
        handleSubmit={createPrompt}
        />

  )
}

export default CreatePrompt