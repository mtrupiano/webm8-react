import React from 'react'

import { Box, Stack, Grommet } from 'grommet'
import { Add, Bookmark } from 'grommet-icons'

export default function AddBookmarkButton(props) {
    const theme = {
        stack: {
            extend: ' padding: 10px 10px 0 4px '
        }
    }
    return (
        <Box onClick={props.onClick}>
            <Grommet theme={theme}>
                <Stack
                    anchor='bottom-left'
                >
                    <Bookmark />
                    <Box pad='1px' margin={{ bottom: '3px' }} background='gray' round='50%'>
                        <Add color='white' size='12px' />
                    </Box>
                </Stack>
            </Grommet>
        </Box>
    )
}
