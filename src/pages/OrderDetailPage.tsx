
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { orders } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Package, Truck, Clock, CheckCircle } from 'lucide-react';

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState(orders.find(o => o.id === Number(id)));
  
  useEffect(() => {
    // If order not found or doesn't belong to user, redirect
    if (!order || (user && order.userId !== user.id)) {
      navigate('/orders');
    }
  }, [order, user, navigate]);

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p>Commande non trouvée. <Link to="/orders" className="text-shop-primary hover:underline">Retour</Link></p>
        </div>
      </Layout>
    );
  }

  const getStatusIcon = () => {
    switch (order.status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" />;
      case 'shipped': 
        return <Truck className="text-blue-500" />;
      case 'processing':
        return <Package className="text-amber-500" />;
      default:
        return <Clock className="text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (order.status) {
      case 'delivered':
        return 'Livré';
      case 'shipped':
        return 'Expédié';
      case 'processing':
        return 'En traitement';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulé';
      default:
        return order.status;
    }
  };

  // Format price in MAD
  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} MAD`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/orders" className="flex items-center text-shop-primary hover:underline mb-4">
            <ArrowLeft size={16} className="mr-1" /> Retour à mes commandes
          </Link>
          <h1 className="text-2xl font-bold">Détails de la commande #{order.id}</h1>
          <p className="text-gray-500">
            Passée le {new Date(order.date).toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Articles commandés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div 
                      key={item.productId} 
                      className="flex justify-between items-center border-b pb-4"
                    >
                      <div>
                        <h3 className="font-medium">{item.productName}</h3>
                        <p className="text-sm text-gray-500">
                          Quantité: {item.quantity} x {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between pt-4 font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Statut de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  {getStatusIcon()}
                  <span className="font-medium">{getStatusText()}</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Numéro de commande</span>
                    <span>{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span>{new Date(order.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailPage;
