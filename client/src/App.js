import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Department from './Components/Department';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
          
          <Route path="/desDep" element={<Department />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
