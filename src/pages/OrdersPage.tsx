
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { orders } from '@/data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package } from 'lucide-react';

const OrdersPage = () => {
  const { user } = useAuth();
  
  // Filter orders for the current user
  const userOrders = user ? orders.filter(order => order.userId === user.id) : [];

  if (userOrders.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Vous n'avez aucune commande</h1>
            <p className="mb-6 text-gray-600">
              {user 
                ? "Vous n'avez pas encore passé de commande. Parcourez nos produits pour commencer vos achats."
                : "Connectez-vous pour voir vos commandes."
              }
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/products">
                <Button>Parcourir les produits</Button>
              </Link>
              {!user && (
                <Link to="/login">
                  <Button variant="outline">Se connecter</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/dashboard" className="flex items-center text-shop-primary hover:underline mb-4">
            <ArrowLeft size={16} className="mr-1" /> Retour au tableau de bord
          </Link>
          <h1 className="text-2xl font-bold">Mes commandes</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commande #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Produits</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{order.items.length} articles</TableCell>
                  <TableCell>{order.total.toFixed(2)} €</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'shipped'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status === 'delivered' && 'Livré'}
                      {order.status === 'processing' && 'En traitement'}
                      {order.status === 'pending' && 'En attente'}
                      {order.status === 'shipped' && 'Expédié'}
                      {order.status === 'cancelled' && 'Annulé'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;
