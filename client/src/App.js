import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Department from './Components/Department';
import Employee from './Components/employee/Employee';
import General from './Components/general/General';
import Vendor from './Components/vendor/Vendor';






function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
          
          <Route path="/desdep" element={<Department />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/general" element={<General />} />
          <Route path="/vendor" element={<Vendor />} />
          
          
          
         
         
         
          
          
         
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
