import { Routes, Route } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { HomePage } from './pages/HomePage.tsx'; 
import { LoginPage} from './pages/LoginPage.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import ListaUsuarios from './pages/ListaUsuarios.tsx';

function App() {
  return (
      <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/usuarios" element={<ListaUsuarios />} />
      </Routes>
      </AuthProvider>
  );
}

export default App;