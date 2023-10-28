
import { initializeApp } from "firebase/app";//las configuraciones de nuestra cuenta
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from 'firebase/storage'
import { getFirestore,collection,addDoc,getDoc,doc,getDocs,query,where,setDoc,deleteDoc } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROYECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export async function userExists(uid){
    const docRef = doc(db, "users", uid);//base de datos, collection, id
    const res=await getDoc(docRef);
    console.log(res);
    return res.exists();
}

export async function existsUsername(username){
    const users=[];
    const docRef=collection(db, "users");
    const q = query(docRef,where('username','==',username));
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach((doc)=>{
        users.push(doc.data());
    })
    return users.length>0?users[0].uid:null;
}

export async function registerNewUser(user){
    try{
        const collectionRef=collection(db,"users");
        const docRef=doc(collectionRef,user.uid);
        await setDoc(docRef,user);//addDoc
    }catch(error){
        console.log(error);
    }
}


export async function updateUser(user){
    try{
        const collectionRef=collection(db,"users");
        const docRef=doc(collectionRef,user.uid);
        await setDoc(docRef,user);//addDoc
    }catch(error){
        console.log(error);
    }
}

export async function getUserInfo(uid){
    const docRef=doc(db,"users",uid);
    const res=await getDoc(docRef);
    return res.data();
}


export async function insertNewLink(link){
    try{
        const docRef=collection(db,"links");
        const res=await addDoc(docRef,link);
        return res
    }catch(error){
        console.log(error);
    }
}
export async function getLinks(uid){
    const links=[];
    try{
        const collectionRef=collection(db,"links");
        const q=query(collectionRef,where("uid","==",uid));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc)=>{
            const link={...doc.data()}
            link.docId=doc.id
            links.push(link);
        })
        return links
    }catch(error){
        console.log(error);
    }
}

export async function updateLink(docId,link){
    try{
        const docRef=doc(db,"links",docId);
        const res=await setDoc(docRef,link);
        return res
    }catch(error){
        console.log(error);
    }
}
export async function deleteLink(docId){
    try{
        const docRef=doc(db,"links",docId);
        const res=await deleteDoc(docRef);
        return res
    }catch(error){
        console.log(error);
    }
}

export async function setUserProfilePhoto(uid,file){
    try{
        const imgRef=ref(storage,`imagenes/${uid}`);
        const resUpload=await uploadBytes(imgRef,file);
        return resUpload

    }catch(error){
        console.log(error);
    }
}

export async function getProfilePthoUrl(profilePicture){

    try{
        const imgRef=ref(storage,profilePicture);
        const url=await getDownloadURL(imgRef);
        console.log(url);
        return url




    }catch(error){
        console.log(error);
    }}



export async function getUserPublicProfileInfo(uid){
    try{
        const profileInfo=await getUserInfo(uid);
        const linksInfo=await getLinks(uid);
        return {
            profileInfo:profileInfo,
            linksInfo:linksInfo
        }
    }catch(error){
        console.log(error);
    }
}



export async function logout(){
    try {
        const res=await auth.signOut();
    } catch (error) {
        console.log(error)
    }
}





