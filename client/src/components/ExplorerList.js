import React from 'react'

import ExplorerListCollection from './ExplorerListCollection';
import ExplorerListBookmark from './ExplorerListBookmark';

export default function ExplorerList(props) {
    return (
        <>
            {props.collections.map(e => <ExplorerListCollection color={e.color} key={e._id} name={e.name} />)}
        </>
    )
}
