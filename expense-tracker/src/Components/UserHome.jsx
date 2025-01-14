import { Home } from './Home';
import { useContext, useEffect, useState } from 'react';
import expenseContext from "../context/expenses/expenseContext"
import loanContext from '../Context/loans/LoanContext';

export const UserHome = () => {
    if(localStorage.getItem('token') === "") return <Home></Home>;
    const contextExpense = useContext(expenseContext);
    const { getExpensesByPaymentMode } = contextExpense;    
    const [ expenses, setExpenses ] = useState([]);           
    const [ totalExpense, setTotalExpense ] = useState(0);

    const contextLoan = useContext(loanContext);
    const { getLoansByFriend, settleFriend } = contextLoan;    
    const [ loans, setLoans ] = useState([]);
    const [ totalLoan, setTotalLoan ] = useState(0);
    const [ loading, setloading ] = useState(true); 
    
    async function expensesByPaymentMode() {
        const [ data, validUser, total ] = await getExpensesByPaymentMode();
        if( validUser === false ) return <Home></Home>;
        setExpenses(data);
        setTotalExpense( total );
        await loansByPaymentMode();
    }

    async function loansByPaymentMode() {
        const [ data, validUser, total ] = await getLoansByFriend();
        if( validUser === false ) return <Home></Home>;
        setLoans(data);
        setTotalLoan( total );
        setloading(false);        
    }

    useEffect(() => {
        expensesByPaymentMode();
    }, [])
    
    const handleClick = async (name) => {
        const confirmed = confirm("Are you sure you want to settle loans with " + name);
        if(confirmed){ 
           setloading(true);    
           let updatedLoans = loans;
           const [validUser, newUpdatedLoans] = await settleFriend(name, updatedLoans); 
           if( validUser === false ) return <Home></Home>;
           setLoans(newUpdatedLoans);
        }
        setloading(false); 
    };

    if(loading) return <div>Loading data...</div>

    return (        
        <div>     
            Welcome buddy, long go no see
            <h2>You have spent a total of INR {totalExpense} so far which are categorised as</h2>           
            <table>
                <thead>
                    <tr>
                        <th>Payment Mode</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => 
                    (
                        <tr key={index}>
                        <td>{expense.category}</td>
                        <td>{expense.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {totalLoan > 0 && 
            <h2>Overall you are owed a total of INR {totalLoan} so far which are summarised as</h2> 
            }
            {totalLoan < 0 && 
            <h2>Overall you owe a total of INR {Math.abs(totalLoan)} so far which are summarised as</h2> 
            }          
            <table>
                <thead>
                    <tr>
                        <th>Payment Mode</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan, index) => 
                    (
                        <tr key={index}>
                        <td>{loan.category}</td>
                        <td>{loan.amount}</td>
                        <td>
                        <button className="btn btn-primary" onClick={()=>handleClick(loan.category)}>Settle {loan.category}</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserHome;