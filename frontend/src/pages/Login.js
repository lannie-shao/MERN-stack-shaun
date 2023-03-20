import {useState} from 'react'
import useLogin from '../hook/useLogin'

const Login = () => {
    const {error,loading,login}=useLogin()
    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await login(user)
        setUser({
            email:'',
            password:''
        })            
    }
  return (
    <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:25}}>
    <h3>Log In</h3>
    <form style={{display:'flex',flexDirection:'column',gap:15}} onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type='email' onChange={e=>setUser({...user,email:e.target.value})} value={user.email}/>

        <label>Password:</label>
        <input type='password' onChange={e=>setUser({...user,password:e.target.value})} value={user.password}/>

        <button disabled={loading}>Log In</button>
    </form>
    {error && <p>{error}</p>}
    </div>
  )
}

export default Login