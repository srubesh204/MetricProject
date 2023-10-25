import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Department from './Components/Department';
import Employee from './Components/employee/Employee';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/desdep" element={<Department />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
