import React from 'react'
import { useContext } from 'react';
import {addDoc} from "firebase/firestore"
import { contextApi} from '../context/context'


  
  function AddForm() {
    
    const useContextApi = useContext(contextApi)
    return (
      <>
        <h2>To add the data</h2>
        <form className='add'>
            <label htmlFor="title" >Title:</label>
            <input type="text" id="title" name="title" />
            <label htmlFor="author">Author:</label>
            <input type="text" id="author"  name='author' />
            <button className='addBtn' onClick={useContextApi.addData}>Add a new book</button>
        </form>
        <h2>To delete enter the id </h2>
        <form className='delete'>
            <label htmlFor="delete">Id:</label>
            <input htmlFor="delete" id='itemId'/>
            <button className='deleteBtn' onClick={useContextApi.deleteData}>Delete this book</button>
        </form>
      </>
    )
    
  }
  
  export default AddForm