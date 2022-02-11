const ListItem = ({setSelectedPage, todo, modal, setModal, setSelectedList, setEditedTitle, setEditedDescription, setEditedStatus, selectedList, setLocalTodos}) => {
    const checkList = (event) => {
        event.preventDefault()
        const todoObject = {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            status: 1,
            createdAt: todo.createdAt,
        }
        const initialTodos = JSON.parse(localStorage.getItem("todos"))
        const withoutEdited = initialTodos.filter(i => i.id !== todo.id)
        localStorage.setItem("todos", JSON.stringify(withoutEdited.concat(todoObject)))
        setLocalTodos(JSON.parse(localStorage.getItem("todos")))
    }

    const deleteList = (event) => {
        event.preventDefault()
        const todoObject = {
            id: todo.id,
        }
        const initialTodos = JSON.parse(localStorage.getItem("todos"))
        const withoutDeleted = initialTodos.filter(i => i.id !== todo.id)
        localStorage.setItem("todos", JSON.stringify(withoutDeleted))
        setLocalTodos(JSON.parse(localStorage.getItem("todos")))
    }
    
    return (
        <div class="list-item" key={todo.id} onClick={() => {
                setModal(true)
                setSelectedList(todo)
                setEditedTitle(todo.title)
                setEditedDescription(todo.description)
                setEditedStatus(todo.status)
            }}>
            <br />
            <div class="text">
                <b>{todo.title}</b>
                <p>{todo.createdAt}</p>
            </div>
        </div>
    )
}

export default ListItem

