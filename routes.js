const express = require("express");
const router = express.Router();
const {getConnectedClient} = require("./database");
const { ObjectId } = require("mongodb");

const  getCollection = () =>{
    const client = getConnectedClient();
    return client?.db("todosbd").collection("todos");
}

//GET /todos
router.get("/todos", async (req, res)=> {
    const collection = getCollection();
    if (!collection){
        res.status(500).json({mes:'err: cannot get collection'});
        return
    }
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos)
})
// POST /todos
router.post("/todos", async (req, res)=>{
    const collection = getCollection();
    const {todo} = req.body;

    if(!todo) {
        res.status(400).json({mes:'err: no todo find'})
        return
    }
    const newTodo = await collection.insertOne({todo: todo || 'my fist todo', status: false})

    res.status(201).json({todo: todo || 'my fist todo', status: false, _id: newTodo.insertedId})
})
// DELETE /todos/:id
router.delete("/todos/:id", async(req, res)=>{
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);

    const deletedTodo = await collection.deleteOne({_id})

    res.status(200).json(deletedTodo)
})
// PUT /todos/:id
router.put("/todos/:id", async(req, res)=>{
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const {status} = req.body;

    if( status === undefined) {
        res.status(400).json({mes:'err: status === undefined'})
    }

    if( typeof status !== 'boolean') {
        res.status(400).json({mes:'err: invalid status'})
    }

    const updatedTodo = await collection.updateOne({_id}, {$set: {status: !status}})

    res.status(200).json(updatedTodo);
});

module.exports = router;
