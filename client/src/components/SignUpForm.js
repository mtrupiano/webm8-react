import React, { useState } from 'react'
import { Form, FormField, TextInput, Button } from 'grommet'

export default function SignUpForm() {
    const [ formValues, setFormValues ] = useState({
        username: '',
        name: '',
        email: '',
        password: ''
    })

    const handleInput = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value })
    }
    
    return (
        <Form values={formValues}>
            <FormField
                name='username'
                label=''
                htmlFor='username'
                required
            >
                <TextInput
                    id='username'
                    name='username'
                    placeholder='Enter a username...'
                    onChange={handleInput}
                    value={formValues.username}
                />
            </FormField>
            <FormField
                name='name'
                label=''
                htmlFor='name'
                required
            >
                <TextInput
                    id='name'
                    name='name'
                    placeholder='Enter your name...'
                    onChange={handleInput}
                    value={formValues.username}
                />
            </FormField>
            <FormField
                name='email'
                label=''
                htmlFor='email'
                required
            >
                <TextInput
                    id='email'
                    name='email'
                    placeholder='Enter your email address...'
                    onChange={handleInput}
                    value={formValues.username}
                />
            </FormField>
            <FormField
                name='password'
                label=''
                htmlFor='password'
                required
            >
                <TextInput
                    id='password'
                    name='password'
                    placeholder='Enter your password...'
                    onChange={handleInput}
                    value={formValues.username}
                />
            </FormField>
        </Form>
    )
}
