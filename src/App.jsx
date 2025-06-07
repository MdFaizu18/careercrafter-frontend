import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomeOutlet from './pages/landing/HomeOutlet';
import NotFoundPage from './pages/error/NotFoundPage';
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPaGE';
import AboutPage from './pages/landing/AboutPage';

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
      {
        path: 'about',
        element: <AboutPage />,
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
