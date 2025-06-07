import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, userRole, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if the route requires a specific role
  const routePath = window.location.pathname;
  const isEmployerRoute = routePath.includes('/employer/');
  const isJobSeekerRoute = routePath.includes('/job-seeker/');

  if (isEmployerRoute && userRole !== 'employer') {
    return <Navigate to="/login" replace />;
  }

  if (isJobSeekerRoute && userRole !== 'jobSeeker') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
