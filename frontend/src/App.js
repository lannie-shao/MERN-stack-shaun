import AddWorkoutForm from "./components/AddWorkoutForm";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {state}=useContext(AuthContext)
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path='/' element={state.user? <Home />: <Navigate to='/login'/>}/>
    <Route path='/signup' element={state.user? <Home /> :<SignUp />}/>
    <Route path="/login" element={state.user? <Home />:<Login />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
