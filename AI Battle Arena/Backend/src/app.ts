import express from 'express';
import useGraph from "./services/graph.ai.service.js"
const app= express();

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.get("/use-graph",async(req,res)=>{
 const graph = await useGraph("write and code for factorial in c++")
 res.json(graph)
})


export default app;