import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import BadgeIcon from '@mui/icons-material/Badge';

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CategoryIcon from '@mui/icons-material/Category';

//
import Vendor from '../DatabaseMaster/Vendor';
import Employee from '../DatabaseMaster/Employee'
import ItemMaster from '../DatabaseMaster/ItemMaster'
import { PartDataBase, UnitDataBase } from '../DatabaseMaster/General'
import { Department, Designation } from '../DatabaseMaster/DesDep';
import Home from './Home';
import { useEmployee } from '../../App';
import DcList from '../Reports/dcList/DcList';
import GrnList from '../Reports/grnList/GrnList';
import CalList from '../Reports/CalItems/CalList';
import { FormatListBulleted, Logout } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';
import dashboard from '../assets/dashboard.png'
import admin from '../assets/admin.png'
import secretary from '../assets/secretary.gif'
import { Button } from 'bootstrap';
import Swal from 'sweetalert2';

//System
import Version from '../system/Version';
import BackUp from '../system/BackUp';
import AlertConfig from '../system/AlertConfig';
import MailConfig from '../system/Mails/MailConfig';
import FormatNumber from '../system/FormatNumber';
import CompanyDetails from '../system/CompanyDetails';
import InsHistoryCard from '../Reports/InsHistoryCard';

import TotalList from '../Reports/TotalList';
import CalDueReport from '../Reports/CalDueReport';
import MeasurementUncertainty from '../Reports/MeasurementUncertainty';
import VendorUpload from '../Reports/VendorUpload';
//

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
      height: "100%"
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();



const Dashboard = () => {

  const empRole = useEmployee()

  const [fileName, setFileName] = useState({
    name: "Dashboard",
    file: "",
  });
  console.log(empRole)

  const MenuItems = {
    databaseMaster: [
      { name: "Department", file: <Department />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/department.png`} alt="Department Icon" style={{ width: '20px', height: '20px' }} /> },
      { name: "Designation", file: <Designation />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Designation Icon" style={{ width: '20px', height: '20px' }} /> },
      { name: "Employee", file: <Employee />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Employee Icon" style={{ width: '20px', height: '20px' }} /> },
      { name: "Vendor", file: <Vendor />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Vendor Icon" style={{ width: '20px', height: '20px' }} /> },
      { name: "Unit", file: <UnitDataBase />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Unit Icon" style={{ width: '20px', height: '20px' }} /> },
      { name: "Part", file: <PartDataBase />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Part Icon" style={{ width: '20px', height: '20px' }} /> },
      { name: "Item Master", file: <ItemMaster />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Item Master Icon" style={{ width: '20px', height: '20px' }} /> },
    ],
    system: [
      { name: "Version", file: <Version />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Version Icon" style={{ width: '20px', height: '20px' }} /> },
      // { name: "Backup", file: <BackUp />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Backup Icon" style={{ width: '20px', height: '20px' }} /> },
      // { name: "Alerts Configuration", file: <AlertConfig />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Alerts Configuration Icon" style={{ width: '20px', height: '20px' }} /> },
      { name: "Mail Configuration", file: <MailConfig />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Mail Configuration Icon" style={{ width: '20px', height: '20px' }} /> },
      { name: "Format Number", file: <FormatNumber />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Format Number Icon" style={{ width: '20px', height: '20px' }} /> },
      empRole.employee=== "superAdmin" && { name: "Company Details", file: <CompanyDetails />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Company Details Icon" style={{ width: '20px', height: '20px' }} /> },
      
      // { name: "Label Print", file: "", icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Label Print Icon" style={{ width: '20px', height: '20px' }} /> },

    ].filter(Boolean),
    Reports: [
      { name: "DC List", file: <DcList />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="DC List Icon" style={{ width: '20px', height: '20px' }} /> },
      { name: "GRN List", file: <GrnList />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="GRN List Icon" style={{ width: '20px', height: '20px' }} /> },
      { name: "Cal Data", file: <CalList />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Cal Data Icon" style={{ width: '20px', height: '20px' }} /> },
      { name: "History Card", file: <InsHistoryCard />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="History Card Icon" style={{ width: '20px', height: '20px' }} /> },
      { name: "Total List", file: <TotalList />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Total List Icon" style={{ width: '20px', height: '20px' }} /> },
      // { name: "Cal Due Report", file: <CalDueReport />, icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Cal Due Report Icon" style={{ width: '20px', height: '20px' }} /> },
      //{ name: "Measurement Uncertainty",file: <MeasurementUncertainty />,icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Measurement Uncertainty" style={{ width: '20px', height: '20px' }} />  },
      { name: "Vendor Details",file: <VendorUpload />,icon: <img src={`${process.env.REACT_APP_PORT}/icon/list-text.png`} alt="Vendor Details Icon" style={{ width: '20px', height: '20px' }} />  },
      // { name: "Management Chart" },
    ]

  }

console.log(MenuItems.system)

  console.log(fileName)

  const onFileChange = (item) => {
    setFileName({
      name: item.name,
      file: item.file,
    });
  }
  const [togglerOpen, setTogglerOpen] = useState(false);
  const toggleDrawer = () => {
    setTogglerOpen(!togglerOpen);
  };
  const [adminListNames, setAdminListNames] = useState({
    databaseMaster: { name: "databaseMaster", status: false },
    system: { name: "system", status: false },
    report: { name: "report", status: false },
    // Add other drawer names with initial status here
  });

  const [mailList, setMainList] = useState({
    databaseMaster: { name: "databaseMaster", status: false },
    system: { name: "system", status: false },
    report: { name: "report", status: false },
    // Add other drawer names with initial status here
  });






  const [adminOpen, setAdminOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [systemOpen, setSystemOpen] = useState(false);
  const [toolOpen, setToolOpen] = useState(false);

  const handleAdminList = (name) => {
    setAdminListNames((prevState) => {
      const updatedState = Object.keys(prevState).reduce((acc, drawerName) => {
        if (drawerName === name) {
          acc[drawerName] = { ...prevState[drawerName], status: !prevState[drawerName].status };
        } else {
          acc[drawerName] = { ...prevState[drawerName], status: false }; // Close other drawers
        }
        return acc;
      }, {});
      return updatedState;
    });
  };


  const handleAdminOpen = () => {
    setAdminOpen(!adminOpen);
  };

  const handleItemOpen = () => {
    setItemOpen(!itemOpen);
  };



  const handleToolOpen = () => {
    setToolOpen(!toolOpen);
  };

  console.log(fileName)
  const [logOutDialog, setLogOutDialog] = useState(false)
  console.log(logOutDialog)

  const openWinApps = (name) => {
    if (name === "Calculator") {
      const operatingSystem = window.navigator.platform.toLowerCase();

      let instructions;
      if (operatingSystem.includes('win')) {
        instructions = 'Press Win + R, then type calc and press Enter.';
      } else if (operatingSystem.includes('mac')) {
        instructions = 'Open Spotlight (Cmd + Space), type Calculator, and press Enter.';
      } else if (operatingSystem.includes('linux')) {
        instructions = 'Open Terminal, type gnome-calculator (or your specific calculator command), and press Enter.';
      } else {
        instructions = 'Please open your calculator app manually.';
      }

      alert(`To open the calculator:\n\n${instructions}`);
    }
  }

  const handleButtonClick = () => {
    Swal.fire({
      title: 'Logout Confirmation?',
      text: 'Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        Swal.fire({ title: 'Logged Out!', icon: 'success' })
          .then((result) => {

            window.location.reload();

          });
      } else {
        // If canceled or closed the dialog
        Swal.fire('Cancelled', 'Your logout was cancelled.', 'error');
      }
    });
  };



  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex', width: "100%" }}>
          <CssBaseline />
          <AppBar position="absolute" open={togglerOpen}>
            <Toolbar
              sx={{
                pr: '24px', height: "100%", width: "100%" // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(togglerOpen && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap

                sx={{ flexGrow: 1, textAlign: "center", pointerEvents: true }}
              >
                <Tooltip title={fileName.name}>{fileName.name}</Tooltip>
              </Typography>

              <Typography component="h1"
                variant="h6"
                color="inherit"
                noWrap

                sx={{ flexGrow: 0, textAlign: "end", pointerEvents: true }}>
                Welcome {empRole.loggedEmp.firstName}
              </Typography>
              <Tooltip title="Notifications">
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>


              <Tooltip title="Logout">
                <IconButton color="inherit" onClick={() => handleButtonClick()}>

                  <Logout color="error" />
                </IconButton>
              </Tooltip>



            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={togglerOpen}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav" >

              <ListItemButton to="/home">
                <ListItemIcon>
                  <img src={`${process.env.REACT_APP_PORT}/icon/dashboard.png`} alt="Dashboard Icon" style={{ width: '30px', height: '30px' }} />
                  {/* Adjust width and height as per your icon's size */}
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>

              {empRole && (empRole.employee === "superAdmin" || empRole.employee === "admin" || empRole.employee === "plantAdmin") &&
                <React.Fragment>
                  <ListItemButton onClick={handleAdminOpen}>
                    <ListItemIcon>
                      <img src={`${process.env.REACT_APP_PORT}/icon/admin.png`} alt="adminIcon" style={{ width: '24px', height: '24px' }} />
                    </ListItemIcon>
                    <ListItemText primary="Admin" />
                    {adminOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={adminOpen} timeout="auto" unmountOnExit>

                    <List component="div" disablePadding>

                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleAdminList("databaseMaster")}>
                        <ListItemIcon>
                          <img src={`${process.env.REACT_APP_PORT}/icon/database.png`} alt="Database Icon" style={{ width: '24px', height: '24px' }} />
                        </ListItemIcon>
                        <ListItemText primary="Database Master" />
                        {adminListNames["databaseMaster"].status ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={adminListNames["databaseMaster"].status} timeout="auto" unmountOnExit>

                        <List component="div" disablePadding>
                          {MenuItems.databaseMaster.map((item, index) => {
                            console.log(item)
                            return (
                              <ListItemButton key={index} sx={{ pl: 6 }} onClick={() => onFileChange(item)}>
                                <ListItemIcon>
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                              </ListItemButton>
                            )
                          })}


                        </List>
                      </Collapse>


                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleAdminList("system")}>
                        <ListItemIcon>
                       <img src={`${process.env.REACT_APP_PORT}/icon/system.png`} alt="systemIcon" style={{ width: '24px', height: '24px' }} />
                        </ListItemIcon>
                        <ListItemText primary="System" />
                        {adminListNames["system"].status ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={adminListNames["system"].status} timeout="auto" unmountOnExit>

                        <List component="div" disablePadding>
                          {MenuItems.system.map((item, index) => {
                            console.log(item)
                            return (
                              <ListItemButton key={index} sx={{ pl: 6 }} onClick={() => onFileChange(item)}>
                                <ListItemIcon>
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                              </ListItemButton>
                            )
                          })}

                        </List>
                      </Collapse>





                    </List>
                  </Collapse>
                </React.Fragment>}
                          {empRole && empRole.employee !== "viewer" &&
                <React.Fragment>
              <ListItemButton onClick={handleItemOpen}>
                <ListItemIcon>
                <img src={`${process.env.REACT_APP_PORT}/icon/measurement.png`} alt="systemIcon" style={{ width: '24px', height: '24px' }} />
                </ListItemIcon>
                <ListItemText primary="Item Creation" />
                {itemOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={itemOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                
                  <ListItemButton sx={{ pl: 4 }} to="/itemlist">
                    <ListItemIcon>
                    <FormatListBulleted />
                    </ListItemIcon>
                    <ListItemText primary="Item List" />

                  </ListItemButton>
                  {empRole && (empRole.employee === "superAdmin" || empRole.employee === "admin" || empRole.employee === "plantAdmin" || empRole.employee === "creator") &&
                    <ListItemButton sx={{ pl: 4 }} to="/itemAdd" >
                      <ListItemIcon>
                      <FormatListBulleted />
                      </ListItemIcon>
                      <ListItemText primary="Item Add" />

                    </ListItemButton>}


                </List>

              </Collapse>
              </React.Fragment>
}
              <ListItemButton onClick={() => handleAdminList("report")}>
                <ListItemIcon>
                 <img src={`${process.env.REACT_APP_PORT}/icon/seo-report.png`} alt="systemIcon" style={{ width: '24px', height: '24px' }} />
                </ListItemIcon>
                <ListItemText primary="Reports" />
                {adminListNames["report"].status ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={adminListNames["report"].status} timeout="auto" unmountOnExit>

                <List component="div" disablePadding>
                  {MenuItems.Reports.map((item, index) => {
                    console.log(item)
                    return (
                      <ListItemButton key={index} sx={{ pl: 4 }} onClick={() => onFileChange(item)}>
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    )
                  })}


                </List>
              </Collapse>


              {/* <ListItemButton onClick={handleToolOpen}>
                <ListItemIcon>
                <img src={`${process.env.REACT_APP_PORT}/icon/settings.png`} alt="systemIcon" style={{ width: '24px', height: '24px' }} />
                </ListItemIcon>
                <ListItemText primary="Tools" />
                {toolOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton> */}


              {/* <Collapse in={toolOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => openWinApps("Calculator")}>
                    <ListItemIcon>
                      <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Calculator" />

                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => openWinApps("Any Desk")}>
                    <ListItemIcon>
                      <AdminPanelSettingsIcon />
                    </ListItemIcon> 
               <ListItemText primary="Any Desk" />

                  </ListItemButton>

                </List>
              </Collapse> */}

             {/* {SecondaryListItems()} */}
            </List>
          </Drawer>
          <Box
            component="main"
            style={{ flexGrow: 1, height: "100%", width: "75%" }}
          
          >
            <Toolbar />

            {fileName.file !== "" ? fileName.file : ""}



          </Box>


        </Box>
      </ThemeProvider>

    </div>
  );
}
export default Dashboard
