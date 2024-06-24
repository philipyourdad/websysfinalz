// WardStaffAllocation.jsx

import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import supabase from '../Client'; // Import Supabase client

const WardStaffAllocation = () => {
  const [formData, setFormData] = useState({
    WardNo: '',
    WardName: '',
    Location: '',
    ChargeNurse: '',
    StaffNo: '',
    TextExtn: '',
    Beds: '',
    ShortAndLongStayPatient: '',
    OutPatientClinic: ''
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

    // Check if StaffNo exists in Staff List before insertion
    const { data: staffData, error: staffError } = await supabase
      .from('Staff List')
      .select()
      .eq('StaffNo', parseInt(formData.StaffNo))
      .single();

    if (staffError) {
      console.error('Error checking staff data:', staffError.message);
      return;
    }

    if (!staffData) {
      console.error(`Staff with StaffNo ${formData.StaffNo} does not exist.`);
      return;
    }

    // Insert data into "Ward Staff Allocation" table in Supabase
    const { data, error } = await supabase.from('Ward Staff Allocation').insert([
      {
        WardNo: parseInt(formData.WardNo),
        WardName: formData.WardName,
        Location: formData.Location,
        ChargeNurse: formData.ChargeNurse,
        StaffNo: parseInt(formData.StaffNo),
        TextExtn: parseInt(formData.TextExtn),
        Beds: formData.Beds,
        'Short and Long Stay Patient': formData.ShortAndLongStayPatient,
        'Out Patient Clinic': formData.OutPatientClinic
      }
    ]);

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', data);
      // Optionally reset form fields after successful submission
      setFormData({
        WardNo: '',
        WardName: '',
        Location: '',
        ChargeNurse: '',
        StaffNo: '',
        TextExtn: '',
        Beds: '',
        ShortAndLongStayPatient: '',
        OutPatientClinic: ''
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
              label="Ward No"
              name="WardNo"
              value={formData.WardNo}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ward Name"
              name="WardName"
              value={formData.WardName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Charge Nurse"
              name="ChargeNurse"
              value={formData.ChargeNurse}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Staff No"
              name="StaffNo"
              value={formData.StaffNo}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Extension Number"
              name="TextExtn"
              value={formData.TextExtn}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Beds"
              name="Beds"
              value={formData.Beds}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Short and Long Stay Patient Capacity"
              name="ShortAndLongStayPatient"
              value={formData.ShortAndLongStayPatient}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Out Patient Clinic Facilities"
              name="OutPatientClinic"
              value={formData.OutPatientClinic}
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
              Save Ward Staff Allocation
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default WardStaffAllocation;
