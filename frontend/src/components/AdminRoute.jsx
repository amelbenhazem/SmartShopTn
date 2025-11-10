import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;


