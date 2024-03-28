import React, {useState} from 'react';
import './App.css';
import ReminderPart from "./functions/ReminderPart";
import {Alert, AppBar, Snackbar, Stack, Tab, Tabs, Toolbar} from "@mui/material";


import {Bluetooth, Camera, Info, MyLocation, Notifications} from "@mui/icons-material";
import RuntimeInfo from "./functions/RuntimeInfo";
import {CameraPart} from "./functions/CameraPart";
import {BluetoothPart} from "./functions/BluetoothPart";

function App() {
    const [currentTab, setCurrentTab] = useState(0);
    const [message, setMessage] = useState('');
    const [messageLevel, setMessageLevel] = useState('info');

    const handleMessage = (message = '', level = 'info') => {
        setMessage(message);
        setMessageLevel(level);
    }


    return (
        <Stack
            flexDirection={'column'}
            height={'100vh'}
            justifyContent={'space-between'}
        >
            <AppBar position={'fixed'}>
                <Toolbar>
                    <h2>React PWA Tutorial</h2>
                </Toolbar>
            </AppBar>
            <header className="App-header">
                {currentTab === 0 && <RuntimeInfo/>}
                {currentTab === 1 && <ReminderPart onMessage={handleMessage}/>}

                {currentTab === 2 && <CameraPart onMessage={handleMessage}/>}
                {currentTab === 3 && <BluetoothPart onMessage={handleMessage}/> }
                {currentTab === 4 && <p>GeoLocation</p>}

            </header>
            <Tabs
                variant={'fullWidth'}
                value={currentTab}
                onChange={(event, newValue) => setCurrentTab(newValue)}
            >
                <Tab label={'Information'} icon={<Info/>}/>
                <Tab label={'Notification'} icon={<Notifications/>}/>
                <Tab label={'Camera'} icon={<Camera/>}/>
                <Tab label={'Bluetooth'} icon={<Bluetooth/>}/>
                <Tab label={'GeoLocation'} icon={<MyLocation/>}/>
                <Tab label={'File System'} icon={<MyLocation/>}/>
            </Tabs>

            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={message.length > 0}
                autoHideDuration={6000}
                onClose={() => setMessage('')}
                severity={messageLevel}
            >
                <Alert
                    onClose={() => setMessage('')}
                    variant={'filled'}
                    severity={messageLevel}>{message}</Alert>
            </Snackbar>
        </Stack>
    );
}

export default App;
