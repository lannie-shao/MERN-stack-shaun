import React, {useEffect,useContext,useState} from 'react'
import AddWorkoutForm from '../components/AddWorkoutForm'
import { AuthContext } from '../context/AuthContext'
import { WorkoutContext } from '../context/WorkoutContext'

const Home = () => {
    const {workouts,dispatch}=useContext(WorkoutContext)
    const {state}=useContext(AuthContext)

    useEffect(()=>{
        localStorage.removeItem("loglevel")
        const getWorkouts=async()=>{
            const result= await fetch('/api/workouts',{
                headers:{
                    "Authorization":`bearer ${state.user.token}`
                }
            })
            const json=await result.json()

            if(result.ok){
                dispatch({type:'SET_WORKOUTS',payload:json})
                // setWorkouts(json)
            }
        }
        if(state.user){
            getWorkouts();
        }
    },[dispatch,state.user])

    const deleteHandler=async(id)=>{
        const response=await fetch('/api/workouts/'+id,{
            method:'DELETE',
            headers:{
                "Authorization":`bearer ${state.user.token}`
            }
        })
        const json=await response.json()

        if(response.ok){
            dispatch({type:'DELETE_WORKOUT',payload:json})
        }
    }
  return (
    <div style={{display:'flex',justifyContent:'space-around'}}>
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
        <AddWorkoutForm />
    </div>
  )
}

export default Home