"use client"
import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {signIn,signOut,getProviders,useSession} from 'next-auth/react'
const Nav = () => {
  const {status,data:session} = useSession()
  const isUserLoggedIn = session?.user
  const [providers,setProviders] = useState(null)
  const [toggleDropdown, settoggleDropdown] = useState(false)
  useEffect(() => {
    const setupProviders = async()=>{
      const response = await getProviders()
      setProviders(response)
    }
    setupProviders()
  }, [])
  return (
    <nav className='flex justify-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 items-center '>
        <Image
        alt='prompotopia'
        src="/assets/images/logo.svg"
        width={30}
        height={30}
        className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>
      {/* Desktop Navigation */}

      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
                Create Prompt
            </Link> 
            <button className='outline_btn' type='button' onClick={signOut}>
              Sign Out
            </button>
            <Link href={`/profile/${session?.user?.id}`}> 
              <Image
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              src={session?.user?.image}
              />
            </Link>
          </div>
        ): (
          <>
            {providers && 
            Object.values(providers).map((provider)=>(
              <button
              type='button'
              key={provider.name}
              onClick={()=>signIn(provider.id)}
              className='black_btn'
              >
                Sign In
              </button>
            ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className='sm:hidden flex relative'>
             {isUserLoggedIn ? (
              <div className='flex cursor-pointer'>
                 <Image
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              src={session?.user?.image}
              onClick={()=>{settoggleDropdown((prevState)=>!prevState)}}
              />

              {toggleDropdown &&  <div className='dropdown'>
                <Link href={`/profile/${session?.user?.id}`} className='dropdown_link' onClick={()=>settoggleDropdown(false)}>
                  My Profile
                </Link>


                <Link href="/create-prompt" className='dropdown_link' onClick={()=>settoggleDropdown(false)}>
                  Create Prompt
                </Link>

                <button type='button' onClick={()=>{
                  settoggleDropdown(false)
                  signOut()
                }}
                className='mt-5 w-full black_btn'
                >
                    Sign Out
                </button>


              </div> }

              </div>
              
             ):(
              
                <>
            {providers && 
            Object.values(providers).map((provider)=>(
              <button
              type='button'
              key={provider.name}
              onClick={()=>signIn(provider.id)}
              className='black_btn'
              >
                Sign In
              </button>
            ))
            }
          </>
            
             )} 
      </div>

    </nav>
  )
}

export default Nav