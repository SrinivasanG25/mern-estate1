import { GoogleAuthProvider,getAuth, signInWithPopup } from 'firebase/auth'
import {app} from '../firebase'
import {useDispatch} from 'react-redux'
import {signInSuccess} from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const handleGoogleClick = async() =>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider);
            const res = await fetch('/api/auth/google',{
              method : 'post',
              headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
            });
            const data = await res.json();
            dispatch(signInSuccess(data))
            navigate('/');
        } catch(error) {
            console.log("could not sign in with google",error);
        }
    }
  return (
    <button onClick={handleGoogleClick}  type='button' className='bg-gradient-to-r from-purple-800 to-pink-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-4 border-purple-800 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out uppercase p-3'>continue with google</button>
  )
}
