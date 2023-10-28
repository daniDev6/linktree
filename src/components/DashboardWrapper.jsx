import { Link } from "react-router-dom"

export default function DashboardWrapper({children}){
    return <div>
        <nav>
            <div>Logotipo</div>
            <Link to="/dashboard">Links</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/singout">Singout</Link>

        </nav>
        <div>
        {children}
        </div>
    </div>
    
}