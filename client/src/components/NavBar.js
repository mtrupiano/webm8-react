import React, { useState } from 'react';

import { Header, Anchor, DropButton, Box, Grommet, Button } from 'grommet';
import { Bookmark } from 'grommet-icons';
import SignInForm from './SignInForm';

export default function NavBar(props) {

    const theme = {
        global: {
            colors: {
                focus: undefined
            },
            font: {
                size: '11pt',
                family: 'Overpass'
            },
            drop: {
                border: {
                    radius: '10px'
                }
            }
        },
        button: {
            color: 'black',
            border: {
                radius: '5px',
                color: 'gray'
            }
        }
    }

    return (
        <Grommet theme={theme}>
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
                <DropButton 
                    style={{ fontSize: '12pt', background: '#69DB58' }}
                    primary
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
                <Button 
                    style={{ fontSize: '12pt', background: '#69DB58' }}
                    onClick={props.onSignUpClick} 
                    label='Sign Up' />
            </Box>
        </Header>
        </Grommet>
    )
}
