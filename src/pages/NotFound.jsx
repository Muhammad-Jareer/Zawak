import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function NotFound() {
  return (
    <div className="container mx-auto px-4 text-center py-16">
      <h1 className="font-serif text-6xl mb-4">404</h1>
      <h2 className="font-serif text-2xl mb-8">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary inline-flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;