import React, { useContext, useEffect, useRef, useState } from 'react'
import expenseContext from "../context/expenses/expenseContext"
import Expenseitem from './Expenseitem';
import AddExpense from './AddExpense';
import { Home } from './Home';
import { useNavigate } from 'react-router-dom';

const Expenses = () => {
    if(localStorage.getItem('token') === "") return <Home></Home>;
    const navigate = useNavigate();

    const context = useContext(expenseContext);
    
    const { expenses, getExpenses, editExpense, setExpenses } = context;
    
    const ref = useRef(null)
    const refClose = useRef(null)
    const [expense, setExpense] = useState({id: "", edescription: "", eamount: "", edate: "", emodeOfPayment: ""})
    const [ loading, setloading ] = useState(true);
    
    async function getAllExpenses() {
        const validUser = await getExpenses();
        if( validUser === false ) navigate("/logout");;
        setloading(false);
    }

    useEffect(() => {
        getAllExpenses();
    }, [setExpenses])     
   

    const updateExpense = (currentExpense, currentID) => {
        ref.current.click();
        setExpense({id: currentID, eamount: currentExpense.amount, edescription: currentExpense.description, edate:currentExpense.date, emodeOfPayment: currentExpense.modeOfPayment})
    }

    const handleClick = (e)=>{ 
        e.preventDefault();
        if(editExpense(expense.id, expense.eamount, expense.edescription, expense.edate, expense.emodeOfPayment) === false) navigate("/logout");
        refClose.current.click();
    }

    const onChange = (e)=>{
        setExpense({...expense, [e.target.name]: e.target.value})
    }

    if(loading) return <div>Loading data...</div>

    return (
        <>
            
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
                                    <input type="number" className="form-control" id="eamount" name="eamount" value={expense.eamount} onChange={onChange} required/>
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
                            <button disabled={expense.eamount === 0 || expense.edescription.length<1} onClick={handleClick} type="button" className="btn btn-primary">Update Expense</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Expenses:</h2>
                <div className="container mx-2"> 
                {expenses.length===0 && 'No expenses to display'}
                </div>
                {expenses.map((expense) => {
                    return <Expenseitem key={expense.id} updateExpense={updateExpense} expense={expense} />
                })}
            </div>
            <AddExpense />
        </>
    )
}

export default Expenses