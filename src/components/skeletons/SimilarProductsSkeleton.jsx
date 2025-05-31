const SimilarProductsSkeleton = ({}) => {
  return (
    <>
        <div className="mb-16">
          <h2 className="font-serif text-2xl mb-8">Similar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <div
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
                <div className="p-4">
                  <h3 className="font-medium"></h3>
                  <p className="text-primary-600 font-semibold"></p>
                </div>
              </div>
          </div>
        </div>
    </>
  );
};

export default SimilarProductsSkeleton;