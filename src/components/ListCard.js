import React, { useState, useEffect } from 'react'
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import todoService from '../services/todolist'
import ListItem from './ListItem'

import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"

const DetailModal = ({ modal, setModal, selectedList, setLocalTodos, editedTitle, setEditedTitle, editedDescription, setEditedDescription, editedStatus, setEditedStatus}) => {

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

    const editList = (event) => {
        event.preventDefault()
        const todoObject = {
            id: selectedList.id,
            title: editedTitle,
            description: editedDescription,
            status: Number(editedStatus),
            createdAt: selectedList.createdAt,
        }
        const initialTodos = JSON.parse(localStorage.getItem("todos"))
        const withoutEdited = initialTodos.filter(i => i.id !== selectedList.id)
        localStorage.setItem("todos", JSON.stringify(withoutEdited.concat(todoObject)))
        setLocalTodos(JSON.parse(localStorage.getItem("todos")))
        setModal(false)
    }



    return (
        <PureModal isOpen={modal}onClose={() => {setModal(false);return true;}}>
            <div className="modal">
                <br />
                <form onSubmit={editList}>
                    Title {editedTitle} <br /><input onChange={handleEditedTitleChange} value={editedTitle} className='input' style={{backgroundColor: "grey", color: "white", width: "240px"}} type="text" /><br /><br />
                    Description <textarea onChange={handleEditedDescriptionChange} value={editedDescription} className='input' style={{backgroundColor: "grey", color: "white"}} name="" id="" cols="30" rows="10"></textarea><br />
                    Status 
                    <select name="" id="" onChange={handleEditedStatusChange}>
                        <option value={selectedList.status === 1 ? 1: 0}>{selectedList.status === 1 ? 1: 0}</option>
                        <option value={selectedList.status === 0 ? 1: 0}>{selectedList.status === 0 ? 1: 0}</option>
                    </select>
                    <br />
                    <br />
                    <button className='submitbutton'>Save</button>
                </form>
            </div>
        </PureModal>
    )
}

const ListCard = ({ localTodos, setLocalTodos }) => {
    const [modal, setModal] = useState(false);
    const [selectedList, setSelectedList] = useState([])

    const [editedTitle, setEditedTitle] = useState('')
    const [editedDescription, setEditedDescription] = useState('')
    const [editedStatus, setEditedStatus] = useState('')

    const [selectedPage, setSelectedPage] = useState(0)

    useEffect(() => {
        todoService
          .getAll()
          .then(initialTodos => {
            localStorage.setItem("todos", JSON.stringify(initialTodos))
            setLocalTodos(JSON.parse(localStorage.getItem("todos"))) 
          })
    }, [])


    return (
            <div id="list" class="card">

                <DetailModal modal={modal} setModal={setModal} selectedList={selectedList} setLocalTodos={setLocalTodos} 
                    editedTitle={editedTitle} setEditedTitle={setEditedTitle}
                    editedDescription={editedDescription} setEditedDescription={setEditedDescription}
                    editedStatus={editedStatus} setEditedStatus={setEditedStatus}
                />

                <nav>
                    {/* Nanti dibikin switch */}
                    <ul class="nav-list">
                        <li>

                                <button class={selectedPage === 0 ? 'clicked' : ''} onClick={() => setSelectedPage(0)}>
                                    On Progress
                                </button>
                        </li>
                        <li>
                                <button class={selectedPage === 1 ? 'clicked' : ''} onClick={() => setSelectedPage(1)} >
                                Done
                                </button>
                        </li>
                    </ul>
                </nav>

                {/* Nanti dibikin component sendiri */}
                <div class="search">
                    <input type="text" class="input search" name="" id="" placeholder="Search..."/>
                </div>

                <div class="list">
                    {
                        localTodos.filter(l=> l.status === 0 ).map(todo => (
                            <ListItem todo={todo} modal={modal} setModal={setModal} selectedList={selectedList} setSelectedList={setSelectedList} 
                                editedTitle={editedTitle} setEditedTitle={setEditedTitle}
                                editedDescription={editedDescription} setEditedDescription={setEditedDescription}
                                editedStatus={editedStatus} setEditedStatus={setEditedStatus}
                                selectedList={selectedList} setLocalTodos={setLocalTodos}
                                setSelectedPage={setSelectedPage}
                            />
                        ))
                    }

                </div>

            </div>
    )
}

export default ListCard