import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import supabase from '../Client'; // Import Supabase client

const PharmaceuticalSupplies = () => {
  const [formData, setFormData] = useState({
    DrugNo: '',
    DrugName: ''
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

    // Insert data into "Pharmaceutical Supplies" table in Supabase
    const { data, error } = await supabase.from('Pharmaceutical Supplies').insert([
      {
        DrugNo: parseInt(formData.DrugNo),
        DrugName: formData.DrugName
      }
    ]);

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', data);
      // Optionally reset form fields after successful submission
      setFormData({
        DrugNo: '',
        DrugName: ''
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
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
            
              size="large"
              style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10 }}
            >
              Submit Pharmaceutical Supply
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PharmaceuticalSupplies;
