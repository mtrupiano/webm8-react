import { React, useState } from 'react'

import { Form, FormField, TextInput, Button, Box, Heading, Text, RadioButtonGroup, Stack, RadioButton } from 'grommet';

import API from '../utils/API';
import { Clear, Folder, Radial, StatusGoodSmall } from 'grommet-icons';

export default function NewCollectionModal(props) {

    const [formValues, setFormValues] = useState({
        name: ''
    });

    const [ color, setColor ] = useState('')

    const colors = [ 'red', 'blue' ]

    const handleSubmit = (e) => {
        API.createCollection({
            parent: props.parent,
            name: formValues.name,
            color: color
        }, props.token).then( (response) => {
            console.log(response);
            props.closeModal(false);
            props.onSubmit();
        }).catch( (err) => {
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
                onClick={ () => setColor( args.color )}
                anchor='center'
            >
                <Radial 
                    size='26px' 
                    color={ color === args.color ? color : 'rgba(0,0,0,0)'} 
                />
                <Box width='18px' height='18px' round='50%' background={args.color} />
                {/* <StatusGoodSmall
                    className='color-button'
                    size='21px'
                    color={args.color}
                /> */}
            </Stack> )
    }

    return (
        <Box 
            width='large'
            pad='small'
        >
            <Box margin={{ vertical: '10px' }} gap='small' direction='row'>

                <Folder size='40px' />

                <Heading margin='0' level={3}>
                    Add a new collection in: 

                    <Text size={pathTextSize}> /root/</Text>
                    { props.path.map( e => <Text key={e.name} size={pathTextSize}>{e.name}/</Text> )}
                </Heading>
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
                
                <Box margin={{ bottom: '30px' }} direction='row' gap='small'>

                    <Text size='18px'>Color: </Text>
                    <Box 
                        direction='row'
                        gap='small'
                    >
                        { colors.map( e => <ColorSelect key={e} color={e} /> ) }
                        <Stack
                            onClick={() => setColor('')}
                            anchor='center'
                        >
                            <Radial size='26px' color='rgba(0,0,0,0)' />
                            <Clear size='21px' />
                        </Stack>
                        
                    </Box>

                </Box>

                <Button 
                    disabled={ formValues.name === '' }
                    type='submit' 
                    label='Submit' 
                />
            </Form>
        </Box>
    )
}
