import { React, useState, useEffect } from 'react'

import { Grommet, Box, DropButton, Tip, Text } from 'grommet';
import { StatusGoodSmall, Clear } from 'grommet-icons';

export default function ExplorerListColorDropdown(props) {
    const [colorDropOpen, setColorDropOpen] = useState(false);
    const [grayOnHover, setGrayOnHover] = useState('white');
    const [ hovering, setHovering ] = useState('')

    const handleColorSelect = (event) => {
        setColorDropOpen(false);
        props.handleColorSelect(event);
    };

    const theme = {
        global: {
            colors: {
                focus: undefined
            },
            drop: {
                extend: ` border-radius: 10px`
            },
            extend: ` justify-content: middle `
        },
        formField: {
            focus: {
                background: {
                    color: 'white'
                }
            },
            border: undefined
        },
    }

    const handleDropOpen = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setColorDropOpen(true)
    }

    const ColorIcon = (args) => {
        return (
            <Box 
                background={hovering === args.color ? args.color : undefined}
                onMouseEnter={() => setHovering(args.color)} 
                onMouseLeave={ () => setHovering('') }
                round='50%'
                name={args.color} 
                onMouseDown={handleColorSelect}
            >
                <StatusGoodSmall 
                    style={{ cursor: 'pointer' }} 
                    id={args.color} 
                    name={args.color} color={args.color} />
            </Box> )
    }

    const colors = [ 'red', 'green', 'blue', 'orange', 'purple', 'pink' ]

    return (
        <>
        { props.color === null ?
            <Grommet theme={theme}>
            <Tip
                content={ <Text size='16px'>Add a color!</Text> } 
                dropProps={{ margin: {left: '37px'}, align: { left: 'right' } }}
            >
                <DropButton 
                    margin={{ top: '8px' }}
                    open={colorDropOpen} 
                    dropAlign={{ top: 'bottom' }}
                    onOpen={handleDropOpen}
                    onClose={() => setColorDropOpen(false)}
                    dropContent={
                        <Box round='large' gap='xsmall' pad='xsmall'>
                            <Box name={null} onMouseDown={handleColorSelect}>
                                <Clear 
                                    style={{ cursor: 'pointer' }} 
                                    name={null} 
                                    color='rgba(0,0,0,0.2)' />
                            </Box>
                            { colors.map( e => <ColorIcon color={e} /> ) }
                        </Box>
                    }
                >
                    <Box
                        onMouseOver={  () => { setGrayOnHover('rgba(0,0,0,0.05)') } } 
                        onMouseLeave={ () => { setGrayOnHover('white') } }
                    >
                        <StatusGoodSmall color={grayOnHover} />
                    </Box>
                </DropButton>
            </Tip>
            </Grommet>

            :
            
            <Grommet theme={theme}>
                <DropButton 
                    margin={{ top: '8px' }}
                    open={colorDropOpen} 
                    dropAlign={{ top: 'bottom' }}
                    onOpen={handleDropOpen}
                    onClose={() => setColorDropOpen(false)}
                    dropContent={
                        <Box round='large' gap='xsmall' pad='xsmall'>
                            <Box name={null} onMouseDown={handleColorSelect}>
                                <Clear 
                                    style={{ cursor: 'pointer' }}  
                                    name={null} 
                                    color='rgba(0,0,0,0.2)' />
                            </Box>
                            { colors.map(e => <ColorIcon color={e} />) }
                        </Box>
                    }
                >
                    <Box>
                        <StatusGoodSmall color={props.color} />
                    </Box>
                </DropButton>
            </Grommet>
        }
        </>
    )
}
