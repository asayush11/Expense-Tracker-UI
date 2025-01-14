import { toast } from "react-toastify";
import { useContext } from "react";
import LoanContext from "./LoanContext";
import { useState } from "react";
import authContext from "../auth/AuthContext";

const LoanState = (props) => {
  const loansInitial = []
  const [loans, setLoans] = useState(loansInitial)
  const context = useContext(authContext);
  const { authToken } = context;

  const refreshLoans = () => {
        setLoans([]);
  }

  // Get all Loans 
  const getLoans = async () => {
    // API Call 
    let allLoans = [];
    let response = await fetch(`http://localhost:8080/api/loans/view/taken`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authToken
      }
    });
    let json = await response.json()
    if (response.status === 401) {
        toast.error("Unauthenticated User");
        return false;
    }
    if (json.success) {
      toast.info(json.message);
      allLoans = [...json.data];
    }
    else {
      toast.error(json.error);
      return true;
    }
    
    response = await fetch(`http://localhost:8080/api/loans/view/lent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authToken
      }
    });
    json = await response.json()
    if (response.status === 401) {
        toast.error("Unauthenticated User");
        return false;
      }
    if (json.success) {
      toast.info(json.message);
      allLoans = [...allLoans, ...json.data];
      setLoans(allLoans);
    }
    else {
      toast.error(json.error);
    }
    return true;
  }

  // Add a Loan
  const addLoan = async (name, description, amount, date, modeOfPayment, loanType) => {
    // API Call 
    const response = await fetch(`http://localhost:8080/api/loans/addLoan` + loanType, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authToken
      },
      body: JSON.stringify({ name, description, amount, date, modeOfPayment })
    });

    const loan = await response.json();

    if (response.status === 401) {
      toast.error("Unauthenticated User");
      return false;
    }
    if (loan.success) {
      toast.info(loan.message);
      setLoans(loans.concat(loan.data))
    }
    else {
      toast.error(loan.error);
    }
    return true;
  }

  // Delete a Loan
  const deleteLoan = async (id) => {
    // API Call
    const response = await fetch(`http://localhost:8080/api/loans/remove` + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authToken
      }
    });
    const json = await response.json();

    if (response.status === 401) {
      toast.error("Unauthenticated User");
      return false;
    }
    if (json.success) {
      toast.info(json.message);
      const newLoans = loans.filter((loan) => { return loan.id !== id })
      setLoans(newLoans)
    }
    else {
      toast.error(json.error);
    }
    return true;

  }

  // Settle a friend
  const settleFriend = async (name, updatedLoans) => {
    // API Call
    const response = await fetch('http://localhost:8080/api/loans/settlefriend?name=' + name, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authToken
      }
    });
    const json = await response.json();

    if (response.status === 401) {
      toast.error("Unauthenticated User");
      return [ false, updatedLoans ];
    }
    if (json.success) {
      toast.info(json.message);
      const newLoans = loans.filter((loan) => { return loan.name !== name })
      updatedLoans = updatedLoans.filter((loan) => loan.category !== name);
      setLoans(newLoans)
    }
    else {
      toast.error(json.error);
    }
    return [ true, updatedLoans ];

  }


  // Edit a Loan
  const editLoan = async (id, name, amount, description, date, modeOfPayment, loanType) => {
    // API Call 
    amount = Math.abs(Number(amount));
    if(loanType === "Taken") amount*=-1;

    const response = await fetch(`http://localhost:8080/api/loans/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authToken
      },
      body: JSON.stringify({ id, name, description, amount, date, modeOfPayment })
    });
    const json = await response.json();

    if (response.status === 401) {
      toast.error("Unauthenticated User");
      return false;
    }
    if (json.success) {
      toast.info(json.message);
      let newLoans = JSON.parse(JSON.stringify(loans))
      // Logic to edit in client
      for (let index = 0; index < newLoans.length; index++) {
        const element = newLoans[index];
        if (element.id === id) {
          newLoans[index].name = name;  
          newLoans[index].amount = amount;
          newLoans[index].description = description;
          newLoans[index].date = date;
          newLoans[index].modeOfPayment = modeOfPayment;
          break;
        }
      }
      setLoans(newLoans);
    }
    else {
      toast.error(json.error);
    }
    return true;
  }

  // Get all Loans 
  const getLoansByFriend = async () => {
    // API Call 
    let loansByFriend = [];
    let total = 0;
    const response = await fetch(`http://localhost:8080/api/loans/view`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authToken
      }
    });
    const json = await response.json()

    if (response.status === 401) {
      toast.error("Unauthenticated User");
      return [ loansByFriend, false, total ];;
    }

    if (json.success) {
      toast.info(json.message);
      loansByFriend = (json.data);
      for (let index = 0; index < loansByFriend.length; index++) {
        total += loansByFriend[index].amount;      
      }
    }
    else {
      toast.error(json.error);
    }
    return [ loansByFriend, true, total ];
  }

  return (
    <LoanContext.Provider value={{ loans, addLoan, deleteLoan, editLoan, getLoans, getLoansByFriend, refreshLoans, settleFriend }}>
      {props.children}
    </LoanContext.Provider>
  )

}
export default LoanState;