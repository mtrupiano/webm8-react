import React, { useRef, useState } from 'react';
import { Anchor, Box, Text, Grommet, Drop } from 'grommet';

export default function Path(props) {
    const theme = {
        global: {
            font: {
                family: 'Overpass'
            },
            colors: {
                focus: undefined
            },
            drop: {
                extend: ` border: solid 2px green; border-radius: 10px`
            }
        },
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

    const pathRef = useRef()
    const [ pathDrop, setPathDrop ] = useState(false)

    return (
        <Grommet theme={theme}>
        <Box pad={{ top: '3px'}} direction='row'>

            <Text size='medium'>/ </Text>
            { props.path.length > 2 ? 
                <>
                <Anchor
                    ref={pathRef} 
                    size='medium'
                    onMouseDown={ () => setPathDrop(!pathDrop) }
                >
                    ...
                </Anchor>
                <Text margin={{ left: '1px' }} size='medium'>/</Text>
                { props.path.slice(props.path.length - 2, props.path.length).map(
                    e => {
                        return ( 
                            <Box key={e._id} direction='row'>
                                <Anchor
                                    size='medium'
                                    key={e._id}
                                    onClick={() => props.setSelectedCollection(e._id)}
                                    style={{ 
                                        maxWidth: '80px', 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        wordWrap: 'break-word'
                                    }}
                                >
                                    {e.name === '_root' ? 'root' : e.name}
                                </Anchor>
                                <Text size='medium'>/</Text>
                            </Box>
                        )
                    }
                ) }
                { pathDrop && 
                    <Drop
                        align={{ top: 'bottom' }}
                        target={pathRef.current}
                        onClickOutside={ () => setPathDrop(false) }
                        onEsc={ () => setPathDrop(false) }
                    >
                        <Box pad={{ horizontal: 'small', vertical: 'xsmall' }} round='2px'>
                            { props.path.slice(0, props.path.length - 2).map( e => {
                                    return (
                                        <Anchor 
                                            size='medium'
                                            onClick={() => props.setSelectedCollection(e._id)}
                                        >
                                            &gt; {e.name === '_root' ? 'root' : e.name}
                                        </Anchor>
                                    )
                                }) }
                        </Box>
                    </Drop> }
                </>
                :
                props.path.map(e => {
                    return <Box key={e._id} direction='row'>
                        <Anchor
                            size='medium'
                            key={e._id}
                            onClick={() => props.setSelectedCollection(e._id)}
                            style={{
                                maxWidth: '120px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                wordWrap: 'break-word'
                            }}
                        >
                            {e.name === '_root' ? 'root' : e.name}
                        </Anchor>
                        <Text size='medium'>/</Text>
                    </Box>
            }) }
        </Box>
        </Grommet>
    )
}
