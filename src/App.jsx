
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProduct = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      setProduct(data.products);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handlePageChange = (pageNumber) => {
    if(
      pageNumber>=1 && pageNumber<=product.length/6 && pageNumber!==currentPage
    )
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-400 w-full min-h-screen border-red-500 flex flex-col justify-center items-center">
      {product.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
          {product
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((prod) => (
              <div
                className="bg-slate-500 rounded-md p-4 text-center"
                key={prod.id}
              >
                <img
                  src={prod.thumbnail}
                  alt="product-image"
                  className="w-full max-w-50 h-32 object-cover mb-4"
                />
                <span className="block text-white">Title: {prod.title}</span>
              </div>
            ))}
        </div>
      )}

      <div className="bg-dark-blue-300 text-black flex justify-center items-center">
        <button   onClick={()=>handlePageChange(currentPage-1)}    > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>
</button>
        {[...Array(Math.ceil(product.length / 6))].map((_, i) => (
          <button
            className={`px-4 py-2 mx-2 ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-blue-300'
            }`}
            onClick={() => handlePageChange(i + 1)}
            key={i}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={()=>handlePageChange(currentPage+1)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>
</button>

      </div>
    </div>
  );
}

export default App;
