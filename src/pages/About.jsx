import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';

function About() {useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <div className="container mx-auto px-4 mt-16">
      {/* Hero Section */}
      <div className="relative mb-12">
        <ImageComponent src="https://i.pinimg.com/1200x/43/fa/bf/43fabf15fb8bb7294307bf43b5c20454.jpg" alt="Empowered Women Artisans" className="h-96 border-b-2 border-primary-600 lg:h-[600px]" />
        <div className="absolute mb-2 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white font-serif text-4xl md:text-5xl font-bold lg:leading-relaxed text-center mx-0 lg:mx-80">
            Empowering Pashtun Women through Craftsmanship
          </h1>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl text-center mb-8 text-primary-600">Our Story</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          In the heart of the Pashtun regions of Pakistan and Afghanistan, where tradition
          and resilience thrive, we aim to foster a platform that empowers women through
          their exceptional artistry. By supporting handcrafted goods, we celebrate their
          heritage, uplift their voices, and provide opportunities for financial independence.
        </p>

        <img
          src="https://i.pinimg.com/1200x/dd/9b/0b/dd9b0ba33a39bc07028e0167f2b80ace.jpg"
          alt="Pashtun Women Crafting"
          className="w-full h-[300px] object-cover rounded-lg mb-8"
        />

        {/* Mission Section */}
        <div className="py-12">
          <h2 className="font-serif text-3xl text-center mb-8 text-primary-600">Our Mission</h2>
          <div className="text-gray-700 text-lg leading-relaxed mb-8 mx-auto max-w-2xl text-left">
            <p className="mb-4">
              We are dedicated to empowering Pashtun women by preserving their rich traditions
              and connecting their handmade crafts with global audiences.
            </p>
            <p className="mb-4">
              Our mission is rooted in economic independence, education, and cultural preservation through sustainable practices and ethical trade.
            </p>
            <p>
              Together, we are creating a platform where women thrive through their craft and resilience.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <h2 className="font-serif text-3xl text-center mb-8 text-primary-600">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-primary-600 text-2xl mb-4">💰 Economic Empowerment</div>
            <p className="text-gray-700">
              Helping women achieve financial independence through fair wages and training programs.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-primary-600 text-2xl mb-4">🌿 Cultural Preservation</div>
            <p className="text-gray-700">
              Highlighting the unique craftsmanship of Pashtun women to keep their traditions alive for generations.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-primary-600 text-2xl mb-4">♻️ Sustainability</div>
            <p className="text-gray-700">
              Promoting eco-friendly materials and practices in all our artisan projects.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-primary-600 text-2xl mb-4">🤝 Community Building</div>
            <p className="text-gray-700">
              Creating networks that connect women artisans, encouraging collaboration and shared success.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link to="/shop" className="btn btn-primary text-lg px-6 py-3">
            Support Their Craft
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
