import React, {Fragment} from 'react';
import './Card.css';

const Card = ({ product }) => {
  const size = product.size;
  const faceSize = size + "px";
  const price = product.price / Math.pow(10, 2);
  const displayPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  
  
  return (
    <Fragment >
      {!product.url ? 
      <div className='Card'>
      <h2>Size: {size}</h2>
      <h2>Face: <span style={{fontSize: faceSize}}>{product.face}</span></h2>
      <h2>Price: {displayPrice}</h2>
      <h2>Date: {}</h2>
      </div>
       : 
       <div className='Card'>
      <img src={product.url} />
      </div>
      }
    </Fragment>
  )
}

export default Card
