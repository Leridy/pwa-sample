import React, {useEffect, useMemo, useState} from 'react';
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
// import  ua-parser-js
import UAParser from 'ua-parser-js';
// import OS and browser icons from react-icons
import {FaWindows, FaApple, FaLinux, FaChrome, FaFirefox, FaSafari, FaQuestion} from 'react-icons/fa';


/**
 * This components show get the runtime information of the application like OS and browser information and display it.
 * @constructor
 */
const RuntimeInfo = () => {

    // this information will be fetched from the navigator userAgent
    const [runtimeInfo, setRuntimeInfo] = useState({});
    const [navigatorInfo, setNavigatorInfo] = useState({});

    const OS = useMemo(() => {
        return runtimeInfo.os ? `${runtimeInfo.os.name} ${runtimeInfo.os.version}` : 'Not Initialized';
    }, [runtimeInfo]);

    const OSIcon = useMemo(() => {
        if (OS.includes('Windows')) {
            return <FaWindows/>;
        } else if (OS.includes('Mac')) {
            return <FaApple/>;
        } else if (OS.includes('Linux')) {
            return <FaLinux/>;
        } else if (OS.includes('Android')) {
            return <FaChrome/>;
        } else if (OS.includes('iOS')) {
            return <FaSafari/>;
        }
        return <FaQuestion/>;
    }, [OS]);

    const browser = useMemo(() => {
        return runtimeInfo.browser ? `${runtimeInfo.browser.name} ${runtimeInfo.browser.version}` : 'Not Initialized';
    }, [runtimeInfo]);

    const browserIcon = useMemo(() => {
        if (browser.includes('Chrome')) {
            return <FaChrome/>;
        } else if (browser.includes('Firefox')) {
            return <FaFirefox/>;
        } else if (browser.includes('Safari')) {
            return <FaSafari/>;
        }
        return <FaQuestion/>;
    }, [browser]);


    const requestRuntimeInfo = async () => {
        // create a new instance of UAParser
        const parser = new UAParser();
        // get the user agent string
        const userAgent = navigator.userAgent;
        // pass the user agent string to the parser
        const result = parser.setUA(userAgent).getResult();
        // set the result to the state
        setRuntimeInfo(result);
        setNavigatorInfo(navigator);

        console.log(result);
    };

    useEffect(() => {
        requestRuntimeInfo();
    }, []);

    return (
        <Box>
            <Typography variant="h4">
                Runtime Information
                <Button
                    onClick={requestRuntimeInfo}
                    variant={'contained'}
                >
                    Refresh Information
                </Button>
            </Typography>
            <Box>
                <TableContainer>
                    <Table
                        dense
                        sx={{
                            height: '50vh',
                            width: '100%',
                            '& .MuiTableCell-root': {
                                color: 'white',
                            }
                        }}
                        overflow={'scroll'}
                        size={'small'}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Property</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>OS</TableCell>
                                <TableCell>{OSIcon} {OS}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Browser</TableCell>
                                <TableCell>{browserIcon} {browser}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Languages</TableCell>
                                <TableCell>
                                    {
                                        navigatorInfo.languages ? navigatorInfo.languages.join(', ') : 'Not Initialized'
                                    }.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Main Language</TableCell>
                                <TableCell>{navigatorInfo.language}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Device Memory</TableCell>
                                <TableCell>{navigatorInfo.deviceMemory}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Hardware Concurrency</TableCell>
                                <TableCell>{navigatorInfo.hardwareConcurrency}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Window Width and Height</TableCell>
                                <TableCell>{window.innerWidth} x {window.innerHeight}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Screen Width and Height</TableCell>
                                <TableCell>{window.screen.width} x {window.screen.height}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Pixel Ratio</TableCell>
                                <TableCell>{window.devicePixelRatio}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Platform</TableCell>
                                <TableCell>{navigatorInfo.platform}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>{navigatorInfo.product}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Vendor</TableCell>
                                <TableCell>{navigatorInfo.vendor}</TableCell>
                            </TableRow>


                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default RuntimeInfo;
