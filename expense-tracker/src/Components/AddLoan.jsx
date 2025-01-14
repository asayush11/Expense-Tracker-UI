import React, { useContext, useState } from 'react'
import loanContext from '../Context/loans/LoanContext';
import { useNavigate } from 'react-router-dom'

const AddLoan = () => {
    const context = useContext(loanContext);
    const navigate = useNavigate();
    const { addLoan } = context;

    const [loan, setLoan] = useState({ name: "", description: "", amount: 0.0, date: "", modeOfPayment: "", loanType: "" })

    const handleClick = async (e) => {
        e.preventDefault();
        const isAdded = await addLoan(loan.name, loan.description, loan.amount, loan.date, loan.modeOfPayment, loan.loanType);
        if (!isAdded) navigate("/logout");
        else setLoan({ name: "", description: "", amount: 0.0, date: "", modeOfPayment: "", loanType: "" });
    }

    const onChange = (e) => {
        setLoan({ ...loan, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h2>Add a Loan</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Friend's Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={loan.name} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={loan.description} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" id="amount" name="amount" value={loan.amount} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" name="date" value={loan.date} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="modeOfPayment" className="form-label">Mode of Payment</label>
                    <input type="text" className="form-control" id="modeOfPayment" name="modeOfPayment" value={loan.modeOfPayment} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="loanType" className="form-label">Loan Type</label>
                    <select
                        type="text"
                        className="form-control"
                        id="loanType"
                        name="loanType"
                        value={loan.loanType}
                        onChange={onChange}
                        required
                    >
                        <option value="">Select loan type</option>
                        <option value="Taken">Loan Taken</option>
                        <option value="Given">Loan Given</option>
                    </select>
                </div>


                <button disabled={loan.name.length < 1 || loan.amount <= 0 || loan.description.length < 1 || loan.loanType.length < 1} type="submit" className="btn btn-primary" onClick={handleClick}>Add Loan</button>
            </form>
        </div>
    )
}

export default AddLoan;