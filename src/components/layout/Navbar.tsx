
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ShoppingCart, 
  User, 
  LogOut, 
  Menu,
  X,
  Search
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would redirect to search results
    console.log('Search query:', searchQuery);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-shop-primary">
            E-Boutique
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-shop-accent hover:text-shop-primary transition-colors">
              Accueil
            </Link>
            <Link to="/products" className="text-shop-accent hover:text-shop-primary transition-colors">
              Produits
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-shop-primary"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-shop-primary"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Right Nav Items - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-shop-accent hover:text-shop-primary transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-shop-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="flex items-center">
                  <LogOut size={18} className="mr-1" /> 
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center">
                  <User size={18} className="mr-1" /> Connexion
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Rechercher des produits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-shop-primary"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-shop-primary"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-shop-accent hover:text-shop-primary py-2 transition-colors">
                Accueil
              </Link>
              <Link to="/products" className="text-shop-accent hover:text-shop-primary py-2 transition-colors">
                Produits
              </Link>
              <Link to="/cart" className="text-shop-accent hover:text-shop-primary py-2 transition-colors flex items-center">
                <ShoppingCart className="mr-2" /> Panier
                {cartItemsCount > 0 && (
                  <span className="ml-2 bg-shop-primary text-white rounded-full text-xs px-2 py-1">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="text-shop-accent hover:text-shop-primary py-2 transition-colors">
                    Tableau de bord
                  </Link>
                  <button 
                    onClick={logout} 
                    className="text-shop-accent hover:text-shop-primary py-2 transition-colors flex items-center"
                  >
                    <LogOut className="mr-2" /> Déconnexion
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-shop-accent hover:text-shop-primary py-2 transition-colors">
                  <User className="mr-2 inline" /> Connexion
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
