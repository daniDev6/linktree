import { GoogleAuthProvider, onAuthStateChanged, signInWithGoogle, signInWithPopup } from 'firebase/auth';
import {auth} from '../firebase/firebase.js'
import { useEffect,useState } from 'react';
import { userExists } from '../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../components/AuthProvider.jsx';
export default function LoginView(){
    const navigate=useNavigate();

    /*State
    0:initializado
    1:"loading"
    2:login completo
    3:login pero sin registro
    4:no hay nadie logeado
    5:ya existe el username
    6:nuevoUsername click para continuar
    7:username no existe
    8:logout
    */
    const [state,setCurrentState]=useState(0)

    // useEffect(()=>{
    //     setCurrentState(1)
    //     onAuthStateChanged(auth,async(user)=>{
            
    //     if(user){
    //         const isRegistered=await userExists(user.uid)
    //         if(isRegistered){
    //             //redirigir a dashboard
    //             setCurrentState(2)
    //             navigate('/dashboard')
    //             console.log(user.displayName)
    //         }else{
    //             //redirigir a username
    //             navigate('/choose-username')
    //             setCurrentState(3)
    //         }
    //         console.log(user.displayName)
    //     }else{
    //         setCurrentState(3)
    //         console.log('no hay usuario')
    //     }
    //     })
    // },[navigate])
    const handleOnClick = async()=>{
        const googleProvider=new GoogleAuthProvider();
        
        const signInWithGoogle=async(googleProvider)=>{
            try{
                const res=await signInWithPopup(auth,googleProvider)//enviar a la funcion el proveedor
                console.log(res)
            }catch(error){
                console.log(error)
            }
        }
        await signInWithGoogle(googleProvider)
    }
    
    const handleUserLoggedIn=(user)=>{
        navigate('/dashboard')
    }
    const handleUserNotRegisted=(user)=>{
        navigate('/choose-username')
    }
    const handleUserNotLoiggetIn=()=>{
        setCurrentState(4)
    }
    if(state===4){
        return(
            <div>
            <button onClick={handleOnClick}>Login with Google</button>
            </div>
        )
    }
    return <AuthProvider onUserLoggeedIn={handleUserLoggedIn} onUserNotRegisted={handleUserNotRegisted} onUserNotLoiggetIn={handleUserNotLoiggetIn}>
        <div>Loading</div>

    </AuthProvider>
}