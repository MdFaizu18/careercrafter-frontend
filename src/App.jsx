import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomeOutlet from './pages/landing/HomeOutlet';
import NotFoundPage from './pages/error/NotFoundPage';
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPaGE';
import DashboardJobseeker from './pages/jobseeker/DashboardJobseeker';
import JobseekerOutlet from './pages/jobseeker/JobseekerOutlet';
import FindJobs from './pages/jobseeker/FindJobs';
import JobDetails from './pages/jobseeker/JobDetails';
import ResumeManager from './pages/jobseeker/ResumeManager';
import MyApplications from './pages/jobseeker/MyApplications';
import SupportPage from './pages/jobseeker/SupportPage';
import JobseekerProfile from './pages/jobseeker/JobseekerProfile';

// Define the router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeOutlet />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: 'jobseeker',
    element: <JobseekerOutlet />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardJobseeker />,
      },
      {
        path: 'find-jobs',
        element: <FindJobs />,
      },
      {
        path: 'job/1',
        element: <JobDetails />,
      },
      {
        path: 'resume',
        element: <ResumeManager />,
      },
      {
        path: 'applications',
        element: <MyApplications />,
      },
      {
        path: 'support',
        element: <SupportPage />,
      },
      {
        path: 'profile',
        element: <JobseekerProfile />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
