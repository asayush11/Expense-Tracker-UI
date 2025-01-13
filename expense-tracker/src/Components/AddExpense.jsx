import React, {useContext, useState} from 'react'
import expenseContext from '../Context/expenses/ExpenseContext';
import { useNavigate } from 'react-router-dom'

const AddExpense = () => {
    const context = useContext(expenseContext);
    const navigate = useNavigate();
    const {addExpense} = context;

    const [expense, setExpense] = useState({description: "", amount: 0.0, date: "", modeOfPayment: ""})

    const handleClick = async (e) => {
        e.preventDefault();
        const isAdded = await addExpense(expense.description, expense.amount, expense.date, expense.modeOfPayment);
        if (!isAdded) navigate("/logout");
        else setExpense({description: "", amount: 0.0, date: "", modeOfPayment: ""});
    }

    const onChange = (e)=>{
        setExpense({...expense, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Expense</h2>
            <form className="my-3">                
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={expense.description} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" id="amount" name="amount" value={expense.amount} onChange={onChange} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" name="date" value={expense.date} onChange={onChange} /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="modeOfPayment" className="form-label">Mode of Payment</label>
                    <input type="text" className="form-control" id="modeOfPayment" name="modeOfPayment" value={expense.modeOfPayment} onChange={onChange} />
                </div>
               
                <button disabled={expense.amount === 0 || expense.description.length<1} type="submit" className="btn btn-primary" onClick={handleClick}>Add Expense</button>
            </form>
        </div>
    )
}

export default AddExpense;