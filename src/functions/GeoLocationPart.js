/**
 * @description GeoLocationPart function
 * 1. Check if the browser supports the geolocation API
 * 2. Request the user permission to access the geolocation
 * 3. Get the geolocation
 * 4. Display the geolocation in a map
 * 5. Handle the error if the geolocation is not accessible
 */
import {Button, Stack, Typography} from "@mui/material";
import {useState} from "react";

export const GeoLocationPart = (props) => {
    const {onMessage} = props;
    const [location, setLocation] = useState(null);
    const [showMap, setShowMap] = useState(false);

    const asyncGetCurrentPosition = () => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const handleRequestGeoLocation = async () => {
        // check if the browser supports the geolocation API
        if (!('geolocation' in navigator)) {
            onMessage('This browser does not support geolocation access', 'error');
            return;
        }
        // request the geolocation permission
        try {
            const position = await asyncGetCurrentPosition();
            setLocation(position);
            onMessage('Geolocation permission granted', 'success');
        } catch (error) {
            onMessage(`Geolocation permission denied: ${error.message}`, 'error');
        }
    };

    return (
        <Stack
            spacing={2}
            justifyContent={'center'}
            alignItems={'start'}
            padding={2}
        >
            <Typography variant={'h4'}>GeoLocation in PWA</Typography>
            <Typography variant={'h6'}>
                Step 1: Check if the browser supports the geolocation API and request the permission
            </Typography>
            <Button
                onClick={handleRequestGeoLocation}
                variant={'contained'}>
                Check Geolocation
            </Button>
            <Typography variant={'h6'}>
                Step 2: Show it in open street map
            </Typography>

            <Button
                variant={'contained'}
                disabled={!location}
                onClick={() => {
                    setShowMap(!showMap);
                }}
            >
                Show Map
            </Button>

            {showMap && <iframe
                style={{
                    border: 0,
                }}
                title={'map'}
                width={300}
                height={300}
                src={showMap ? `https://www.openstreetmap.org/export/embed.html?bbox=${location?.coords.longitude - 0.001},${location?.coords.latitude - 0.001},${location?.coords.longitude + 0.001},${location?.coords.latitude + 0.001}&layer=mapnik&marker=${location?.coords.latitude},${location?.coords.longitude}` : ''}
            />}


        </Stack>
    );
}
