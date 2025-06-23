'use client';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import AssetCatalog from './Pages/AssetCatalog';
import ServiceRequest from './Pages/ServiceRequest';
import AuditRequests from './Pages/AuditRequests';
import AdminDashboard from './Pages/AdminDashboard';
import AddEditAsset from './Pages/AddEditAsset';
import ServiceRequestManagement from './Pages/ServiceRequestManagement';
import AuditManagement from './Pages/AuditManagement';
import LandingPage from './Pages/LandingPage';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = userData => {
    setUser(userData);
    // Navigate is handled via <Navigate> in component after login
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* Employee routes */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard user={user} />} />
        <Route path="/asset-catalog" element={<AssetCatalog />} />
        <Route path="/service-request" element={<ServiceRequest />} />
        <Route path="/audit-requests" element={<AuditRequests />} />

        {/* Admin routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-edit-asset" element={<AddEditAsset />} />
        <Route path="/service-request-management" element={<ServiceRequestManagement />} />
        <Route path="/audit-management" element={<AuditManagement />} />

        {/* Catch-all route */}
        <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
