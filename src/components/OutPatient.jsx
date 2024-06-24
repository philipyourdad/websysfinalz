// OutPatient.jsx

import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import supabase from '../Client'; // Import Supabase client

const OutPatient = () => {
  const [formData, setFormData] = useState({
    PatientNo: '',
    FirstName: '',
    LastName: '',
    Address: '',
    Telno: '',
    DateofBirth: '',
    Sex: '',
    AppointmentDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Insert data into "Out - Patient" table in Supabase
    const { data, error } = await supabase.from('Out - Patient').insert([
      {
        PatientNo: parseInt(formData.PatientNo),
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        Address: formData.Address,
        Telno: parseInt(formData.Telno),
        DateofBirth: new Date(formData.DateofBirth),
        Sex: formData.Sex,
        AppointmentDate: new Date(formData.AppointmentDate)
      }
    ]);

    if (error) {
      console.error('Error saving data:', error.message);
    } else {
      console.log('Data saved successfully:', data);
      // Optionally reset form fields after successful submission
      setFormData({
        PatientNo: '',
        FirstName: '',
        LastName: '',
        Address: '',
        Telno: '',
        DateofBirth: '',
        Sex: '',
        AppointmentDate: ''
      });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Patient No"
              name="PatientNo"
              value={formData.PatientNo}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Telephone No"
              name="Telno"
              value={formData.Telno}
              onChange={handleChange}
              required
              type="tel"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="DateofBirth"
              value={formData.DateofBirth}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sex"
              name="Sex"
              value={formData.Sex}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Appointment Date"
              name="AppointmentDate"
              value={formData.AppointmentDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
            >
              Save Outpatient
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default OutPatient;
