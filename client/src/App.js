
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Department, Designation } from './Components/DatabaseMaster/DesDep';
import Employee from './Components/DatabaseMaster/Employee';

import { UnitDataBase, PartDataBase } from './Components/DatabaseMaster/General';
import Vendor from './Components/DatabaseMaster/Vendor';
import ItemMaster from './Components/DatabaseMaster/ItemMaster';

import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Dashboard/Home';
import ItemAdd from './Components/ItemCreation/ItemAdd';
import ItemEdit from './Components/ItemCreation/ItemEdit';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ItemList from './Components/ItemCreation/ItemList';
import FileViewer from './Components/Test/FileViewer';
import Login from './Components/Login Components/Login';

import Status from './Components/DatabaseMaster/status/Status';
import Grn from './Components/Dashboard/DashboardComponents/Grn';
import DcList from './Components/Reports/dcList/DcList';
import GrnList from './Components/Reports/grnList/GrnList';
import CalList from './Components/Reports/CalItems/CalList';
import DcEdit from './Components/Reports/dcList/DcEdit';
import GrnEdit from './Components/Reports/grnList/GrnEdit';
import GrnAdd from './Components/Reports/grnList/GrnAdd';
import OnSiteGrn from './Components/Reports/onSiteGrn/OnSiteGrn';
import OnSiteList from './Components/Reports/onSiteGrn/OnSiteList';
import OnSiteEditGrn from './Components/Reports/onSiteGrn/OnSiteEditGrn';
import OnSiteDialog from './Components/Dashboard/DashboardComponents/OnSiteDialog';

import Roles from './Components/system/Permissions';

import { createContext, useContext, useEffect, useState } from 'react';
import AccessDenied from './Components/ErrorComponents/AccessDenied';
import axios from 'axios';
import RubeshTest from './Components/Test/RubeshTest';
export const empRole = createContext(null);


const EmployeeContext = createContext();

export const useEmployee = () => {
  return useContext(EmployeeContext);
};

export const EmployeeProvider = ({ children, employee }) => {
  return (
    <EmployeeContext.Provider value={employee}>
      {children}
    </EmployeeContext.Provider>
  );
};

const roleAccessRules = {
  admin: ['/home', "/desdep", "/general", "/vendor", "/itemMaster", "/itemadd", "/itemEdit/:id", "/itemList", "/grnList", "/calList", "/onSiteList", '/roles',"/employee", '/rubyTest'],
  plantAdmin: ['/home', "/desdep", "/general", "/vendor", "/itemMaster", "/itemadd", "/itemEdit/:id", "/itemList", "/grnList", "/calList", "/onSiteList", '/roles',"/employee", '/rubyTest'],
  creator: ['/home', '/itemList', '/itemadd', '/itemedit/:id', "/grnList", "/calList", "/onSiteList"],
  viewer: ['/itemList', '/home'],
};

// Function to generate routes based on user role and access rules
const generateRoutes = (employee) => {
  const allowedRoutes = roleAccessRules[employee] || []; // Get allowed routes for the userRole

  const routes = [
    { path: '/home', element: <Home /> },
    { path: "/employee", element: <Employee /> },
    { path: "/general", element: <PartDataBase /> },
    { path: "/vendor", element: <Vendor /> },
    { path: "/itemMaster", element: <ItemMaster /> },
    { path: "/itemadd", element: <ItemAdd /> },
    { path: "/itemedit/:id", element: <ItemEdit /> },
    { path: "/itemList", element: <ItemList /> },
    { path: "/test", element: <FileViewer /> },
    { path: "/rubyTest", element: <RubeshTest /> },
    { path: "/status", element: <Status /> },
    { path: "/grn", element: <Grn /> },
    { path: "/dcList", element: <DcList /> },
    { path: "/grnList", element: <GrnList /> },
    { path: "/calList", element: <CalList /> },
    { path: "/dcEdit", element: <DcEdit /> },
    { path: "/grnEdit", element: <GrnEdit /> },
    { path: "/grnAdd", element: <GrnAdd /> },
    { path: "/onSiteGrn", element: <OnSiteGrn /> },
    { path: "/onSiteList", element: <OnSiteList /> },
    { path: "/onSiteEditGrn", element: <OnSiteEditGrn /> },
    { path: "/onSiteDialog", element: <OnSiteDialog /> },
    { path: "/roles", element: <Roles /> },
    // Add more common routes...
  ];

  // Generate routes based on allowed routes for the userRole
  const generatedRoutes = routes
    .filter(route => allowedRoutes.includes(route.path))
    .map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ));

  return generatedRoutes;
};



const PrivateRoute = ({ element: Element, employee, ...rest }) => {
  const isLoggedIn = sessionStorage.getItem('loggedIn');


  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const routes = generateRoutes(employee);

  return (
    <Routes>

      {routes}
      <Route path="*" element={<AccessDenied />} /> {/* Catch-all route for restricted access */}
    </Routes>
  );
};


function App() {

  const [loggedEmp, setLoggedEmp] = useState([])
  // Custom function to render the PrivateRoute component
  const isLoggedIn = sessionStorage.getItem('loggedIn'); // Retrieve session storage data
  const employee = sessionStorage.getItem('employee');
  const empId = sessionStorage.getItem('empId')
  console.log(empId)

  
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PORT}/employee/getEmployeeById/${empId}`
        );
        setLoggedEmp(response.data.result);
      } catch (err) {
        console.log(err);
      }
    };

    if (empId) {
      fetchEmployeeData();
    }
  }, [empId]);
  


  console.log(isLoggedIn, employee, loggedEmp)
  const location = useLocation();

  console.log('hash', location.hash);
  console.log(location.pathname);
  console.log('search', location.search);



  return (
    <div className="App">

      <EmployeeProvider employee={{employee, loggedEmp}}>
        {/* {fullList.includes(location.pathname) ? "":""} */}
        {/* <Dashboard /> */}

        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route
            path="/*"
            element={<PrivateRoute employee={employee} />}
          />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/accessDenied" element={<AccessDenied />} />
        </Routes>
      </EmployeeProvider>
    </div>
  );
}

export default App;
