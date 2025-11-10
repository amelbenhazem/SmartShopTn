import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validation basique
    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);

    try {
      console.log('🔐 Tentative de connexion avec:', email);
      const result = await login(email, password);
      console.log('✅ Connexion réussie:', result);
      toast.success('Connexion réussie');
      navigate('/');
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      console.error('Détails:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
      });
      
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.errors?.[0]?.msg ||
        error.message || 
        'Erreur de connexion. Vérifiez que le serveur est démarré.';
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-3 rounded hover:bg-primary-700 disabled:bg-gray-400"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Pas de compte?{' '}
          <Link to="/register" className="text-primary-600 hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


