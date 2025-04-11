import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDone = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
      .then(() => fetchTodos())
      .catch(err => console.log(err));
  };

  const handleDelete = (todo) => {
    if (!todo.done) {
      const confirmDelete = window.confirm("This task is not marked as done. Are you sure you want to delete it?");
      if (!confirmDelete) return;
    }
    axios.put(`http://localhost:3001/delete/${todo._id}`)
      .then(() => fetchTodos())
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1 className="todo-title">Todo List</h1>
      <Create onAdd={fetchTodos} />
      <div className="task-list">
        {
          todos.length === 0
            ? <h2>No Record</h2>
            : todos.map((todo, index) => (
                <div key={index} className="task-item">
                  <div className="task-left">
                    <div className="task-icon" onClick={() => !todo.done && handleDone(todo._id)}>
                      {todo.done ? <BsFillCheckCircleFill /> : <BsCircleFill />}
                    </div>
                    <p className={`task-text ${todo.done ? 'done' : ''}`}>{todo.task}</p>
                  </div>
                  <div className="task-delete" onClick={() => handleDelete(todo)}>
                    <BsFillTrashFill />
                  </div>
                </div>
              ))
        }
      </div>
    </div>
  );
}

export default Home;
