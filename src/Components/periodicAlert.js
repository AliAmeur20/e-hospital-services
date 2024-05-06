import React, { useState, useEffect } from 'react';
import { BiCheckCircle } from 'react-icons/bi';

function PeriodicAlert() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
    }, 180000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {showAlert && (
        <div className="alert alert-success position-fixed bottom-0 end-0 m-4" style={{ zIndex: 1050 }}>
          <BiCheckCircle size="1.5rem" className='me-2 mb-1'/>  
          a frequently order has been added!
        </div>
      )}
    </div>
  );
}

export default PeriodicAlert;
