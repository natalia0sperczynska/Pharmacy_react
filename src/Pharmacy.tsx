import React from 'react';
import logo from './logo.svg';
import './App.css';
import app_logo from './app_logo.jpg'
import Footer from './Footer';
import Header from './MainList';
import Logo from './Logo';
import MainList from './MainList';

export default function Pharmacy() {
  return (
    <div className="App">
      <Logo/>
      <Header/>
      <MainList/>
      <Footer/>
    </div>
  );
}
