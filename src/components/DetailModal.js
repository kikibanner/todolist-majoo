import React, { useState, useEffect } from 'react'
import PureModal from 'react-pure-modal';

import { useSelector, useDispatch } from 'react-redux'
import { createInitialToDos, createToDo, updateSelectedToDo, destrroyToDo } from '../reducers/toDoListReducer'

const DetailModal = ({ modal, setModal, selectedList, setEditedTitle, editedTitle, setEditedDescription, editedDescription, setEditedStatus, editedStatus}) => {
    const dispatch = useDispatch()
    const [unused, setUnused] = useState()
    
    const handleEditedTitleChange = (event) => {
        setEditedTitle(event.target.value)
    }
    
    const handleEditedDescriptionChange = (event) => {
        setEditedDescription(event.target.value)
    }

    const handleEditedStatusChange = (event) => {
        setEditedStatus(event.target.value)
    }

    const updateTodo = (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const description = event.target.description.value
        const status = event.target.status.value
        const id = event.target.id.value
        dispatch(updateSelectedToDo(id, title, description, status))
    }

    const deleteTodo = (id) => {
        dispatch(destrroyToDo(id))
    }

    return (
        <PureModal isOpen={modal} onClose={() => {setModal(false);return true;}}>
            <div className="modal">
                <br />
                <form onSubmit={updateTodo}>
                    <div id="new" class="card" style={{color: "white", padding: "10%"}}> 
                        <input type="number" class="inputform title" name="id" placeholder="id..." value={selectedList.id} hidden={true}/>
                        Tittle
                        <input type="text" class="inputform title" name="title" placeholder="Title..." value={editedTitle} onChange={handleEditedTitleChange}/>
                        Description
                        <textarea type="text" class="inputform desc" placeholder="Description..." width="100" height="100" name="description" value={editedDescription} onChange={handleEditedDescriptionChange}></textarea>
                        Status 
                        <select name="status" onChange={handleEditedStatusChange} style={{ marginBottom: "20px" }}>
                            <option value={selectedList.status === 1 ? 1: 0}>{selectedList.status === 1 ? 1: 0}</option>
                            <option value={selectedList.status === 0 ? 1: 0}>{selectedList.status === 0 ? 1: 0}</option>
                        </select>
                        <button type="submit" class="submitbutton" onClick={() => setModal(false)}>Save</button>
                        <button class="deletebutton" onClick={() => {deleteTodo(selectedList.id); setModal(false)}} hidden={selectedList.status == 0 ? '' : true}>Delete</button>
                    </div>
                </form>
            </div>
        </PureModal>
    )
}

export default DetailModal