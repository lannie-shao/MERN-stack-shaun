import AddWorkoutForm from "./components/AddWorkoutForm";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"

function App() {
  return (
    <div className="App">
    <Navbar />
    <div style={{display:'flex',justifyContent:'space-around'}}>
    <Home />
    <AddWorkoutForm />
    </div>
    </div>
  );
}

export default App;
