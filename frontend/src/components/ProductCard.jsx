import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-primary-600 font-bold">
            {product.price} TND
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
        <Link
          to={`/products/${product._id}`}
          className="block mt-4 bg-primary-600 text-white text-center py-2 rounded hover:bg-primary-700"
        >
          Voir détails
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;


