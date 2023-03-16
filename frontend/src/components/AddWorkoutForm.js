import React,{useContext, useState} from 'react'
import { WorkoutContext } from '../context/WorkoutContext'

const AddWorkoutForm = () => {
    const {dispatch}=useContext(WorkoutContext)
    const [input, setInput] = useState({
        title:'',
        load:'',
        reps:'',
    })
    const [error, setError] = useState(null)
    const addHandle=async(e)=>{
        e.preventDefault();

        const response=await fetch('/api/workouts',{
            method:'POST',
            body:JSON.stringify(input),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const json=await response.json()
        if(!response.ok){
            setError(json.error)
            // setError(json.emptyFields)
        }
        if(response.ok){
            setError(null)
            console.log('New workout added.',json)
            setInput({
                title:'',
                load:'',
                reps:'',
            })
            dispatch({type:'CREATE_WORKOUT',payload:json})
        }      
    }
  return (
    <form onSubmit={addHandle} style={{display:'flex',flexDirection:'column',gap:10}}>
        <h3>Add a new workout:</h3>
        <label htmlFor='title'>Exercise Title: </label>
        <input id='title' type='text' value={input.title}
            onChange={(e)=>setInput({...input,title:e.target.value})}
        />

        <label htmlFor='load'>load (KG)</label>
        <input type='number' id='load' value={input.load}
            onChange={(e)=>setInput({...input,load:e.target.value})}
        />

        <label htmlFor='reps'>Repeat numbers:</label>
        <input type='number' id='reps' value={input.reps}
            onChange={(e)=>setInput({...input,reps:e.target.value})}
        />

        <input type='submit' />
        {error && <p style={{color:'red'}}>
            {error}
        </p>}

    </form>
  )
}

export default AddWorkoutForm