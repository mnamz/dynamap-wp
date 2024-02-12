import React from 'react';
import MapDisplay from './components/MapDisplay';
import map from './assets/map.png';

const User = () => {
    console.log('hehehehhe')
    const pins = [
        { name: "Pin 1", x: 40, y: 60 },
        { name: "Pin 2", x: 70, y: 30 },
    ];

    return (
        <div>
            <hr />
            <MapDisplay imageUrl={map} pins={pins} />
        </div>
     );
}

export default User; 