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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
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
import Vendor from '../vendor/Vendor';
import Employee from '../employee/Employee'
import ItemMaster from '../itemMaster/ItemMaster'
import { PartDataBase, UnitDataBase } from '../general/General'
import { Department, Designation } from '../DesDep';
import Home from './Home';
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

const drawerWidth = 280;

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
      height: "100vh"
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {

  const [fileName, setFileName] = useState({
    name: "Dashboard",
    file: "",
  });

  const MenuItems = {
    databaseMaster: [
      { name: "Department", file: <Department />, icon: <CategoryIcon /> },
      { name: "Designation", file: <Designation />, icon: <CategoryIcon /> },
      { name: "Employee", file: <Employee />, icon: <BadgeIcon /> },
      { name: "Vendor", file: <Vendor />, icon: <ContactPageIcon /> },
      { name: "Unit", file: <UnitDataBase />, icon: <CategoryIcon /> },
      { name: "Part", file: <PartDataBase />, icon: <CategoryIcon /> },
      { name: "Dashboard", file: <Home />, icon: <CategoryIcon /> },
      { name: "Item Master", file: <ItemMaster />, icon: <CategoryIcon /> },
    ],
    system: [
      { name: "Version" },
      { name: "Backup" },
      { name: "Alerts Configuration" },
      { name: "Mail Configuration" },
      { name: "Format Number" },
      { name: "Company Details" },
      { name: "Label Print" },

    ],
    Reports: [
      { name: "DC List" },
      { name: "GRN List" },
      { name: "Cal Data" },
      { name: "History Card" },
      { name: "Gauge List" },
      { name: "Cal Due Report" },
      { name: "Gauge Movement Report" },
      { name: "Management Chart" },
    ]

  }




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

  const [mainList, setMainList] = useState({
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


  const handleSystemOpen = () => {
    setSystemOpen(!systemOpen);
  };
  const handleToolOpen = () => {
    setToolOpen(!toolOpen);
  };

  console.log(fileName)

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', }}>
        <CssBaseline />
        <AppBar position="absolute" open={togglerOpen}>
          <Toolbar
            sx={{
              pr: '24px', height: "100%" // keep right padding when drawer closed
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
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              {fileName.name}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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

            <ListItemButton >
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />

            </ListItemButton>

            <ListItemButton onClick={handleAdminOpen}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
              {adminOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={adminOpen} timeout="auto" unmountOnExit>

              <List component="div" disablePadding>

                <ListItemButton sx={{ pl: 4 }} onClick={() => handleAdminList("databaseMaster")}>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
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
                    <AdminPanelSettingsIcon />
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

                          </ListItemIcon>
                          <ListItemText primary={item.name} />
                        </ListItemButton>
                      )
                    })}

                  </List>
                </Collapse>





              </List>
            </Collapse>
            <ListItemButton onClick={handleItemOpen}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Item Creation" />
              {itemOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={itemOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding >
                <ListItemButton sx={{ pl: 4 }} to="/itemlist">
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Item List" />

                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} to="/itemAdd" >
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Item Add" />

                </ListItemButton>
                

              </List>

            </Collapse>

            <ListItemButton onClick={() => handleAdminList("report")}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
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


            <ListItemButton onClick={handleToolOpen}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Tools" />
              {toolOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={toolOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} >
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Calculator" />

                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} >
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Any Desk" />

                </ListItemButton>

              </List>
            </Collapse>






            {/* {SecondaryListItems()} */}
          </List>
        </Drawer>
        <Box
          component="main"
          style={{ flexGrow: 1, height: "100%" }}
        // sx={{
        //   backgroundColor: (theme) =>
        //     theme.palette.mode === 'light'
        //       ? theme.palette.grey[100]
        //       : theme.palette.grey[900],
        //   flexGrow: 1,
        //   height: 'inherit',

        // }}
        >
          <Toolbar />

          {fileName.file !== "" ? fileName.file : ""}



        </Box>
      </Box>
    </ThemeProvider>
  );
}
