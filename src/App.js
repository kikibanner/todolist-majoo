import React, { useState, useEffect } from 'react'
import { createInitialToDos, createToDo, updateSelectedToDo, destrroyToDo } from './reducers/toDoListReducer'
import { useSelector, useDispatch } from 'react-redux'
import todoService from './services/todolist'
import NewTodoCard from "./components/NewTodoCard";
import ListCard from "./components/ListCard";

function App() {
  const dispatch = useDispatch()
  const todos = useSelector(state => state)

  const addTodo = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const description = event.target.description.value
    event.target.title.value = ''
    event.target.description.value = ''
    dispatch(createToDo(title, description))
  }


  const updateTodo = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const description = event.target.description.value
    const status = event.target.status.value
    const id = event.target.id.value
    dispatch(updateSelectedToDo(id, title, description, status))
  }

  useEffect(() => {
    todoService
      .getAll()
      .then(initialTodos => {
        initialTodos.map(i => dispatch(createInitialToDos(i.id, i.title, i.description, i.status, i.createdAt)))  
      })
  }, [])

  return (
    <div class="container">
        <NewTodoCard />       
        <ListCard todos={todos} updateTodo={updateTodo}/> 
    </div>
  );
}

export default App;

