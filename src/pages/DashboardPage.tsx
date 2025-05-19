
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  Package, 
  Users, 
  DollarSign,
  LayoutDashboard,
  ShoppingCart,
  Settings,
} from 'lucide-react';
import { products, orders } from '@/data/mockData';
import { formatPrice } from '@/utils/formatters';
import ProductManagement from '@/components/product/ProductManagement';
import OrderManagement from '@/components/order/OrderManagement';
import AccountSettings from '@/components/settings/AccountSettings';
import UserManagement from '@/components/admin/UserManagement';

const DashboardPage = () => {
  const { user } = useAuth();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin metrics
  const totalProducts = products.length;
  const totalUsers = 3; // Mocked for demo
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  // Vendor specific products
  const vendorProducts = products.filter(p => p.vendor.id === user.id);
  const vendorOrders = orders.filter(order => 
    order.items.some(item => 
      products.find(p => p.id === item.productId)?.vendor.id === user.id
    )
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Tableau de bord</h1>
            <p className="text-gray-500">Bienvenue, {user.name}</p>
          </div>
          <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
            {user.role === 'admin' ? 'Administrateur' : user.role === 'vendor' ? 'Vendeur' : 'Client'}
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center">
              <LayoutDashboard size={16} className="mr-1" /> Aperçu
            </TabsTrigger>
            
            {(user.role === 'vendor' || user.role === 'admin') && (
              <TabsTrigger value="products" className="flex items-center">
                <ShoppingBag size={16} className="mr-1" /> Produits
              </TabsTrigger>
            )}
            
            <TabsTrigger value="orders" className="flex items-center">
              <ShoppingCart size={16} className="mr-1" /> Commandes
            </TabsTrigger>
            
            {user.role === 'admin' && (
              <TabsTrigger value="users" className="flex items-center">
                <Users size={16} className="mr-1" /> Utilisateurs
              </TabsTrigger>
            )}
            
            <TabsTrigger value="settings" className="flex items-center">
              <Settings size={16} className="mr-1" /> Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {user.role === 'admin' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Produits</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalProducts}</div>
                    <p className="text-xs text-muted-foreground">
                      +0 depuis le mois dernier
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalUsers}</div>
                    <p className="text-xs text-muted-foreground">
                      +0 depuis le mois dernier
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalOrders}</div>
                    <p className="text-xs text-muted-foreground">
                      +0 depuis le mois dernier
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenus</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
                    <p className="text-xs text-muted-foreground">
                      +0% depuis le mois dernier
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {user.role === 'vendor' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mes Produits</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{vendorProducts.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mes Commandes</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{vendorOrders.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mes Revenus</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPrice(vendorOrders.reduce((sum, order) => {
                        // Only count revenue for this vendor's products
                        const vendorItems = order.items.filter(item => 
                          products.find(p => p.id === item.productId)?.vendor.id === user.id
                        );
                        return sum + vendorItems.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
                      }, 0))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {user.role === 'client' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mes Commandes</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {orders.filter(o => o.userId === user.id).length}
                    </div>
                    <Link to="/orders" className="text-sm text-shop-primary hover:underline">
                      Voir mes commandes
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Dépensé</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPrice(orders.filter(o => o.userId === user.id).reduce((sum, order) => sum + order.total, 0))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.filter(o => user.role === 'client' ? o.userId === user.id : true)
                  .slice(0, 3)
                  .map(order => (
                    <div key={order.id} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">Commande #{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString('fr-FR')} • {order.items.length} articles
                        </p>
                      </div>
                      <div>
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
                      </div>
                    </div>
                  ))
                }
                {orders.filter(o => user.role === 'client' ? o.userId === user.id : true).length === 0 && (
                  <p className="text-gray-500 text-sm">Aucune activité récente à afficher.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          {(user.role === 'vendor' || user.role === 'admin') && (
            <TabsContent value="products" className="space-y-4">
              <ProductManagement />
            </TabsContent>
          )}

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <OrderManagement />
          </TabsContent>

          {/* Users Tab (Admin only) */}
          {user.role === 'admin' && (
            <TabsContent value="users" className="space-y-4">
              <UserManagement />
            </TabsContent>
          )}

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashboardPage;
