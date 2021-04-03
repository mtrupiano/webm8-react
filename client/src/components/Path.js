import React from 'react';
import { Anchor, Box, Text, Grommet } from 'grommet';

export default function Path(props) {
    const theme = {
        anchor: {
            fontWeight: undefined,
            color: 'black'
        },
        text: {
            medium: { 
                size: '10pt',
                height: '14px'
            }
        }
    }
    return (
        <Grommet theme={theme}>
        <Box pad={{ top: '3px'}} direction='row'>
            <Text size='medium'>/</Text>
            <Anchor 
                size='medium' 
                onClick={ () => props.setSelectedCollection(props.root)}
            >
                root
            </Anchor>
            <Text size='medium'>/</Text>

            { props.path.map( e => {
                return <Box direction='row'>
                            <Anchor 
                                size='medium'
                                key={e._id} 
                                onClick={ () => props.setSelectedCollection(e._id)}
                            >
                                {e.name}
                            </Anchor>
                            <Text size='medium'>/</Text>
                        </Box>
            })}
        </Box>
        </Grommet>
    )
}
