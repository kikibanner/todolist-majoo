import { useSelector, useDispatch } from 'react-redux'
import { createToDo} from '../reducers/toDoListReducer'

const NewTodoCard = () => {
    const dispatch = useDispatch()

    const addTodo = (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const description = event.target.description.value
        event.target.title.value = ''
        event.target.description.value = ''
        dispatch(createToDo(title, description))
    }

    return (
        <div id="new" class="card">            
            <h3>New To-Do</h3><br/>
            <form onSubmit={addTodo}>
                <div id="new" class="card"> 
                    <input type="text" class="inputform title" name="title" placeholder="Title..."/>
                    <textarea type="text" class="inputform desc" placeholder="Description..." width="100" height="100" name="description" ></textarea>
                    <button type="submit" class="submitbutton">Save</button>
                </div>
            </form>
        </div>
    )
}

export default NewTodoCard