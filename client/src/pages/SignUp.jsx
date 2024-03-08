import React from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-10'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username'/>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-85 disabled:opacity-'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
        <span className='text-blue-800 '>Sign In</span></Link>
        
      </div>
    </div>
  )
}
