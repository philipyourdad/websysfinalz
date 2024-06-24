import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import supabase from '../Client'; // Adjust the import path based on your file structure

const WardRequisitions = () => {
  const [formData, setFormData] = useState({
    RequisitionNo: '',
    StaffName: '',
    WardName: '',
    DrugNo: '',
    DrugName: '',
    Description: '',
    Dosage: '',
    MethodofAdminister: '',
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

    try {
      // Insert data into "Ward Requisitions" table in Supabase
      const { data, error } = await supabase.from('Ward Requisitions').insert([
        {
          RequisitionNo: parseInt(formData.RequisitionNo),
          StaffName: formData.StaffName,
          WardName: formData.WardName,
          DrugNo: parseInt(formData.DrugNo),
          DrugName: formData.DrugName,
          Description: formData.Description,
          Dosage: parseInt(formData.Dosage),
          MethodofAdminister: formData.MethodofAdminister,
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
          RequisitionNo: '',
          StaffName: '',
          WardName: '',
          DrugNo: '',
          DrugName: '',
          Description: '',
          Dosage: '',
          MethodofAdminister: '',
          Quantity: '',
          ReorderLvl: '',
          CostPerUnit: ''
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
              label="Requisition Number"
              name="RequisitionNo"
              value={formData.RequisitionNo}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Staff Name"
              name="StaffName"
              value={formData.StaffName}
              onChange={handleChange}
              required
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Drug Number"
              name="DrugNo"
              value={formData.DrugNo}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12}>
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
              label="Dosage"
              name="Dosage"
              value={formData.Dosage}
              onChange={handleChange}
              type="number"
              required
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
              label="Quantity"
              name="Quantity"
              value={formData.Quantity}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Reorder Level"
              name="ReorderLvl"
              value={formData.ReorderLvl}
              onChange={handleChange}
              type="number"
              required
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
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default WardRequisitions;
