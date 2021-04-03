import React, { useState } from 'react';

import { Header, Anchor, DropButton, Box, Grommet } from 'grommet';
import { Bookmark } from 'grommet-icons';
import SignInForm from './SignInForm';

export default function NavBar(props) {

    const [ signInForm, setSignInForm ] = useState(false);

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
            <Box direction='row'>
                <DropButton primary
                    label='Sign In' 
                    open={signInForm}
                    onOpen={ () => setSignInForm(true) }
                    onClose={ () => setSignInForm(false) }
                    dropProps={{ 
                        align: { top: 'bottom' }, 
                        margin: { right: 'xxlarge' },
                        pad: '10px'
                    }}
                    dropContent={ <SignInForm 
                                    handleSignIn={props.handleSignIn} 
                                    setSignInForm={setSignInForm} 
                                  /> }
                />
            </Box>
        </Header>
    )
}
