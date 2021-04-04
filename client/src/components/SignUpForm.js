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
                    placeholder='Username'
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
                    placeholder='Enter your name'
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
                    placeholder='Email'
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
                    placeholder='name'
                    onChange={handleInput}
                    value={formValues.username}
                />
            </FormField>
        </Form>
    )
}
