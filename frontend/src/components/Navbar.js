import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import useLogout from '../hook/useLogout'

const Navbar = () => {
  const {logout}=useLogout()
  const {state}=useContext(AuthContext)
  console.log(state)

  const handleLogout=async()=>{
    await logout()
  }
  return (
    <div className='header' style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingInline:20}}>
      <Link to='/' style={{textDecoration:'none'}}>
        <h1>
          WORKOUT
        </h1>
      </Link>
      <div style={{display:'flex',gap:20}}>
      {state.user &&
      <div style={{display:'flex',gap:20,alignItems:'center'}}>
        <p>{state.user.email}</p>
        <button onClick={handleLogout} style={{width:100,height:40}}>LOG OUT</button>
      </div>
      }
      {!state.user &&
      <div style={{display:'flex',gap:20}}>
      <Link to='/login'>LOG IN</Link>
      <Link to='/signup'>SIGN UP</Link>
      </div>
      }
      </div>
    </div>
  )
}

export default Navbar