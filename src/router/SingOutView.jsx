import DashboardWrapper from "../components/DashboardWrapper"
import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import {logout} from "../firebase/firebase"
export default function SingOutView(){
    const navigate=useNavigate()
    
    const handleUserLoggedIn=async(user)=>{
        await logout()
    }
    const handleUserNotRegisted=(user)=>{
        navigate('/login')
    }
    const handleUserNotLoiggetIn=()=>{
        navigate('/login')
    }



    return(<>
        <DashboardWrapper>
        <AuthProvider onUserLoggeedIn={handleUserLoggedIn} onUserNotRegisted={handleUserNotRegisted} onUserNotLoiggetIn={handleUserNotLoiggetIn}>
        <div>Loading</div>

    </AuthProvider>
        </DashboardWrapper>
    </>
    )
}