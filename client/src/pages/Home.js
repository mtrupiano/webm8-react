import { React, useState, useEffect } from 'react';

import { Grommet, Grid, Box, Heading, Text } from 'grommet';

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

    const theme = {
        global: {
            colors: {
                focus: undefined
            }
        },
        formField: {
            focus: {
                background: {
                    color: 'white'
                }
            },
            border: undefined
        },
        text: {
            extend: ` padding-top: 4.5px `
        },
        heading: {
            extend: ` padding-top: 6px`
        }
    }

    return (
        <Grommet theme={theme}>
            <Grid rows={['auto', 'flex']}
                    columns={['auto', 'flex']}
                    areas={[
                        { name: 'header', start: [0, 0], end: [1, 0] },
                        { name: 'nav', start: [0, 1], end: [0, 1] },
                        { name: 'main', start: [1, 1], end: [1, 1] }]
                    }>

        <Box elevation='small' background='#69DB58' gridArea='header'>
            <Heading 
                margin={{left: 'small', vertical: '16px'}} 
                pad='small' level={2}>
                    webM8
            </Heading>
        </Box>
        
        <Box direction='row'>
        
        <Box gridArea='nav' elevation='small' height={{min: '100%'}}
            pad='0px' 
            width={{min: '300px'}}>
            <ExplorerList
                collections={rootCollections} 
                bookmarks={rootBookmarks} />
        </Box>
        <Box gridArea='main' width='100%'>
            <BookmarkView user={props.user} 
                selectedBookmark={props.selectedBookmark} 
                selectBookmark={props.selectBookmark} />
        </Box>

        </Box>

        </Grid>
        </Grommet>
    )
}
