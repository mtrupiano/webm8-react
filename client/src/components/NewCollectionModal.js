import { React, useState } from 'react'

import { Form, FormField, TextInput, Button, Box, Heading, Text, RadioButtonGroup, Stack, RadioButton } from 'grommet';

import API from '../utils/API';
import { Clear, Folder, Radial, StatusGoodSmall } from 'grommet-icons';
import MyButton from './MyButton';

export default function NewCollectionModal(props) {

    const [formValues, setFormValues] = useState({
        name: ''
    });

    const [ color, setColor ] = useState('')
    const colors = [ 'red', 'yellow', 'green', 'blue', 'orange', 'purple', 'pink' ]

    const [ duplicateNameError, setDuplicateNameError ] = useState(false);
    const [ invalidNameError, setInvalidNameError ] = useState(false);

    const handleSubmit = (e) => {
        API.createCollection({
            parent: props.parent,
            name: formValues.name,
            color: (color === '' ? null : color)
        }, props.token).then( (response) => {
            props.closeModal(false)
            props.onSubmit()
        }).catch( (err) => {
            if (err.response) {
                if (err.response.data.message === 'Duplicate collection') {
                    setDuplicateNameError(true)
                } else if (err.response.data.message === 'Name reserved') {
                    setInvalidNameError(true)
                }
            }
            console.log(err)
        })
    }

    const handleInput = (e) => {
        setDuplicateNameError(false)
        setInvalidNameError(false)
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const pathTextSize = '14pt'

    const ColorSelect = (args) => {
        return (
            <Stack 
                onClick={ () => setColor( args.color )}
                style={{ cursor: 'pointer' }}
                anchor='center'
            >
                <Radial 
                    size='34px' 
                    color={ color === args.color ? color : 'rgba(0,0,0,0)'} 
                />
                <StatusGoodSmall
                    className='color-button'
                    size='30px'
                    color={args.color}
                />
            </Stack> )
    }

    const ErrorMsg = (props) => {
        if (props.toggler) {
            return <Text size='11pt' color='red'>{props.message}</Text>
        } else {
            return null
        }
    }

    return (
        <Box 
            width='large'
            pad='small'
        >
            <Box 
                align='center' 
                margin={{ bottom: '10px' }} 
                gap='small' 
                direction='row'
            >
                <Folder size='40px' />
                <Box>
                    <Heading margin='0' level={3}>
                        Add a new collection in: 
                    </Heading>
                    <Heading margin='0' style={{ padding: '0px'}} level={3}> 
                        { props.path.map( e =>  <Text key={e._id} size={pathTextSize}>
                                                    {e.name === '_root' ? '/root' : e.name}/
                                                </Text> )}
                    </Heading>
                </Box>
            </Box>

            <Form onSubmit={handleSubmit} value={formValues}>
                <FormField name='name' htmlFor='name' label='Collection Name' required>
                    <TextInput 
                        name='name' 
                        onChange={handleInput} 
                        value={formValues.name}
                        placeholder='Enter a name for your collection'
                    />
                </FormField>
                <ErrorMsg 
                    toggler={duplicateNameError}
                    message="A collection with that name already exists here."
                />
                <ErrorMsg 
                    toggler={invalidNameError}
                    message="Sorry, that collection name is reserved." 
                />
                
                <Box margin={{ left: '12px', bottom: '30px' }} direction='row' gap='small'>

                    <Text size='18px'>Color: </Text>
                    <Box 
                        direction='row'
                        gap='small'
                    >
                        { colors.map( e => <ColorSelect key={e} color={e} /> ) }
                        <Stack
                            onClick={() => setColor('')}
                            anchor='center'
                            style={{ cursor: 'pointer' }}
                        >
                            <Radial size='32px' color='rgba(0,0,0,0)' />
                            <Clear size='21px' />
                        </Stack>
                        
                    </Box>

                </Box>
                <Box justify='center' direction='row' gap='medium'>
                    <MyButton
                        background='#69DB58'
                        borderColor='gray'
                        disabled={formValues.name === ''}
                        type='submit'
                        label='Submit' 
                    />
                    <MyButton
                        background='#69DB58'
                        borderColor='gray'
                        label='Cancel'
                        onClick={() => props.closeModal(false)} 
                    />
                </Box>
            </Form>
        </Box>
    )
}
