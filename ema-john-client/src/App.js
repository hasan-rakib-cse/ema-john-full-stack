import React, { useState } from 'react';
import { BrowserRouter,  Route, Routes, useLocation, useNavigate, } from 'react-router-dom';

import './App.css';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Error from './components/Error/Error';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { UserContext } from './components/UserContext/UserContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ManageInventory from './components/ManageInventory/ManageInventory';



function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  // const location = useLocation();
  // const navigate = useNavigate()

  return (
    <div className='overflow-hidden'>
      <UserContext.Provider value={ [ loggedInUser, setLoggedInUser ] }>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/product/:key' element={<ProductDetail />} />
            <Route path='/review' element={<Review />} />

            {/* <Route path="/manageInventory" element={<PrivateRoute redirectTo="/login"> <Login /> </PrivateRoute>} /> */}
            {/* <Route path="/manageInventory" element={<PrivateRoute> <ManageInventory /> </PrivateRoute>} /> */}

            <Route path="/manageInventory" element={<PrivateRoute> <ManageInventory /> </PrivateRoute>} />
            <Route path='/login' element={<Login />} />

            {/* <Route path="/shipment"
              element={
                <PrivateRoute redirectTo="/login">
                  <Login />
                </PrivateRoute>
              }
            /> */}
            
            <Route path="/shipment"
              element={
                <PrivateRoute>
                  <Shipment></Shipment>
                </PrivateRoute>
              }
            />
            
            <Route path='*' element={<Error />} />

          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
