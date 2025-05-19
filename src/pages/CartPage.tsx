
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { toast } from "@/components/ui/sonner";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      toast.info("Veuillez vous connecter pour finaliser votre commande.");
      return;
    }
    
    // In a real app, this would redirect to checkout or process the order
    toast.success("Commande passée avec succès ! (démo)");
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
            <p className="mb-6 text-gray-600">Vous n'avez aucun article dans votre panier. Parcourez nos produits et ajoutez-en un!</p>
            <Link to="/products">
              <Button>Parcourir les produits</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Votre Panier</h1>
          <Button variant="outline" onClick={clearCart} className="text-red-500 border-red-500 hover:bg-red-50">
            Vider le panier
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 p-4 border-b bg-gray-50 text-sm font-medium text-gray-500">
                <div className="col-span-6">Produit</div>
                <div className="col-span-2 text-center">Prix</div>
                <div className="col-span-2 text-center">Quantité</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              {/* Items */}
              {cart.map((item) => (
                <div key={item.productId} className="grid grid-cols-12 p-4 border-b items-center">
                  <div className="col-span-6 flex items-center">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="font-medium">
                        <Link to={`/products/${item.productId}`} className="hover:text-shop-primary">
                          {item.product.name}
                        </Link>
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-auto mt-1"
                      >
                        <Trash2 size={14} className="mr-1" />
                        <span className="text-xs">Supprimer</span>
                      </Button>
                    </div>
                  </div>

                  <div className="col-span-2 text-center">
                    {item.product.price.toFixed(2)} €
                  </div>

                  <div className="col-span-2 flex items-center justify-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={12} />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.product.inventory}
                    >
                      <Plus size={12} />
                    </Button>
                  </div>

                  <div className="col-span-2 text-center font-medium">
                    {(item.product.price * item.quantity).toFixed(2)} €
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold text-lg mb-4">Récapitulatif</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sous-total</span>
                  <span>{cartTotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frais de livraison</span>
                  <span>0.00 €</span>
                </div>
                <div className="border-t my-2 pt-2"></div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{cartTotal.toFixed(2)} €</span>
                </div>
              </div>

              <Button
                className="w-full mt-4 bg-shop-primary hover:bg-shop-primary/90"
                onClick={handleCheckout}
              >
                {user ? (
                  <>
                    Passer la commande <ArrowRight size={16} className="ml-1" />
                  </>
                ) : (
                  <>
                    Se connecter pour commander <ArrowRight size={16} className="ml-1" />
                  </>
                )}
              </Button>

              <div className="mt-4 text-center">
                <Link to="/products" className="text-shop-primary hover:underline text-sm">
                  Continuer vos achats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
