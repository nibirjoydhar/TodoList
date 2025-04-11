import React, { useState } from 'react';
import axios from 'axios';

function Create({ onAdd }) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (!task.trim()) return;

    axios.post('http://localhost:3001/add', { task })
      .then(() => {
        setTask('');
        if (onAdd) onAdd(); // refresh list
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
