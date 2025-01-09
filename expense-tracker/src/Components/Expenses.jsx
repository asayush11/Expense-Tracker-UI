import React, { useContext, useEffect, useRef, useState } from 'react'
import expenseContext from "../context/expenses/expenseContext"
import Expenseitem from './Expenseitem';
import AddExpense from './AddExpense';

const Expenses = () => {
    const context = useContext(expenseContext);
    const [expenses, setExpenses] = useState([]);
    const onChange1 = ()=>{
        setExpense({...expense, [e.target.name]: 0})
    }
    //const { expenses, getExpenses, editExpense } = context;
    useEffect(() => {
      //  getExpenses()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [expense, setExpense] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateExpense = (currentExpense) => {
        ref.current.click();
        setExpense({id: currentExpense._id, etitle: currentExpense.title, edescription: currentExpense.description, etag:currentExpense.tag})
    }

    const handleClick = (e)=>{ 
        editExpense(expense.id, expense.etitle, expense.edescription, expense.etag)
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
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={expense.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={expense.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={expense.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={expense.etitle.length<5 || expense.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Expense</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>You Expenses</h2>
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