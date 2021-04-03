import { Box, Button, Text } from 'grommet'
import React from 'react'

export default function NothingHereDisplay(props) {
    return (
        <Box
            height='100%'
            margin='small'
            background='rgba(196,196,196,0.5)'
            round='small'
            justify='center'
            align='center'
            style={{
                boxShadow: 'inset 0 0 5px rgba(0,0,0,0.7)'
            }}
        >
            <Text margin={{ bottom: 'large' }} color='gray'>Nothing here!!</Text>
            <Button 
                onClick={props.newCollection}
                label='Add a new collection'
            />
            <Button 
                color='gray'
                onClick={props.newBookmark}
                label='Add a new bookmark'
            />
        </Box>
    )
}
