import { Routes, Route } from 'react-router-dom';
import { RegisterPage } from './pages/Register.tsx';
import {HomePage} from './pages/HomePage.tsx'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;