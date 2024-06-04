import { useState, useEffect } from 'react';

function ReceivedOrderNotification() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      fetchData();
      // }, 108000000); // check every 30 min
    }, 120000); // for now just for 2 min (to test)

    return () => clearInterval(interval);
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/received-order`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const json = await response.json();
      // check there's received orders
      if (Array.isArray(json) && json.length !== 0) {
        setNotification();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 10000);
  }

  return (
    <div>
      {showNotification && (
        <div className="alert alert-warning position-fixed bottom-0 m-4" style={{ zIndex: 1050 }}>
          there's received orders that need to be treated!
        </div>
      )}
    </div>
  )
}

export default ReceivedOrderNotification