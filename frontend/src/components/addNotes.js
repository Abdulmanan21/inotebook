import React ,{useContext,useState}from 'react'

import noteContext from '../context/notes/noteContext'
const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote}=context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleclick= (e)=>{
        e.preventDefault(); 
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
    }
    const onChange =(e)=>{ 
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
                <div className="container my-4">
        <h1>Add a Notes</h1>
      
        <form>
  <div className="mb-3 my-4">
    <label htmlFor="title" className="form-label ">Note Title :</label>
    <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} placeholder='Enter Title' required="required"/>
    <div id="emailHelp" className="form-text">We'll never share your Notes with anyone else.</div>
  </div>
  

  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag :</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} placeholder='Enter Tag' required/>
  </div>    


<div className="mb-3">
<label htmlFor="description" className="form-label">Description :</label>
  <textarea type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} rows="3" placeholder='Write description Here ' ></textarea>
</div>


{/*
             THIS IS THE FIELD OF EXTRA DESCRIPTION IN THIS ADD NOTES COMPONENT 
*/}
        


  
  <button type="submit" className="btn btn-success" onClick={handleclick}>Add Note</button>
</form>
</div>
        </div>
    )
}

export default AddNote
