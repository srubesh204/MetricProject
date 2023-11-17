
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


function App() {
  const location = useLocation();

  console.log('hash', location.hash);
  console.log(location.pathname);
  console.log('search', location.search);

  const fullList =['/itemadd', '/itemedit', '/itemlist', '/test']
  console.log(fullList.includes(location.pathname))
  return (
    <div className="App">

      
      {fullList.includes(location.pathname) ? "": ""}
      <Routes>
        <Route path="/desdep" element={<Department />} />
        <Route path="/des" element={<Designation />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/general" element={<PartDataBase />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/itemMaster" element={<ItemMaster />} />
        <Route path="/devi" element={<Devi />} />
        <Route path="/home" element={<Home />} />
        <Route path="/itemAdd" element={<ItemAdd />} />
        <Route path="/itemEdit/:id" element={<ItemEdit />} />
        <Route path="/itemList" element={<ItemList />} />
        <Route path="/test" element={<FileViewer />} />

      </Routes>

    </div>
  );
}

export default App;
