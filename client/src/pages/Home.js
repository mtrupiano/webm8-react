import { React, useState, useEffect } from 'react';

import { Grommet, Box, Header, Text } from 'grommet';

import API from '../utils/API';

import ExplorerList from '../components/ExplorerList';
import ExplorerListCollection from '../components/ExplorerListCollection';
import BookmarkView from '../components/BookmarkView';

export default function Home(props) {

    const [ rootCollections, setRootCollections ] = useState([]);
    const [ rootBookmarks, setRootBookmarks ] = useState([]);

    useEffect(() => {
        if (props.user.rootId) {
            API.getEntitiesInCollection(props.user.rootId, props.user.token).then( (response) => {
                console.log(response.data);
                setRootCollections([...response.data.collections]);
                setRootBookmarks([...response.data.bookmarks]);
            }).catch( (err) => {
                console.log(err);
            });
        }
    }, [props.user]);

    return (
        <Grommet>
        <Box direction='row'>
        
        <Box height='100%'
            pad='0px' 
            width={{min: '300px'}}>
            <Header
                gap='none'
                pad='small'
                background='green'>
                <Text>WebM8</Text>
            </Header>
            <ExplorerList
                collections={rootCollections} 
                bookmarks={rootBookmarks} />
        </Box>
        <Box width='100%'>
            <BookmarkView user={props.user} 
                selectedBookmark={props.selectedBookmark} 
                selectBookmark={props.selectBookmark} />
        </Box>

        </Box>
        </Grommet>
    )
}
