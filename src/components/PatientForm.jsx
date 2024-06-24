// PatientForm.js
import React, { useState } from 'react';
import { Button, TextField, Box, Grid } from '@mui/material';
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
    }
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
            f
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
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientForm;
