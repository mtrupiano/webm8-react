import React, { useState } from 'react'
import { Form, FormField, TextInput, Button, Box, Grommet, Heading, Anchor, Text } from 'grommet'

export default function SignInForm(props) {
    const [ formValues, setFormValues ] = useState({
        username: '',
        password: ''
    })

    const [ userNotFoundErr, setUserNotFoundErr ] = useState(false)

    const handleInput = (event) => {
        setFormValues({ ...formValues, [ event.target.name ]: event.target.value })
    }

    const handleSignIn = async () => {
        if (formValues.username === '' || formValues.password === '') 
            return;
        const signIn = await props.handleSignIn(formValues.username, formValues.password)

        if ( signIn && signIn.message === "User not found") {
            setUserNotFoundErr(true)
        }
    }

    const goToSignUp = () => {
        props.setSignInForm(false)
        props.onSignUpClick()
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
            round: '3px'
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

            <Box pad={{ top: 'xsmall', horizontal: 'small', bottom: 'small' }}>

                <Heading margin={{ bottom: '8px', top: '0px' }} level={4}>
                    Sign In or <Anchor onClick={goToSignUp}>Sign Up</Anchor>
                </Heading>

                <Form validate="submit" value={formValues}>

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
                            onChange={ handleInput }
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
                            placeholder='Password'
                            onChange={ handleInput }
                            value={formValues.password}
                        />
                    </FormField>
                    <ErrorMsg message="User not found." toggler={userNotFoundErr} />

                    <Box gap='small' justify='center' direction='row'>
                        <Button 
                            style={{ fontSize: '12pt', background: '#69DB58' }}
                            type='submit' 
                            label='Sign In' 
                            onClick={handleSignIn}
                        />
                        <Button
                            style={{ fontSize: '12pt', background: '#69DB58' }}
                            type='button' 
                            label='Cancel' 
                            onClick={ () => props.setSignInForm(false) } 
                        />
                    </Box>
                    
                </Form>
            </Box>
        </Grommet>
    )
}
