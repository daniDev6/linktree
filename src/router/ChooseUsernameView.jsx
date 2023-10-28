import AuthProvider from "../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { existsUsername,updateUser } from "../firebase/firebase";

export default function ChooseUsernameView(){
    const [state,setState]=useState(0);
    const [currentUser,setCurrentUser]=useState({});
    const [userName,setUserName]=useState({});


    const navigate=useNavigate();
    const handleUserLoggedIn=(user)=>{
        navigate('/dashboard')
    }
    const handleUserNotRegisted=(user)=>{
        setCurrentUser(user)
        setState(3)
    }
    const handleUserNotLoiggetIn=()=>{
        navigate('/login')
    }

    const handleInputUsername=(e)=>{
        setUserName(e.target.value)

    }
    const handleContinue= async()=>{
        if(userName!==""){
            const exists=await existsUsername(userName)
            if(exists){
                setState(5)
            }else{

                const tmp={...currentUser}
                tmp.username=userName
                tmp.processCompleted=true;
                await updateUser(tmp)
                setState(6)
            }
        }
        
    }


    if(state===6){
        return <div>
            <h1>Felicidades ya puedes ir al dashboard</h1>
            <Link to="/dashboard">Ir al dashboard</Link>
        </div>
    }


    if(state===3 || state===5){
        return(
            <div>
                <h1>Bienvenido {currentUser.displayName}</h1>
                <p>Para terminar el proceso de registro ingrese un nombre de usuario</p>
                {state===5?<h1>El nombre de usuario ya existe</h1>:null}
                <div>
                    <input type="text" onInput={handleInputUsername} />
                </div>
                <div>
                    <button onClick={handleContinue}>Continuar</button>
                </div>
            </div>
        )
    }
    return(
        <AuthProvider onUserLoggeedIn={handleUserLoggedIn} onUserNotRegisted={handleUserNotRegisted} onUserNotLoiggetIn={handleUserNotLoiggetIn}></AuthProvider>
    )
}