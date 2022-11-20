import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote}=context;
  
  
  
  const {note,updateNote}=props;
   
    return (
        <div className='col-md-3 my-3'>
          <div className="card" style={{borderRadius:"1.1vw"}}>
          <span className=' my-3 mx-4'> <i className="far fa-sticky-note"></i>  NOTES</span>
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <p style={{color: "grey",fontSize:"0.8vw"}}>Tags:{note.tag}</p>
    <center>
    <i className="far fa-trash-alt " onClick={()=>{deleteNote(note._id)}}></i>
    <i className="far fa-edit mx-4" onClick={()=>{updateNote(note)}}></i></center>
  </div>
</div>
        </div>
    )
}

export default Noteitem
