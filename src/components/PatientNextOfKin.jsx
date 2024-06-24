// NextOfKin.jsx

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import supabase from '../Client'; // Import Supabase client

const NextOfKin = () => {
  const [formData, setFormData] = useState({
    PatientNo: '',
    FullName: '',
    Address: '',
    Telno: '',
    Relationship: ''
  });

  const [nextOfKinList, setNextOfKinList] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // Track which ID is being edited
  const [editMode, setEditMode] = useState(false); // Track whether in edit mode
  const [confirmationOpen, setConfirmationOpen] = useState(false); // Confirmation dialog state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from('Patient Next-of-Kin').select('*');
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setNextOfKinList(data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      setConfirmationOpen(true); // Open confirmation dialog for update
    } else {
      const { data, error } = await supabase.from('Patient Next-of-Kin').insert([
        {
          PatientNo: parseInt(formData.PatientNo),
          FullName: formData.FullName,
          Address: formData.Address,
          Telno: formData.Telno,
          Relationship: formData.Relationship
        }
      ]);

      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        console.log('Data inserted successfully:', data);
        setFormData({
          PatientNo: '',
          FullName: '',
          Address: '',
          Telno: '',
          Relationship: ''
        });
        fetchData(); // Refresh the data after insertion
      }
    }
  };

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from('Patient Next-of-Kin')
      .update({
        FullName: formData.FullName,
        Address: formData.Address,
        Telno: formData.Telno,
        Relationship: formData.Relationship
      })
      .eq('id', selectedId);

    if (error) {
      console.error('Error updating data:', error.message);
    } else {
      console.log('Data updated successfully:', data);
      setFormData({
        PatientNo: '',
        FullName: '',
        Address: '',
        Telno: '',
        Relationship: ''
      });
      fetchData(); // Refresh the data after update
    }
    setConfirmationOpen(false); // Close confirmation dialog after update
    setEditMode(false); // Exit edit mode
  };

  const handleDelete = async (id) => {
    const { data, error } = await supabase.from('Patient Next-of-Kin').delete().eq('id', id);

    if (error) {
      console.error('Error deleting data:', error.message);
    } else {
      console.log('Data deleted successfully:', data);
      fetchData(); // Refresh the data after deletion
    }
  };

  const handleEdit = (nextOfKin) => {
    setFormData({
      PatientNo: nextOfKin.PatientNo,
      FullName: nextOfKin.FullName,
      Address: nextOfKin.Address,
      Telno: nextOfKin.Telno,
      Relationship: nextOfKin.Relationship
    });
    setSelectedId(nextOfKin.id); // Set the ID of the record being edited
    setEditMode(true); // Enter edit mode
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false); // Close confirmation dialog
  };

  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={5} sm={6}>
            <TextField
              fullWidth
              label="Patient No"
              name="PatientNo"
              value={formData.PatientNo}
              onChange={handleChange}
              required
              type="number"
              disabled={editMode} // Disable during edit mode
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="FullName"
              value={formData.FullName}
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Relationship"
              name="Relationship"
              value={formData.Relationship}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            {editMode ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10, marginRight: 10 }}
                  onClick={handleUpdate}
                >
                  Confirm Update
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: '#ff0000', color: '#fff', borderRadius: 10, padding: 10 }}
                  onClick={() => setEditMode(false)} // Exit edit mode without updating
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                variant="contained"
                
                size="large"
                style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10, marginTop: 10 }}
              >
                Add Next-of-Kin
              </Button>
            )}
          </Grid>
        </Grid>
      </form>

      {nextOfKinList.length > 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Next-of-Kin List
          </Typography>
          {nextOfKinList.map((nextOfKin) => (
            <Box key={nextOfKin.id} sx={{ border: '1px solid #ccc', borderRadius: 3, p: 2, mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {nextOfKin.FullName}
              </Typography>
              <Typography variant="body2" sm={{ mb: 1 }}>
                Address: {nextOfKin.Address}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Tel No: {nextOfKin.Telno}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Relationship: {nextOfKin.Relationship}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: 8 }}
                onClick={() => handleEdit(nextOfKin)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(nextOfKin.id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No Next-of-Kin data available</Typography>
      )}

      {/* Confirmation dialog for update */}
      <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NextOfKin;
