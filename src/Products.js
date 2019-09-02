import React, { useState, useEffect } from 'react';
import './Products.css';
import Card from './Card';

const Products = () => {
  const [sortStatus, setSortStatus] = useState({text: '', sorted: false});
  const [products, setProducts] = useState([]);
  const [adTracker, setAdTracker] = useState({});
  const [pageNum, setPageNum] = useState(1);

  const generateRandomNum = () => {
    return Math.floor(Math.random() * 99) + 1;
  }

  useEffect(() => {
    handleAdNum()
    }, []
  )

  const fetchProducts = (num) => {
    const firstUrl = `https://unsplash.it/320/200?image=${num}`
    const secondRandNum = generateRandomNum();
    const secondUrl = `https://unsplash.it/320/200?image=${secondRandNum}`
    
    fetch(`http://localhost:3000/products?_page=${pageNum}&_limit=38`)
    .then(res => res.json())
    .then(data => {
      const productArray = [...data]
      productArray.splice(19, 0, {id: num, url: firstUrl});
      productArray.push({id: secondRandNum, url: secondUrl});
      setProducts([...products, ...productArray])
    })
    
  }

  const handleAdNum = () => {
    const num = generateRandomNum();
    const oldNum = adTracker.adNum ? adTracker.adNum : 0;
    const adUpdate = {
      adNum: num,
      prevNum: oldNum
    }
    setAdTracker(adUpdate)
    fetchProducts(num)
  }

  const handleSort = (e) => {
    if (sortStatus.text === e.target.innerHTML) {
      setSortStatus(
        {text: '',
        sorted: false}
      )
    }
    else {
      setSortStatus(
        {text: e.target.innerHTML,
        sorted: true}
      )
    }
  }

  const sortProducts = () => {
    if (!sortStatus.sorted) return products.slice(0, products.length - 20);
    const sortText = sortStatus.text
    const sortedProducts = [...products].sort((a, b) => b[sortText] - a[sortText])
    return sortedProducts.slice(0, sortedProducts.length - 20);
  }

  return (
    <div className='ProductsGroup'>
      <div className='ButtonGroup'>
        <h1>Sorting Options</h1>
        <div className='Buttons'>
        <button className={sortStatus.text ==='size' ? 'active' : null} onClick={handleSort}>size</button>
        <button className={sortStatus.text ==='price' ? 'active' : null} onClick={handleSort}>price</button>
        <button className={sortStatus.text ==='id' ? 'active' : null} onClick={handleSort}>id</button>
        </div>
      </div>
      <div className='Products'>
        {sortProducts().map(product => <Card key={product.id} product={product} />)}
      </div>
    </div>
  )
}

export default Products
