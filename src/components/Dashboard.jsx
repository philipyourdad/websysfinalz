import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Button,
  Container,
  Paper,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250, backgroundColor: '#23344e', color: '#fff', height: '100%' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* <Typography
        variant="h2"
        align="center"
        style={{ margin: 16, fontFamily: 'Georgia, serif' }}
      >
        WELLMEADOWS
      </Typography> */}
      <List>
        <ListItem>
          <ListItemText primary="Patient Details" />
        </ListItem>
        <ListItem button component={Link} to="/patient-form">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Patient Form
          </Button>
        </ListItem>
        <ListItem button component={Link} to="/patient-medication">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Patient Medication
          </Button>
        </ListItem>
        <ListItem button component={Link} to="/patient-appointment">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Patient Appointment
          </Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="Staff Information" />
        </ListItem>
        <ListItem button component={Link} to="/staff-list">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Staff List
          </Button>
        </ListItem>
        <ListItem button component={Link} to="/ward-requisitions">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Ward Requisitions
          </Button>
        </ListItem>
        <ListItem button component={Link} to="/ward-staff-allocation">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Ward Staff Allocation
          </Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="Drug Supply Info" />
        </ListItem>
        <ListItem button component={Link} to="/pharmaceutical-supplies">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Pharmaceutical Supplies
          </Button>
        </ListItem>
        <ListItem button component={Link} to="/drug-supplies">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Drug Supplies
          </Button>
        </ListItem>
        <ListItem button component={Link} to="/drug-supplier">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Drug Supplier
          </Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="Other Menus" />
        </ListItem>
        <ListItem button component={Link} to="/in-patient">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            InPatient
          </Button>
        </ListItem>
        <ListItem button component={Link} to="/outpatient">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Outpatient
          </Button>
        </ListItem>
        <ListItem button component={Link} to="/consultant">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Consultant
          </Button>
        </ListItem>
        <ListItem button component={Link} to="/local-doctors">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Local Doctors
          </Button>
        </ListItem>
        <ListItem button component={Link} to="/patient-next-of-kin">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Patient Next-of-Kin
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} style={{ position: 'absolute', top: 16, left: 16 }}>
        <MenuIcon style={{ color: '#000' }} />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
      <Link to='/login' style={{ position: 'absolute', top: 16, right: 16 }}>
        <IconButton>
            
          <LogoutIcon style={{ color: '#000' }} />
        </IconButton>
      </Link>
      <Container maxWidth="xl" style={{ marginTop: 10 }}>
        <Paper style={{ padding: 16, backgroundColor: '#86b6f6', color: '#fff' }}>
          <Typography 
            variant="h2" 
            align="center" 
            style={{ marginTop: 16, fontFamily: 'Georgia, serif' }}
          >
            WELLMEADOWS
          </Typography>
          <Box my={4} display="flex" justifyContent="center">
            <img src="\src\assets\shat.jpg" alt="Wellmeadows" style={{ borderRadius: 10, maxWidth: '55%' }} />
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Dashboard;
    