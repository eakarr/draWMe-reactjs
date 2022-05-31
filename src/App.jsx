import "./App.css";
import Canvas from "./components/Canvas";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <div className="Navbar">
        <NavBar />
      </div>

      <Canvas width={700} height={500} />
    </div>
  );
}

export default App;
