import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import supabase from '../Client'; // Import Supabase client

const InPatient = () => {
  const [formData, setFormData] = useState({
    PatientNo: '',
    Name: '',
    Telno: '',
    DateofBirth: '',
    Sex: '',
    MaritalStatus: '',
    OnWaitingList: '',
    DatePlaced: '',
    DateLeave: '',
    ActualLeave: '',
    BedNo: ''
  });

  const [inPatientList, setInPatientList] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // Track which ID is being edited
  const [editMode, setEditMode] = useState(false); // Track whether in edit mode
  const [confirmationOpen, setConfirmationOpen] = useState(false); // Confirmation dialog state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from('InPatient').select('*');
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setInPatientList(data);
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

    try {
      if (editMode) {
        setConfirmationOpen(true); // Open confirmation dialog for update
      } else {
        // Insert data into "InPatient" table in Supabase
        const { data, error } = await supabase.from('InPatient').upsert([
          {
            PatientNo: parseInt(formData.PatientNo),
            Name: formData.Name,
            Telno: parseInt(formData.Telno),
            DateofBirth: new Date(formData.DateofBirth),
            Sex: formData.Sex,
            MaritalStatus: formData.MaritalStatus,
            OnWaitingList: formData.OnWaitingList ? new Date(formData.OnWaitingList) : null,
            DatePlaced: formData.DatePlaced ? new Date(formData.DatePlaced) : null,
            DateLeave: formData.DateLeave ? new Date(formData.DateLeave) : null,
            ActualLeave: formData.ActualLeave ? new Date(formData.ActualLeave) : null,
            BedNo: parseInt(formData.BedNo)
          }
        ]);

        if (error) {
          throw error;
        } else {
          console.log('Data saved successfully:', data);
          // Optionally reset form fields after successful submission
          setFormData({
            PatientNo: '',
            Name: '',
            Telno: '',
            DateofBirth: '',
            Sex: '',
            MaritalStatus: '',
            OnWaitingList: '',
            DatePlaced: '',
            DateLeave: '',
            ActualLeave: '',
            BedNo: ''
          });
          fetchData(); // Refresh the data after insertion
        }
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from('InPatient')
      .update({
        Name: formData.Name,
        Telno: parseInt(formData.Telno),
        DateofBirth: new Date(formData.DateofBirth),
        Sex: formData.Sex,
        MaritalStatus: formData.MaritalStatus,
        OnWaitingList: formData.OnWaitingList ? new Date(formData.OnWaitingList) : null,
        DatePlaced: formData.DatePlaced ? new Date(formData.DatePlaced) : null,
        DateLeave: formData.DateLeave ? new Date(formData.DateLeave) : null,
        ActualLeave: formData.ActualLeave ? new Date(formData.ActualLeave) : null,
        BedNo: parseInt(formData.BedNo)
      })
      .eq('PatientNo', selectedId);

    if (error) {
      console.error('Error updating data:', error.message);
    } else {
      console.log('Data updated successfully:', data);
      setFormData({
        PatientNo: '',
        Name: '',
        Telno: '',
        DateofBirth: '',
        Sex: '',
        MaritalStatus: '',
        OnWaitingList: '',
        DatePlaced: '',
        DateLeave: '',
        ActualLeave: '',
        BedNo: ''
      });
      fetchData(); // Refresh the data after update
    }
    setConfirmationOpen(false); // Close confirmation dialog after update
    setEditMode(false); // Exit edit mode
  };

  const handleDelete = async (PatientNo) => {
    const { data, error } = await supabase.from('InPatient').delete().eq('PatientNo', PatientNo);

    if (error) {
      console.error('Error deleting data:', error.message);
    } else {
      console.log('Data deleted successfully:', data);
      fetchData(); // Refresh the data after deletion
    }
  };

  const handleEdit = (inPatient) => {
    setFormData({
      PatientNo: inPatient.PatientNo,
      Name: inPatient.Name,
      Telno: inPatient.Telno,
      DateofBirth: formatDate(inPatient.DateofBirth),
      Sex: inPatient.Sex,
      MaritalStatus: inPatient.MaritalStatus,
      OnWaitingList: formatDate(inPatient.OnWaitingList),
      DatePlaced: formatDate(inPatient.DatePlaced),
      DateLeave: formatDate(inPatient.DateLeave),
      ActualLeave: formatDate(inPatient.ActualLeave),
      BedNo: inPatient.BedNo
    });
    setSelectedId(inPatient.PatientNo); // Set the ID of the record being edited
    setEditMode(true); // Enter edit mode
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
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
              label="Patient No"
              name="PatientNo"
              value={formData.PatientNo}
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Telephone No"
              name="Telno"
              value={formData.Telno}
              onChange={handleChange}
              required
              type="tel"
              InputLabelProps={{ style: { color: '#fff' } }} // White text for label
              InputProps={{ style: { color: '#fff' } }} // White text for input
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="DateofBirth"
              value={formData.DateofBirth}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true, style: { color: '#fff' } }} // White text for label
              InputProps={{ style: { color: '#fff' } }} // White text for input
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
              InputLabelProps={{ style: { color: '#fff' } }} // White text for label
              InputProps={{ style: { color: '#fff' } }} // White text for input
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Marital Status"
              name="MaritalStatus"
              value={formData.MaritalStatus}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: '#fff' } }} // White text for label
              InputProps={{ style: { color: '#fff' } }} // White text for input
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="On Waiting List"
              name="OnWaitingList"
              value={formData.OnWaitingList}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true, style: { color: '#fff' } }} // White text for label
              InputProps={{ style: { color: '#fff' } }} // White text for input
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date Placed"
              name="DatePlaced"
              value={formData.DatePlaced}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true, style: { color: '#fff' } }} // White text for label
              InputProps={{ style: { color: '#fff' } }} // White text for input
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date Leave"
              name="DateLeave"
              value={formData.DateLeave}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true, style: { color: '#fff' } }} // White text for label
              InputProps={{ style: { color: '#fff' } }} // White text for input
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Actual Leave"
              name="ActualLeave"
              value={formData.ActualLeave}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true, style: { color: '#fff' } }} // White text for label
              InputProps={{ style: { color: '#fff' } }} // White text for input
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bed No"
              name="BedNo"
              value={formData.BedNo}
              onChange={handleChange}
              required
              type="number"
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
                size="large"
                style={{ backgroundColor: '#027184', color: '#fff', borderRadius: 10, padding: 10, marginTop: 10 }}
              >
                Save InPatient Data
              </Button>
            )}
          </Grid>
        </Grid>
      </form>

      {inPatientList.length > 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            InPatient List
          </Typography>
          {inPatientList.map((inPatient) => (
            <Box key={inPatient.PatientNo} sx={{ border: '1px solid #ccc', borderRadius: 5, p: 2, mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#fff' }}>
                {inPatient.Name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#fff' }}>
                Tel: {inPatient.Telno}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#fff' }}>
                Date of Birth: {formatDate(inPatient.DateofBirth)}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#fff' }}>
                Sex: {inPatient.Sex}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#fff' }}>
                Marital Status: {inPatient.MaritalStatus}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: 8 }}
                onClick={() => handleEdit(inPatient)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(inPatient.PatientNo)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ color: '#fff' }}>No InPatient data available</Typography>
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

export default InPatient;
