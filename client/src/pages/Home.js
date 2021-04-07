import { React, useState, useEffect } from 'react';

import { Grommet, Grid, Box, Heading, Layer, Text } from 'grommet';

import API from '../utils/API';

import ExplorerList from '../components/ExplorerList';
import ExplorerListCollection from '../components/ExplorerListCollection';
import BookmarkView from '../components/BookmarkView';
import Path from '../components/Path';
import AddCollectionButton from '../components/AddCollectionButton';
import AddBookmarkButton from '../components/AddBookmarkButton';
import NewCollectionModal from '../components/NewCollectionModal';
import NothingHereDisplay from '../components/NothingHereDisplay';
import NewBookmarkModal from '../components/NewBookmarkModal';
import ExplorerListColorDropdown from '../components/ExplorerListColorDropdown';

export default function Home(props) {

    const [ rootCollections, setRootCollections ] = useState([]);
    const [ rootBookmarks, setRootBookmarks ] = useState([]);
    const [ activeCollectionID, setActiveCollectionID ] = useState('');
    const [ activeCollectionName, setActiveCollectionName ] = useState('');
    const [ path, setPath ] = useState([]);
    
    const [ showNewCollectionModal, setShowNewCollectionModal ] = useState(false);
    const [ showNewBookmarkModal, setShowNewBookmarkModal ] = useState(false);

    const [ color, setColor ] = useState('');

    useEffect(() => {

        if (props.user.token) {
            // Check database for most recently viewed collection
            API.getSelectedCollection(props.user.token)
                .then( (selectedCollectionResponse) => {
                    setActiveCollectionID(selectedCollectionResponse.data)
                    // Get all sub entities of currently selected collection
                    API.getEntitiesInCollection(selectedCollectionResponse.data, props.user.token)
                        .then( (entitiesResponse) => {

                            setActiveCollectionName(entitiesResponse.data.name)
                            setRootCollections(entitiesResponse.data.collections)
                            setRootBookmarks(entitiesResponse.data.bookmarks)
                            setColor(entitiesResponse.data.color)
        
                            // Get the path to the currently selected collection
                            API.getPath(selectedCollectionResponse.data, props.user.token)
                                .then( pathResponse => {
                                    setPath(pathResponse.data)
                                }).catch( err => {
                                    console.log(err)
                                })
        
                    }).catch( (err) => {
                        console.log(err)
                    })
    
            }).catch( (err) => {
                console.log(err)
            })
        }
    }, [props.user])

    const reloadEntities = () => {
        API.getEntitiesInCollection(activeCollectionID, props.user.token)
            .then((entitiesResponse) => {
                setActiveCollectionName(entitiesResponse.data.name)
                setRootCollections(entitiesResponse.data.collections)
                setRootBookmarks(entitiesResponse.data.bookmarks)
                setColor(entitiesResponse.data.color)

            }).catch((err) => {
                console.log(err)
            })
    }

    const handleCollectionSelect = (collectionId) => {
        setActiveCollectionID(collectionId)
        
        API.updateSelectedCollection(collectionId, props.user.token).then( response => {

            // Get all sub entities of currently selected collection
            API.getEntitiesInCollection(collectionId, props.user.token)
                .then( (entitiesResponse) => {
                    setActiveCollectionName(entitiesResponse.data.name)
                    setRootCollections(entitiesResponse.data.collections)
                    setRootBookmarks(entitiesResponse.data.bookmarks)
                    setColor(entitiesResponse.data.color)

                    // Get the path to the currently selected collection
                    API.getPath(collectionId, props.user.token)
                        .then( pathResponse => {
                            setPath(pathResponse.data)
                        }).catch(err => {
                            console.log(err)
                        })

                }).catch((err) => {
                    console.log(err)
                })
        }).catch( err => console.log(err) )
    }

    const handleColorSelect = (event) => {
        event.stopPropagation()
        const newColor = event.target.parentNode.getAttribute('name');

        API.editCollectionColor(
            activeCollectionID, (newColor === 'none' ? null : newColor),
            props.user.token
        ).then((response) => {
            setColor(response.data.color);
        }).catch((err) => {
            console.log(err);
        });
    }

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
            <Grid 
                fill
                rows={['auto', 'flex']}
                columns={['auto', 'flex']}
                areas={[
                    { name: 'header', start: [0, 0], end: [1, 0] },
                    { name: 'nav', start: [0, 1], end: [0, 1] },
                    { name: 'main', start: [1, 1], end: [1, 1] }]
                }
            >
                <Box elevation='small' background='#69DB58' gridArea='header'>
                    <Heading 
                        margin={{left: 'small', vertical: '16px'}} 
                        pad='small' 
                        level={2}
                    >
                            webM8
                    </Heading>
                </Box>
                
                <Box 
                    gridArea='nav' 
                    elevation='small' 
                    height='100%'
                    pad='0px' 
                    width={{min: '300px'}}
                >
                    <Box pad={{ top: 'small' }} height='calc(100vh - 78px)'>
                        <Box 
                            direction='row'
                            justify='between'
                            align='center'
                            pad={{ bottom: '8px'}}
                            border={{ side: 'bottom', size: '2px', color: 'gray' }}
                        >
                            <Box pad={{ left: '5px' }}>
                                <Path 
                                    path={path} 
                                    root={props.user.rootId} 
                                    setSelectedCollection={handleCollectionSelect} 
                                />
                                <Text>{activeCollectionName}</Text>
                            </Box>

                            <Box 
                                direction='row'
                                pad={{ bottom: '5px' }}
                            >
                                <ExplorerListColorDropdown
                                    color={color}
                                    handleColorSelect={handleColorSelect} />
                                <AddCollectionButton
                                    onClick={ () => setShowNewCollectionModal(true) } />
                                <AddBookmarkButton
                                    onClick={ () => setShowNewBookmarkModal(true) } />
                            </Box>
                        </Box>

                        { rootBookmarks.length === 0 && rootCollections.length === 0 ? 
                            <NothingHereDisplay 
                                newCollection={() => setShowNewCollectionModal(true) } 
                                newBookmark={() => setShowNewBookmarkModal(true) } /> 
                            : 
                            <ExplorerList
                                activeCollection={activeCollectionID}
                                setActiveCollection={handleCollectionSelect}
                                collections={rootCollections} 
                                bookmarks={rootBookmarks} />                            
                            }
                    </Box>
                </Box>
                <Box gridArea='main' width='100%'>
                    <BookmarkView 
                        user={props.user} 
                        selectedBookmark={props.selectedBookmark} 
                        selectBookmark={props.selectBookmark}
                        selectCollection={handleCollectionSelect}
                    />
                </Box>

            </Grid>

            { showNewCollectionModal &&
                <Layer
                    onEsc={() => setShowNewCollectionModal(false)}
                    onClickOutside={() => setShowNewCollectionModal(false)}
                >
                    <NewCollectionModal
                        path={path}
                        parent={activeCollectionID}
                        token={props.user.token}
                        onSubmit={reloadEntities}
                        closeModal={ () => setShowNewCollectionModal(false) } />
                </Layer> }

            { showNewBookmarkModal &&
                <Layer
                    onEsc={() => setShowNewBookmarkModal(false)}
                    onClickOutside={() => setShowNewBookmarkModal(false)}
                >
                    <NewBookmarkModal
                        path={path}
                        parent={activeCollectionID}
                        token={props.user.token}
                        onSubmit={reloadEntities}
                        closeModal={ () => setShowNewBookmarkModal(false) } />
                </Layer> }
        </Grommet>
    )
}
