import {useState} from 'react'
import useSignup from '../hook/useSignup'

const SignUp = () =>{
    const {signup,error,loading}=useSignup()
    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await signup(user);         
        setUser({
            email:'',
            password:''
        })
    }
  return (
    <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:25}}>
    <h3>Sign Up</h3>
    <form style={{display:'flex',flexDirection:'column',gap:15,backgroundColor:'#dfdfdf',paddingInline:50,paddingBlock:50}} onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type='email' onChange={e=>setUser({...user,email:e.target.value})} value={user.email}/>

        <label>Password:</label>
        <input type='password' onChange={e=>setUser({...user,password:e.target.value})} value={user.password}/>

        <button disabled={loading}>Sign Up</button>
         {error && <p style={{color:'red',textAlign:'center'}}>{error}</p>}
    </form>
    </div>
  )
}

export default SignUp