import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            🛍️ SmartShop TN
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-primary-600">
              Accueil
            </Link>
            <Link to="/products" className="hover:text-primary-600">
              Produits
            </Link>
            {user ? (
              <>
                <Link to="/cart" className="hover:text-primary-600">
                  Panier
                </Link>
                <Link to="/orders" className="hover:text-primary-600">
                  Mes Commandes
                </Link>
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin" className="hover:text-primary-600">
                      Dashboard
                    </Link>
                    <Link to="/admin/products" className="hover:text-primary-600">
                      Produits
                    </Link>
                  </>
                )}
                <span className="text-gray-600">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


