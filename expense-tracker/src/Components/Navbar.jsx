import React, {useContext} from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import authContext from '../Context/auth/AuthContext';  

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const context = useContext(authContext);
    const { authToken } = context;

    const deleteAccount = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const confirmed = confirm("Are you sure you want to delete accouunt?");
        if(confirmed){
            navigate("/deleteAccount");
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Expense Tracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/" hidden={authToken !== "" } >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/userHome"? "active": ""}`} to="/userHome" hidden={authToken === "" } >User Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about" hidden={authToken !== "" } >About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/expenses"? "active": ""}`} to="/expenses" hidden={authToken === "" } >Expenses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/loans"? "active": ""}`} to="/loans" hidden={authToken === "" } >Loans</Link>
                        </li>

                    </ul>
                    <form className="d-flex">                    
                    <button className="btn btn-primary mx-1"  hidden={authToken === "" } onClick={deleteAccount} >Delete Account</button>    
                    <Link className="btn btn-primary mx-1" to="/logout" role="button" hidden={authToken === "" }>Logout</Link>    
                    <Link className="btn btn-primary mx-1" to="/login" role="button" hidden={authToken !== "" } >Login</Link>
                    <Link className="btn btn-primary mx-2" to="/signup" role="button" hidden={authToken !== "" }>Signup</Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar