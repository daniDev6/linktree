import { useEffect, useState } from 'react';
import DashboardWrapper from '../components/DashboardWrapper.jsx';
import { useParams } from 'react-router-dom';
import { existsUsername, userExists, getUserPublicProfileInfo, getProfilePthoUrl } from '../firebase/firebase.js';
import PublicLink from '../components/PublicLink.jsx';


export default function PublicProfileView(){
    const [profileUrl,setProfileUrl]=useState('');
    const params=useParams();
    const [profile,setProfile]=useState(null);
    const [state,setState]=useState(0);
    useEffect(()=>{
        getProfile();
        console.log(profile)
        async function getProfile(){
            
            const username=params.username;
            try{
                const userUid=await existsUsername(username);
                if(userUid){
                    const userInfo=await getUserPublicProfileInfo(userUid)
                    setProfile(userInfo);
                    const url=await getProfilePthoUrl(userInfo.profileInfo.profilePicture)
                    setProfileUrl(url)
                    console.log(url)
                    console.log(userInfo.profileInfo.profilePicture)
                }else{
                    setState(7)
                }
            }catch(error){
                console.log(error);
            }
        }
    },[params])
    if(state===7){
        return <div>Username does not exist</div>
    }
    return(
        
            <div>

            <div>
                <img src={profileUrl} alt="" width={100}/>
            </div>
            <h2>{profile?.profileInfo.username}</h2>
            <h3>{profile?.profileInfo.displayName}</h3>
            <div>
                {profile?.linksInfo.map((link)=>(
                    <PublicLink key={link.docId} url={link.url} title={link.title}></PublicLink>
                ))}
            </div>
            </div>

    )
}