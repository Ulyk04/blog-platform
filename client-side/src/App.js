import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/login' element={<LoginPage/>} />
    </Routes>
  );
}

export default App;
