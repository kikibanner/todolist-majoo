import React, { useState, useEffect } from 'react'
import NewTodoCard from "./components/NewTodoCard";
import ListCard from "./components/ListCard";

function App() {
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [localTodos, setLocalTodos] = useState([])

  return (
    <div class="container">
        <NewTodoCard localTodos={localTodos} setLocalTodos={setLocalTodos} newDescription={newDescription} setNewDescription={setNewDescription} newTitle={newTitle} setNewTitle={setNewTitle}/>        
        <ListCard localTodos={localTodos} setLocalTodos={setLocalTodos} newDescription={newDescription} setNewDescription={setNewDescription} newTitle={newTitle} setNewTitle={setNewTitle}/>        
    </div>
  );
}

export default App;
