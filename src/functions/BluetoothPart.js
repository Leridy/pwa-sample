// this component is to Demo the bluetooth functionalities in PWA

import {Button, Card, Paper, Stack, Typography} from "@mui/material";
import React, {useState} from "react";

/**
 * @description This function is to handle the bluetooth functionalities in web
 * 1. Check if the browser supports the bluetooth API
 * 2. Request the user permission to access the bluetooth
 * 3. Get the bluetooth devices
 * 4. Connect to a bluetooth device
 * 5. Send data to the connected bluetooth device
 * 6. Receive data from the connected bluetooth device
 * 7. Disconnect the bluetooth device
 * 8. Handle the error if the bluetooth is not accessible
 * 9. Handle the stop bluetooth functionalities
 */

export const BluetoothPart = (props) => {
    const {onMessage} = props;
    const [connectedDevice, setConnectedDevice] = useState(null);

    // the device service
    const [deviceService, setDeviceService] = useState([]);
    // the device basic information
    const [deviceInfo, setDeviceInfo] = useState(null);

    // check and request the bluetooth permission
    const handleRequestBluetooth = async () => {
        // check if the browser supports the bluetooth API
        if (!('bluetooth' in navigator)) {
            onMessage('This browser does not support bluetooth access', 'error');
            return;
        }
        // request the bluetooth permission
        try {
            const bt = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
            });
            console.log(bt);
            onMessage('Bluetooth permission granted', 'success');
            setConnectedDevice(bt);
            setDeviceInfo({
                name: bt.name,
                id: bt.id,
                gatt: bt.gatt,
            });
        } catch (error) {
            onMessage(`Bluetooth permission denied: ${error.message}`, 'error');
            setDeviceInfo(null)
        }
    }

    const getConnectedDeviceService = async () => {
        // use connectedDevice to get device information
        try {

            const server = await connectedDevice.gatt.connect()

            // get all the services and display them
            const services = await server.getPrimaryServices();
            setDeviceService(services);
        } catch (error) {
            onMessage(`Error getting device information: ${error.message}`, 'error');
            setDeviceService([]);
        }
    }

    return (
        <Stack
            spacing={2}
            justifyContent={'center'}
            alignItems={'start'}
        >
            <Typography variant={'h4'}>Bluetooth in PWA</Typography>
            <Typography variant={'h6'}>Step 1: Request Bluetooth Permission and Choose a Device</Typography>
            <Button
                variant={'contained'}
                onClick={handleRequestBluetooth}
            >
                Request Bluetooth Permission
            </Button>
            { deviceInfo && <Card sx={{p: 1}}>
                <Typography variant={'h6'}>Device Information</Typography>
                <Typography variant={'body1'}>Name: {deviceInfo.name}</Typography>
                <Typography variant={'body1'}>ID: {deviceInfo.id}</Typography>
            </Card>}

            <Typography variant={'h6'}>Step 2: Get the connected device information</Typography>
            <Button
                variant={'contained'}
                onClick={getConnectedDeviceService}
                disabled={!connectedDevice}
            >
                Get Device Services
            </Button>
            <Paper sx={{p: 1, display: deviceService.length > 0 ? 'block' : 'none'}}>
                <Typography variant={'h6'}>Device Services</Typography>
                {deviceService.map((service, index) => (
                    <Typography variant={'body1'} key={index}> {
                        service.constructor.name
                    }-{service.uuid}</Typography>
                ))}
            </Paper>

        </Stack>
    )


}
