const NewTodoCard = ({ localTodos, setLocalTodos,newDescription, setNewDescription, newTitle, setNewTitle }) => {

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
        console.log(event.target.value)
    }
    
      const handleDescriptionChange = (event) => {
        setNewDescription(event.target.value)
        console.log(event.target.value)
    }

    const addTodo = (event) => {
        event.preventDefault()
        const todoObject = {
          id: localTodos.length + 1,
          title: newTitle,
          description: newDescription,
          status: 0,
          createdAt: new Date().toISOString(),
        }
        const initialTodos = JSON.parse(localStorage.getItem("todos"))
        localStorage.setItem("todos", JSON.stringify(initialTodos.concat(todoObject)))
        setLocalTodos(JSON.parse(localStorage.getItem("todos")))
    }

    return (
        <div id="new" class="card">            
            <h3>New To-Do</h3><br/>
            <form onSubmit={addTodo}>
                <div id="new" class="card"> 
                    <input type="text" class="inputform title" onChange={handleTitleChange} placeholder="Title..."/>
                    <textarea type="text" class="inputform desc" placeholder="Description..." width="100" height="100" onChange={handleDescriptionChange}></textarea>
                    <button type="submit" class="submitbutton">Save</button>
                </div>
            </form>
        </div>
    )
}

export default NewTodoCard