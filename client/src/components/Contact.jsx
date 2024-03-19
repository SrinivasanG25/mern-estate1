import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const [landlore,setlandlore] = useState(null);
    const [message,setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value)
    }


    useEffect(()=>{
        const fetchLandlore = async () => {
            try {
               const res = await fetch(`/api/user/${listing.userRef}`) ;
               const data = await res.json();
               setlandlore(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchLandlore()

    },[listing.userRef])
  return (
    <>
      {landlore && (
        <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{landlore.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()} </span></p>
            <textarea name='message' id='message' rows='2' value={message} onChange={onChange} placeholder='Enter your message here...' className='w-full border p-3 rounded-lg'></textarea>
            <Link to={`mailto:${landlore.email}?subject=Regarding ${listing.name}&body=${message}`}  className='bg-red-700 text-white w-full p-3 text-center rounded-lg uppercase hover:opacity-70'>
                Send message
            </Link>
        </div>
      )}
    </>
  )
}