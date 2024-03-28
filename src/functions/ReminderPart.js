import React, {useEffect, useState} from 'react';
import {Button, Stack, Typography} from "@mui/material";

const ReminderPart = (props) => {
    const {onMessage} = props;
    // 是否有通知权限
    const [hasNotificationPermission, setHasNotificationPermission] = useState(false);



    const requestNotificationPermission = async () => {
        // check if the browser supports notifications
        if (!('Notification' in window)) {
            onMessage('This browser does not support notifications', 'error');
            return;
        }
        // check if the permission is already granted
        if (Notification.permission === 'granted') {
            onMessage('Notification permission is already granted', 'info');
            return;
        }
        // request permission
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            onMessage('Notification permission granted', 'success');
            setHasNotificationPermission(true);
        } else {
            onMessage('Notification permission denied', 'error');
        }
    }
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

    useEffect(() => {
        if (Notification.permission === 'granted') {
            setHasNotificationPermission(true);
        }
    }, []);

    return (
        <Stack
            flexDirection={'column'}
            justifyContent={'space-between'}
            spacing={2}
            alignItems={'start'}
        >
            <Typography variant="h4">Reminder Notification</Typography>
            <Typography variant="h6">Step 1: Click the button below to request notification permission</Typography>

            <Button onClick={requestNotificationPermission} variant={'contained'}>
                request notification permission
            </Button>

            <Typography variant="h6">Step 2: Set the delay and notification title and body</Typography>
            <Button
                disabled={!hasNotificationPermission}
                onClick={handleReminder} variant={'contained'}>
                set a reminder
            </Button>
        </Stack>
    );
};

export default ReminderPart;
