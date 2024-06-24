// DrugSupplies.jsx

import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import supabase from '../Client'; // Import Supabase client

const DrugSupplies = () => {
  const [formData, setFormData] = useState({
    ItemNo: '',
    ItemName: '',
    Description: '',
    Quantity: '',
    ReorderLvl: '',
    CostPerUnit: ''
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

    // Insert data into "Drug Supplies" table in Supabase
    const { data, error } = await supabase.from('Drug Supplies').insert([
      {
        ItemNo: parseInt(formData.ItemNo),
        ItemName: formData.ItemName,
        Description: formData.Description,
        Quantity: parseInt(formData.Quantity),
        ReorderLvl: parseInt(formData.ReorderLvl),
        CostPerUnit: formData.CostPerUnit
      }
    ]);

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', data);
      // Optionally reset form fields after successful submission
      setFormData({
        ItemNo: '',
        ItemName: '',
        Description: '',
        Quantity: '',
        ReorderLvl: '',
        CostPerUnit: ''
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
              label="Item No"
              name="ItemNo"
              value={formData.ItemNo}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Item Name"
              name="ItemName"
              value={formData.ItemName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="Quantity"
              value={formData.Quantity}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Reorder Level"
              name="ReorderLvl"
              value={formData.ReorderLvl}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cost Per Unit"
              name="CostPerUnit"
              value={formData.CostPerUnit}
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
              Save Drug Supply
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default DrugSupplies;
