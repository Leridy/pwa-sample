import React from 'react';
import {Box, Button} from "@mui/material";

const ReminderPart = (props) => {
    const handleReminder = () => {
        // use prompt to collect user input and delay the notification
        const delay = prompt('Enter the delay in seconds (default value is 5 seconds)') || 5;
        const notificationTitle = prompt('Enter the notification title') || 'Reminder'
        const notificationBody = prompt('Enter the notification body') || 'This is a reminder';

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
      <Box>
       <Button onClick={handleReminder} variant={'contained'}>
            Click me to set a reminder
        </Button>
      </Box>
  );
};

export default ReminderPart;
