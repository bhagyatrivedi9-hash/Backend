import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const App = () => {

  const [notes, setNotes] = useState([ ]);
  async function fetchNotes(){
   await axios.get("https://day-9-zxr2.onrender.com/api/notes")
  .then((res)=>{
   setNotes(res.data.notes)
  })
}
useEffect(()=>{
  fetchNotes()
},[])
  
//create an note with the post api and display with the fetch fun(get api)
async function handelSubmit(e){
  e.preventDefault()
  const {title,description}= e.target.elements
 
  await axios.post("https://day-9-zxr2.onrender.com/api/notes",{
      title: title.value,
      description: description.value
  })
  .then((res)=>{
      console.log(res.data)

        fetchNotes()
  })
}
//delete an note with the delete api and display with the fetch fun(get api)
async function handleDelete(noteID){
 await axios.delete("https://day-9-zxr2.onrender.com/api/notes/"+noteID)
 .then(()=>{
  fetchNotes()
 })

}



  return (
    <>
    <form className="note-create-form" onSubmit={handelSubmit}>
      <input name='title' type="text" placeholder="Enter title" />
      <input  name="description" type="text" placeholder="Enter  description" />
      <button>Create Note</button>
    </form>
      <div className="notes">
        {notes.map((elem, index) => {
          return (
            <div className="note" key={index}>
              <h1>{elem.title}</h1>
              <p>{elem.description}</p>
              <button onClick={()=>{
                handleDelete(elem._id)
              }}>Delete</button>
           
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
