const todoListReducer = (state = [], action) => {
    switch(action.type) {
        case 'INITIAL_TODO':
            return [...state, action.data]
        case 'NEW_TODO':
            return [...state, action.data]
        case 'DELETE_TODO':
            const id = action.data.id
            return state.filter(t => t.id !== id)
        case 'UPDATE_TODO': {
            const id = Number(action.data.id)
            const todoToChange = state.find(n => n.id === id)
            const changedTodo = { 
                ...todoToChange, 
                id: Number(id),
                title: action.data.title, 
                description: action.data.description,
                status: Number(action.data.status) 

            }
            const withoutEdited = [...state.filter(s => s.id !== id)]
            return [...withoutEdited, changedTodo]
        }
        default:
            return state
    }
}

export const createInitialToDos = (id, title, description, status, createdAt) => {
    return {
        type: 'INITIAL_TODO',
        data: {
            title: title,
            description: description,
            status: status,
            createdAt: createdAt,
            id: id
        }
    }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const date = new Date()

export const createToDo = (title, description) => {
    return {
        type: 'NEW_TODO',
        data: {
            title: title,
            description: description,
            status: 0,
            createdAt: (`${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`),
            id: generateId()
        }
    }
}

export const updateSelectedToDo = (id, title, description, status) => {
    return {
      type: 'UPDATE_TODO',
      data: { 
          id: id,
          title: title,
          description: description,
          status: status
       }
    }
}

export const destrroyToDo = (id) => {
    return {
      type: 'DELETE_TODO',
      data: { id }
    }
}

export default todoListReducer