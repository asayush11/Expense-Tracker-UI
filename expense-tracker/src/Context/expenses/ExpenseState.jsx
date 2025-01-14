import { toast } from "react-toastify";
import { useContext } from "react";
import ExpenseContext from "./ExpenseContext";
import { useState } from "react";
import authContext from "../auth/AuthContext";

const ExpenseState = (props) => {
  const expensesInitial = []
  const [expenses, setExpenses] = useState(expensesInitial)
  const context = useContext(authContext);
  const { authToken } = context;
  
  const refreshExpenses = () => {
        setExpenses([]);
  }

  // Get all Expenses 
  const getExpenses = async () => {
    // API Call 
    const response = await fetch(`http://localhost:8080/api/expenses/view`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authToken
      }
    });
    const json = await response.json()
    if (json.success) {
      toast.info(json.message);
      setExpenses(json.data)
    }
    else {
      toast.error(json.error);
      if (response.status === 401) return false;
    }
    return true;
  }

  // Add a Expense
  const addExpense = async (description, amount, date, modeOfPayment) => {
    // API Call 
    const response = await fetch(`http://localhost:8080/api/expenses/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authToken
      },
      body: JSON.stringify({ description, amount, date, modeOfPayment })
    });

    const expense = await response.json();

    if (response.status === 401) {
      toast.error("Unauthenticated User");
      return false;
    }
    if (expense.success) {
      toast.info(expense.message);
      setExpenses(expenses.concat(expense.data))
    }
    else {
      toast.error(expense.error);
    }
    return true;
  }

  // Delete a Expense
  const deleteExpense = async (id) => {
    // API Call
    const response = await fetch(`http://localhost:8080/api/expenses/remove` + id, {
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
      const newExpenses = expenses.filter((expense) => { return expense.id !== id })
      setExpenses(newExpenses)
    }
    else {
      toast.error(json.error);
    }
    return true;

  }


  // Edit a Expense
  const editExpense = async (id, amount, description, date, modeOfPayment) => {
    // API Call
    const response = await fetch(`http://localhost:8080/api/expenses/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authToken
      },
      body: JSON.stringify({ id, description, amount, date, modeOfPayment })
    });
    const json = await response.json();

    if (response.status === 401) {
      toast.error("Unauthenticated User");
      return false;
    }
    if (json.success) {
      toast.info(json.message);
      let newExpenses = JSON.parse(JSON.stringify(expenses))
      // Logic to edit in client
      for (let index = 0; index < newExpenses.length; index++) {
        const element = newExpenses[index];
        if (element.id === id) {
          newExpenses[index].amount = Number(amount);
          newExpenses[index].description = description;
          newExpenses[index].date = date;
          newExpenses[index].modeOfPayment = modeOfPayment;
          break;
        }
      }
      setExpenses(newExpenses);
    }
    else {
      toast.error(json.error);
    }
    return true;
  }

  // Get all Expenses 
  const getExpensesByPaymentMode = async () => {
    // API Call 
    let expensesByPaymentMode = [];
    let total = 0;
    const response = await fetch(`http://localhost:8080/api/expenses/view/modeOfPayment`, {
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
      return [ expensesByPaymentMode, false, total ];;
    }

    if (json.success) {
      toast.info(json.message);
      expensesByPaymentMode = (json.data);
      for (let index = 0; index < expensesByPaymentMode.length; index++) {
        total += expensesByPaymentMode[index].amount;      
      }
    }
    else {
      toast.error(json.error);
    }
    return [ expensesByPaymentMode, true, total ];
  }

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, editExpense, getExpenses, getExpensesByPaymentMode, refreshExpenses }}>
      {props.children}
    </ExpenseContext.Provider>
  )

}
export default ExpenseState;