import React from 'react';
import './App.css';
import Hero from './Hero';
import Products from './Products';

function App() {
  fetch('http://localhost:3000/products')
  .then(
    res => res.json()
  )
  .then(data => console.log(data[0]));
  return (
    <div className="App">
        <Hero />
        <Products />
    </div>
  );
}

export default App;
