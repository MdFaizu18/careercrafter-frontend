import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../utils/ScrollToTop';
import JobseekerNavbar from '../../components/layouts/JobseekerNavbar';

const JobseekerOutlet = () => {
  return (
    <div>
      <ScrollToTop />
      <JobseekerNavbar isAuthenticated={true} userRole="jobseeker" />
      <Outlet />
    </div>
  );
};

export default JobseekerOutlet;
