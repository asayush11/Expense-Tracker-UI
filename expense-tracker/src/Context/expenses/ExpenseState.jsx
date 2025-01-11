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
    if(json.success){
      alert(json.message);
      setExpenses(json.data)
    }
    else{
      alert(json.error);
      if(response.status == 401) return false;
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
      body: JSON.stringify({description, amount, date, modeOfPayment})
    });

    const expense = await response.json();
    if(expense.success){
      alert(expense.message);
      setExpenses(expenses.concat(expense.data))
    }
    else{
      alert(expense.error);
      if(response.status == 401) return false;
    }    
    return true;
  }

  // Delete a Expense
  const deleteExpense = async (id) => {
    // API Call
    let token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/expenses/remove`+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      }
    });
    const json = response.json(); 
    if(json.success){
       alert(json.message);
       const newExpenses = expenses.filter((expense) => { return expense._id !== id })
       setExpenses(newExpenses)
    }
    else{
      alert(json.error);
      if(response.status == 401) return false;
    }
    return true;
  }

  // Edit a Expense
  const editExpense = async (id, title, description, tag) => {
    // API Call 
    /*const response = await fetch(`http://localhost:8080/api/expenses/view`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newExpenses = JSON.parse(JSON.stringify(expenses))
    // Logic to edit in client
    for (let index = 0; index < newExpenses.length; index++) {
      const element = newExpenses[index];
      if (element._id === id) {
        newExpenses[index].title = title;
        newExpenses[index].description = description;
        newExpenses[index].tag = tag; 
        break; 
      }
    }  
    setExpenses(newExpenses);*/
  }

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, editExpense, getExpenses }}>
      {props.children}
    </ExpenseContext.Provider>
  )

}
export default ExpenseState;