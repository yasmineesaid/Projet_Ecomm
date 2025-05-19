
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { products, categories } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category');
  
  const [pageTitle, setPageTitle] = useState('Tous les produits');
  
  useEffect(() => {
    if (categorySlug) {
      const category = categories.find(c => c.slug === categorySlug);
      if (category) {
        setPageTitle(`Catégorie : ${category.name}`);
      } else {
        setPageTitle('Tous les produits');
      }
    } else {
      setPageTitle('Tous les produits');
    }
  }, [categorySlug]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
          <div className="text-sm text-gray-500 mt-2 md:mt-0">
            Affichage de {products.length} produits
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
                <a href="/products">Tous les produits</a>
              </Button>
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={categorySlug === category.slug ? 'default' : 'outline'}
                  className="w-full justify-start"
                  asChild
                >
                  <a href={`/products?category=${category.slug}`}>{category.name}</a>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
