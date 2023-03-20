import { AuthContext } from "../context/AuthContext";
import { useState,useContext } from "react";

const useLogin=()=>{
    const {dispatch}=useContext(AuthContext)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const login=async(user)=>{
        setLoading(true)
        const response=await fetch('/api/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })

        const json=await response.json()
        if(!response.ok){
            setError(json.error)
            setLoading(false)
        }else{
            setLoading(false)
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:'LOGIN',payload:json})
        }
    }
    return {error,loading,login}
}

export default useLogin