import React from 'react';

import { Box, Header, ResponsiveContext, Anchor } from 'grommet';
import { Folder } from 'grommet-icons';

export default function NavBar() {
    return (
        <Header elevation='medium' pad='small' background='green'>
            <Anchor color='white' label='webm8' href='#' icon={<Folder />}/>
        </Header>
    )
}
