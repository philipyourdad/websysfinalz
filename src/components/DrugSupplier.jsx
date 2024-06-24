import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import supabase from '../Client'; // Import Supabase client

const DrugSupplier = () => {
  const [formData, setFormData] = useState({
    SupplierNo: '',
    SupplierName: '',
    Address: '',
    TelNo: '',
    FaxNo: '',
    Supplies: ''
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
      // Insert or update data into "Drug Supplier" table in Supabase
      const { data, error } = await supabase.from('Drug Supplier').upsert([
        {
          SupplierNo: parseInt(formData.SupplierNo),
          SupplierName: formData.SupplierName,
          Address: formData.Address,
          TelNo: parseInt(formData.TelNo),
          FaxNo: parseInt(formData.FaxNo),
          Supplies: formData.Supplies
        }
      ]);

      if (error) {
        throw error;
      } else {
        console.log('Data saved successfully:', data);
        // Optionally reset form fields after successful submission
        setFormData({
          SupplierNo: '',
          SupplierName: '',
          Address: '',
          TelNo: '',
          FaxNo: '',
          Supplies: ''
        });
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier No"
              name="SupplierNo"
              value={formData.SupplierNo}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier Name"
              name="SupplierName"
              value={formData.SupplierName}
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
              name="TelNo"
              value={formData.TelNo}
              onChange={handleChange}
              required
              type="tel"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fax No"
              name="FaxNo"
              value={formData.FaxNo}
              onChange={handleChange}
              type="tel"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Supplies"
              name="Supplies"
              value={formData.Supplies}
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
              Save Supplier
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default DrugSupplier;
