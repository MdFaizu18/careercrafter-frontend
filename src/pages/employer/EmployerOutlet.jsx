import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../utils/ScrollToTop';
import EmployerNavbar from '../../components/layouts/EmployerNavbar';

const EmployerOutlet = () => {
  return (
    <div>
      <ScrollToTop />
      <EmployerNavbar isAuthenticated={true} userRole="employer" />
      <Outlet />
    </div>
  );
};

export default EmployerOutlet;
