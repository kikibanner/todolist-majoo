import React, { useState, useEffect } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css';
import ListItem from './ListItem'
import DetailModal from './DetailModal';

import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"

const ListCard = ({ todos, setLocalTodos, addTodo }) => {
    const [modal, setModal] = useState(false);
    const [selectedList, setSelectedList] = useState([])

    const [editedTitle, setEditedTitle] = useState('')
    const [editedDescription, setEditedDescription] = useState('')
    const [editedStatus, setEditedStatus] = useState('')

    const [selectedPage, setSelectedPage] = useState(0)

    return (
            <Router>
            <div id="list" class="card">

                <DetailModal modal={modal} setModal={setModal} selectedList={selectedList} addTodo={addTodo} setEditedTitle={setEditedTitle} editedTitle={editedTitle} setEditedDescription={setEditedDescription} editedDescription={editedDescription} setEditedStatus={setEditedStatus} editedStatus={editedStatus}/>

                <nav>
                    <ul class="nav-list">
                        <li>
                            <Link to="/">
                                <button class={selectedPage === 0 ? 'clicked' : ''} onClick={() => setSelectedPage(0)}>
                                    On Progress
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link  to="/done">
                                <button class={selectedPage === 1 ? 'clicked' : ''} onClick={() => setSelectedPage(1)} >
                                Done
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
                
                <Switch>
                    <Route exact path="/">
                        <div class="list">
                            {
                                todos.filter(l=> l.status === 0 ).sort((a, b) => {
                                    const aDate = new Date(a.createdAt)
                                    const bDate = new Date(b.createdAt)
                                    
                                    return bDate.getTime() - aDate.getTime()
                                  }).map(todo => (
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
                    </Route>
                    <Route exact path="/done">
                        <div class="list">
                            {
                                todos.filter(l=> l.status === 1 ).sort((a, b) => {
                                    const aDate = new Date(a.createdAt)
                                    const bDate = new Date(b.createdAt)
                                    
                                    return aDate.getTime() - bDate.getTime()
                                  }).map(todo => (
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
                    </Route>
                </Switch>

            </div>
            </Router>
    )
}

export default ListCard