
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
  PlusCircle,
  Edit,
  Trash2
} from 'lucide-react';
import { products, orders } from '@/data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/sonner";

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

  const handleAddProduct = () => {
    toast.info("Cette fonctionnalité sera disponible prochainement.");
  };

  const handleEditProduct = (productId: number) => {
    toast.info(`Édition du produit ${productId} sera disponible prochainement.`);
  };

  const handleDeleteProduct = (productId: number) => {
    toast.info(`Suppression du produit ${productId} sera disponible prochainement.`);
  };

  const handleUpdateOrderStatus = (orderId: number) => {
    toast.info(`Mise à jour du statut de la commande ${orderId} sera disponible prochainement.`);
  };

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
                    <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} €</div>
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
                      {vendorOrders.reduce((sum, order) => {
                        // Only count revenue for this vendor's products
                        const vendorItems = order.items.filter(item => 
                          products.find(p => p.id === item.productId)?.vendor.id === user.id
                        );
                        return sum + vendorItems.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
                      }, 0).toFixed(2)} €
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
                      {orders.filter(o => o.userId === user.id).reduce((sum, order) => sum + order.total, 0).toFixed(2)} €
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
                <p className="text-gray-500 text-sm">Aucune activité récente à afficher.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          {(user.role === 'vendor' || user.role === 'admin') && (
            <TabsContent value="products" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Gestion des Produits</h2>
                <Button onClick={handleAddProduct} className="bg-shop-primary hover:bg-shop-primary/90">
                  <PlusCircle size={16} className="mr-1" /> Ajouter un produit
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Produit</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead className="text-right">Prix</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(user.role === 'admin' ? products : vendorProducts).map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-10 h-10 object-cover rounded mr-2" 
                              />
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">{product.price.toFixed(2)} €</TableCell>
                          <TableCell className="text-right">{product.inventory}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditProduct(product.id)}
                              >
                                <Edit size={14} />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="border-red-500 text-red-500 hover:bg-red-50"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {user.role === 'client' ? 'Mes commandes' : 'Gestion des commandes'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Articles</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Statut</TableHead>
                      {(user.role === 'vendor' || user.role === 'admin') && (
                        <TableHead className="text-right">Actions</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(user.role === 'client' 
                      ? orders.filter(o => o.userId === user.id) 
                      : user.role === 'vendor'
                        ? vendorOrders
                        : orders
                    ).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          {new Date(order.date).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell>
                          {order.items.length} articles
                        </TableCell>
                        <TableCell>{order.total.toFixed(2)} €</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : order.status === 'processing'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status === 'delivered' && 'Livré'}
                            {order.status === 'processing' && 'En traitement'}
                            {order.status === 'pending' && 'En attente'}
                            {order.status === 'shipped' && 'Expédié'}
                            {order.status === 'cancelled' && 'Annulé'}
                          </span>
                        </TableCell>
                        {(user.role === 'vendor' || user.role === 'admin') && (
                          <TableCell className="text-right">
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateOrderStatus(order.id)}
                            >
                              Modifier
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab (Admin only) */}
          {user.role === 'admin' && (
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Cette fonctionnalité sera disponible prochainement.</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">Cette fonctionnalité sera disponible prochainement.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashboardPage;
