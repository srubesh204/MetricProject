
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
import Login from './Components/Login';
import InsHisCard from './Components/reports/InsHisCard';
import Status from './Components/status/Status';
// import Dc from './Components/dc/Dc';
import Grn from './Components/Dashboard/DashboardComponents/Grn';
import DcList from './Components/dcList/DcList';
import GrnList from './Components/grnList/GrnList';
import CalList from './Components/CalItems/CalList';
import DcEdit from './Components/dcList/DcEdit';
import GrnEdit from './Components/grnList/GrnEdit';
import GrnAdd from './Components/grnList/GrnAdd';
import OnSiteGrn from './Components/onSiteGrn/OnSiteGrn';
import OnSiteList from './Components/onSiteGrn/OnSiteList';
import OnSiteEditGrn from './Components/onSiteGrn/OnSiteEditGrn';
import OnSiteDialog from './Components/Dashboard/DashboardComponents/OnSiteDialog';
import Instrument_History_Card from './Components/Instrument_History_Card';
import Roles from './Components/Login/Roles';
import MailConfi from './Components/mailConfi/MailConfi';
import { createContext, useContext } from 'react';
import AccessDenied from './Components/ErrorComponents/AccessDenied';
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
  admin: ['/home', "/desdep", "/general", "/vendor", "/itemMaster", "/itemadd", "/itemEdit/:id", "/itemList", "/grnList", "/calList", "/onSiteList", '/roles'],
  plantAdmin: ['/dashboard', '/home', '/itemlist', '/itemedit/:id',"/grnList", "/calList", "/onSiteList", "/itemadd"],
  creator: ['/home', '/itemlist', '/itemadd', '/itemedit/:id', "/grnList", "/calList", "/onSiteList" ],
  viewer: ['/itemlist', '/home'],
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
    { path: "/devi", element: <Devi /> },
    { path: "/itemadd", element: <ItemAdd /> },
    { path: "/itemedit/:id", element: <ItemEdit /> },
    { path: "/itemlist", element: <ItemList /> },
    { path: "/test", element: <FileViewer /> },
    { path: "/reports", element: <InsHisCard /> },
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


  // Custom function to render the PrivateRoute component
  const isLoggedIn = sessionStorage.getItem('loggedIn'); // Retrieve session storage data
  const employee = sessionStorage.getItem('employee');

  console.log(isLoggedIn, employee)
  const location = useLocation();

  console.log('hash', location.hash);
  console.log(location.pathname);
  console.log('search', location.search);



  return (
    <div className="App">

      <EmployeeProvider employee={employee}>
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
