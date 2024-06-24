import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import supabase from '../Client';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    PatientNo: '',
    PatientName: '',
    Address: '',
    Telno: '',
    DateofBirth: '',
    Sex: '',
    MaritalStatus: '',
    DateRegistered: '',
  });

  const [patientList, setPatientList] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const { data, error } = await supabase
      .from('Patient List')
      .select('*');

    if (error) {
      console.error('Error fetching patients:', error);
    } else {
      setPatientList(data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('Patient List')
      .insert([formData]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully:', data);
      fetchPatients(); // Refresh the list after inserting
    }
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setConfirmationOpen(true);
  };

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from('Patient List')
      .update(formData)
      .eq('PatientNo', formData.PatientNo);

    if (error) {
      console.error('Error updating data:', error);
    } else {
      console.log('Data updated successfully:', data);
      fetchPatients(); // Refresh the list after updating
      setConfirmationOpen(false);
    }
  };

  const handleDelete = async (PatientNo) => {
    const { data, error } = await supabase
      .from('Patient List')
      .delete()
      .eq('PatientNo', PatientNo);

    if (error) {
      console.error('Error deleting data:', error);
    } else {
      console.log('Data deleted successfully:', data);
      fetchPatients(); // Refresh the list after deleting
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Patient No"
            name="PatientNo"
            value={formData.PatientNo}
            onChange={handleChange}
            required
            InputProps={{
                style: { color: 'white' },
              }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Patient Name"
            name="PatientName"
            value={formData.PatientName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Tel No"
            name="Telno"
            value={formData.Telno}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="date"
            label="Date of Birth"
            name="DateofBirth"
            value={formData.DateofBirth}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Sex"
            name="Sex"
            value={formData.Sex}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Marital Status"
            name="MaritalStatus"
            value={formData.MaritalStatus}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="date"
            label="Date Registered"
            name="DateRegistered"
            value={formData.DateRegistered}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={4}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={handleUpdate}
              variant="contained"
              size="large"
              style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
            >
              Update
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() => handleDelete(formData.PatientNo)}
              variant="contained"
              size="large"
              style={{ backgroundColor: '#ff1744', color: '#fff', borderRadius: 10, padding: 10 }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {patientList.length > 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Patient List
          </Typography>
          {patientList.map((patient) => (
            <Box key={patient.PatientNo} sx={{ border: '1px solid #ccc', borderRadius: 5, p: 2, mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {patient.PatientName}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Address: {patient.Address}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Tel No: {patient.Telno}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: 8 }}
                onClick={() => handleEdit(patient)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(patient.PatientNo)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No patient data available</Typography>
      )}

      {/* Confirmation dialog for update */}
      <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientForm;
