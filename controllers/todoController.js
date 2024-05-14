const Todo = require("../models/Todo");

const getTodos = async(req,res) => {

    const { username, category } = req.params;
  
    console.log(username);
    try {
        Todo.find({username:username, category: category}).sort({_id:-1}).then((todos)=> {
                res.status(201).json({ todos});
                console.log(todos); 
        }).catch((err)=>{
          res.status(401).json({ message: 'Internal server error' });
          console.log(err);
        });
    } catch (error) {
      res.status(401).json({ message: 'Internal server error' });
      console.log(error);
    }
  }


  const deleteTodo = async(req,res) => {

    const { id } = req.params;
  
    console.log(id);
    try {
        Todo.deleteOne({_id:id}).then(()=> {
                res.status(201).json({message:"Todo deleted successfully"});
                console.log("Todo deleted"); 
        }).catch((err)=>{
          res.status(401).json({ message: 'Internal server error' });
          console.log(err);
        });
    } catch (error) {
      res.status(401).json({ message: 'Internal server error' });
      console.log(error);
    }
  }

  const updateTodo = async(req,res) => {

    const { id,checked } = req.body;
  
    console.log(id);
    try {
        Todo.updateOne({_id:id}, {checked:checked}).then(()=> {
                res.status(201).json({message:"Todo updated successfully"});
                console.log("todo updated"); 
        }).catch((err)=>{
          res.status(401).json({ message: 'Internal server error' });
          console.log(err);
        });
    } catch (error) {
      res.status(401).json({ message: 'Internal server error' });
      console.log(error);
    }
  }

  const addTodo = async(req,res) => {

    const { username,name,category, } = req.body;
  
    console.log("username:",username);

    const newTodo = new Todo({
        name: name,
        category: category,
        username: username,
        checked: false, 
        date: new Date()
   })

    const duplicateCategory = await Todo.findOne({name:name, category: category});
    try {
      if(name == ""){
        return res.status(401).json({ message: 'Name field is require, add name and try again' });
      }
       if(duplicateCategory){
        return res.status(401).json({ message: 'Todo with name already exist, change the name and try again' });
        console.log(err);
       } else{
        newTodo.save().then(()=> {
            res.status(201).json({message:"Todo Added successfully"});
            console.log("categories deleted"); 
    }).catch((err)=>{
      res.status(401).json({ message: 'Internal server error' });
      console.log(err);
    });
       }
    } catch (error) {
      res.status(401).json({ message: 'Internal server error' });
      console.log(error);
    }
  }




  module.exports = {getTodos, deleteTodo, addTodo, updateTodo};