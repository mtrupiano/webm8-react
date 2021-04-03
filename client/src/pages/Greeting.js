import React from 'react'
import { Anchor, Box, Heading, Text } from 'grommet'
import { Bookmark, BottomCorner, Folder } from 'grommet-icons'
import NavBar from '../components/NavBar'

export default function Greeting() {
    return (
        <Box background='rgb(245, 245, 245)' fill>
            <NavBar />
            <Box pad='medium'>
            <Heading margin={{ top: 'medium' }}>
                Welcome to webM8!
            </Heading>
            <Text>
                webM8 is your tool for bookmarking the web. Save bookmarks, organize them into collections and contexts, and personalize them with colors and tags.
            </Text>

            <Box
                gap='medium'
                align='center'
            >
                <Box 
                    fill
                    margin={{ top: '10px' }}  
                    pad='small'
                    direction='row'
                >
                    <Box    
                        justify='center'
                        align='center'
                        width='80px'
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

                <Box 
                    margin={{ top: '10px' }} 
                    pad='small'
                    justify='end' 
                    direction='row'
                    fill
                >
                    <Box justify='center'>
                            <Heading alignSelf='end' margin={{ bottom: '5px', top: '0px' }} level={3}>
                            Collections
                        </Heading>
                        <Text size='12pt'>
                            Organize your bookmarks using a nested folder structure.
                        </Text>
                    </Box>
                    <Box    
                        justify='center'
                        align='center'
                        width='80px'
                        height='80px'
                        round='50%'
                        background='rgba(200,200,200,0.6)'
                        margin={{ left: '10px' }}
                    >
                        <Folder color='rgb(86, 97, 89)' size='36px' />
                    </Box>
                </Box>

                <Anchor onClick={() => console.log('Hello')} size='xlarge'>
                    Get Started!
                </Anchor>

            </Box>

            </Box>
            
        </Box>
    )
}
