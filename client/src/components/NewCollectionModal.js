import { React, useState } from 'react'

import { Form, FormField, TextInput, Button, Box } from 'grommet';

import API from '../utils/API';

export default function NewCollectionModal(props) {

    const [formValues, setFormValues] = useState({
        name: '',
        url: '',
        tags: [],
        color: ''
    });

    const handleSubmit = (e) => {
        API.createBookmark({
            parent: props.parent,
            name: formValues.name,
            url: formValues.url,
            tags: formValues.tags,
            color: formValues.color
        }, props.token).then( (response) => {
            console.log(response);
            props.closeModal(false);
        }).catch( (err) => {
            console.log(err);
        })
    }

    const handleInput = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    return (
        <Box pad='xsmall'>
        <Form onSubmit={handleSubmit} value={formValues}>
            <FormField name='name' htmlFor='name' label='Bookmark Name' required>
                <TextInput 
                    name='name' 
                    onChange={handleInput} 
                    value={formValues.name}
                    placeholder='Enter a name for your bookmark' />
            </FormField>
            <FormField name='url' htmlFor='url' label='URL' required>
                <TextInput 
                    name='url' 
                    onChange={handleInput} 
                    value={formValues.url}
                    placeholder='Enter the bookmark URL' />
            </FormField>
            <Button type='submit' label='Submit' />
        </Form>
        </Box>
    )
}
