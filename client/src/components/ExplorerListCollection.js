import { React, useState} from 'react';

import UserContext from './UserContext';

import { Box, Text, DropButton, Tip } from 'grommet';
import { Folder, StatusGoodSmall } from 'grommet-icons';

import API from '../utils/API';

import ExplorerListColorDropdown from './ExplorerListColorDropdown';

export default function ExplorerListCollection(props) {
    const [color, setColor] = useState(props.color);
    
    const handleColorSelect = (event) => {
        const newColor = event.target.parentNode.getAttribute('name');

        API.editCollectionColor(props.id, (newColor==='none' ? null : newColor), props.token).then( (response) => {
            setColor(newColor);
        }).catch( (err) => {
            console.log(err);
        });
    }

    return (
        <Box align='center' justify='between' pad={{vertical: 'xsmall'}} direction='row'>
            <Box direction='row'>
                <Box pad={{horizontal: 'small'}}>
                    <Folder />
                </Box>
                <Text size='16px' truncate={true}>{props.name}</Text>
            </Box>

            <ExplorerListColorDropdown color={color} handleColorSelect={handleColorSelect} />

        </Box>
    )
}
