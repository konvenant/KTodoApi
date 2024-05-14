const User = require("../models/User");



const login = async(req,res) => {

    const { username, password } = req.body;
  
    console.log(username, password);
    try {
        User.findOne({name:username}).then((userFound)=> {
            if (userFound) { 
               if(userFound.password === password){
                res.status(201).json({ userFound});
                console.log(userFound);
               } else{
                res.status(401).json({ message: 'Incorrect password' });
                console.log("Incorrect password");
               }
            } else {
              res.status(401).json({ message: 'User not found' });
              console.log("user not found");
            }

        }).catch((err)=>{
          res.status(401).json({ message: 'Internal server error' });
          console.log(err);
        });
    } catch (error) {
      res.status(401).json({ message: 'Internal server error' });
      console.log(error);
    }
  }


  const signUp = async(req,res) => {

    const { username, password, color } = req.body;
   
  
    const newUser = new User({
        name: username,
        password: password,
        color:color,
        dateadded: new Date()
    })
     
    const duplicateUser =  await User.findOne({name:username}); 
    console.log(newUser);
    try {
      if(username == "" || password == "" || color == ""){
        return res.status(401).json({ message: 'All fields is require, add neccessary fields and try again' });
      }
       if(duplicateUser){
        res.status(401).json({ message: 'Username already taken' });
        console.log("duplicated");
       } else{
        newUser.save().then((userFound)=> {
            res.status(201).json({ userFound});
            console.log(userFound);
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

  const changePassword = async(req,res) => {

    const { username, password } = req.body;
  
    if(username == "" || password == "" ){
      return res.status(401).json({ message: 'All fields is require, add neccessary fields and try again' });
    }
    console.log(username, password);
    try {
        User.updateOne({name:username}, {password:password}).then(()=> {
                res.status(201).json({ message: "password changed" });
                console.log("doone");    
        }).catch((err)=>{
          res.status(401).json({ message: 'Internal server error' });
          console.log(err);
        });
    } catch (error) {
      res.status(401).json({ message: 'Internal server error' });
      console.log(error);
    }
  }

  const getUserName = async(req,res) => {

    const { username } = req.body;
  
    console.log(username);
    try {
        User.findOne({name:username}).then((userFound)=> {
            if (userFound) { 
                res.status(201).json({ userFound});
            } else {
              res.status(401).json({ message: 'User not found, try again' });
              console.log("user not found");
            }
        }).catch((err)=>{
          res.status(401).json({ message: 'Internal server error' });
          console.log(err);
        });
    } catch (error) {
      res.status(401).json({ message: 'Internal server error' });
      console.log(error);
    }
  }

  const getUserFavColor = async(req,res) => {

    const { username, color } = req.body;
  
    console.log(username,color);
    try {
        User.findOne({name:username, color:color}).then((userFound)=> {
            if (userFound) { 
                res.status(201).json({ userFound});
                console.log(userFound);
            } else {
              res.status(401).json({ message: 'wrong favorite color, try again' });
              console.log("user not found");
            }
        }).catch((err)=>{
          res.status(401).json({ message: 'Internal server error' });
          console.log(err);
        });
    } catch (error) {
      res.status(401).json({ message: 'Internal server error' });
      console.log(error);
    }
  }



  module.exports = {login, signUp, changePassword,getUserName,getUserFavColor};