import ExpenseContext from "./ExpenseContext";
import { useState } from "react";

const ExpenseState = (props) => {
  const host = "http://localhost:8080"
  const expensesInitial = []
  const [expenses, setExpenses] = useState(expensesInitial)

  // Get all Expenses
  const getExpenses = async () => {
    // API Call 
    const response = await fetch(`${host}/api/expenses/view`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    setExpenses(json)
  }

  // Add a Expense
  const addExpense = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/expenses/addexpense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      },
      body: JSON.stringify({title, description, tag})
    });

    const expense = await response.json();
    setExpenses(expenses.concat(expense))
  }

  // Delete a Expense
  const deleteExpense = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/expenses/deleteexpense/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      }
    });
    const json = response.json(); 
    const newExpenses = expenses.filter((expense) => { return expense._id !== id })
    setExpenses(newExpenses)
  }

  // Edit a Expense
  const editExpense = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/expenses/updateexpense/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
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
    setExpenses(newExpenses);
  }

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, editExpense, getExpenses }}>
      {props.children}
    </ExpenseContext.Provider>
  )

}
export default ExpenseState;