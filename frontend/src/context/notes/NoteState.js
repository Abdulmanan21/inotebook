import {useState} from "react";

import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const host='http://localhost:4000'
    const notesinitial=[
        
      ]

      const [notes, setNotes]= useState(notesinitial);

// Get all notes

      const getnotes =async ()=>{
  
        //TODO api Call
        const response = await fetch(`${host}/notes/fetchallnotes`, {
         method: 'GET', 
          headers: {
           'Content-Type': 'application/json',
           'auth-token':localStorage.getItem('token')
           // 'Content-Type': 'application/x-www-form-urlencoded',
         },
         // body data type must match "Content-Type" header
       });
       //const json= response.json(); // parses JSON response into native JavaScript objects
       
       //const json= response.json(); 
       const json= await response.json()
       console.log(json)
       setNotes(json)
       }






 // Add a Note
const addNote =async (title, description, tag)=>{
  
 //TODO api Call
 const response = await fetch(`${host}/notes/addnotes`, {
  method: 'POST', 
   headers: {
    'Content-Type': 'application/json',
    'auth-token':localStorage.getItem('token')
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
});
//const json= response.json(); // parses JSON response into native JavaScript objects

const note= await response.json(); 
setNotes(notes.concat(note))
console.log(note);


console.log("Adding a new note")
}


 // Delete a Note
 const deleteNote =async (id)=>{
  
  const response = await fetch(`${host}/notes/deletenote/${id}`, {
    method: 'DELETE', 
     headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem('token')
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  // body data type must match "Content-Type" header
  });
  const json= response.json();
  console.log(json)
  
  console.log('Deleting the notes with id '+ id)
   const newNotes= notes.filter((note)=>{return note._id!==id});
setNotes(newNotes);
 }




 // Edit a Note
 const editNote =async (id, title, description, tag)=>{

// API CAALING 
// Example POST method implementation:
  // Default options are marked with *
  const response = await fetch(`${host}/notes/updatenote/${id}`, {
    method: 'PUT', 
     headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem('token')
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
  });
  const json= await response.json(); // parses JSON response into native JavaScript objects

console.log(json)






let newNotes = JSON.parse(JSON.stringify(notes))
 // this is the logic to edit in client
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if(element._id===id){
      
      newNotes[index].title=title;
      newNotes[index].description=description;
      newNotes[index].tag=tag;
      
      break;
      
    }
    
  }
  setNotes(newNotes)
 }

 return(
     <NoteContext.Provider value ={{notes ,addNote,deleteNote,editNote, getnotes}}>
         {props.children}
     </NoteContext.Provider>
 )
}

export default NoteState;