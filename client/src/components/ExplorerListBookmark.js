import { React, useState } from 'react';

import { Box, Text, Button, Tip, TextInput, Form, FormField } from 'grommet';
import { Bookmark, LinkNext } from 'grommet-icons';

import ExplorerListColorDropdown from './ExplorerListColorDropdown';
import API from '../utils/API';

export default function ExplorerListBookmark(props) {
    const [ color, setColor ] = useState(props.color);

    const [ renaming, setRenaming ] = useState(false);
    const [ name, setName ] = useState(props.name);
      
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

    const handleNameInput = (event) => {
        setName(event.target.value);
    }

    const handleRename = (event) => {
        if (name !== props.name) {
            API.renameBookmark(props.id, name, props.token).then( (response) => {
                setName(response.data.name);
                setRenaming(false);
            }).catch( (err) => {
                console.log(err);
            });
        } else {
            setName(props.name);
        }
    }
    
    const handleKeyPress = (event) => {
        if (event.keyCode === 27) { // Escape key
            setName(props.name);
            setRenaming(false);
        }
    }

    return (
        <Box align='center' justify='between' pad={{ vertical: 'xsmall' }} direction='row'>
            <Box direction='row'>
                <Box pad={{ horizontal: 'small' }}>
                    <Bookmark />
                </Box>
                { renaming ? 
                    <Form value={name} onSubmit={handleRename}>
                        <FormField name='newName' htmlFor='newName' label=''>
                        <TextInput pad='0px' size='small'  onKeyDown={handleKeyPress}
                            onChange={handleNameInput}
                            name='newName' 
                            value={name} />
                        </FormField>
                    </Form>
                    :
                    <Text onDoubleClick={() => setRenaming(true)} 
                        size='16px' 
                        truncate={true}>
                            {name}
                    </Text> 
                }
                
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
