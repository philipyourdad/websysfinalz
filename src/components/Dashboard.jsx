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
                    <Typography variant="h2" align="center" style={{ marginTop: 16 }}>Wellmeadows Hospital</Typography>
                    
                    <Box my={2} p={2} boxShadow={0} style={{ backgroundColor: '#23344e', color: '#fff' }}>
                        <Typography variant="h5" align="left">Patient Details</Typography>
                        <Box mt={2} display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={4}>
                           
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Patient List
                                </Button>
                         
                            
                                <Button 
                                    variant="error" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Patient Allocation
                                </Button>
                            
                           
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Medication Report
                                </Button>
                            
                            
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Patient Appointment
                                </Button>
                            
                        </Box>
                    </Box>
            
                    <Box my={2} p={2} boxShadow={0} style={{ backgroundColor: '#23344e', color: '#fff' }}>
                        <Typography variant="h5" align="left">Staff Information</Typography>
                        <Box mt={2} display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>                                         
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Ward Requisitions
                                </Button>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Staff List
                                </Button>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Ward Staff Allocation
                                </Button>
                        </Box>
                    </Box>

                    <Box my={2} p={2} style={{ backgroundColor: '#23344e' }}>
                        <Typography variant="h5" align="left">Drug Supply Info</Typography>
                        <Box mt={2} display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Ward
                                </Button>

                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Drug Supplies
                                </Button>
                                                     
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Drug Supplier
                                </Button>
                        </Box>
                    </Box>


                    <Box my={2} p={2} style={{ backgroundColor: '#23344e' }}>
                        <Typography variant="h5" align="left">Other Menus</Typography>
                        <Box mt={2} display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>InPatient
                                </Button>

                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>OutPatient
                                </Button>

                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Waiting list
                                </Button>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>All Ward Staff
                                </Button>                    
                           
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Medication
                                </Button>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}>Ward Requisition
                                </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Container>
    );
}
