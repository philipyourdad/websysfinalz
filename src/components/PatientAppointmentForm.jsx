import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import supabase from '../Client'; // Import Supabase client

const PatientAppointmentForm = () => {
  const [formData, setFormData] = useState({
    PatientAppointmentNo: '',
    Name: '',
    ConsultantNo: '',
    Date: '',
    ExaminationRoom: ''
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

    // Insert data into "Patient Appointment" table in Supabase
    const { data, error } = await supabase.from('Patient Appointment').insert([
      {
        PatientAppointmentNo: parseInt(formData.PatientAppointmentNo),
        Name: formData.Name,
        ConsultantNo: parseInt(formData.ConsultantNo),
        Date: new Date(formData.Date),
        ExaminationRoom: formData.ExaminationRoom
      }
    ]);

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', data);
      // Optionally reset form fields after successful submission
      setFormData({
        PatientAppointmentNo: '',
        Name: '',
        ConsultantNo: '',
        Date: '',
        ExaminationRoom: ''
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
              label="Appointment Number"
              name="PatientAppointmentNo"
              value={formData.PatientAppointmentNo}
              onChange={handleChange}
              required
              type="number"
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Consultant Number"
              name="ConsultantNo"
              value={formData.ConsultantNo}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Examination Room"
              name="ExaminationRoom"
              value={formData.ExaminationRoom}
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
              Schedule Appointment
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PatientAppointmentForm;
