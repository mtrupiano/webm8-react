import React, { useState } from 'react';

import { Header, Anchor, DropButton, Box, Grommet, Button } from 'grommet';
import { Bookmark } from 'grommet-icons';
import SignInForm from './SignInForm';

export default function NavBar(props) {

    const theme = {
        global: {
            drop: {
                border: {
                    radius: '10px'
                }
            }
        },
        button: {
            primary: {
                background: {
                    color: 'gray'
                }
            }
        }
    }

    return (
        <Header 
            height='74px' 
            elevation='medium' 
            pad='medium' 
            background='#69DB58'
            direction='row'
        >
            <Anchor 
                size='large' 
                color='white' 
                label='webm8' 
                href='/' 
                icon={<Bookmark size='40px' />}
            />
            <Box gap='small' direction='row'>
                <DropButton primary
                    label='Sign In' 
                    open={props.showSignInForm}
                    onOpen={ () => props.setShowSignInForm(true) }
                    onClose={ () => props.setShowSignInForm(false) }
                    dropProps={{ 
                        align: { top: 'bottom' }, 
                        margin: { right: 'xxlarge' },
                        pad: '10px'
                    }}
                    dropContent={ <SignInForm 
                                    onSignUpClick={props.onSignUpClick}
                                    handleSignIn={props.handleSignIn} 
                                    setSignInForm={props.setShowSignInForm} 
                                  /> }
                />
                <Button onClick={props.onSignUpClick} label='Sign Up' />
            </Box>
        </Header>
    )
}
