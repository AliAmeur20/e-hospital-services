import React from 'react'

function OrderStatus({ delivered }) {
    return (
      <div>
        {delivered ? 
        <small className='bg-white border border-2 border-success rounded-5 px-2 py-1'>
            <span className='fw-bold text-success me-1'>✓</span>
            delivered
            </small>
         : 
         <small className='bg-white border border-2 border-warning rounded-5 px-2 py-1'>
            <span className='fw-bold text-warning me-1'>--</span>
            new
            </small>}
      </div>
    );
  }
  
  export default OrderStatus;