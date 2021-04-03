import React from 'react';

import { Box, Stack, Grommet } from 'grommet'
import { Add, Folder } from 'grommet-icons'

export default function AddCollectionButton(props) {
    const theme = {
        stack: {
            extend: ' padding: 10px 10px 0 5px '
        }
    }
    return (
        <Box onClick={ props.onClick }>
            <Grommet theme={theme}>
            <Stack
                anchor='bottom-left'
            >
                <Folder />
                <Box pad='1px' margin={{ bottom: '3px' }} background='rgb(81,86,86)' round='50%'>
                    <Add color='white' size='12px' />
                </Box>
            </Stack>
            </Grommet>
        </Box>
    )
}
