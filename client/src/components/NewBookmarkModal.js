import { React, useState } from 'react'

import { Form, FormField, TextInput, Button, Box, Heading, Text, Stack, TextArea } from 'grommet';

import API from '../utils/API';
import { Clear, Folder, Radial, StatusGoodSmall } from 'grommet-icons';

export default function NewBookmarkModal(props) {
    const [formValues, setFormValues] = useState({
        name: '',
        url: '',
        notes: ''
    });

    const [color, setColor] = useState('')

    const colors = ['red', 'blue']

    const handleSubmit = (e) => {
        API.createBookmark({
            parent: props.parent,
            name: formValues.name,
            color: color
        }, props.token).then((response) => {
            console.log(response);
            props.closeModal();
            props.onSubmit();
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleInput = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const pathTextSize = '14pt'

    const ColorSelect = (args) => {
        return (
            <Stack
                onClick={() => setColor(args.color)}
                anchor='center'
            >
                <Radial
                    size='26px'
                    color={color === args.color ? color : 'rgba(0,0,0,0)'}
                />
                <Box width='18px' height='18px' round='50%' background={args.color} />
                {/* <StatusGoodSmall
                    className='color-button'
                    size='21px'
                    color={args.color}
                /> */}
            </Stack>)
    }

    return (
        <Box
            width='large'
            pad='small'
        >
            <Box margin={{ vertical: '10px' }} gap='small' direction='row'>

                <Folder size='40px' />

                <Heading margin='0' level={3}>
                    Add a new bookmark in:

                    <Text size={pathTextSize}> /root/</Text>
                    {props.path.map(e => <Text size={pathTextSize}>{e.name}/</Text> )}
                </Heading>
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

                <Box direction='row' gap='small'>

                    <Text size='18px'>Color: </Text>
                    <Box
                        direction='row'
                        gap='small'
                    >
                        {colors.map(e => <ColorSelect color={e} />)}
                        <Stack
                            onClick={() => setColor('')}
                            anchor='center'
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
                <FormField name='notes' htmlFor='notes' label='Notes' required>
                    <TextArea
                        name='notes'
                        onChange={handleInput}
                        value={formValues.notes}
                        placeholder="Enter any notes you'd like to save with this bookmark." 
                    />
                </FormField>

                <Button
                    disabled={formValues.name === ''}
                    type='submit'
                    label='Submit'
                />
            </Form>
        </Box>
    )
}
