import React, { useContext, useEffect, useRef, useState } from 'react'
import expenseContext from "../context/expenses/expenseContext"
import Expenseitem from './Expenseitem';
import AddExpense from './AddExpense';
import { Home } from './Home';
import { useNavigate } from 'react-router-dom';

const Expenses = () => {
    if(localStorage.getItem('isLoggedIn') === "false") return <Home></Home>;
    const navigate = useNavigate();

    const context = useContext(expenseContext);
    //const [expenses, setExpenses] = useState([]);
    const onChange1 = ()=>{
        setExpense({...expense, [e.target.name]: 0})
    }
    const { expenses, getExpenses, editExpense } = context;
    useEffect(() => {
        if(getExpenses() === false) navigate("/");
        //eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [expense, setExpense] = useState({id: "", edescription: "", eamount: 0.0, edate: "", emodeOfPayment: ""})

    const updateExpense = (currentExpense) => {
        ref.current.click();
        setExpense({id: currentExpense._id, eamount: currentExpense.amount, edescription: currentExpense.description, edate:currentExpense.date, emodeOfPayment: currentExpense.modeOfPayment})
    }

    const handleClick = (e)=>{ 
        editExpense(expense.id, expense.eamount, expense.edescription, expense.edate, expense.emodeOfPayment)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setExpense({...expense, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddExpense />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Expense</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="amount" className="form-label">Amount</label>
                                    <input type="text" className="form-control" id="eamount" name="eamount" value={expense.eamount} onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={expense.edescription} onChange={onChange} minLength={1} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input type="date" className="form-control" id="edate" name="edate" value={expense.edate} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="modeOfPayment" className="form-label">Payment Mode</label>
                                    <input type="text" className="form-control" id="emodeOfPayment" name="emodeOfPayment" value={expense.emodeOfPayment} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={expense.eamount === 0.0 || expense.edescription.length<1} onClick={handleClick} type="button" className="btn btn-primary">Update Expense</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Expenses</h2>
                <div className="container mx-2"> 
                {expenses.length===0 && 'No expenses to display'}
                </div>
                {expenses.map((expense) => {
                    return <Expenseitem key={expense._id} updateExpense={updateExpense} expense={expense} />
                })}
            </div>
        </>
    )
}

export default Expenses