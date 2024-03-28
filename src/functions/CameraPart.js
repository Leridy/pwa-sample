// this component is to handle the camera and its functionalities in web
import {Button, Stack, Typography} from "@mui/material";
import React, {useState} from "react";

/**
 * @description This function is to get the camera stream
 *  1. Check if the browser supports the getUserMedia API
 *  2. Request the user permission to access the camera
 *  3. Get the camera stream
 *  4. Display the camera stream in a video element
 *  5. Handle the error if the camera is not accessible
 *  6. Handle the stop camera stream
 *  7. Handle the take picture functionality
 *  8. Handle the download picture functionality
 */

export const CameraPart = (props) => {
    const {onMessage} = props;
    // show video element ?
    const [showVideo, setShowVideo] = useState(false);
    // allow to take picture
    const [allowTakePicture, setAllowTakePicture] = useState(false);
    const [image, setImage] = useState(null);

    // check and request the camera permission
    const handleRequestCamera = async () => {
        // check if the browser supports the getUserMedia API
        if (!('mediaDevices' in navigator)) {
            onMessage('This browser does not support camera access', 'error');
            return;
        }
        // request the camera permission
        try {
            const s = await navigator.mediaDevices.getUserMedia({video: true});
            setShowVideo(true);
            onMessage('Camera permission granted', 'success');
            const video = document.getElementById('camera');
            video.srcObject = s;
        } catch (error) {
            onMessage(`Camera permission denied: ${error.message}`, 'error');
        }
    }

    const handleStartCamera = async () => {
        const video = document.getElementById('camera');
        video.play();
        setAllowTakePicture(true);
    }

    const handleTakePicture = async () => {
        const video = document.getElementById('camera');
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        // store and show it in a image
        setImage(canvas.toDataURL('image/png'));
    }

    return (
        <Stack
            flexDirection={'column'}
            justifyContent={'space-between'}
            spacing={2}
            alignItems={'start'}
        >
            <Typography variant="h4">Camera in PWA</Typography>
            <Typography variant="h6">Step 1: Click the button below to request camera permission</Typography>

            <Button
                variant={'contained'}
                onClick={handleRequestCamera}
            >
                Request Camera
            </Button>


            <Typography variant="h6">Step 2: Click the button below to start the camera</Typography>
            <Stack
                spacing={2}
                direction={'row'}
                alignItems={'center'}
            >
                <Button
                    variant={'contained'}
                    onClick={handleStartCamera}
                    disabled={!showVideo}
                >
                    Start Camera
                </Button>
                {
                    <video
                        style={{display: showVideo ? 'block' : 'none'}}
                        id={'camera'}
                        width={100}
                        height={100}
                    />
                }
            </Stack>

            <Typography variant="h6">Step 3: Click the button below to take a picture</Typography>
            <Stack
                spacing={2}
                direction={'row'}
                alignItems={'center'}
            >
                <Button
                    variant={'contained'}
                    onClick={handleTakePicture}
                    disabled={!showVideo || !allowTakePicture}
                >
                    Take Picture
                </Button>
                {image && <img src={image} alt={'camera'} width={100} height={'auto'}/>}
            </Stack>

            <Typography variant="h6">Step 4: Click the button below to download the picture</Typography>
            <Button
                variant={'contained'}
                onClick={() => {
                    const a = document.createElement('a');
                    a.href = image;
                    a.download = 'camera.png';
                    a.click();
                }}
                disabled={!image}
            >
                Download Picture
            </Button>
        </Stack>
    )
}
