
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { products, categories } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category');
  
  const [pageTitle, setPageTitle] = useState('Tous les produits');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  useEffect(() => {
    if (categorySlug) {
      const category = categories.find(c => c.slug === categorySlug);
      if (category) {
        setPageTitle(`Catégorie : ${category.name}`);
        setFilteredProducts(products.filter(p => p.category === categorySlug));
      } else {
        setPageTitle('Tous les produits');
        setFilteredProducts(products);
      }
    } else {
      setPageTitle('Tous les produits');
      setFilteredProducts(products);
    }
  }, [categorySlug]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
          <div className="text-sm text-gray-500 mt-2 md:mt-0">
            Affichage de {filteredProducts.length} produits
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Category buttons on desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <h2 className="font-medium mb-3">Catégories</h2>
            <div className="space-y-2">
              <Button
                variant={!categorySlug ? 'default' : 'outline'}
                className="w-full justify-start"
                asChild
              >
                <Link to="/products">Tous les produits</Link>
              </Button>
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={categorySlug === category.slug ? 'default' : 'outline'}
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={`/products?category=${category.slug}`}>{category.name}</Link>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
