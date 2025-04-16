const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoModel = require('./models/todo');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Important for POST

// MongoDB connection
mongoose.connect('mongodb://todolist_mongodb_1:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true });


// Routes   

app.get('/get',(req,res)=>{
    todoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put('/update/:id',(req,res)=>{
  const {id}=req.params;
  // console.log(id);
  todoModel.findByIdAndUpdate({_id:id},{done:true})
  .then(result=>res.json(result))
  .catch(err=>res.json(err))
})

app.put('/delete/:id',(req,res)=>{
  const {id}=req.params;
  // console.log(id);
  todoModel.findByIdAndDelete({_id:id})
  .then(result=>res.json(result))
  .catch(err=>res.json(err))
})

app.post('/add', async (req, res) => {
  try {
    const data = await todoModel.create(req.body); // ✅ Correct function
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
