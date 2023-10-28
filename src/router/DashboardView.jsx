import AuthProvider from '../components/AuthProvider.jsx';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardWrapper from '../components/DashboardWrapper.jsx';
import {v4 as uuidv4} from 'uuid';
import { insertNewLink,getLinks,updateLink,deleteLink } from '../firebase/firebase.js';
import Link from '../components/Link.jsx';
export default function PublicProfileView(){
    const [currentUser,setCurrentUser]=useState({});
    const [state,setState]=useState(0);
    const [title,setTitle]=useState('');
    const [url,setUrl]=useState('');
    const [links,setLinks]=useState([]);
    

    const navigate=useNavigate();
    const handleUserLoggedIn=async(user)=>{
        setCurrentUser(user)
        setState(2)
        const resLink=await getLinks(user.uid)
        setLinks([...resLink])
    }
    const handleUserNotRegisted=(user)=>{
        navigate('/login')

    }
    const handleUserNotLoiggetIn=()=>{
        navigate('/login')
    }
    if(state===0){
        return <AuthProvider onUserLoggeedIn={handleUserLoggedIn} onUserNotRegisted={handleUserNotRegisted} onUserNotLoiggetIn={handleUserNotLoiggetIn}>
        <div>Loading 2</div>

    </AuthProvider>
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        console.log(title,url,'se deberia mandar')
        addLink()

    }
    const addLink=()=>{
        if(title!=='' && url!==''){
            const newLink={
                id:uuidv4(),
                title:title,
                url:url,
                uid:currentUser.uid
            };
            const res=insertNewLink(newLink)
            newLink.docId=res.id
            setTitle('')
            setUrl('')
            setLinks([...links,newLink])
            console.log('son los links',links)
        }
    }
    const handleOnChange=(e)=>{
        if(e.target.name==='title'){
            setTitle(e.target.value)
        }
        if(e.target.name==='url'){
            setUrl(e.target.value)
        }
    }
    const handleUpdateLink=async(docId,title,url)=>{
        const link=links.find((link)=>link.docId===docId)
        link.title=title
        link.url=url
        await updateLink(link.docId,link)
    }
    const handleDeleteLink=async(docId)=>{
        await deleteLink(docId)
        const tmp=links.filter((link)=>link.docId!==docId)
        setLinks([...tmp])
    }
    return <DashboardWrapper>
        <h1>Dashboard</h1>
        <form action="" onSubmit={handleOnSubmit}>
            <label htmlFor="title" onSubmit={handleOnSubmit}>Title</label>
            <input type="text" name='title' onChange={handleOnChange}/>

            <label htmlFor="url">Url</label>
            <input type="text" name='url' onChange={handleOnChange}/>

            <input type="submit" value='Create new Link' name='url' />
        </form>
        <div>
            {
                links.map((link)=>(
                <Link key={link.id} docId={link.docId} title={link.title} url={link.url} onUpdate={handleUpdateLink} onDelete={handleDeleteLink}/>
                ))
            }
        </div>
    </DashboardWrapper>
    
}