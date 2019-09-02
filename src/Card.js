import React, {Fragment} from 'react';
import './Card.css';

const Card = ({ product }) => {
  const size = product.size;
  const faceSize = size + "px";
  const price = product.price / Math.pow(10, 2);
  const displayPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  

  const formatDate = val => {
    function nth(d) {
      if (d > 3 && d < 21) return 'th'; 
      switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    }
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const today = new Date();
    const createdOn = new Date(val);
    const msInDay = 24 * 60 * 60 * 1000;
    const year = createdOn.getFullYear();
    const month = months[createdOn.getMonth()];
    const day = createdOn.getDate();
    createdOn.setHours(0,0,0,0);
    today.setHours(0,0,0,0)
    console.log(createdOn)
    var diff = (+today - +createdOn)/msInDay
    if (diff < 7) {
      return `${diff} days ago`
    }
    return `${day}${nth(day)} ${month} ${year}`;
  };

  const dateString = formatDate(product.date)
  
  return (
    <Fragment >
      {!product.url ? 
      <div className='Card'>
      <h3>Size: {size}</h3>
      <h3>Face: <span style={{fontSize: faceSize}}>{product.face}</span></h3>
      <h3>Price: {displayPrice}</h3>
      <h3>Date: {dateString}</h3>
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
