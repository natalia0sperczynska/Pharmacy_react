import React from 'react';
import logo from './logo.svg';
import './App.css';
import app_logo from './app_logo.jpg'
import Footer from './Footer';
import Header from './Header';
import Logo from './Logo';
import Entry from './Entry';
import Button from './Button';
import Form from './Form';


export default function App() {
 
  return (
    <div className="App">
        <Logo></Logo>
        <Header></Header>
        <Form></Form>
        <Button></Button>
    </div>
  );
}
