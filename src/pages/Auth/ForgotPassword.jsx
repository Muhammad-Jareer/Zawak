import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forget_password } from '../../api/auth';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    
    try {
      const res = await forget_password({ email });
      if (res) {
        setMessage('Password reset link sent to your email.');
      } else {
        setMessage('Failed to send reset link. Please try again.');
      }
    } catch (err) {
      setMessage('Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="font-serif text-2xl mb-6 text-center">Forgot Password</h1>

        {message && (
          <p className="text-sm text-center mb-4 text-gray-600">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 transition duration-300 ease-in-out"
              required
            />
          </div>

          <button type="submit" className="w-full btn btn-primary">
            {submitting ? 'Submitting...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Back to{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
