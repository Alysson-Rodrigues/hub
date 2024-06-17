'use Client';
import React, { useEffect } from 'react';

interface TrackerProps {
  children: React.ReactNode;
}

export default function Tracker({ children }: TrackerProps) {
  function getBrowserData() {
    return {
      user_agent: navigator.userAgent,
      platform: navigator.platform,
    };
  }

  useEffect(() => {
    const sendIdentifierRequest = async () => {
      console.log(navigator.cookieEnabled);
      const identifierCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('identifier'));
      if (identifierCookie) {
        return;
      }
      try {
        const browserData = getBrowserData();
        const response = await fetch('/api/v1/tracker', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(browserData),
        });
        const data = await response.json();
        document.cookie = `identifier=${data.identifier}; min-age=${
          60 * 60 * 24 * 365 * 10
        }`;
      } catch (error) {
        console.error(error);
      }
    };
    sendIdentifierRequest();
  }, []);
  return <>{children}</>;
}
