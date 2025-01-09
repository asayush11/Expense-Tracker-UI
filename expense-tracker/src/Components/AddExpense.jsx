import React, {useContext, useState} from 'react'
import expenseContext from '../Context/expenses/ExpenseContext';

const AddExpense = () => {
    const context = useContext(expenseContext);
    const {addExpense} = context;

    const [expense, setExpense] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addExpense(expense.title, expense.description, expense.tag);
        setExpense({title: "", description: "", tag: ""})
    }

    const onChange = (e)=>{
        setExpense({...expense, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Expense</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={expense.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={expense.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={expense.tag} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={expense.title.length<5 || expense.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Expense</button>
            </form>
        </div>
    )
}

export default AddExpense;