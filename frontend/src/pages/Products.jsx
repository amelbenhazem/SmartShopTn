import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (category) params.category = category;
      if (search) params.search = search;
      const response = await api.get('/products', { params });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {category ? `Produits - ${category}` : 'Tous les produits'}
      </h1>
      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Aucun produit trouvé
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;


