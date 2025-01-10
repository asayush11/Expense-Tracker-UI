import React from 'react'
import UserHome from './UserHome';

const DeleteAccount = () => { 
    const data = confirm("Are you sure you want to delete accouunt?");
    
    const handleSubmit = async () => {
        if(data === false) return;
        let s = 'http://localhost:8080/api/users/delete' + localStorage.getItem('email');
        const response = await fetch(s,
         {
            method: 'DELETE',
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
            localStorage.setItem('token',""); 
            localStorage.setItem('isLoggedIn',"");
            localStorage.setItem('email',"");
            navigate("/");

        }
        else {
           //<Alert message = json />
            alert(json.error);
            navigate("/");
        }    
    
    }

    return (
             <div style={{margin: '0', padding: '0', width: '215vh',marginLeft: '-20vh',height: '150vh',marginTop: '-3vh', position: 'relative', overflow: 'hidden'}}>             
               {handleSubmit()}
               <UserHome></UserHome>          
             </div>
        
    );
}

export default DeleteAccount;