import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFilteredProducts } from '../api/product';

const SimilarProducts = ({category, subCategory, tag}) => {
  const [similarProducts, setSimilarProducts] = useState([])  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    (async function fetchSimilarProducts(){
      setLoading(true)
      const res = await getFilteredProducts(category, subCategory, tag)
      if(res === 'ERROR'){
        setError("Something went wrong when getting similar products")
        return;
      }
      const {products} = res;
      setSimilarProducts(products)
      setLoading(false)
    }
    )();
  }, [])

  if(error){
    return <div className='text-center text-red-700 h-96'>
      <p>{error}</p>
    </div>
  }
  
  return (
    <>
      {setSimilarProducts && similarProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="font-serif text-2xl mb-8">Similar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {similarProducts.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item._id}
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
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SimilarProducts;