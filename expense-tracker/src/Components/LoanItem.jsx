import React, {useContext} from 'react'
import loanContext from "../context/loans/loanContext"
import { Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Loanitem = (props) => {
    const context = useContext(loanContext);
    const navigate = useNavigate();
    const { deleteLoan } = context;
    const { loan, updateLoan } = props;

    const handleDelete = async (e) => {
        e.preventDefault();
        const confirmed = confirm("Are you sure you want to delete this loan?");
        if(confirmed){      
        const isDeleted = await deleteLoan(loan.id);
        if (!isDeleted) navigate("/logout");
        }
    };

    return (
        <div className="col-md-3" >
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{loan.name}</h5>
                        <Trash2 className="mx-2 cursor-pointer" onClick={handleDelete} size={18}/>
                        <Edit className="mx-2 cursor-pointer" onClick={()=>{updateLoan(loan, loan.id)}} size={18}/>
                    </div>
                    <p className="card-text">Amount: {Math.abs(loan.amount)}</p>
                </div>
            </div>
        </div>
    )
}

export default Loanitem