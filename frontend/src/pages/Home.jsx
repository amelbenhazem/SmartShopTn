import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="text-center py-16 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-lg mb-8">
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur SmartShop TN</h1>
        <p className="text-xl mb-8">
          Découvrez les meilleurs produits tunisiens authentiques
        </p>
        <Link
          to="/products"
          className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Explorer les produits
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold mb-2">Catalogue complet</h3>
          <p className="text-gray-600">
            Des produits authentiques de toutes les régions de Tunisie
          </p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">🚚</div>
          <h3 className="text-xl font-semibold mb-2">Livraison rapide</h3>
          <p className="text-gray-600">
            Recevez vos produits rapidement partout en Tunisie
          </p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-xl font-semibold mb-2">Qualité garantie</h3>
          <p className="text-gray-600">
            Produits sélectionnés avec soin pour leur qualité
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-6">Catégories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/products?category=Épicerie"
            className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition"
          >
            <div className="text-3xl mb-2">🛒</div>
            <div className="font-semibold">Épicerie</div>
          </Link>
          <Link
            to="/products?category=Artisanat"
            className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition"
          >
            <div className="text-3xl mb-2">🎨</div>
            <div className="font-semibold">Artisanat</div>
          </Link>
          <Link
            to="/products?category=Beauté"
            className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition"
          >
            <div className="text-3xl mb-2">💄</div>
            <div className="font-semibold">Beauté</div>
          </Link>
          <Link
            to="/products?category=Textiles"
            className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition"
          >
            <div className="text-3xl mb-2">👕</div>
            <div className="font-semibold">Textiles</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;


