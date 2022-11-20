import React, {useContext, useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import AddNote from './addNotes';


import Noteitem from './Noteitem';
const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getnotes, editNote}=context;
   let history=useNavigate()
    useEffect(() => {
     if(localStorage.getItem('token')){
      getnotes()      
     }else{
      history('/login')
     }
     // eslint-disable-next-line 
    }, [])

const ref = useRef(null)
const refClose = useRef(null)
const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
const handleclick= (e)=>{
  e.preventDefault(); 
  console.log("updated note button clicked", note)
  editNote(note.id,note.etitle,note.edescription,note.etag);
  
  refClose.current.click();
}
const onChange =(e)=>{ 
  setNote({...note,[e.target.name]:e.target.value})
}



const updateNote=(currentNote)=>{
  ref.current.click();
  console.log('Clicked')
  setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description,etag:currentNote.tag})
  }
    return (
      <>
      <AddNote/>



        
    
      <button ref ={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:"none"}}>
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        


      <form>
  <div className="mb-3 my-4">
    <label htmlFor="etitle" className="form-label ">Note Title :</label>
    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
    <div id="emailHelp" className="form-text">We'll never share your Notes with anyone else.</div>
  </div>
  

  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag :</label>
    <input type="text" className="form-control" id="teag" name="etag" onChange={onChange} value={note.etag} />
  </div>    


<div className="mb-3">
<label htmlFor="edescription" className="form-label">Description :</label>
  <textarea type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} rows="3" value= {note.edescription}></textarea>
</div>
</form>



        
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleclick} type="button" className="btn btn-success">Update Note</button>
      </div>
    </div>
  </div>
</div>




        <div className='row my-3'>
             <h1>Your Notes</h1>
        {notes.map((note)=>{
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
        })}
        </div>
        </>
    )
}

export default Notes
