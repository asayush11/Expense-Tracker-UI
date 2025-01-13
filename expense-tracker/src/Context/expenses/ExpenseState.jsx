import { toast } from "react-toastify";
import ExpenseContext from "./ExpenseContext";
import { useState } from "react";

const ExpenseState = (props) => {
  const expensesInitial = []
  const [expenses, setExpenses] = useState(expensesInitial)

  // Get all Expenses 
  const getExpenses = async () => {
    // API Call 

    let token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/expenses/view`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
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
    // TODO: API Call
    // API Call     
    let token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/expenses/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
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
    let token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/expenses/remove` + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      }
    });
    const json = await response.json();

    if (response.status === 401) {
      toast.error("Unauthenticated User");
      return false;
    }
    if (json.success) {
      toast.info(json.message);
      const newExpenses = expenses.filter((expense) => { return expense._id !== id })
      setExpenses(newExpenses)
    }
    else {
      toast.error(json.error);
    }
    return true;

  }

  const showTotal = () => {
    let total = 0;
    for (let index = 0; index < expenses.length; index++) {
      total += expenses[index].amount;      
    }
    return total;
  }


  // Edit a Expense
  const editExpense = async (id, amount, description, date, modeOfPayment) => {
    // API Call 
    let token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/expenses/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
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
          newExpenses[index].amount = amount;
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
    let token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/expenses/view/modeOfPayment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      }
    });
    const json = await response.json()

    if (response.status === 401) {
      toast.error("Unauthenticated User");
      return [ expensesByPaymentMode, false ];;
    }

    if (json.success) {
      toast.info(json.message);
      expensesByPaymentMode = (json.data);
    }
    else {
      toast.error(json.error);
    }
    return [ expensesByPaymentMode, true ];
  }

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, editExpense, getExpenses, showTotal, getExpensesByPaymentMode }}>
      {props.children}
    </ExpenseContext.Provider>
  )

}
export default ExpenseState;