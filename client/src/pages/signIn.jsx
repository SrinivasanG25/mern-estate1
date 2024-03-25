import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

export default function SignIn() {
  const [formData,setFormData] =useState({})
  const {loading,error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) =>{
      setFormData(
        {
          ...formData,
          [e.target.id]:e.target.value,

        }
      )
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
    const res = await fetch('/api/auth/signin',{
      method:'post',
      headers : {
        'Content-Type' : 'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if(data.success === false){
      dispatch(signInFailure(data.message))
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
    
     
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl text-center font-extrabold my-10 text-gradient bg-clip-text text-indigo-800 tracking-wider'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/> */}
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button  disabled={loading} className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-400 hover:to-purple-400 text-white font-semibold py-2 px-4  border-purple-500 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out uppercase p-3'>{loading? 'loading...':'Sign In'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
        <span className='text-blue-800 '>Sign Un</span>
        </Link>
        
      </div>
      {error && <p className='text-red-900 mt-5'>{error}</p>}
    </div>
  )
}
