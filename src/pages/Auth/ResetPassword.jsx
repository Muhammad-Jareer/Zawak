import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api_reset_password } from '../../api/auth'; 

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api_reset_password( token, formData.password );
      if (res) {
        setMessage('Password changed successfully.');
        navigate('/login')
      } else {
        setMessage('Failed to change password. Try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="font-serif text-2xl mb-6 text-center">Change Password</h1>

        {message && <p className="text-sm text-center mb-4 text-gray-600">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          </div>

          <button type="submit" className="w-full btn btn-primary">
            {submitting ? 'Submitting...' : 'Change Password'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Go back to{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
