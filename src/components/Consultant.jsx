import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import supabase from '../Client'; // Import Supabase client

const Consultant = () => {
  const [formData, setFormData] = useState({
    ConsultantNo: '',
    Name: '',
    Specialization: '',
  });

  const [consultantList, setConsultantList] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // Track which ID is being edited
  const [editMode, setEditMode] = useState(false); // Track whether in edit mode
  const [confirmationOpen, setConfirmationOpen] = useState(false); // Confirmation dialog state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from('Consultant').select('*');
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setConsultantList(data);
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
      const { data, error } = await supabase.from('Consultant').insert([
        {
          ConsultantNo: parseInt(formData.ConsultantNo),
          Name: formData.Name,
          Specialization: formData.Specialization,
        }
      ]);

      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        console.log('Data inserted successfully:', data);
        setFormData({
          ConsultantNo: '',
          Name: '',
          Specialization: '',
        });
        fetchData(); // Refresh the data after insertion
      }
    }
  };

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from('Consultant')
      .update({
        Name: formData.Name,
        Specialization: formData.Specialization
      })
      .eq('ConsultantNo', selectedId);

    if (error) {
      console.error('Error updating data:', error.message);
    } else {
      console.log('Data updated successfully:', data);
      setFormData({
        ConsultantNo: '',
        Name: '',
        Specialization: '',
      });
      fetchData(); // Refresh the data after update
    }
    setConfirmationOpen(false); // Close confirmation dialog after update
    setEditMode(false); // Exit edit mode
  };

  const handleDelete = async (ConsultantNo) => {
    const { data, error } = await supabase.from('Consultant').delete().eq('ConsultantNo', ConsultantNo);

    if (error) {
      console.error('Error deleting data:', error.message);
    } else {
      console.log('Data deleted successfully:', data);
      fetchData(); // Refresh the data after deletion
    }
  };

  const handleEdit = (consultant) => {
    setFormData({
      ConsultantNo: consultant.ConsultantNo,
      Name: consultant.Name,
      Specialization: consultant.Specialization,
    });
    setSelectedId(consultant.ConsultantNo); // Set the ID of the record being edited
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
              label="Consultant No"
              name="ConsultantNo"
              value={formData.ConsultantNo}
              onChange={handleChange}
              required
              type="number"
              disabled={editMode} // Disable during edit mode
              InputLabelProps={{ style: { color: '#fff' } }} // White text for label
              InputProps={{ style: { color: '#fff' } }} // White text for input
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
              InputLabelProps={{ style: { color: '#fff' } }} // White text for label
              InputProps={{ style: { color: '#fff' } }} // White text for input
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Specialization"
              name="Specialization"
              value={formData.Specialization}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: '#fff' } }} // White text for label
              InputProps={{ style: { color: '#fff' } }} // White text for input
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
                fullWidth
                size="large"
                style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10, marginTop: 10 }}
              >
                Add Consultant
              </Button>
            )}
          </Grid>
        </Grid>
      </form>

      {consultantList.length > 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Consultant List
          </Typography>
          {consultantList.map((consultant) => (
            <Box key={consultant.ConsultantNo} sx={{ border: '1px solid #ccc', borderRadius: 5, p: 2, mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#fff' }}>
                {consultant.Name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#fff' }}>
                Specialization: {consultant.Specialization}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: 8 }}
                onClick={() => handleEdit(consultant)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(consultant.ConsultantNo)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ color: '#fff' }}>No Consultant data available</Typography>
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

export default Consultant;
