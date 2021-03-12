import { React, useState, useEffect } from 'react'

import { Box, DropButton, Tip, Text } from 'grommet';
import { StatusGoodSmall, Clear } from 'grommet-icons';

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
            <Tip content={
                    <Text size='16px'>Add a color!</Text>
                } 
                dropProps={{ margin: {left: '37px'}, align: { left: 'right' } }}>
                <DropButton open={colorDropOpen} dropAlign={{ top: 'bottom' }}
                    onClose={() => setColorDropOpen(false)}
                    onOpen={() => setColorDropOpen(true)}
                    dropContent={
                        <Box>
                            <Box name={null} onMouseDown={handleColorSelect}>
                                <Clear name={null} color='rgba(0,0,0,0.2)' />
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
                            <Box name='orange' onMouseDown={handleColorSelect}>
                                <StatusGoodSmall name='orange' color='orange' />
                            </Box>
                            <Box name='purple' onMouseDown={handleColorSelect}>
                                <StatusGoodSmall name='purple' color='purple' />
                            </Box>
                            <Box name='pink' onMouseDown={handleColorSelect}>
                                <StatusGoodSmall name='pink' color='pink' />
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
                            <Clear name={null} color='rgba(0,0,0,0.2)' />
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
                        <Box name='orange' onMouseDown={handleColorSelect}>
                            <StatusGoodSmall name='orange' color='orange' />
                        </Box>
                        <Box name='purple' onMouseDown={handleColorSelect}>
                            <StatusGoodSmall name='purple' color='purple' />
                        </Box>
                        <Box name='pink' onMouseDown={handleColorSelect}>
                            <StatusGoodSmall name='pink' color='pink' />
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
