import { React, useState} from 'react';

import { Box, 
        Text, 
        DropButton,
        Layer, 
        Form, 
        FormField, 
        TextInput } from 'grommet';
import { Folder, Add, Edit } from 'grommet-icons';

import API from '../utils/API';

import ExplorerListColorDropdown from './ExplorerListColorDropdown';
import NewCollectionModal from './NewCollectionModal';

export default function ExplorerListCollection(props) {
    
    const [ color, setColor ] = useState(props.color);

    const [ renaming, setRenaming ] = useState(false);
    const [ name, setName ] = useState(props.name);
    const [ hover, setHover ] = useState(false);
    
    const handleColorSelect = (event) => {
        const newColor = event.target.parentNode.getAttribute('name');

        API.editCollectionColor(
            props.id, (newColor==='none' ? null : newColor), 
            props.token
        ).then( (response) => {
            setColor(response.data.color);
        }).catch( (err) => {
            console.log(err);
        });
    }

    const handleNameInput = (event) => {
        setName(event.target.value);
    }

    const handleRename = (event) => {
        if (name !== props.name) {
            API.renameCollection(props.id, name, props.token).then((response) => {
                setName(response.data.name);
                setRenaming(false);
            }).catch((err) => {
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

    const handleClick = (event) => {
        props.setActiveCollection(props.id)
    }

    return (
        <Box>
            <Box
                onMouseEnter={ () => setHover(true) }
                onMouseLeave={ () => setHover(false) }
                onClick={handleClick}
                align='center' 
                justify='between' 
                pad={{vertical: 'xsmall'}} 
                direction='row'
                background={ hover ? 'rgba(0,0,0,0.2)' : undefined}
                elevation={ hover ? 'small' : undefined}
            >

                <Box direction='row'>
                    <Box pad={{horizontal: 'small'}}>
                        <Folder />
                    </Box>
                    {renaming ?
                        <Form value={name} onSubmit={handleRename}>
                            <FormField name='newName' htmlFor='newName' label=''>
                                <TextInput 
                                    pad='0px' 
                                    size='small' 
                                    onKeyDown={handleKeyPress}
                                    onChange={handleNameInput}
                                    name='newName'
                                    value={name} />
                            </FormField>
                        </Form>
                        :
                        <Text 
                            onDoubleClick={() => setRenaming(true)}
                            size='16px'
                            truncate={true}>
                            {name}
                        </Text>
                    }
                </Box>

                <Box direction='row'>
                    <ExplorerListColorDropdown 
                        color={color} 
                        handleColorSelect={handleColorSelect} 
                    />
                    <Edit size='21px' />
                </Box>
            </Box>
        </Box>
    )
}
