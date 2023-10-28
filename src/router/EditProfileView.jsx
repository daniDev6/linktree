import AuthProvider from "../components/AuthProvider"
import DashboardWrapper from "../components/DashboardWrapper"
import { useNavigate } from "react-router-dom";

import { getLinks,setUserProfilePhoto,getProfilePthoUrl,updateUser } from "../firebase/firebase";
import { useState,useRef } from "react";
export default function EditprofileView(){
    const [currentUser,setCurrentUser]=useState({});
    const [state,setState]=useState(0);
    const [profileUrl,setProfileUrl]=useState('');
    const fileRef=useRef();
    const navigate=useNavigate();
    const handleUserLoggedIn=async(user)=>{
        setCurrentUser(user)
        const url=await getProfilePthoUrl(user.profilePicture)
        setProfileUrl(url)
        setState(2)
        console.log(user)
    }
    const handleUserNotRegisted=(user)=>{
        navigate('/login')

    }
    const handleUserNotLoiggetIn=()=>{
        navigate('/login')
    }
    const handleOpenFilePicker=()=>{
        if(fileRef.current){
            fileRef.current.click()
        }
    }
    const handleChangeFile=(e)=>{
        const files=e.target.files;
        const fileReader=new FileReader();//informacion de un archivo
        if(fileReader && files && files.length>0){
            fileReader.readAsArrayBuffer(files[0])//convertir el archivo en un blob
            fileReader.onload=async()=>{
                const imgData=fileReader.result;
                const res=await setUserProfilePhoto(currentUser.uid,imgData);
                if(res){
                    const tmpUser={...currentUser}
                    tmpUser.profilePicture=res.metadata.fullPath;
                    await updateUser(tmpUser)
                    setCurrentUser({...tmpUser})
                    const url=await getProfilePthoUrl(currentUser.profilePicture)
                    setProfileUrl(url)
                    console.log('url',url)
                }
            }
        }
    }
    if(state!==2){
        return <AuthProvider onUserLoggeedIn={handleUserLoggedIn} onUserNotLoiggetIn={handleUserNotLoiggetIn} onUserNotRegisted={handleUserNotRegisted}></AuthProvider>
    }
    return (<>
        

        <DashboardWrapper>

        <div>
            <h2>Edit Profile Info</h2>
            <div>
                <div>
                    <img src={profileUrl} alt="" width={100}/>
                </div>
                <div>
                    <button onClick={handleOpenFilePicker}>Choose new Profile picture</button>
                    <input ref={fileRef} type="file" style={{display:'none'}} onChange={handleChangeFile}/>
                </div>
            </div>
        </div>
        </DashboardWrapper>

    </>)
}