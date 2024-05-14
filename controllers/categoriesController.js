const Category = require("../models/Category");
const Todo = require("../models/Todo");


const getCategories = async(req,res) => {

    const { username } = req.params;
  
    console.log(username);
    try {
        Category.find({username:username}).sort({_id:-1}).then((categories)=> {
                res.status(201).json({ categories});
                console.log(categories); 
        }).catch((err)=>{
          res.status(401).json({ message: 'Internal server error' });
          console.log(err);
        });
    } catch (error) {
      res.status(401).json({ message: 'Internal server error' });
      console.log(error);
    }
  }


  const deleteCategory = async(req,res) => {

    const { id, name } = req.params;
  
    console.log(id);
    try {
        Category.deleteOne({_id:id}).then(()=> {
          Todo.deleteMany({category: name }).then(() =>{
            res.status(201).json({message:"Category deleted successfully"});
            console.log("categories deleted");
          }).catch((err)=>{
            res.status(401).json({ message: 'Internal server error' });
            console.log(err);
          });
                 
        }).catch((err)=>{
          res.status(401).json({ message: 'Internal server error' });
          console.log(err);
        });
    } catch (error) {
      res.status(401).json({ message: 'Internal server error' });
      console.log(error);
    }
  }

  const addCategory = async(req,res) => {

    const { username,name } = req.body;
  
    console.log("username:",username);

    const newCategory = new Category({
        name: name,
  username: username,
  date: new Date()
    })

    const duplicateCategory = await Category.findOne({name:name,username:username});
    try {
      if(name == ""){
        return res.status(401).json({ message: 'Name field is require, add name and try again' });
      }
       if(duplicateCategory){
        return res.status(401).json({ message: 'Category with name already exist, change the name and try again' });
        console.log(err);
       } else{
        newCategory.save().then(()=> {
            res.status(201).json({message:"Category Added successfully"});
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


  module.exports = {getCategories, deleteCategory, addCategory};