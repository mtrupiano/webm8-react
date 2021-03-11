import { React, useState } from 'react';

import { Grommet, Form, FormField, TextInput, Button } from 'grommet';

import API from '../utils/API';

export default function Splash() {

    const [signinFormState, setSignInFormState] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        API.signin(signinFormState).then( (result) => {
            localStorage.setItem('token', result.data.accessToken);
            console.log(result);
        }).catch( (err) => {
            console.log(err);
        });

        setSignInFormState({
            username: '',
            password: ''
        });
    }

    const handleInput = (event) => {
        setSignInFormState({ ...signinFormState, [event.target.name]: event.target.value })
    }

    const theme = {
        global: {
            colors: {
                focus: undefined
            }
        },
        formField: {
            focus: {
                background: {
                    color: 'white'
                }
            },
            border: undefined
        }
    }

    return (
        <Grommet theme={theme}>
        <Form onSubmit={handleSubmit} value={signinFormState}>
            <FormField name='username' label='Username' htmlFor='username'>
                <TextInput 
                    id='username' 
                    name='username'
                    placeholder='Username' 
                    onChange={handleInput}
                    value={signinFormState.username} />
            </FormField>
            <FormField name='password' label='Password' htmlFor='password'>
                <TextInput
                    id='password'
                    name='password'
                    placeholder='Password'
                    onChange={handleInput}
                    value={signinFormState.password} />
            </FormField>
            <Button primary type='submit' label='Sign In' />
        </Form>
        </Grommet>
    )
}
