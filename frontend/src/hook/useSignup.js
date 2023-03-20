import {useContext,useState} from 'react'
import { AuthContext } from '../context/AuthContext'

const useSignup = () => {
    const {dispatch}=useContext(AuthContext)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const signup=async(user)=>{  
        setLoading(true) 
    const response=await fetch('./api/user/signup',{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const json=await response.json()
    if(!response.ok){
        setLoading(false)
        setError(json.error)
    }
    if(response.ok){
        localStorage.setItem('user',JSON.stringify(json))
        setError(null)
        setLoading(false)
        dispatch({type:'LOGIN',payload:json})
    }      
}
    return {error,loading,signup}   
}

export default useSignup