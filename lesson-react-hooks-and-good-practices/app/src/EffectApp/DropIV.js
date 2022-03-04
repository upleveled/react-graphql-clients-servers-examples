import React, { useEffect, useState } from 'react';

function App() {
  console.log('render Drop');
  const [isOnline, setIsOnline] = useState(true);

  function onOffline() {
    setIsOnline(false);
  }
  function onOnline() {
    setIsOnline(true);
  }
  useEffect(() => {
    console.log('useEffect Drop');
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      console.log('cleanup useEffect Drop');
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  return <div>{isOnline ? 'Online' : 'Offline'}</div>;
}

export default App;
