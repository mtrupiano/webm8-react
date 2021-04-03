import React from 'react'
import { Box, Heading, Text } from 'grommet'
import { Bookmark } from 'grommet-icons'
import NavBar from '../components/NavBar'

export default function Greeting() {
    return (
        <Box fill>
            <NavBar />
            <Heading>
                Welcome to webM8!
            </Heading>
            <Text>
                webM8 is your tool for bookmarking the web. Save bookmarks, organize them into collections and contexts, and personalize them with colors and tags
            </Text>

            <Box direction='row'>
                <Box 
                    round='50%'
                    background='rgba(200,200,200,0.6)'
                >
                    <Bookmark color='black' stroke='black' size='36px' />
                </Box>
                <Box>
                    <Heading level={5}>
                        Bookmarks
                    </Heading>
                </Box>
            </Box>


            
        </Box>
    )
}
