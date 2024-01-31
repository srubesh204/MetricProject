
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



import { createContext, useContext, useEffect, useState } from 'react';
import AccessDenied from './Components/ErrorComponents/AccessDenied';
import axios from 'axios';
import RubeshTest from './Components/Test/RubeshTest';
import DcPrint from './Components/Reports/dcList/DcPrint';
import TotalList from './Components/Reports/TotalList';
import { Backdrop, CircularProgress } from '@mui/material';
import CalDueReport from './Components/Reports/CalDueReport';
import InsHistoryCard from './Components/Reports/InsHistoryCard';
import CalDuePrint from './Components/Reports/CalDuePrint';
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
  
  admin: ['/home', "/desdep", "/general", "/vendor", "/itemMaster", "/itemadd", "/itemEdit/:id", "/itemList", "/grnList", "/calList", "/onSiteList", '/roles', "/employee", '/test', '/rubyTest', '/dcPrint', "/insHisCard"],
  plantAdmin: ['/home', "/desdep", "/general", "/vendor", "/itemMaster", "/itemadd", "/itemEdit/:id", "/itemList", "/grnList", "/calList", "/onSiteList", '/roles', "/employee", '/rubyTest', '/dcPrint', '/dcList', "/insHisCard"],
  creator: ['/home', '/itemList', '/itemadd', '/itemEdit/:id', "/grnList", "/calList", "/onSiteList", '/dcPrint', "/insHisCard"],
  viewer: ['/home', '/dcPrint', "/insHisCard"],
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
    { path: "/itemEdit/:id", element: <ItemEdit /> },
    { path: "/itemList", element: <ItemList /> },
    { path: "/test", element: <FileViewer /> },
    { path: "/rubyTest", element: <RubeshTest /> },
    { path: "/status", element: <Status /> },
    { path: "/grn", element: <Grn /> },
    { path: "/dcList", element: <DcList /> },
    { path: "/dcPrint", element: <DcPrint /> },
    { path: "/grnList", element: <GrnList /> },
    { path: "/calList", element: <CalList /> },
    { path: "/onSiteGrn", element: <OnSiteGrn /> },
    { path: "/onSiteList", element: <OnSiteList /> },
    { path: "/onSiteEditGrn", element: <OnSiteEditGrn /> },
    { path: "/onSiteDialog", element: <OnSiteDialog /> },
    { path: "/totalList", element: <TotalList /> },
    { path: "/calDueReport", element: <CalDueReport /> },
    { path: "/insHisCard", element: <InsHistoryCard /> },
    { path: "/calDuePrint", element: <CalDuePrint /> },


    // Add more common routes...
  ];

  if (employee === 'superAdmin') {
    // If the user is a superAdmin, return all routes
    return routes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ));
  }

  // Generate routes based on allowed routes for the userRole
  const generatedRoutes = routes
    .filter(route => allowedRoutes.includes(route.path))
    .map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ));

  return generatedRoutes;
};



const PrivateRoute = ({ element: Element, employee }) => {
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
  const [loggedEmp, setLoggedEmp] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('loggedIn'));
  const [employee, setEmployee] = useState(sessionStorage.getItem('employee'));
  const [empId, setEmpId] = useState(sessionStorage.getItem('empId'));
  const [isEmployeeLoaded, setIsEmployeeLoaded] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PORT}/employee/getEmployeeById/${empId}`
        );
        console.log(response.data.result)
        setLoggedEmp(response.data.result);
        setIsEmployeeLoaded(true); // Set the flag to indicate employee data is loaded
      } catch (err) {
        console.log(err);
      }
    };

    // Check if logged in and empId exist, then fetch employee data
    if (isLoggedIn && empId) {
      fetchEmployeeData();
    }
  }, [isLoggedIn, empId]);

  // This effect watches for changes in isLoggedIn state
  // If logged in status changes, update the state
  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem('loggedIn'));
  }, [isLoggedIn]);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    // Set isLoggedIn, employee, and empId from sessionStorage after successful login
    setIsLoggedIn(sessionStorage.getItem('loggedIn'));
    setEmployee(sessionStorage.getItem('employee'));
    setEmpId(sessionStorage.getItem('empId'));
  };

  console.log(loggedEmp)

  return (
    <div className="App">
      <EmployeeProvider employee={{ employee, loggedEmp }}>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/*"
            element={
              isEmployeeLoaded ? (
                <PrivateRoute employee={employee} />
              ) : (
                <Backdrop
                  style={{ zIndex: 1000 }}
                  open={!isEmployeeLoaded}
                >
                  <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </Backdrop>
              )
            }
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/accessDenied" element={<AccessDenied />} />
        </Routes>
      </EmployeeProvider>
    </div>
  );
}

export default App;

