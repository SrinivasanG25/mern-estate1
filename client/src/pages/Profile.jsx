import {useSelector} from 'react-redux';

export default function Profile() {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt=2'></img>
        <input type='text' placeholder='username' id='username' className='rounded-lg border p-3'/>
        <input type='email' placeholder='email' id='email' className='rounded-lg border p-3'/>
        <input type='text' placeholder='password' id='passowrd' className='rounded-lg border p-3'/>
        <button className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-80 disabled:opacity-60'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-900 font-bold cursor-pointer'>Delete account</span>
        <span className='text-red-900 font-bold cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
