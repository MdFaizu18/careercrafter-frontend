import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomeOutlet from './pages/landing/HomeOutlet';
import NotFoundPage from './pages/error/NotFoundPage';
import LandingPage from './pages/landing/LandingPage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';

import DashboardJobseeker from './pages/jobseeker/DashboardJobseeker';
import JobseekerOutlet from './pages/jobseeker/JobseekerOutlet';
import FindJobs from './pages/jobseeker/FindJobs';
import JobDetails from './pages/jobseeker/JobDetails';
import ResumeManager from './pages/jobseeker/ResumeManager';
import MyApplications from './pages/jobseeker/MyApplications';
import SupportPage from './pages/jobseeker/SupportPage';
import JobseekerProfile from './pages/jobseeker/JobseekerProfile';
import EmployerOutlet from './pages/employer/EmployerOutlet';
import DashboardEmployer from './pages/employer/DashboardEmployer';
import PostJob from './pages/employer/PostJobs';
import ViewApplications from './pages/employer/ViewApplications';
import ManageJobs from './pages/employer/ManageJobs';
import EmployerProfile from './pages/employer/EmployerProfile';
import RequireAuth from './auth/RequireAuth';
import JobApplications from './pages/employer/JobApplications';
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
    element: <RequireAuth />,
    children: [
      {
        path: 'jobseeker',
        element: <JobseekerOutlet />,
        children: [
          { path: 'dashboard', element: <DashboardJobseeker /> },
          { path: 'find-jobs', element: <FindJobs /> },
          { path: 'job/:id', element: <JobDetails /> },
          { path: 'resume', element: <ResumeManager /> },
          { path: 'applications', element: <MyApplications /> },
          { path: 'support', element: <SupportPage /> },
          { path: 'profile', element: <JobseekerProfile /> },
        ],
      },
    ],
  },

  {
    element: <RequireAuth />,
    children: [
      {
        path: 'employer',
        element: <EmployerOutlet />,
        children: [
          { path: 'dashboard', element: <DashboardEmployer /> },
          { path: 'profile', element: <EmployerProfile /> },
          { path: 'post-job', element: <PostJob /> },
          { path: 'update-job/:id', element: <PostJob /> },
          { path: 'view-applications', element: <ViewApplications /> },
          { path: 'applications/:id', element: <JobApplications /> },
          { path: 'manage-jobs', element: <ManageJobs /> },
        ],
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
