import { React, useState } from 'react';

import { Box, Text, Button, Tip } from 'grommet';
import { Bookmark, LinkNext } from 'grommet-icons';

import ExplorerListColorDropdown from './ExplorerListColorDropdown';
import API from '../utils/API';

export default function ExplorerListBookmark(props) {
    const [ color, setColor ] = useState(props.color);
    
    const handleColorSelect = (event) => {
        const newColor = event.target.parentNode.getAttribute('name');

        API.editBookmarkColor(
            props.id,
            (newColor === 'none' ? null : newColor),
            props.token
        ).then( (response) => {
            setColor(newColor);
        }).catch( (err) => {
            console.log(err);
        })
    }

    return (
        <Box align='center' justify='between' pad={{ vertical: 'xsmall' }} direction='row'>
            <Box direction='row'>
                <Box pad={{ horizontal: 'small' }}>
                    <Bookmark />
                </Box>
                <Text size='16px' truncate={true}>{props.name}</Text>
            </Box>
            <Box direction='row'>
                <ExplorerListColorDropdown color={color} handleColorSelect={handleColorSelect} />
                <Tip content='Go!' 
                    dropProps={{ margin: { left: '0px' }, align: { left: 'right' } }}>
                    <Button as='a' href={props.url} target='_blank' icon={<LinkNext size='20px' />} />
                </Tip>
            </Box>
        </Box>
    )
}
