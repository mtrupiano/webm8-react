import React from 'react'
import { Button, Grommet } from 'grommet'

export default function MyButton(props) {
    const theme = {
        global: {
            colors: {
                focus: undefined
            },
            font: {
                size: '11pt'
            }
        },
        button: {
            color: 'text',
            border: {
                radius: '5px',
                color: props.borderColor
            },
            extend: 'width: 100px'
        }
    }

    return (
        <Grommet theme={theme}>
            <Button style={{ background: props.background }} {...props} />
        </Grommet>
    )
}
