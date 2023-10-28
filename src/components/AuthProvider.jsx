import { GoogleAuthProvider, onAuthStateChanged, signInWithGoogle, signInWithPopup } from 'firebase/auth';
import {auth, registerNewUser,getUserInfo} from '../firebase/firebase.js'
import { useEffect,useState } from 'react';
import { userExists } from '../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';


export default function AuthProvider({children,onUserLoggeedIn,onUserNotLoiggetIn,onUserNotRegisted}){
    const navigate=useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth,async(user)=>{
            
        if(user){
            const isRegistered=await userExists(user.uid)
            if(isRegistered){
                const userInfo=await getUserInfo(user.uid)
                if(userInfo.processCompleted){

                    onUserLoggeedIn(userInfo)
                }else{
                    onUserNotRegisted(userInfo)
                }
                //redirigir a dashboard
            }else{
                await registerNewUser({
                    uid:user.uid,
                    displayName:user.displayName,
                    profilePicture:'',
                    username:'',
                    processCompleted:false
                })
                onUserNotRegisted(user)
            }
            console.log(user.displayName)
        }else{
            onUserNotLoiggetIn()
        }
        })
    },[navigate, onUserLoggeedIn, onUserNotLoiggetIn, onUserNotRegisted])











    return children
}