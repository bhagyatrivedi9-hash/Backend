import express from "express"
import morgan from "morgan"
import {v7 as uuid} from "uuid"
import {createPod} from "./kubernetes/pod.js"
import {createService} from "./kubernetes/service.js"


const app= express()

app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}))

app.get("/api/sandbox/_status/healthz",(req,res)=>{

    res.status(200).json({
        message: "Sandbox server is healthy",
        status: "ok"
    })
})


app.post("/api/sandbox/start",async(req,res)=>{

   const sandboxId= uuid();

   await Promise.all([createPod(sandboxId),createService(sandboxId)])

   res.status(201).json({
    message: "Sandbox started successfully",
    sandboxId,
    previewUrl:`http://${sandboxId}.preview.localhost`
   })
})

export default app
