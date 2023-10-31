
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Department from './Components/Department';
import Employee from './Components/employee/Employee';

import General from './Components/general/General';
import Vendor from './Components/vendor/Vendor';
import ItemMaster from './Components/itemMaster/ItemMaster';
import Devi from './Components/devi/Devi';
import MiniDrawer from './Components/Dashboard/MiniDrawer';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MiniDrawer />
        <Routes>
          <Route path="/desdep" element={<Department />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/general" element={<General />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/itemMaster" element={<ItemMaster />} />
          <Route path="/devi" element={<Devi />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
