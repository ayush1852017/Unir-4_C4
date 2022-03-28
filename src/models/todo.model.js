const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    title:{type:"string",required:"true"},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user",required:"true"}
},{
    versionKey:false,
    timeStamp:true,
})

const Todo = mongoose.Model("todo",todoSchema);
module.exports =Todo;