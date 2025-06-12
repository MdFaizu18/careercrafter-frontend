import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../utils/ScrollToTop';
import JobseekerNavbar from '../../components/layouts/JobseekerNavbar';
import JobseekerFooter from '../../components/layouts/JobseekerFooter';

const JobseekerOutlet = () => {
  return (
    <div>
      <ScrollToTop />
      <JobseekerNavbar isAuthenticated={true} userRole="jobseeker" />
      <Outlet />
      <JobseekerFooter />
    </div>
  );
};

export default JobseekerOutlet;
