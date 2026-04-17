import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login'
import { Toaster } from 'react-hot-toast';
import { VisaoGeral } from './pages/Gerencial';
import { Config } from './pages/Config';
import { RelVeiculos } from './pages/RelVeiculos';
import { RelAbasteci } from './pages/RelAbasteci';
import { RelDp } from './pages/RelDp';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} 
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<VisaoGeral />} />

            <Route path="relatorios/veiculos" element={<RelVeiculos />} />
            <Route path="relatorios/abastecimentos" element={<RelAbasteci/>} />
            <Route path="relatorios/dp" element={<RelDp />} />
            <Route path="configuracoes" element={<Config />} />
          </Route>
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
