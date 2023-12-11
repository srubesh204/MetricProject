
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Department, Designation } from './Components/DesDep';
import Employee from './Components/employee/Employee';

import { UnitDataBase, PartDataBase } from './Components/general/General';
import Vendor from './Components/vendor/Vendor';
import ItemMaster from './Components/itemMaster/ItemMaster';
import Devi from './Components/devi/Devi';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Dashboard/Home';
import ItemAdd from './Components/Items/ItemAdd';
import ItemEdit from './Components/Items/ItemEdit';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ItemList from './Components/Items/ItemList';
import FileViewer from './Components/Test/FileViewer';
import Login from './Components/Dashboard/Login';
import InsHisCard from './Components/reports/InsHisCard';
import Status from './Components/status/Status';
// import Dc from './Components/dc/Dc';
import Grn from './Components/Dashboard/DashboardComponents/Grn';
import DcList from './Components/dcList/DcList';
import GrnList from './Components/grnList/GrnList';
import CalList from './Components/calList/CalList';


function App() {
  const location = useLocation();

  console.log('hash', location.hash);
  console.log(location.pathname);
  console.log('search', location.search);

  const fullList =['/itemadd', '/itemedit/:id', '/itemList', '/test','/home', '/login']
  console.log(fullList.includes(location.pathname))
  return (
    <div className="App">

      
      {fullList.includes(location.pathname) ? "":""}
      <Routes>
        <Route path="/desdep" element={<Department />} />
        <Route path="/des" element={<Designation />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/general" element={<PartDataBase />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/itemMaster" element={<ItemMaster />} />
        <Route path="/devi" element={<Devi />} />
        <Route path="/home" element={<Home />} />
        <Route path="/itemadd" element={<ItemAdd />} />
        <Route path="/itemEdit/:id" element={<ItemEdit />} />
        <Route path="/itemList" element={<ItemList />} />
        <Route path="/test" element={<FileViewer />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/reports" element={<InsHisCard/>} />
        <Route path="/status" element={<Status/>} />
        {/* <Route path="/dc" element={<Dc/>} /> */}
        <Route path="/grn" element={<Grn/>} />
        <Route path="/dcList" element={<DcList/>} />
        <Route path="/grnList" element={<GrnList/>} />
        <Route path="/calList" element={<CalList/>} />
      </Routes>

    </div>
  );
}

export default App;
