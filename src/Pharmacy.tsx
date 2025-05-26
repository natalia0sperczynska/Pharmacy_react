import React from 'react';
import logo from './logo.svg';
import './App.css';
import app_logo from './app_logo.jpg'
import Footer from './Footer';
import Header from './Header';
import Logo from './Logo';

export default function Pharmacy() {
  return (
    <div className="App">
      <Logo/>
      <Header/>
      <Footer/>
    </div>
  );
}
