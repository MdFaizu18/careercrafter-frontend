import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingNavbar from '../../components/layouts/LandingNavbar';
import LandingFooter from '../../components/layouts/LandingFooter';

const HomeOutlet = () => {
  return (
    <div>
    <LandingNavbar/>
      <Outlet />
      <LandingFooter/>
    </div>
  );
};

export default HomeOutlet;
