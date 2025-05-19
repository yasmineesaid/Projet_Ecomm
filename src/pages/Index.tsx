
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { products, categories } from '@/data/mockData';
import ProductCard from '@/components/product/ProductCard';

const Index = () => {
  // Get featured products - for this demo, we'll just take the first 4
  const featuredProducts = products.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shop-primary to-shop-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Bienvenue sur votre E-Boutique en ligne</h1>
            <p className="text-xl mb-8">
              Découvrez notre sélection de produits de qualité à des prix compétitifs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" className="bg-white text-shop-primary hover:bg-gray-100">
                  Nos produits
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Connexion
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Produits en vedette</h2>
            <Link to="/products" className="text-shop-primary hover:underline">
              Voir tout →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Parcourir par catégories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.slug}`}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="h-12 flex items-center justify-center">
                  <span className="font-medium text-shop-accent">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-shop-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer vos achats?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Rejoignez notre communauté de clients satisfaits et découvrez pourquoi ils nous font confiance.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-shop-accent hover:bg-gray-100">
              Créer un compte
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
