import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import authContext from '../Context/auth/AuthContext';

const Signup = () => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: ""}) 
    let navigate = useNavigate();
    const context = useContext(authContext);
    const { setAuthToken } = context;

    const handleSubmit = async (e) => {        
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/users/create',
         {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'name': credentials.name,
                'email': credentials.email,
                'password': credentials.password
            })
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            await setAuthToken(json.data);
            toast.info(json.message);
            navigate("/userHome");

        }
        else {
           //<Alert message = json />
            toast.error(json.error);
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="nameHelp" />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup