import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import supabase from '../Client'; // Adjust the import path based on your file structure

const StaffList = () => {
  const [formData, setFormData] = useState({
    StaffNo: '',
    Name: '',
    FullAddress: '',
    Phone: '',
    Dateofbirth: '',
    Sex: '',
    Nin: '',
    Position: '',
    Current_Salary: '',
    Salary_Scale: '',
    Qualification: '',
    WorkExperienceDetails: ''
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

    try {
      // Insert data into "Staff List" table in Supabase
      const { data, error } = await supabase.from('Staff List').insert([
        {
          StaffNo: parseInt(formData.StaffNo),
          Name: formData.Name,
          FullAddress: formData.FullAddress,
          Phone: parseInt(formData.Phone),
          Dateofbirth: new Date(formData.Dateofbirth),
          Sex: formData.Sex,
          Nin: parseInt(formData.Nin),
          Position: formData.Position,
          Current_Salary: parseInt(formData.Current_Salary),
          Salary_Scale: formData.Salary_Scale,
          Qualification: formData.Qualification,
          'WorkExperience Details': formData.WorkExperienceDetails
        }
      ]);

      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        console.log('Data inserted successfully:', data);
        // Optionally reset form fields after successful submission
        setFormData({
          StaffNo: '',
          Name: '',
          FullAddress: '',
          Phone: '',
          Dateofbirth: '',
          Sex: '',
          Nin: '',
          Position: '',
          Current_Salary: '',
          Salary_Scale: '',
          Qualification: '',
          WorkExperienceDetails: ''
        });
      }
    } catch (error) {
      console.error('Error inserting data:', error.message);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Staff Number"
              name="StaffNo"
              value={formData.StaffNo}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Address"
              name="FullAddress"
              value={formData.FullAddress}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="Dateofbirth"
              value={formData.Dateofbirth}
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
              label="National Insurance Number (NIN)"
              name="Nin"
              value={formData.Nin}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Position"
              name="Position"
              value={formData.Position}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Current Salary"
              name="Current_Salary"
              value={formData.Current_Salary}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Salary Scale"
              name="Salary_Scale"
              value={formData.Salary_Scale}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Qualification"
              name="Qualification"
              value={formData.Qualification}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Work Experience Details"
              name="WorkExperienceDetails"
              value={formData.WorkExperienceDetails}
              onChange={handleChange}
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
      </form>
    </Box>
  );
};

export default StaffList;
