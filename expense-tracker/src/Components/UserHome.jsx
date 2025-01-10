import { Home } from './Home';

export const UserHome = () => {
    if(localStorage.getItem('isLoggedIn') === "false") return <Home></Home>;
    return (        
        <div style={{margin: '0', padding: '0', width: '215vh',marginLeft: '20vh',height: '150vh',marginTop: '-3vh', position: 'relative', overflow: 'hidden'}}>     
                     
                     I am userHome
        </div>
    )
}

export default UserHome;