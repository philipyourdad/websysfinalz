import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PatientForm from './components/PatientForm';
import PatientMedication from './components/PatientMedication';
import PatientAppointmentForm from './components/PatientAppointmentForm';
import PharmaceuticalSupplies from './components/PharmaceuticalSupplies';
import Consultant from './components/Consultant'; // Import the Consultant component
import StaffList from './components/StaffList'; // Import the StaffList component
import WardRequisitions from './components/WardRequisitions';
import WardStaffAllocation from './components/WardStaffAllocation';
import DrugSupplies from './components/DrugSupplies'; // Import the DrugSupplies component
import DrugSupplier from './components/DrugSupplier'; // Import the DrugSupplier component
import InPatient from './components/InPatient'; // Import the InPatient component
import OutPatient from './components/OutPatient'; // Import the OutPatient component
import LocalDoctors from './components/LocalDoctors'; // Import LocalDoctors component
import PatientNextOfKin from './components/PatientNextOfKin'; // Import the PatientNextOfKin component


function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patient-form" element={<PatientForm />} />
          <Route path="/patient-medication" element={<PatientMedication />} />
          <Route path="/patient-appointment" element={<PatientAppointmentForm />} />
          <Route path="/pharmaceutical-supplies" element={<PharmaceuticalSupplies />} />
          <Route path="/consultant" element={<Consultant />} /> {/* Add this route */}
          <Route path="/staff-list" element={<StaffList />} /> {/* Add this route */}
          <Route path="/ward-requisitions" element={<WardRequisitions />} /> {/* Add the WardRequisitions route */}
          <Route path="/ward-staff-allocation" element={<WardStaffAllocation />} /> {/* Add this route */}
          <Route path="/drug-supplies" element={<DrugSupplies />} /> {/* Add this route */}
          <Route path="/drug-supplier" element={<DrugSupplier />} /> {/* Add this route */}
          <Route path="/in-patient" element={<InPatient />} /> {/* Add this route */}
          <Route path="/outpatient" element={<OutPatient />} /> {/* Add the route for OutPatient */}
          <Route path="/local-doctors" element={<LocalDoctors />} /> {/* Add this route */}
          <Route path="/patient-next-of-kin" element={<PatientNextOfKin />} /> {/* Add this route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
