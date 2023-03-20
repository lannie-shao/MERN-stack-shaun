const Workout=require('../models/workoutModel')
const mongoose=require('mongoose')

//get all workouts
const getWorkouts=async(req,res)=>{
    const user_id=req.user._id
    const workouts=await Workout.find({user_id}).sort({createdAt:-1})
    res.status(200).json(workouts)
}

//get a single workout
const getWorkout=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout id'})
    }
    const workout=await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }
    res.status(200).json(workout)
}
//create a new workout
const workoutCreate=async(req,res)=>{
    const {title,load,reps}=req.body
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all fields',emptyFields})
    }
    try{
        //save the contents of the workout with the user_id
        const user_id=req.user._id
        const workout=await Workout.create({title,load,reps,user_id})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
//update a workout
const updateWorkout=async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }
    const workout=await Workout.findByIdAndUpdate(id,{
        ...req.body
    },{new:true})
    if(!workout){
        return res.status(400).json('No such workout')
    }
    res.status(200).json(workout)
}
//delete a workout
const deleteWorkout=async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }
    const workout=await Workout.findByIdAndDelete(id)
    if(!workout){
        return res.status(400).json('No such workout')
    }
    res.status(200).json(workout)
}

module.exports={workoutCreate,getWorkout,getWorkouts,deleteWorkout,updateWorkout}