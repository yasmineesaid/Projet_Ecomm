
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { users } from '@/data/mockData';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la connexion.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
              <CardDescription>
                Saisissez votre email et mot de passe pour vous connecter
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Button variant="link" className="p-0 h-auto text-xs">
                      Mot de passe oublié?
                    </Button>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-shop-primary hover:bg-shop-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                <p>
                  Pour les besoins de la démo, utilisez:
                </p>
                <ul className="text-xs mt-1 space-y-1">
                  {users.map((user) => (
                    <li key={user.id} className="py-1 px-2 bg-gray-50 rounded">
                      <strong>{user.email}</strong> (rôle: {user.role})
                      <Button 
                        variant="link" 
                        size="sm"
                        className="p-0 h-auto ml-1 text-xs"
                        onClick={() => {
                          setEmail(user.email);
                          setPassword('password');
                        }}
                      >
                        Utiliser
                      </Button>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">
                  Le mot de passe est "password" pour tous les utilisateurs
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Vous n'avez pas de compte?{' '}
                <Link to="/register" className="text-shop-primary hover:underline">
                  S'inscrire
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
