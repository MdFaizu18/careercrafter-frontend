import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingNavbar from '../../components/layouts/LandingNavbar';
import LandingFooter from '../../components/layouts/LandingFooter';
import ScrollToTop from '../../utils/ScrollToTop';

const HomeOutlet = () => {
  return (
    <div>
      <ScrollToTop />
      {/* Navbar for all pages  */}
      <LandingNavbar />
      <Outlet />
      {/* Footer for all pages  */}
      <LandingFooter />
    </div>
  );
};

export default HomeOutlet;
