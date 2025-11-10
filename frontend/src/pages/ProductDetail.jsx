import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      toast.error('Erreur lors du chargement du produit');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await api.post('/cart', { productId: id, quantity });
      toast.success('Produit ajouté au panier');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'ajout au panier');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Produit non trouvé</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold text-primary-600">
                {product.price} TND
              </span>
            </div>
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                Catégorie: {product.category}
              </span>
            </div>
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                Origine: {product.origin}
              </span>
            </div>
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                Stock disponible: {product.stock}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <label className="mr-4">Quantité:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border rounded px-3 py-2 w-20"
              />
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-primary-600 text-white py-3 rounded hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


