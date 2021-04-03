import React from 'react'

import UserContext from './UserContext';

import ExplorerListCollection from './ExplorerListCollection';
import ExplorerListBookmark from './ExplorerListBookmark';

export default function ExplorerList(props) {
    return (
        <UserContext.Consumer>
            {  (data) => {
                return [ ...(props.collections.map( e => 
                                                <ExplorerListCollection
                                                    setActiveCollection={props.setActiveCollection}
                                                    token={data.user.token} 
                                                    color={e.color} 
                                                    key={e._id}
                                                    id={e._id} 
                                                    name={e.name} /> 
                                            )
                        ), ...props.bookmarks.map( e => 
                                                <ExplorerListBookmark 
                                                    token={data.user.token}
                                                    bookmark={e}
                                                    selectBookmark={data.selectBookmark}
                                                    selectedBookmark={data.selectedBookmark} />
                        )]
            }
            }
        </UserContext.Consumer>
    )
}
