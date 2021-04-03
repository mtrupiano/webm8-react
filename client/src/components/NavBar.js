import React from 'react';

import { Header, Anchor } from 'grommet';
import { Bookmark } from 'grommet-icons';

export default function NavBar() {
    return (
        <Header elevation='medium' pad='medium' background='#69DB58'>
            <Anchor size='large' color='white' label='webm8' href='/' icon={<Bookmark size='40px' />}/>
        </Header>
    )
}
