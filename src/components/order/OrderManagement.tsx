
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { formatPrice, formatDate } from '@/utils/formatters';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const OrderManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('processing');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Fetch orders with React Query
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => api.getOrders(),
  });

  // Filter orders based on search term
  const filteredOrders = React.useMemo(() => {
    let filtered = [...orders];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toString().includes(searchTerm) ||
        order.items.some(item => 
          item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return filtered;
  }, [orders, searchTerm]);

  const handleOpenStatusDialog = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setCurrentOrderId(orderId);
      setSelectedStatus(order.status as OrderStatus);
      setIsDialogOpen(true);
    }
  };

  const handleUpdateStatus = async () => {
    if (!currentOrderId) return;
    
    setIsSubmitting(true);
    
    try {
      await api.updateOrderStatus(currentOrderId, selectedStatus);
      toast.success(`Statut de la commande #${currentOrderId} mis à jour avec succès`);
      
      // Invalidate orders query to refresh data
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error("Une erreur est survenue lors de la mise à jour du statut");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusLabel = (status: OrderStatus): string => {
    switch (status) {
      case 'delivered': return 'Livré';
      case 'processing': return 'En traitement';
      case 'pending': return 'En attente';
      case 'shipped': return 'Expédié';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getStatusClassName = (status: OrderStatus): string => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Rechercher par ID ou produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Chargement des commandes...
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {formatDate(order.created_at || order.date)}
                    </TableCell>
                    <TableCell>
                      {order.user?.name || `Client #${order.user_id}`}
                    </TableCell>
                    <TableCell>
                      {order.items.length} articles
                    </TableCell>
                    <TableCell>{formatPrice(order.total)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClassName(order.status as OrderStatus)}`}>
                        {getStatusLabel(order.status as OrderStatus)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenStatusDialog(order.id)}
                      >
                        Modifier le statut
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Aucune commande trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le statut de la commande</DialogTitle>
            <DialogDescription>
              Mettez à jour le statut de la commande #{currentOrderId}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label htmlFor="status" className="text-sm font-medium block mb-2">
              Nouveau statut
            </label>
            <Select value={selectedStatus} onValueChange={(value: OrderStatus) => setSelectedStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="processing">En traitement</SelectItem>
                <SelectItem value="shipped">Expédié</SelectItem>
                <SelectItem value="delivered">Livré</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleUpdateStatus}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManagement;
