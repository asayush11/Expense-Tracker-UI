import React, {useContext} from 'react'
import expenseContext from "../context/expenses/expenseContext"


const Expenseitem = (props) => {
    const context = useContext(expenseContext);
    const { deleteExpense } = context;
    const { expense, updateExpense } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{expense.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteExpense(expense._id)}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateExpense(expense)}}></i>
                    </div>
                    <p className="card-text">{expense.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Expenseitem