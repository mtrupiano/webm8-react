import { React, useState } from 'react';

import { Box, Text, Button, Tip, TextInput, Form, FormField } from 'grommet';
import { Bookmark, LinkNext } from 'grommet-icons';

import ExplorerListColorDropdown from './ExplorerListColorDropdown';
import API from '../utils/API';

export default function ExplorerListBookmark(props) {
    const [ color, setColor ] = useState(props.bookmark.color);

    const [ renaming, setRenaming ] = useState(false);
    const [ name, setName ] = useState(props.bookmark.name);

    const [ amISelected, setAmISelected ] = useState(false);
      
    const handleColorSelect = (event) => {
        const newColor = event.target.parentNode.getAttribute('name');

        API.editBookmarkColor(
            props.bookmark._id,
            (newColor === 'none' ? null : newColor),
            props.token
        ).then( (response) => {
            setColor(response.data.color);
        }).catch( (err) => {
            console.log(err);
        })
    }

    const handleNameInput = (event) => {
        setName(event.target.value);
    }

    const handleRename = (event) => {
        if (name !== props.bookmark.name) {
            API.renameBookmark(props.bookmark._id, name, props.token).then( (response) => {
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
            setName(props.bookmark.name);
            setRenaming(false);
        }
    }

    return (
        <Box align='center' 
            background={props.selectedBookmark._id === props.bookmark._id ? 
                'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0)'}
            justify='between' 
            pad={{ vertical: 'xsmall', horizontal: 'small' }} 
            direction='row'>

            <Box fill pad={{vertical: 'small'}} 
                onClick={() => props.selectBookmark(props.bookmark)} 
                direction='row'>

                <Box pad={{ right: 'small' }}>
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

            <Box align='center' direction='row'>
                <ExplorerListColorDropdown color={color} handleColorSelect={handleColorSelect} />
                <Tip content='Go!' 
                    dropProps={{ margin: { left: '0px' }, align: { left: 'right' } }}>
                    <Button 
                        as='a' 
                        href={props.bookmark.url} 
                        target='_blank' 
                        icon={<LinkNext size='20px' />} />
                </Tip>
            </Box>

        </Box>
    )
}
