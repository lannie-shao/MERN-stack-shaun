import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import { WorkoutContext } from '../context/WorkoutContext'

const useLogout =() => {
    const {dispatch}=useContext(AuthContext)
    const {dispatch:setDispatch}=useContext(WorkoutContext)
    const logout=()=>{
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        setDispatch({type:'SET_WORKOUTS',payload:null})
    }
  return {logout}
}

export default useLogout