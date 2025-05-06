import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { HomePage } from './pages/HomePage.tsx'; 
import { LoginPage} from './pages/LoginPage.tsx';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
  );
}

export default App;