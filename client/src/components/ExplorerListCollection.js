import { React, useState} from 'react';

import { Box, Text, DropButton, Tip, Collapsible, Layer } from 'grommet';
import { Folder, Add } from 'grommet-icons';

import API from '../utils/API';

import ExplorerList from './ExplorerList';
import ExplorerListColorDropdown from './ExplorerListColorDropdown';
import NewCollectionModal from './NewCollectionModal';

export default function ExplorerListCollection(props) {
    const [color, setColor] = useState(props.color);
    const [explorerCollapseOpen, setExplorerCollapseOpen] = useState(false);
    const [newEntityOpen, setNewEntityOpen] = useState(false);

    const [ subCollections, setSubCollections] = useState([]);
    const [ bookmarks, setBookmarks] = useState([]);

    const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
    
    const handleColorSelect = (event) => {
        const newColor = event.target.parentNode.getAttribute('name');

        API.editCollectionColor(
            props.id, (newColor==='none' ? null : newColor), 
            props.token
        )
            .then( (response) => {
                setColor(newColor);
            }).catch( (err) => {
                console.log(err);
            });
    }

    const loadSubEntities = (event) => {
        if (!explorerCollapseOpen) {
            API.getEntitiesInCollection(props.id, props.token).then( (response) => {
                setSubCollections(response.data.collections);
                setBookmarks(response.data.bookmarks);
                setExplorerCollapseOpen(true);
            }).catch( (err) => {
                console.log(err);
            });
        } else {
            setExplorerCollapseOpen(false);
        }
    }

    const handleNewCollection = (event) => {
        setNewEntityOpen(false);
        setShowNewCollectionModal(true);
    }

    return (
        <Box onClick={loadSubEntities} 
            align='center' 
            justify='between' 
            pad={{vertical: 'xsmall'}} 
            direction='row'>

            <Box direction='row'>
                <Box pad={{horizontal: 'small'}}>
                    <Folder />
                </Box>
                <Text size='16px' truncate={true}>{props.name}</Text>
            </Box>

            
            <Box direction='row'>
            <ExplorerListColorDropdown color={color} handleColorSelect={handleColorSelect} />
            <Collapsible open={explorerCollapseOpen}>
                <ExplorerList collections={subCollections} bookmarks={bookmarks} />
            </Collapsible>

            <DropButton open={newEntityOpen} icon={<Add size='20px' />}
                onOpen={() => setNewEntityOpen(true)} 
                onClose={() => setNewEntityOpen(false)}
                dropProps={{ margin: {left: '5px'}, align: {left: 'right'}}}
                dropContent={
                    <Box direction='row' width={{ min: '120px' }}>
                        <Box pad='xsmall' onClick={handleNewCollection}>
                            <Text>New Collection</Text>
                        </Box>
                        <Box pad='xsmall'>
                            <Text>New Bookmark</Text>
                        </Box>
                    </Box>
            } />
            </Box>

            { showNewCollectionModal && 
                <Layer
                    onEsc={() => setShowNewCollectionModal(false)} 
                    onClickOutside={() => setShowNewCollectionModal(false)}>
                    <NewCollectionModal 
                        parent={props.id} 
                        token={props.token} 
                        closeModal={setShowNewCollectionModal}/>
                </Layer>
            }
        </Box>
    )
}
