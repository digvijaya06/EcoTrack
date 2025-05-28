import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} /> 
            <Route path='/login' element={Login}/>
            <Route path='/register' element={<Register/>} />
          </Route>
        {/* </Route> */}

       
      </Routes>
    </Router>
  );
}

export default App;
