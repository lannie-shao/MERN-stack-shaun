const express=require('express')
const {
    workoutCreate,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout,
}=require('../controller/workoutController')

const router=express.Router()

router.get('/',getWorkouts)
router.get('/:id',getWorkout)
router.post('/',workoutCreate)
router.delete('/:id',deleteWorkout)
router.patch('/:id',updateWorkout)

module.exports=router