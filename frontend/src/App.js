import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {useAuthContext} from './Hooks/useAuthContext';

import Home from './Pages/Homepage';
import Navbar from './Components/Navbar';
import Carpool from './Pages/Carpool';
import CarbonFootprint from './Pages/CarbonFootprint';
import AllCarpoolInfo from './Pages/AllCarpoolInfo';

import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/carbon' element={<CarbonFootprint/>} />
            <Route path='/all-carpoolpool' element={<AllCarpoolInfo/>} />
            <Route path='/carpool' element={user ? <Carpool/> : <Navigate to='/login'/>} />
            <Route path='/login' element={!user ? <Login/> : <Navigate to='/carpool' />} />
            <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/carpool' />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
