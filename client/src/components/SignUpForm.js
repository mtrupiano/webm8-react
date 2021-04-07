 import React, { useState } from 'react'
import { Form, FormField, TextInput, Button, Text, Grommet, Heading, Box, Anchor } from 'grommet'

import API from '../utils/API'

export default function SignUpForm(props) {
    const [ formValues, setFormValues ] = useState({
        username: '',
        name: '',
        email: '',
        password: ''
    })

    const [ formValidation, setFormValidation ] = useState({
        usernameTooLongError: false,
        duplicateUserNameError: false,
        passwordTooShortError: false,
        nameEmptyError: false,
        emailInvalidError: false
    })

    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const handleInput = (event) => {
        if (event.target.name === 'username') {
            setFormValidation({ ...formValidation, duplicateUserNameError: false })
        }
        // Check if username is at least 3 and fewer than 21 characters
        if (event.target.name === 'username' &&
            event.target.value.length >= 3 &&
            event.target.value.length <= 20) {
            setFormValidation({ ...formValidation, usernameTooLongError: false })
        }
        // Check if password is a least 8 characters
        else if (event.target.name === 'password' && event.target.value.length >= 8) {
            setFormValidation({ ...formValidation, passwordTooShortError: false })
        }
        // Check if name is empty
        else if (event.target.name === 'name' && event.target.value.length > 0) {
            setFormValidation({ ...formValidation, nameEmptyError: false })
        }

        // Check if email field is non-empty and in the form of an email address
        else if (event.target.name === 'email' 
            && event.target.value.length > 0 
            && re.test(event.target.value)) {
            setFormValidation({ ...formValidation, emailInvalidError: false })
        }

        setFormValues({ ...formValues, [event.target.name]: event.target.value })
    }

    const validate = () => {
        let valid = true;
        let usernameLength, passwordLength, nameEmpty, invalidEmail; 
        if (formValues.username.length < 3 || formValues.username.length > 20) {
            usernameLength = true
            valid = false
        }
        
        if (formValues.password.length < 8) {
            passwordLength = true
            valid = false
        }
        
        if (formValues.name.length < 1) {
            nameEmpty = true
            valid = false
        }

        if (formValues.email.length < 1) {
            invalidEmail = true
            valid = false
        }

        if (!re.test(formValues.email)) {
            invalidEmail = true
            valid = false
        }

        setFormValidation({ 
            ...formValidation,
            passwordTooShortError: passwordLength,
            usernameTooLongError: usernameLength,
            nameEmptyError: nameEmpty,
            emailInvalidError: invalidEmail
        })

        return valid
    }

    const handleSignUp = () => {
        if (validate()) {
            API.signup(formValues).then( response => {
                console.log(response.data)
                setFormValues({
                    username: '',
                    name: '',
                    email: '',
                    password: ''
                })
                props.onSuccessfulSignUp();
            }).catch( err => {
                if (err.response && err.response.data.code === 11000) {
                    console.log("ERR: Duplicate username!")
                    setFormValidation({ ...formValidation, duplicateUserNameError: true })
                }
            })
        }
    }

    const theme = {
        global: {
            colors: {
                focus: undefined
            },
            font: {
                size: '11pt'
            }
        },
        formField: {
            pad: '0px',
            border: {
                side: 'all',
                size: '1px'
            },
            round: '3px',
            label: {
                size: 'small'
            },
        },
        button: {
            color: 'text',
            border: {
                radius: '5px',
                color: 'gray'
            }
        },
        textInput: {
            extend: ' padding: 5px 3px 3px 3px '
        }
    }

    const ErrorMsg = (props) => {
        if (props.toggler) {
            return <Text size='11pt' color='red'>{props.message}</Text>
        } else {
            return null
        }
    }
    
    return (
        <Grommet theme={theme}>
        <Box round='large' pad={{ top: 'xsmall', horizontal: 'small', bottom: 'small' }}>
            <Heading 
                margin={{ bottom: '0px'}} 
                level={3}
            >
                Create a free account to get started using webM8.
            </Heading>
            <Heading 
                margin={{ top: '5px', bottom: '5px' }} 
                level={5}
            >
                Already have an account? <Anchor onClick={props.goToSignIn}>Sign in here.</Anchor>
            </Heading>

            <Form values={formValues}>
                <FormField
                    name='username'
                    label='Username'
                    htmlFor='username'
                >
                    <TextInput
                        id='username'
                        name='username'
                        placeholder='Enter a username...'
                        onChange={handleInput}
                        value={formValues.username}
                    />

                </FormField>
                <ErrorMsg 
                    toggler={formValidation.duplicateUserNameError} 
                    message="Username is already taken" />
                <ErrorMsg 
                    toggler={formValidation.usernameTooLongError} 
                    message="Usernames must be between 3 and 20 characters long" />

                <FormField
                    name='name'
                    label='Name'
                    htmlFor='name'
                >
                    <TextInput
                        id='name'
                        name='name'
                        placeholder='Enter your name...'
                        onChange={handleInput}
                        value={formValues.name}
                    />
                </FormField>
                <ErrorMsg 
                    toggler={formValidation.nameEmptyError}
                    message="Please enter a name." />

                <FormField
                    name='email'
                    label='E-mail'
                    htmlFor='email'
                >
                    <TextInput
                        id='email'
                        name='email'
                        placeholder='Enter your email address...'
                        onChange={handleInput}
                        value={formValues.email}
                    />
                </FormField>
                <ErrorMsg
                    toggler={formValidation.emailInvalidError}
                    message="Please enter a valid e-mail address" />

                <FormField
                    name='password'
                    label='Password'
                    htmlFor='password'
                >
                    <TextInput
                        // type='password'
                        id='password'
                        name='password'
                        placeholder='Enter a password...'
                        onChange={handleInput}
                        value={formValues.password}
                    />
                </FormField>
                <ErrorMsg 
                    toggler={formValidation.passwordTooShortError} 
                    message="Password must be at least 8 characters long." />

                <Box gap='small' justify='center' direction='row'>
                    <Button 
                        style={{ fontSize: '12pt', background: '#69DB58' }}
                        onClick={handleSignUp} 
                        type='submit' 
                        label='Sign Up' 
                    />
                    <Button 
                        style={{ fontSize: '12pt', background: '#69DB58' }}
                        onClick={props.closeForm} 
                        label='Cancel' 
                    />
                </Box>
            </Form>
        </Box>
        </Grommet>
    )
}
