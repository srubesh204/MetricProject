
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {Department,Designation} from './Components/DesDep';
import Employee from './Components/employee/Employee';

import {UnitDataBase,PartDataBase} from './Components/general/General';
import Vendor from './Components/vendor/Vendor';
import ItemMaster from './Components/itemMaster/ItemMaster';
import Devi from './Components/devi/Devi';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Dashboard/Home';
import ItemAdd from './Components/Items/ItemAdd';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Dashboard />
        <Routes>
          <Route path="/desdep" element={<Department />} />
          <Route path="/des" element={<Designation />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/general" element={<UnitDataBase />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/itemMaster" element={<ItemMaster />} />
          <Route path="/devi" element={<Devi />} />
          <Route path="/home" element={<Home />} />
          <Route path="/itemAdd" element={<ItemAdd />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
