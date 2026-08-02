import express from "express";
import morgan from "morgan"
import fs from "fs"


const app=express()

app.use(morgan("dev"))

const WORKING_DIR= "/workspace"

app.get("/",(req,res)=>{

    res.status(200).json({
        
        message:"sandbox agent is running",
        status:"success"})
    })


    app.get("/list-files",async (req,res)=>{

          const elements =  await fs.promises.readdir(WORKING_DIR);

          res.status(200).json({
            message:"elements fetched successfully",
            elements
           
          })
    })
    
export default app
