
import './App.css';
import './output.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

function App() {
  return (
    
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>}/>
      </Routes>

      </Router>
    </div>
  );
}

export default App;
