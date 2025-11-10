import { useState, useEffect } from 'react';
import api from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mes Commandes</h1>
      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Aucune commande pour le moment
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Commande #{order._id.slice(-6)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded ${
                      order.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'delivered'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="border-t pt-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>{item.price * item.quantity} TND</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>{order.total} TND</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;


