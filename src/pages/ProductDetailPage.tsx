
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { products } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <p className="mb-6">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link to="/products">
            <Button>Retour aux produits</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlist = () => {
    toast.info("Cette fonctionnalité sera disponible prochainement.");
  };

  const incrementQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(quantity + 1);
    } else {
      toast.info("Vous avez atteint la quantité maximale disponible en stock.");
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link to="/products" className="flex items-center text-shop-primary hover:underline">
            <ArrowLeft size={16} className="mr-1" /> Retour aux produits
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain rounded-md"
              style={{ maxHeight: '400px' }}
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-shop-primary mb-4">{product.price.toFixed(2)} €</p>
            
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Quantité</h2>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <span className="mx-4 text-xl">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={incrementQuantity}
                  disabled={quantity >= product.inventory}
                >
                  <Plus size={16} />
                </Button>
                <span className="ml-4 text-gray-500">
                  {product.inventory} disponibles
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                className="flex-1 bg-shop-primary hover:bg-shop-primary/90 text-white"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
              >
                <ShoppingCart className="mr-2" size={18} />
                {product.inventory === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={handleWishlist}
                className="border-shop-primary text-shop-primary"
              >
                <Heart size={18} />
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>Catégorie: {product.category}</p>
              <p>Vendeur: {product.vendor.name}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
