import { React, useState, useEffect } from 'react';
import UserContext from '../components/UserContext';

import API from '../utils/API';

export default function Home(props) {

    const [ rootEntities, setRootEntities ] = useState([]);

    useEffect(() => {
        if (props.user.rootId) {
            API.getEntitiesInCollection(props.user.rootId, props.user.token).then( (response) => {
                console.log(response.data);
                setRootEntities([ 
                    ...response.data.collections, 
                    ...response.data.bookmarks 
                ]);
            }).catch( (err) => {
                console.log(err);
            });
        }
    }, [props.user]);

    return (
        <div>
            { rootEntities.map( e => <p key={e._id}>{e.name}</p>) }
        </div>
    )
}
