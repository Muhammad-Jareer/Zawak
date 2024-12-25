import React, { useState } from 'react';
import va from '../assets/va.png';
import ImageComponent from '../components/ImageComponent';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 mt-16">
      <h1 className="font-serif text-3xl md:text-4xl mb-8 text-center text-primary-600">
        Contact
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Feel free to contact us, as we respond to queries swiftly...
      </p>

      {/* Contact Form and Image Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto mb-12">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-full">
          <ImageComponent src={va} alt={"Contact image"} className={"h-full"} />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 h-full">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-lg h-full"
            noValidate
          >
            {[ 
              { label: 'Full Name', id: 'name', type: 'text', placeholder: 'John Doe' },
              { label: 'Email Address', id: 'email', type: 'email', placeholder: 'johndoe@example.com' },
              { label: 'Phone Number', id: 'phone', type: 'tel', placeholder: 'e.g., +92 123 456789' },
              { label: 'Subject', id: 'subject', type: 'text', placeholder: 'Your Subject' }
            ].map(({ label, id, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-800">
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-transparent focus:border-primary-500"
                  required
                  aria-label={label}
                />
              </div>
            ))}

            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-800">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-transparent focus:border-primary-500"
                required
                aria-label="Your Message"
              />
            </div>

            <div className="col-span-1 sm:col-span-2 text-center">
              <button
                type="submit"
                className={`py-2 px-6 text-white rounded-md ${
                  loading
                    ? 'bg-primary-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 focus:outline-none'
                }`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Form'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
