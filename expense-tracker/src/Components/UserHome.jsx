import { Home } from './Home';
import { useContext, useEffect, useState } from 'react';
import expenseContext from "../context/expenses/expenseContext"
import loanContext from '../Context/loans/LoanContext';
import authContext from '../Context/auth/AuthContext';

export const UserHome = () => {
    const context = useContext(authContext);
    const { authToken } = context;
    if(authToken === "") return <Home></Home>;
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
            <h2>Welcome buddy, long go no see</h2>
            { totalExpense !== 0 && <h3>You have spent a total of INR {totalExpense} so far which are categorised as</h3> }          
            { totalExpense !== 0 && <table style={{ width: "20%", borderSpacing: "0 10px"}}>
                <thead>
                    <tr>
                        <th style={{padding: "10px"}}>Payment Mode</th>
                        <th style={{padding: "10px"}}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => 
                    (
                        <tr key={index} style={{padding: "10px"}}>
                        <td style={{padding: "10px"}}>{expense.category}</td>
                        <td style={{padding: "10px"}}>{expense.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
            { totalExpense === 0 && <h3>You have no expenses as of now</h3> } 
            { totalLoan === 0 && <h3>You have neither given nor taken any loans as of now</h3> }
            {totalLoan > 0 && 
            <h3>Overall you are owed a total of INR {totalLoan} so far which are summarised as</h3> 
            }
            {totalLoan < 0 && 
            <h3>Overall you owe a total of INR {Math.abs(totalLoan)} so far which are summarised as</h3> 
            }          
            { totalLoan !== 0 && <table style={{ width: "30%", borderSpacing: "0 10px"}}>
                <thead>
                    <tr>
                        <th style={{padding: "10px"}}>Payment Mode</th>
                        <th style={{padding: "10px"}}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan, index) => 
                    (
                        <tr key={index} style={{padding: "10px"}}>
                        <td style={{padding: "10px"}}>{loan.category}</td>
                        <td style={{padding: "10px"}}>{loan.amount}</td>
                        <td>
                        <button className="btn btn-primary" onClick={()=>handleClick(loan.category)}>Settle {loan.category}</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
    )
}

export default UserHome;