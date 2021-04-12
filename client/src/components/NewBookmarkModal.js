import { React, useState } from 'react'

import { Form, FormField, TextInput, Button, Box, Heading, Text, Stack, TextArea } from 'grommet';

import API from '../utils/API';
import { Clear, Bookmark, Radial, StatusGoodSmall } from 'grommet-icons';

import MyButton from './MyButton'
import ErrorMsg from './ErrorMsg'

export default function NewBookmarkModal(props) {
    const [formValues, setFormValues] = useState({
        name: '',
        url: '',
        notes: ''
    });

    const [color, setColor] = useState('')
    const colors = [ 'red', 'yellow', 'green', 'blue', 'orange', 'purple', 'pink' ]

    const [ duplicateNameError, setDuplicateNameError ] = useState(false)

    const handleSubmit = (e) => {
        API.createBookmark({
            parent: props.parent,
            name: formValues.name,
            url: formValues.url,
            notes: formValues.notes,
            color: (color === '' ? null : color)
        }, props.token).then( (response) => {
            console.log(response);
            props.closeModal(false);
            props.onSubmit();
        }).catch( (err) => {
            if (err.response) {
                if (err.response.data.message === 'Duplicate bookmark') {
                    setDuplicateNameError(true)
                }
            }
            console.log(err);
        })
    }

    const handleInput = (e) => {
        setDuplicateNameError(false)
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const pathTextSize = '14pt'

    const ColorSelect = (args) => {
        return (
            <Stack
                onClick={() => setColor(args.color)}
                anchor='center'
                style={{ cursor: 'pointer' }}
            >
                <Radial
                    size='34px'
                    color={color === args.color ? color : 'rgba(0,0,0,0)'}
                />
                <StatusGoodSmall
                    className='color-button'
                    size='30px'
                    color={args.color}
                />
            </Stack>)
    }

    return (
        <Box
            width='large'
            pad='small'
        >
            <Box 
                align='center' 
                margin={{ vertical: '10px' }} 
                gap='small' 
                direction='row'
            >
                <Bookmark size='40px' />
                <Box>
                    <Heading margin='0' level={3}>
                        Add a new bookmark in:
                    </Heading>
                    <Heading style={{ padding: '0px' }} margin='0' level={3}>
                        { props.path.map( e =>  <Text key={e._id} size={pathTextSize}>
                                                    {e.name === '_root' ? '/root' : e.name}/
                                                </Text>)}
                    </Heading>
                </Box>
            </Box>

            <Form onSubmit={handleSubmit} value={formValues}>
                <FormField name='name' htmlFor='name' label='Bookmark Name' required>
                    <TextInput
                        name='name'
                        onChange={handleInput}
                        value={formValues.name}
                        placeholder='Enter a name for your bookmark' 
                    />
                </FormField>
                <ErrorMsg 
                    toggler={duplicateNameError} 
                    message="There's already a bookmark with that name here." 
                />

                <Box direction='row' gap='small'>

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
                            <Radial size='26px' color='rgba(0,0,0,0)' />
                            <Clear size='21px' />
                        </Stack>

                    </Box>

                </Box>

                <FormField name='url' htmlFor='url' label='Bookmark URL' required>
                    <TextInput
                        name='url'
                        onChange={handleInput}
                        value={formValues.url}
                        placeholder='Enter the URL' 
                    />
                </FormField>
                <FormField name='notes' htmlFor='notes' label='Notes'>
                    <TextArea
                        name='notes'
                        onChange={handleInput}
                        value={formValues.notes}
                        placeholder="Enter any notes you'd like to save with this bookmark." 
                    />
                </FormField>

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
