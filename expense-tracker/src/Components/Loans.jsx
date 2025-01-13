import React, { useContext, useEffect, useRef, useState } from 'react'
import loanContext from "../context/loans/loanContext"
import Loanitem from './Loanitem';
import AddLoan from './AddLoan';
import { Home } from './Home';
import { useNavigate } from 'react-router-dom';

const Loans = () => {
    if(localStorage.getItem('token') === "") return <Home></Home>;
    const navigate = useNavigate();

    const context = useContext(loanContext);
    
    const { loans, getLoans, editLoan, setLoans } = context;
    
    const ref = useRef(null)
    const refClose = useRef(null)
    const [loan, setLoan] = useState({id: "", ename: "", edescription: "", eamount: "", edate: "", emodeOfPayment: "", eloanType: ""})
    const [ loading, setloading ] = useState(true);
    
    async function getAllLoans() {
        let validUser = await getLoans();
        if( validUser === false ) navigate("/logout");
        setloading(false);
    }

    useEffect(() => {
        getAllLoans();
    }, [setLoans])     
   

    const updateLoan = (currentLoan, currentID) => {
        ref.current.click();
        if(currentLoan.amount < 0) {
            setLoan({id: currentID, ename: currentLoan.name, eamount: Math.abs(currentLoan.amount), edescription: currentLoan.description, edate:currentLoan.date, emodeOfPayment: currentLoan.modeOfPayment, eloanType: "Taken"})
        }
        else {
            setLoan({id: currentID, ename: currentLoan.name, eamount: Math.abs(currentLoan.amount), edescription: currentLoan.description, edate:currentLoan.date, emodeOfPayment: currentLoan.modeOfPayment, eloanType: "Given"})
        }
    }

    const handleClick = (e)=>{ 
        e.preventDefault();
        if(editLoan(loan.id, loan.ename, loan.eamount, loan.edescription, loan.edate, loan.emodeOfPayment, loan.eloanType) === false) navigate("/logout");
        refClose.current.click();
    }

    const onChange = (e)=>{
        setLoan({...loan, [e.target.name]: e.target.value})
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
                            <h5 className="modal-title" id="exampleModalLabel">Edit Loan</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Friend's Name</label>
                                    <input type="text" className="form-control" id="ename" name="ename" value={loan.ename} onChange={onChange} minLength={1} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="amount" className="form-label">Amount</label>
                                    <input type="number" className="form-control" id="eamount" name="eamount" value={loan.eamount} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={loan.edescription} onChange={onChange} minLength={1} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input type="date" className="form-control" id="edate" name="edate" value={loan.edate} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="modeOfPayment" className="form-label">Payment Mode</label>
                                    <input type="text" className="form-control" id="emodeOfPayment" name="emodeOfPayment" value={loan.emodeOfPayment} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="loanType" className="form-label">Loan Type</label>
                                    <select
                                        type="text"
                                        className="form-control"
                                        id="eloanType"
                                        name="eloanType"
                                        value={loan.eloanType}
                                        onChange={onChange}
                                        required
                                    >
                                        <option value="">Select loan type</option>
                                        <option value="Taken">Loan Taken</option>
                                        <option value="Given">Loan Lent</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={loan.ename.length < 1 || loan.eamount === 0 || loan.edescription.length < 1 || loan.eloanType.length < 1} onClick={handleClick} type="button" className="btn btn-primary">Update Loan</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Loans you have given:</h2>
                <div className="container mx-2"> 
                {loans.length===0 && 'No loans to display'}
                </div>
                {loans.filter(loan => loan.amount > 0).map((loan) => {
                    return <Loanitem key={loan.id} updateLoan={updateLoan} loan={loan} />
                })}
            </div>
            <div className="row my-3">
                <h2>Loans you have taken:</h2>
                <div className="container mx-2"> 
                {loans.length===0 && 'No loans to display'}
                </div>
                {loans.filter(loan => loan.amount < 0).map((loan) => {
                    return <Loanitem key={loan.id} updateLoan={updateLoan} loan={loan} />
                })}
            </div>    
             <AddLoan />
        </>
    )
}

export default Loans