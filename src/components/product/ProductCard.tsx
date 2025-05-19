
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {product.inventory < 5 && product.inventory > 0 && (
            <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
              Plus que {product.inventory}
            </span>
          )}
          {product.inventory === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 font-bold rounded">
                Rupture de stock
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 text-shop-accent line-clamp-1">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-lg">{product.price.toFixed(2)} €</span>
            <Button 
              onClick={handleAddToCart}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 border-shop-primary text-shop-primary hover:bg-shop-primary hover:text-white"
              disabled={product.inventory === 0}
            >
              <ShoppingCart size={16} />
              <span className="sr-md:not-sr-only">Ajouter</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
