import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement du panier');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await api.put(`/cart/${productId}`, { quantity });
      fetchCart();
      toast.success('Quantité mise à jour');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      fetchCart();
      toast.success('Article supprimé');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleCheckout = async () => {
    try {
      await api.post('/orders');
      toast.success('Commande créée avec succès');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la commande');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">Panier vide</h1>
        <p className="text-gray-600 mb-4">Votre panier est vide</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-primary-600 text-white px-6 py-3 rounded hover:bg-primary-700"
        >
          Voir les produits
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panier</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {cart.items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between border-b pb-4 mb-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">{item.product.price} TND</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                max={item.product.stock}
                value={item.quantity}
                onChange={(e) =>
                  handleUpdateQuantity(item.product.id, parseInt(e.target.value))
                }
                className="border rounded px-3 py-2 w-20"
              />
              <span className="font-semibold">{item.subtotal} TND</span>
              <button
                onClick={() => handleRemoveItem(item.product.id)}
                className="text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <span className="text-xl font-bold">Total: {cart.total} TND</span>
          <button
            onClick={handleCheckout}
            className="bg-primary-600 text-white px-6 py-3 rounded hover:bg-primary-700"
          >
            Valider la commande
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;


