import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="container mx-auto px-4 mt-16">

        {/* Our Story Section */}
        <section className="mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-primary-600 text-center mb-8">Our Story</h2>
            <p className="text-lg text-gray-700 text-center mx-auto leading-relaxed  max-w-3xl">
            In the heart of the Pashtun regions of Pakistan and Afghanistan, where tradition
            and resilience thrive, we aim to foster a platform that empowers women through
            their exceptional artistry. By supporting handcrafted goods, we celebrate their
            heritage, uplift their voices, and provide opportunities for financial independence.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-">
          <h2 className="text-3xl font-semibold text-primary-600 text-center mb-8">Our Mission</h2>
          <p className="text-lg text-gray-700 text-center mx-auto leading-relaxed  max-w-3xl">
            Our mission is to create an exceptional shopping experience while empowering our customers through products that bring value, style, and functionality. We are committed to continuous innovation, high standards, and building long-term relationships with our community.
          </p>
        </section>

        {/* Core Values Section */}
        <section className="py-4">
          <h2 className="text-3xl font-semibold text-primary-600 text-center mb-8">Our Core Values</h2>
          <div className="max-w-3xl mx-auto grid justify-center grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary-600 text-2xl mb-4">💼 Integrity</div>
              <p className="text-gray-700">We uphold the highest standards of honesty and fairness in everything we do.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary-600 text-2xl mb-4">🔒 Security</div>
              <p className="text-gray-700">We ensure our customers' data and transactions are secure, offering peace of mind with every purchase.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary-600 text-2xl mb-4">🌱 Sustainability</div>
              <p className="text-gray-700">Our commitment to sustainability drives us to reduce our carbon footprint and promote eco-friendly practices.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary-600 text-2xl mb-4">🤝 Customer Focus</div>
              <p className="text-gray-700">Our customers' satisfaction is at the heart of everything we do. We listen, we respond, and we improve.</p>
            </div>
          </div>
        </section>


        {/* Call to Action */}
        <section className="text-center py-12">
          <Link to="/shop" className="bg-primary-600 text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-primary-500 transition-colors">
            Start Shopping Now
          </Link>
        </section>
    </div>
  );
}

export default About;
