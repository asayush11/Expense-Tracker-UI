import { Home } from './Home';

export const UserHome = () => {
    if(localStorage.getItem('isLoggedIn') === "false") return <Home></Home>;
    return (        
        <div>     
            Welcome buddy, long go no see
        </div>
    )
}

export default UserHome;