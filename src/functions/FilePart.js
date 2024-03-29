/**
 * @description Get a part of a file
 * * Do a demo to show the file abilitity of PWA
 */
import {Button, Stack, Typography} from "@mui/material";
import {useState} from "react";

export const FilePart = (props) => {
    const {onMessage} = props;
    const [file, setFile] = useState(null);
    const [filePart, setFilePart] = useState(null);

    const handleFileChange = (event) => {
        const f = event.target.files[0];
        setFile(f);
    }

    const handleReadFile = async () => {
        if (!file) {
            onMessage('Please select a file first', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            setFilePart(event.target.result);
        }
        reader.readAsText(file);
    }

    return (
        <Stack
            spacing={2}
            justifyContent={'center'}
            alignItems={'start'}
            padding={2}
        >
            <Typography variant={'h4'}>File Part in PWA</Typography>
            <Typography variant={'h6'}>
                Step 1: Select a file use HTML input element
            </Typography>
            <input type={'file'} onChange={handleFileChange}/>
            <Typography variant={'h6'}>
                Step 2: Read the file
            </Typography>
            <Button
                variant={'contained'}
                onClick={handleReadFile}
                disabled={!file}
            >
                Read File
            </Button>
            <Typography variant={'h6'}>
                Step 3: Show the file content
            </Typography>
            <Typography
                overflow={'scroll'}
                variant={'body1'}
                sx={{
                    whiteSpace: 'pre-wrap',
                    width: '300px',
                    height: '200px',
                    display: filePart ? 'block' : 'none'
                }}
            >
                {filePart}
            </Typography>
        </Stack>
    );
}
