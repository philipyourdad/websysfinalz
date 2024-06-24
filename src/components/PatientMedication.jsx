import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import supabase from '../Client'; // Import Supabase client

const PatientMedication = () => {
  const [formData, setFormData] = useState({
    DrugNo: '', // Add DrugNo field
    DrugName: '',
    PatientNo: '',
    PatientName: '',
    UnitsPerDay: '',
    MethodofAdminister: '',
    StartDate: '',
    FinishDate: ''
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

    // Insert data into "Patient Medication" table in Supabase
    const { data, error } = await supabase.from('Patient Medication').insert([
      {
        DrugNo: parseInt(formData.DrugNo), // Include DrugNo in insert object
        DrugName: formData.DrugName,
        PatientNo: parseInt(formData.PatientNo),
        PatientName: formData.PatientName,
        UnitsPerDay: parseFloat(formData.UnitsPerDay),
        MethodofAdminister: formData.MethodofAdminister,
        StartDate: new Date(formData.StartDate),
        FinishDate: new Date(formData.FinishDate)
      }
    ]);

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', data);
      // Optionally reset form fields after successful submission
      setFormData({
        DrugNo: '',
        DrugName: '',
        PatientNo: '',
        PatientName: '',
        UnitsPerDay: '',
        MethodofAdminister: '',
        StartDate: '',
        FinishDate: ''
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
              label="Drug No"
              name="DrugNo"
              value={formData.DrugNo}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Drug Name"
              name="DrugName"
              value={formData.DrugName}
              onChange={handleChange}
              required
            />
          </Grid>
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
              label="Patient Name"
              name="PatientName"
              value={formData.PatientName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Units Per Day"
              name="UnitsPerDay"
              value={formData.UnitsPerDay}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Method of Administer"
              name="MethodofAdminister"
              value={formData.MethodofAdminister}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Date"
              name="StartDate"
              value={formData.StartDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Finish Date"
              name="FinishDate"
              value={formData.FinishDate}
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
              Submit Medication
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PatientMedication;
