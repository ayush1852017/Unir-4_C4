const express = require('express');
const User = require('../models/user.model');
const router  = express.Router();

router.get('',async(req,res)=>{
    try {
        return res.status(201).send("user");
    } catch (error) {
        return res.status(500).send({message:error.message});    }
})
module.exports = router;