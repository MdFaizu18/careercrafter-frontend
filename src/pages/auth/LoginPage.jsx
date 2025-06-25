import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import AuthService from '../../service/AuthService';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthProvider';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useContext(AuthContext);

  // Handle input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const handleSubmit = async e => {
    e.preventDefault();
    const authService = new AuthService();
    try {
      const response = await authService.loginUser(formData);
      const role = response.userDto.role;
      const authInfo = {
        isAuthenticated: true,
        accessToken: response.accessToken,
      };

      setAuth(authInfo);
      localStorage.setItem('auth', JSON.stringify(authInfo));
      toast.success('Login successful!');

      const fromPath = location.state?.from?.pathname;

      let redirectTo;

      if (role === 'JOBSEEKER') {
        redirectTo = fromPath?.startsWith('/jobseeker') ? fromPath : '/jobseeker/dashboard';
      } else if (role === 'EMPLOYER') {
        redirectTo = fromPath?.startsWith('/employer') ? fromPath : '/employer/dashboard';
      } else {
        redirectTo = '/';
      }
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error('Failed to login user:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <Helmet>
        <title>Sign In for CareerCrafter</title>
      </Helmet>

      {/* Login container  */}
      <div className="flex min-h-screen flex-col justify-center bg-gray-50 pt-0 pb-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
              create a new account
            </Link>
          </p>
        </div>

        {/* Login form  */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="focus:ring-opacity-50 w-full rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
