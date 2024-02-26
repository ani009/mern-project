import './App.css';
import React from 'react';
// import ReactDOM from 'react-dom';
import NavbarComp from './components/Header';
import CartProvider from './components/contextreducer';
import Login from './components/login';
import { Router, Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import Body from './components/Body';
import Cart from './components/cart';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
const App = () => {
  return (
    <CartProvider>
    <Routes>
      <Route path='/' element={
        <>
          <NavbarComp />
          <Body />
          <Footer/>
        </>
      }
      />
      <Route path='/login' element={<Login />}></Route>
      <Route path='/createuser' element={<Signup />}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
    </Routes>
    </CartProvider>

  );
}

export default App;
