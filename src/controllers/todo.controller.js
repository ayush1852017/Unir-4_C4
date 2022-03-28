const express = require('express');
const User = require('../models/user.model');
const Todo = require('../models/todo.model');
const authenticate = require('../middleware/auth.middleware');
const router  = express.Router();

router.get('',async(req,res)=>{
    try {
        const todo = await find().lean().exec();

        return res.status(201).send(todo);
    } catch (error) {
        return res.status(500).send({message:error.message});   
     }
})
router.post('',authenticate,async(req,res)=>{
    req.body.userId= req.userId;
    try {
        const todo = await create(req.body);
        return res.status(201).send(todo);
    } catch (error) {
        return res.status(500).send({message:error.message}); 
    }
})
router.patch('/:id',authenticate,async(req, res)=>{
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.tododId,req.body,{new:true});
        return res.status(200).send(todo);
    } catch (error) {
        return res.status(500).send({message:error.message}); 
    }
})
router.delete('/:id',authenticate,async(req, res)=>{
    try {
        const todo = await Todo.findByIdAndDelete(req.params.tododId);
        return res.status(200).send(todo);
    } catch (error) {
        return res.status(500).send({message:error.message}); 
    }
})
module.exports = router;