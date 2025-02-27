import React from 'react';

const RecentlyViewed = ({ recentlyViewed, navigate }) => {
  return (
    <>
      {recentlyViewed.length > 0 && (
        <div>
          <h2 className="font-serif text-2xl mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {recentlyViewed.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
                <div className="p-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-primary-600 font-semibold">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentlyViewed;