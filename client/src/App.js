import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Department from './Components/Department';
import Employee from './Components/employee/Employee';
import Dashboard from './Components/Dashboard';
import General from './Components/general/General';
import Vendor from './Components/vendor/Vendor';
import ItemMaster from './Components/itemMaster/ItemMaster';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/desdep" element={<Department />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/general" element={<General />} />
          <Route path="/vendor" element={<Vendor/>} />
          <Route path="/itemMaster" element={<ItemMaster/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
