import { useEffect } from 'react';

const useAutoRefresh = (refreshInterval = 300000) => { // Default 5 minutes
  useEffect(() => {
    let lastActivityTime = Date.now();
    
    const handleActivity = () => {
      lastActivityTime = Date.now();
    };

    const checkStaleTab = () => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTime;
      
      if (timeSinceLastActivity >= refreshInterval) {
        window.location.reload();
      }
    };

    // Add activity listeners
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);
    
    // Check for stale tab every minute
    const intervalId = setInterval(checkStaleTab, 60000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearInterval(intervalId);
    };
  }, [refreshInterval]);
};

export default useAutoRefresh; 