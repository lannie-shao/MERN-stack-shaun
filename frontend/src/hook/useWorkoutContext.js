import {useContext} from 'react'
import { WorkoutContext } from '../context/WorkoutContext'

const UseWorkoutContext = () => {
    const context=useContext(WorkoutContext)
    if(!context){
      throw Error('useWorkoutContext must be used inside an WorkoutContextProvider')
    }   
  return (
    context
  )
}

export default UseWorkoutContext