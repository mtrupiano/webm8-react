import React from 'react'
import { Text } from 'grommet'

export default function ErrorMsg(props) {
    if (props.toggler) {
        return <Text size='11pt' color='red'>{props.message}</Text>
    } else {
        return null
    }
}
