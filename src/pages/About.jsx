import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const imageCards = [
  {
    src: "https://plus.unsplash.com/premium_photo-1677702163117-de65845938b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Artisan at work",
    title: "Empowering Rural Artisans",
    description:
      "By partnering with women from remote areas, we ensure their skills are recognized and rewarded, breaking barriers to financial freedom.",
  },
  {
    src: "https://images.unsplash.com/photo-1599589915468-b4c71ed62543?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Handmade crafts",
    title: "Preserving Heritage",
    description:
      "Every product tells a story of tradition and culture, preserving generations of knowledge through handmade crafts.",
  },
  {
    src: "https://images.unsplash.com/photo-1584473457406-6240486418e9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Eco-friendly",
    title: "Sustainable Practices",
    description:
      "We are committed to sustainability, ensuring our practices respect the environment and empower communities responsibly.",
  },
];

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-500 text-white">
        <div className="container mx-auto flex flex-col items-center justify-center text-center py-16 px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Empowering Women, Preserving Culture
          </h1>
          <p className="text-lg max-w-3xl leading-relaxed">
            Our platform celebrates the incredible craftsmanship of women from rural areas, providing them with the tools, support, and audience they need to succeed. Together, we are building a bridge to financial independence and cultural preservation.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1501633159663-1836f82ceaf0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Empowering women"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </section>

      {/* About Us Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-600">
            Who We Are
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mt-4">
            We are a women-led initiative that brings the beauty of rural craftsmanship to the modern world. Our goal is to provide women artisans with a platform to showcase their talents, while ensuring they receive fair compensation and recognition for their hard work.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {imageCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={card.src}
                alt={card.alt}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary-600 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-700">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-primary-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-600 mb-8">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Our mission is simple: to empower women through economic
            opportunities, preserve cultural heritage, and promote sustainable
            craftsmanship. We strive to create a global community where every
            purchase uplifts lives and celebrates traditions.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-2xl font-bold text-primary-600 mb-4">
          Ready to Support Women Artisans?
        </h2>
        <p className="text-gray-700 text-lg max-w-xl mx-auto mb-8">
          Discover unique handcrafted products made with love and care by
          talented women from rural communities. Every purchase makes a
          difference!
        </p>
        <Link
          to="/shop"
          className="bg-primary-600 text-white text-lg px-8 py-3 rounded-lg shadow-lg hover:bg-primary-500 transition-colors"
        >
          Start Shopping
        </Link>
      </section>
    </div>
  );
}

export default About;
