// LocalDoctors.jsx

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import supabase from '../Client'; // Import Supabase client

const LocalDoctors = () => {
  const [formData, setFormData] = useState({
    ClinicNo: '',
    Fullname: '',
    Address: '',
    Telno: ''
  });

  const [doctorList, setDoctorList] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // Track which ID is being edited
  const [editMode, setEditMode] = useState(false); // Track whether in edit mode
  const [confirmationOpen, setConfirmationOpen] = useState(false); // Confirmation dialog state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from('Local Doctors').select('*');
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setDoctorList(data);
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
      const { data, error } = await supabase.from('Local Doctors').upsert([
        {
          ClinicNo: parseInt(formData.ClinicNo),
          Fullname: formData.Fullname,
          Address: formData.Address,
          Telno: formData.Telno
        }
      ]);

      if (error) {
        console.error('Error saving data:', error.message);
      } else {
        console.log('Data saved successfully:', data);
        setFormData({
          ClinicNo: '',
          Fullname: '',
          Address: '',
          Telno: ''
        });
        fetchData(); // Refresh the data after insertion
      }
    }
  };

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from('Local Doctors')
      .update({
        Fullname: formData.Fullname,
        Address: formData.Address,
        Telno: formData.Telno
      })
      .eq('ClinicNo', selectedId);

    if (error) {
      console.error('Error updating data:', error.message);
    } else {
      console.log('Data updated successfully:', data);
      setFormData({
        ClinicNo: '',
        Fullname: '',
        Address: '',
        Telno: ''
      });
      fetchData(); // Refresh the data after update
    }
    setConfirmationOpen(false); // Close confirmation dialog after update
    setEditMode(false); // Exit edit mode
  };

  const handleDelete = async (ClinicNo) => {
    const { data, error } = await supabase.from('Local Doctors').delete().eq('ClinicNo', ClinicNo);

    if (error) {
      console.error('Error deleting data:', error.message);
    } else {
      console.log('Data deleted successfully:', data);
      fetchData(); // Refresh the data after deletion
    }
  };

  const handleEdit = (doctor) => {
    setFormData({
      ClinicNo: doctor.ClinicNo,
      Fullname: doctor.Fullname,
      Address: doctor.Address,
      Telno: doctor.Telno
    });
    setSelectedId(doctor.ClinicNo); // Set the ID of the record being edited
    setEditMode(true); // Enter edit mode
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false); // Close confirmation dialog
  };

  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Clinic No"
              name="ClinicNo"
              value={formData.ClinicNo}
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
              name="Fullname"
              value={formData.Fullname}
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
              type="tel"
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
                Add Doctor
              </Button>
            )}
          </Grid>
        </Grid>
      </form>

      {doctorList.length > 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Local Doctors List
          </Typography>
          {doctorList.map((doctor) => (
            <Box key={doctor.ClinicNo} sx={{ border: '1px solid #ccc', borderRadius: 5, p: 2, mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {doctor.Fullname}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Address: {doctor.Address}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Tel No: {doctor.Telno}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: 8 }}
                onClick={() => handleEdit(doctor)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(doctor.ClinicNo)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No Local Doctors data available</Typography>
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

export default LocalDoctors;
