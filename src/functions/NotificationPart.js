import React from 'react';

const NotificationPart = (props) => {
    const handleReminder = () => {
        // use prompt to collect user input and delay the notification
        const delay = prompt('Enter the delay in seconds');
        const notificationTitle = prompt('Enter the notification title');
        const notificationBody = prompt('Enter the notification body');

        // use service worker to send a notification
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                // setTimeout 15 seconds to send a notification
                registration.active.postMessage({
                    type: 'SHOW_NOTIFICATION',
                    delay: delay * 1000,
                    title: notificationTitle,
                    options: {
                        body: notificationBody,
                        icon: 'logo192.png',
                        badge: 'logo192.png',
                    },
                });
            });
        }
    }

  return (
       <button onClick={handleReminder}>
            Click me to set a reminder
        </button>
  );
};

export default NotificationPart;
