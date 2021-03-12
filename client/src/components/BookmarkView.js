import { React, useState } from 'react';

import { Grid, Box, TextInput, Heading } from 'grommet';
import { Bookmark } from 'grommet-icons';

export default function BookmarkView(props) {
    return (
        <Grid 
            rows={['auto', 'flex']}
            columns={['auto', 'flex']}
            gap="small"
            areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'nav', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] },
            ]} >

        <Box gridArea='header'>
            {props.selectedBookmark.name}
        </Box>
        <Box gridArea='main'>
            {props.selectedBookmark.url}
        </Box>
        </Grid>
    )
}
