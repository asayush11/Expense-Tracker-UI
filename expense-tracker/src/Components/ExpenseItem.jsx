import React, {useContext} from 'react'
import expenseContext from "../context/expenses/expenseContext"
import { Trash2, Edit } from 'lucide-react';


const Expenseitem = (props) => {
    const context = useContext(expenseContext);
    const { deleteExpense } = context;
    const { expense, updateExpense } = props;

    const handleDisplay = async (e) => {        
        e.preventDefault();
    }

    return (
        <div className="col-md-3" >
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{expense.description}</h5>
                        <Trash2 className="mx-2 cursor-pointer" onClick={()=>{deleteExpense(expense._id)}} size={18}/>
                        <Edit className="mx-2 cursor-pointer" onClick={()=>{updateExpense(expense)}} size={18}/>
                    </div>
                    <p className="card-text">Amount: {expense.amount}</p>
                </div>
            </div>
        </div>
    )
}

export default Expenseitem