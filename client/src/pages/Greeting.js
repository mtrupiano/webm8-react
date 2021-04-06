import React, { useState } from 'react'
import { Anchor, Box, Heading, Layer, Text } from 'grommet'
import { Bookmark, Folder } from 'grommet-icons'
import NavBar from '../components/NavBar'
import SignUpForm from '../components/SignUpForm';

export default function Greeting(props) {

    const [ showSignUpModal, setShowSignUpModal ] = useState(false)
    const [ showSignUpSuccessModal, setShowSignUpSuccessModal ] = useState(false)
    const [ showSignInModal, setShowSignInForm ] = useState(false)

    const Separator = (props) => {
        return <Box
                    alignSelf={props.align}
                    round='small'
                    height='2px'
                    width='70%'
                    background='green' />
    }

    const closeSignUpForm = () => {
        setShowSignUpModal(false);
    }

    const successfulSignUp = () => {
        closeSignUpForm()
        setShowSignUpSuccessModal(true)
    }

    const goToSignIn = () => {
        setShowSignUpSuccessModal(false)
        setShowSignUpModal(false)
        setShowSignInForm(true)
    }

    return (
        <Box 
            background='rgb(245, 245, 245)' 
            fill
        >
            <NavBar 
                setShowSignInForm={setShowSignInForm} 
                showSignInForm={showSignInModal} 
                handleSignIn={props.handleSignIn} 
                onSignUpClick={ () => setShowSignUpModal(true) }
            />
            <Box 
                pad='medium'
                height={{ min: 'calc(100vh - 74px)', max: '732px' }}
            >
                <Heading margin={{ top: 'medium' }}>
                    Welcome to webM8!
                </Heading>
                <Text>
                    webM8 is your tool for bookmarking the web. Save bookmarks, organize them into collections and contexts, and personalize them with colors and tags.
                </Text>

                <Box
                    alignSelf='center'
                    width='60%'
                    gap='medium'
                    align='center'
                    margin={{ top: '10px' }}
                >
                    <Box 
                        fill
                        pad='small'
                        direction='row'
                    >
                        <Box    
                            justify='center'
                            align='center'
                            width={{ min: '80px' }}
                            height='80px'
                            round='50%'
                            background='rgba(200,200,200,0.6)'
                            margin={{ right: '10px' }}
                        >
                            <Bookmark color='rgb(86, 97, 89)' size='36px' />
                        </Box>
                        <Box justify='center'>
                            <Heading margin={{ bottom: '5px', top: '0px' }} level={3}>
                                Bookmarks
                            </Heading>
                            <Text size='12pt'>
                                Save single pages with their URL. Add a note and give the link a color!
                            </Text>
                        </Box>
                    </Box>

                    <Separator align='start' />

                    <Box 
                        pad='small'
                        justify='end' 
                        direction='row'
                        fill
                    >
                        <Box justify='center'>
                            <Heading 
                                alignSelf='end' 
                                margin={{ bottom: '5px', top: '0px' }} 
                                level={3}
                            >
                                Collections
                            </Heading>
                            <Text size='12pt'>
                                Organize your bookmarks using a nested folder structure.
                            </Text>
                        </Box>
                        <Box    
                            justify='center'
                            align='center'
                            width={{ min: '80px' }}
                            height='80px'
                            round='50%'
                            background='rgba(200,200,200,0.6)'
                            margin={{ left: '10px' }}
                        >
                            <Folder color='rgb(86, 97, 89)' size='36px' />
                        </Box>
                    </Box>

                    <Separator align='end' />

                    <Box    
                        fill
                        pad='small'
                        direction='row'
                    >
                        <Box
                            justify='center'
                            align='center'
                            width={{ min: '80px' }}
                            height='80px'
                            round='50%'
                            background='rgba(200,200,200,0.6)'
                            margin={{ right: '10px' }}
                        >
                            <Bookmark color='rgb(86, 97, 89)' size='36px' />
                        </Box>
                        <Box justify='center'>
                            <Heading margin={{ bottom: '5px', top: '0px' }} level={3}>
                                Contexts
                            </Heading>
                            <Text size='12pt'>
                                Group bookmarks together into a <span style={{ fontWeight: 'bold' }}>context</span>. Opening a context will open every attached URL at once!
                            </Text>
                        </Box>
                    </Box>

                    <Separator align='start' />

                    <Anchor 
                        onClick={ () => setShowSignUpModal(true) } 
                        color='green'
                        size='xlarge'
                    >
                        Get Started!
                    </Anchor>

                </Box>

            </Box>
            
            { showSignUpModal &&
                <Layer 
                    modal
                    onClickOutside={ closeSignUpForm }
                    onEsc={closeSignUpForm}
                >
                    <SignUpForm 
                        onSuccessfulSignUp={successfulSignUp} 
                        closeForm={closeSignUpForm} 
                        goToSignIn={goToSignIn}
                    />
                </Layer> }

            { showSignUpSuccessModal && 
                <Layer
                    modal
                    onClickOutside={closeSignUpForm}
                    onEsc={closeSignUpForm}
                >
                    <Box pad='medium'>
                        <Heading margin={{ vertical: '0px', bottom: '5px' }} level={3}>
                            Your account was successfully created!
                        </Heading>
                        <Text>
                            <Anchor onClick={goToSignIn}>Sign in</Anchor> to
                                your new account to be taken to your home page and start collecting bookmarks!
                        </Text>
                    </Box>
                </Layer> }
        </Box>
    )
}
