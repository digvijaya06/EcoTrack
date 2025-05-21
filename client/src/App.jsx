import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} /> 
            
          </Route>
        </Route>

       
      </Routes>
    </Router>
  );
}

export default App;
