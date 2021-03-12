import { React, useState, useEffect } from 'react'

import { Box, DropButton, Tip, Text } from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';

export default function ExplorerListColorDropdown(props) {
    const [colorDropOpen, setColorDropOpen] = useState(false);
    const [grayOnHover, setGrayOnHover] = useState('white');

    const handleColorSelect = (event) => {
        setColorDropOpen(false);
        props.handleColorSelect(event);
    };

    return (
        <>
        { props.color === null ?
            <Tip content={<Text size='16px'>Add a color!</Text>} dropProps={{ align: { left: 'right' } }}>
                <DropButton open={colorDropOpen} dropAlign={{ top: 'bottom' }}
                    onClose={() => setColorDropOpen(false)}
                    onOpen={() => setColorDropOpen(true)}
                    dropContent={
                        <Box>
                            <Box name={null} onMouseDown={handleColorSelect}>
                                <StatusGoodSmall name={null} color='white' />
                            </Box>
                            <Box name='red' onMouseDown={handleColorSelect}>
                                <StatusGoodSmall name='red' color='red' />
                            </Box>
                            <Box name='green' onMouseDown={handleColorSelect}>
                                <StatusGoodSmall name='green' color='green' />
                            </Box>
                            <Box name='blue' onMouseDown={handleColorSelect}>
                                <StatusGoodSmall name='blue' color='blue' />
                            </Box>
                        </Box>
                    }>
                    <Box 
                        onMouseOver={() => { setGrayOnHover('rgba(0,0,0,0.05)')}} 
                        onMouseLeave={() => { setGrayOnHover('white')}}>
                        <StatusGoodSmall color={grayOnHover} />
                    </Box>
                </DropButton>
            </Tip>

            :

            <DropButton open={colorDropOpen} dropAlign={{ top: 'bottom' }}
                onClose={() => setColorDropOpen(false)}
                onOpen={() => setColorDropOpen(true)}
                dropContent={
                    <Box>
                        <Box name={null} onMouseDown={handleColorSelect}>
                            <StatusGoodSmall name={null} color='white' />
                        </Box>
                        <Box name='red' onMouseDown={handleColorSelect}>
                            <StatusGoodSmall name='red' color='red' />
                        </Box>
                        <Box name='green' onMouseDown={handleColorSelect}>
                            <StatusGoodSmall name='green' color='green' />
                        </Box>
                        <Box name='blue' onMouseDown={handleColorSelect}>
                            <StatusGoodSmall name='blue' color='blue' />
                        </Box>
                    </Box>
                }>
                <Box>
                    <StatusGoodSmall color={props.color} />
                </Box>
            </DropButton>
        }
        </>
    )
}
