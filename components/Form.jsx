import React from "react";
import Link from "next/link";
const Form = ({ type, post, setpost, submitting, handleSubmit }) => {
  return (
  <section className="w-full max-w-full mb-4 flex flex-col">
      <h1 className="head_text text-left">
       <span className="blue_gradient">{type} Prompt</span> 
      </h1>
      <p className="desc text-left max-w-md">
          {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label htmlFor="textArea">
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea
          id="textArea"
          value={post.prompt}
          onChange={(e)=>setpost({...post,prompt:e.target.value})}
          placeholder="Write your prompt here..."
          className="form_textarea"
          required
          />
        </label>

        <label htmlFor="textArea">
          <span className="font-satoshi font-semibold text-base text-gray-700">Tag {` `}
          <span className="font-normal">
            (#product,#webdevelopment,#idea)
          </span>
          </span>
          <input
          id="textArea"
          value={post.tag}
          onChange={(e)=>setpost({...post,tag:e.target.value})}
          placeholder="#tag"
          className="form_input"
          required
          />
        </label>

        <div className="items-center flex mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>

             <button type="submit" className="px-5 py-2 text-sm bg-primary-orange rounded-full text-white cursor-pointer" disabled={submitting} >
                   {submitting ? `${type}ing...` : type}
             </button>

        </div>

      </form>
  </section>
  ) ;  
};

export default Form;
