import { React, useState, useEffect } from 'react';

import { Grommet, Sidebar, Header, Text } from 'grommet';

import API from '../utils/API';

import ExplorerList from '../components/ExplorerList';
import ExplorerListCollection from '../components/ExplorerListCollection';

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
        <Sidebar 
            pad='0px' 
            width='300px' 
            header={<Header 
                        gap='none' 
                        pad='small' 
                        background='green'>
                        <Text>WebM8</Text>  
                    </Header>}>
            <ExplorerList collections={rootCollections} bookmarks={rootBookmarks} />
        </Sidebar>
        </Grommet>
    )
}
