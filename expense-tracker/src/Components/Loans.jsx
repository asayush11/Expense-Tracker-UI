import { Home } from './Home';

export const Loans = () => {
    if(localStorage.getItem('token') === "") return <Home></Home>;
    return (        
        <div>     
            Work in Progress!!
        </div>
    )
}

export default Loans;