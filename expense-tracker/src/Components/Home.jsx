import HomePage from '../../HomePage.png';

export const Home = () => {
    localStorage.setItem('isLoggedIn',false);
    localStorage.setItem('token',"");
    localStorage.setItem('email',"");
    return (
        <div style={{margin: '0', padding: '0', width: '215vh',marginLeft: '-20vh',height: '150vh',marginTop: '-3vh', position: 'relative', overflow: 'hidden'}}>     
                     
                     <img src={HomePage} alt='Image didnot load' 
                     style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        display: 'block',
                        margin: 0,
                        padding: 0
                        }}></img>
        </div>
    )
}