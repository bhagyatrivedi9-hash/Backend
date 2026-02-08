const express= require("express")
const cors= require("cors")
const mongoose=require("mongoose")
const path =require("path")
const app= express()
app.use(express.json());
app.use(express.static("./public"))


app.use(cors({
    origin: "*"
}))



const noteModel= require("./model/notes.model.js")

//build an api to "Create" the data into the DB

app.post("/api/notes", async (req,res)=>{
  
    const {title,description}= req.body
    
    const notes= await noteModel.create({
    title,description

    })

    res.status(201).json({
        "message":"note is created successfully",
        notes

    })
})

// build an api to "get(find)" the data from the DB

app.get("/api/notes", async(req,res)=>{
  try {
    const notes = await noteModel.find();
    res.status(200).json({ message: "data fetched", notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }

})

// build an api to delete an note

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully."
    })
})

// build an api to update the note

app.patch("/api/notes/:id", async (req,res)=>{
    const id = req.params.id
    const {description}= req.body
    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        "message":"note  updated successfully"

    })
})
console.log(__dirname)
app.use("*name",(req,res)=>{

res.sendFile(path.join(__dirname,"..","/public/index.html"))
})
module.exports= app