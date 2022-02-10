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
        setSelectedPage(0)
    }
    
    return (
        <div class="list-item" key={todo.id}>
            <button onClick={(event)=> checkList(event)} type="submit" class="delete" hidden={todo.status == 1 ? true : false} class="check">V</button>
            <br />
            <div class="text">
                <b>{todo.title}</b>
                <p>{todo.createdAt}</p>
            </div>
            <button className="view"
            onClick={() => {
                setModal(true)
                setSelectedList(todo)
                setEditedTitle(todo.title)
                setEditedDescription(todo.description)
                setEditedStatus(todo.status)
            }}> <small>edit</small> </button>
            <button class="delete" hidden={todo.status == 1 ? true : false}>X</button>
        </div>
    )
}

export default ListItem

