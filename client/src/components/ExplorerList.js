import React from 'react'

import UserContext from './UserContext';

import ExplorerListCollection from './ExplorerListCollection';
import ExplorerListBookmark from './ExplorerListBookmark';

export default function ExplorerList(props) {
    return (
        <UserContext.Consumer>
            { 
            (data) => {
                return props.collections.map( e => 
                                                <ExplorerListCollection
                                                    token={data.token} 
                                                    color={e.color} 
                                                    key={e._id}
                                                    id={e._id} 
                                                    name={e.name} /> 
                                            )
            }
            }
        </UserContext.Consumer>
    )
}
