
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-9xl font-bold text-shop-primary">404</h1>
          <h2 className="text-2xl font-bold mt-4 mb-2">Page non trouvée</h2>
          <p className="mb-6 text-gray-600">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link to="/">
            <Button className="bg-shop-primary hover:bg-shop-primary/90">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
