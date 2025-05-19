
import React, { useState } from 'react';
import { products as initialProducts } from '@/data/mockData';
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ProductForm from './ProductForm';
import { Product } from '@/data/mockData';
import { formatPrice } from '@/utils/formatters';

const ProductManagement = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([...initialProducts]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter products based on role
  React.useEffect(() => {
    let filtered = [...products];
    
    // If user is vendor, only show their products
    if (user?.role === 'vendor') {
      filtered = filtered.filter(product => product.vendor.id === user.id);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, searchTerm, user]);

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setCurrentProduct(product);
    } else {
      setCurrentProduct(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentProduct(null);
  };

  const handleSubmit = (productData: Partial<Product>) => {
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (currentProduct) {
        // Update existing product
        setProducts(products.map(p => 
          p.id === currentProduct.id 
            ? { ...currentProduct, ...productData } as Product 
            : p
        ));
        toast.success(`Le produit ${productData.name} a été mis à jour`);
      } else {
        // Create new product
        const newProduct = {
          ...productData,
          id: Math.max(...products.map(p => p.id)) + 1,
          vendor: {
            id: user?.id || 0,
            name: user?.name || 'Unknown Vendor'
          }
        } as Product;
        
        setProducts([...products, newProduct]);
        toast.success(`Le produit ${productData.name} a été créé`);
      }
      
      setIsSubmitting(false);
      handleCloseDialog();
    }, 800);
  };

  const handleDeleteProduct = (productId: number) => {
    const product = products.find(p => p.id === productId);
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer le produit "${product?.name}" ?`)) {
      setProducts(products.filter(p => p.id !== productId));
      toast.success(`Le produit ${product?.name} a été supprimé`);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gestion des produits</CardTitle>
            <Button onClick={() => handleOpenDialog()}>
              <PlusCircle size={16} className="mr-2" /> Ajouter un produit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
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
              {filteredProducts.map((product) => (
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
                  <TableCell className="text-right">{formatPrice(product.price)}</TableCell>
                  <TableCell className="text-right">{product.inventory}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenDialog(product)}
                      >
                        <Pencil size={14} />
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
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Aucun produit trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentProduct ? 'Modifier le produit' : 'Ajouter un produit'}
            </DialogTitle>
          </DialogHeader>
          <ProductForm 
            initialData={currentProduct || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCloseDialog}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
