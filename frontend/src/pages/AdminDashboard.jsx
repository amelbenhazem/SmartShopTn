import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [statsResponse, ordersResponse] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/admin/orders'),
      ]);
      setStats(statsResponse.data.stats);
      setOrders(ordersResponse.data.orders);
    } catch (error) {
      toast.error('Erreur lors du chargement du dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status });
      toast.success('Statut mis à jour');
      fetchDashboard();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tableau de bord Admin</h1>
        <div className="flex space-x-4">
          <Link
            to="/admin/products"
            className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Gérer les Produits
          </Link>
        </div>
      </div>
      
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 mb-2">Produits</h3>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 mb-2">Commandes</h3>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 mb-2">Utilisateurs</h3>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 mb-2">Revenus</h3>
            <p className="text-3xl font-bold">{stats.revenue} TND</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Commandes récentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">ID</th>
                <th className="text-left py-2">Utilisateur</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Statut</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2">{order._id.slice(-6)}</td>
                  <td className="py-2">{order.user?.name || 'N/A'}</td>
                  <td className="py-2">{order.total} TND</td>
                  <td className="py-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateStatus(order._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmée</option>
                      <option value="delivered">Livrée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </td>
                  <td className="py-2">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => handleUpdateStatus(order._id, order.status)}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


