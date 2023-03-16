import React, {useEffect,useContext,useState} from 'react'
import { WorkoutContext } from '../context/WorkoutContext'
import useWorkoutContext from '../hook/useWorkoutContext'

const Home = () => {
    const {workouts,dispatch}=useContext(WorkoutContext)
    // const [workouts, setWorkouts] = useState(null)
    useEffect(()=>{
        localStorage.removeItem("loglevel")
        const getWorkouts=async()=>{
            const result=  await fetch('/api/workouts')
            const json=await result.json()

            if(result.ok){
                dispatch({type:'SET_WORKOUTS',payload:json})
                // setWorkouts(json)
            }
        }
        getWorkouts();
    },[dispatch])

    const deleteHandler=async(id)=>{
        const response=await fetch('/api/workouts/'+id,{
            method:'DELETE'
        })
        const json=await response.json()

        if(response.ok){
            dispatch({type:'DELETE_WORKOUT',payload:json})
        }
    }
  return (
    <div style={{padding:10,width:'50%'}}>
        {workouts && workouts.map((workout)=>(
            <div key={workout._id} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h2 >{workout.title}</h2>
            <button style={{height:30,width:150}} 
            onClick={()=>deleteHandler(workout._id)}>
             Delete
            </button>
            </div>
        ))}
    </div>
  )
}

export default Home