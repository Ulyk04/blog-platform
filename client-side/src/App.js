import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage/>} />
      <Route path='/login' element={<LoginPage/>} />

      <Route 
          path='/home' 
          element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
                } 
      />
      
    </Routes>
  );
}

export default App;
