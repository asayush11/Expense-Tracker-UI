import { Home } from './Home';
import { useContext, useEffect, useState } from 'react';
import expenseContext from "../context/expenses/expenseContext"

export const UserHome = () => {
    if(localStorage.getItem('token') === "") return <Home></Home>;
    const context = useContext(expenseContext);
    const { showTotal, getExpensesByPaymentMode } = context;    
    const [ expenses, setExpenses ] = useState([]);
    const [ loading, setloading ] = useState(true);    
    const totalexpense = 0;
    
    async function ExpensesByPaymentMode() {
        const [ data, validUser ] = await getExpensesByPaymentMode();
        if( validUser === false ) return <Home></Home>;
        setExpenses(data);
        setloading(false);
        totalexpense = showTotal();
    }

    useEffect(() => {
        ExpensesByPaymentMode();
    }, [])
    
    if(loading) return <div>Loading data...</div>

    return (        
        <div>     
            Welcome buddy, long go no see
            <h2>You have spent a total of INR {totalexpense} so far which are summarised in Expenses section</h2>           
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
        </div>
    )
}

export default UserHome;