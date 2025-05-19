
import React, { useState } from 'react';
import { users } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';

interface UserFormData {
  id?: number;
  name: string;
  email: string;
  role: 'client' | 'vendor' | 'admin';
}

const UserManagement = () => {
  const [usersList, setUsersList] = useState([...users]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'client'
  });
  const [isEditing, setIsEditing] = useState(false);

  const filteredUsers = usersList.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (user?: typeof users[0]) => {
    if (user) {
      setCurrentUser({ ...user });
      setIsEditing(true);
    } else {
      setCurrentUser({
        name: '',
        email: '',
        role: 'client'
      });
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (value: 'client' | 'vendor' | 'admin') => {
    setCurrentUser({
      ...currentUser,
      role: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing user
      setUsersList(usersList.map(user => 
        user.id === currentUser.id ? { ...user, ...currentUser } : user
      ));
      toast.success(`L'utilisateur ${currentUser.name} a été mis à jour`);
    } else {
      // Create new user with next available ID
      const newUser = {
        ...currentUser,
        id: Math.max(...usersList.map(u => u.id)) + 1
      };
      setUsersList([...usersList, newUser]);
      toast.success(`L'utilisateur ${currentUser.name} a été créé`);
    }
    
    handleCloseDialog();
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      const deletedUser = usersList.find(user => user.id === userId);
      setUsersList(usersList.filter(user => user.id !== userId));
      toast.success(`L'utilisateur ${deletedUser?.name} a été supprimé`);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gestion des utilisateurs</CardTitle>
              <CardDescription>Gérez les utilisateurs de la plateforme</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                  <PlusCircle size={16} className="mr-2" /> Ajouter un utilisateur
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}
                  </DialogTitle>
                  <DialogDescription>
                    Remplissez les informations pour {isEditing ? 'modifier' : 'créer'} un utilisateur.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Nom</label>
                      <Input
                        id="name"
                        name="name"
                        value={currentUser.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={currentUser.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium">Rôle</label>
                      <Select
                        value={currentUser.role}
                        onValueChange={(value: 'client' | 'vendor' | 'admin') => handleRoleChange(value)}
                      >
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="client">Client</SelectItem>
                          <SelectItem value="vendor">Vendeur</SelectItem>
                          <SelectItem value="admin">Administrateur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={handleCloseDialog}>
                      Annuler
                    </Button>
                    <Button type="submit">
                      {isEditing ? 'Mettre à jour' : 'Créer'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800'
                        : user.role === 'vendor'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === 'admin' && 'Administrateur'}
                      {user.role === 'vendor' && 'Vendeur'}
                      {user.role === 'client' && 'Client'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(user)}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => handleDeleteUser(user.id)}
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
    </div>
  );
};

export default UserManagement;
