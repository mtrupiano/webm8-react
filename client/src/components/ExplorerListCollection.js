import { React, useState} from 'react';

import UserContext from './UserContext';

import { Box, Text, DropButton } from 'grommet';
import { Folder, StatusGoodSmall } from 'grommet-icons';

export default function ExplorerListCollection(props) {
    const [colorDropOpen, setColorDropOpen] = useState(false);
    
    const handleColorSelect = (event) => {
        if (event.target.id === '') {
            const newColor = event.target.parentNode.getAttribute('name');
            console.log(newColor);
        }
        setColorDropOpen(false);
    }

    return (
        <Box align='center' justify='between' pad={{vertical: 'xsmall'}} direction='row'>
            <Box direction='row'>
                <Box pad={{horizontal: 'small'}}>
                    <Folder />
                </Box>
                <Text size='16px' truncate={true}>{props.name}</Text>
            </Box>
            <DropButton open={colorDropOpen} dropAlign={{top: 'bottom'}}
                onClose={ () => setColorDropOpen(false) }
                onOpen={ () => setColorDropOpen(true) }
                dropContent={
                    <Box>
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
                    <StatusGoodSmall color={props.color}/>
                </Box>
            </DropButton>

        </Box>
    )
}
