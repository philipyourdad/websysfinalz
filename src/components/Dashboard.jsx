import { Container, Paper, Typography, IconButton, Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Dashboard() {
    return (
        <Container>
            <Container maxWidth="xl">
                <Paper style={{ position: 'relative', padding: 16, marginTop: 16, backgroundColor: '#23344e', color: '#fff' }}>  
                    <Link to='/login' style={{ position: 'absolute', top: 16, right: 16 }}>
                        <IconButton color="primary">
                            <LogoutIcon />
                        </IconButton>
                    </Link>
                    <Typography 
                        variant="h2" 
                        align="center" 
                        style={{ marginTop: 16, fontFamily: 'Georgia, serif' }}
>
                                    WELLMEADOWS
                    </Typography>

                    
                    <Box my={2} p={2} boxShadow={0} style={{ backgroundColor: '#23344e', color: '#fff' }}>
                        <Typography variant="h5" align="left">Patient Details</Typography>
                        <Box mt={2} display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={4}>
                           
                                <Button
                                    component={Link}
                                    to="/patient-form"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
                                >
                                    Patient Form
                                </Button>
                                
                            
                                {/* <Button 
                                    variant="error" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Patient Allocation
                                </Button> */}
                            
                                <Button
                                    component={Link}
                                    to="/patient-medication"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
                                    >
                                    Patient Medication
                                </Button>
                            
                            
                                <Button
                                    component={Link}
                                    to="/patient-appointment"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
                                    >
                                    Patient Appointment
                                </Button>
                        </Box>
                    </Box>
            
                    <Box my={2} p={2} boxShadow={0} style={{ backgroundColor: '#23344e', color: '#fff' }}>
                        <Typography variant="h5" align="left">Staff Information</Typography>
                        <Box mt={2} display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>

                                <Button
                                    component={Link}
                                    to="/staff-list"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
                                    >
                                    Staff List
                                </Button>

                                <Button
                                    component={Link}
                                    to="/ward-requisitions"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10}}
                                >
                                    Ward Requisitions
                                </Button>

                                <Button
                                    component={Link}
                                    to="/ward-staff-allocation"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
                                    >
                                    Ward Staff Allocation
                                </Button>
                        </Box>
                    </Box>

                    <Box my={2} p={2} style={{ backgroundColor: '#23344e' }}>
                        <Typography variant="h5" align="left">Drug Supply Info</Typography>
                        <Box mt={2} display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>

                                <Button
                                    component={Link}
                                    to="/pharmaceutical-supplies"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
                                    >
                                    Pharmaceutical Supplies
                                </Button>

                                {/* <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Ward
                                </Button> */}

                                <Button
                                    component={Link}
                                    to="/drug-supplies"
                                    variant="contained"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: '10px 20px' }}
                                >
                                    Drug Supplies
                                </Button>
                                                     
                                <Button
                                    component={Link}
                                    to="/drug-supplier"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
                                >
                                    Drug Supplier
                                </Button>
                        </Box>
                    </Box>


                    <Box my={2} p={2} style={{ backgroundColor: '#23344e' }}>
                        <Typography variant="h5" align="left">Other Menus</Typography>
                        <Box mt={2} display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>

                                <Button
                                    component={Link}
                                    to="/in-patient"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
                                >
                                    InPatient
                                </Button>

                                 <Button
                                    component={Link}
                                    to="/outpatient"
                                    variant="contained"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
                                >
                                    Outpatient
                                </Button>

                                <Button
                                    component={Link}
                                    to="/consultant"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
                                    >
                                    Consultant
                                </Button>
                                
                                <Button
                                    component={Link}
                                    to="/local-doctors"
                                    variant="contained"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
                                    >
                                    Local Doctors
                                </Button>
                  
                           
                                <Button
                                    component={Link}
                                    to="/patient-next-of-kin"
                                    variant="contained"
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10}}
                                    >
                                    Patient Next-of-Kin
                                </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Container>
    );
}
