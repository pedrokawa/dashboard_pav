import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/UseAuth';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // Se não estiver autenticado, chuta o usuário de volta para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver, deixa a página carregar normalmente
  return <Outlet />;
};