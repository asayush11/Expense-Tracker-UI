import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from './Alert'
import ChangePassword from './ChangePassword'


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        let s = 'http://localhost:8080/api/users/validate?email=' + credentials.email + '&password=' + credentials.password;
        e.preventDefault();
        const response = await fetch(s,
         {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            alert(json.message);
            localStorage.setItem('token', json.data); 
            localStorage.setItem('isLoggedIn',true);
            localStorage.setItem('email',credentials.email);
            navigate("/userHome");

        }
        else {
           //<Alert message = json />
            alert(json.error);
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        navigate("/changePassword");
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary mx-1">Submit</button>
                <button onClick={handleClick} className="btn btn-primary mx-1">Forgot Password</button>
            </form>
        </div>
    )
}

export default Login