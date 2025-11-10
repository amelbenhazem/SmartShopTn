import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Épicerie',
    stock: '',
    origin: '',
    image: 'https://via.placeholder.com/300',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.products);
    } catch (error) {
      toast.error('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
        toast.success('Produit modifié avec succès');
      } else {
        await api.post('/products', formData);
        toast.success('Produit ajouté avec succès');
      }
      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Épicerie',
        stock: '',
        origin: '',
        image: 'https://via.placeholder.com/300',
      });
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      origin: product.origin,
      image: product.image || 'https://via.placeholder.com/300',
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }
    try {
      await api.delete(`/products/${productId}`);
      toast.success('Produit supprimé avec succès');
      fetchProducts();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Épicerie',
      stock: '',
      origin: '',
      image: 'https://via.placeholder.com/300',
    });
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Produits</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setFormData({
              name: '',
              description: '',
              price: '',
              category: 'Épicerie',
              stock: '',
              origin: '',
              image: 'https://via.placeholder.com/300',
            });
            setShowForm(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
        >
          + Ajouter un produit
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">
            {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Nom *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Prix (TND) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Catégorie *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="Épicerie">Épicerie</option>
                  <option value="Artisanat">Artisanat</option>
                  <option value="Beauté">Beauté</option>
                  <option value="Textiles">Textiles</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Origine *</label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Ex: Tunis, Tunisie"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                {editingProduct ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Catégorie</th>
                <th className="px-4 py-3 text-left">Prix</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Origine</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    Aucun produit trouvé
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <img
                        src={product.image || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold">{product.name}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">{product.price} TND</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">{product.origin}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

