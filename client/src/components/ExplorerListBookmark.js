import React from 'react';

import { Box, Text } from 'grommet';
import { Bookmark } from 'grommet-icons';

export default function ExplorerListBookmark(props) {
    return (
        <Box align='center' pad={{ vertical: 'xsmall' }} direction='row'>
            <Box pad={{ horizontal: 'small' }}>
                <Bookmark />
            </Box>
            <Text size='16px' truncate={true}>{props.name}</Text>
        </Box>
    )
}
