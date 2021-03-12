import { React, useState, useEffect } from 'react';
import UserContext from '../components/UserContext';

export default function Home(props) {

    return (
        <div>
            { props.user ? props.user.userId : 'Hello' }
        </div>
    )
}
