import React, { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import MapImage from './components/MapImage';
import map from './assets/map.png';

const App = ({ targetComponents }) => {
    useEffect(() => {
        const init = () => {
            console.log('initing')
            targetComponents.forEach(({ id, component }) => {
                console.log(id)
                const container = document.getElementById(id);
                console.log(`Container for ID ${id}:`, container); // Log container
                if (container) {
                    ReactDOM.render(component, container);
                }
            });
        };

        // Check if DOM is already loaded
        if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
            console.log('ready',document.readyState)
            init();
        } else {
            console.log('hmmm')
            // Use event listener to wait for DOMContentLoaded
            document.addEventListener('DOMContentLoaded', init);
            console.log('?s')
        }

        // Clean up
        return () => {
            targetComponents.forEach(({ id }) => {
                const container = document.getElementById(id);
                if (container) {
                    ReactDOM.unmountComponentAtNode(container);
                }
            });
        };
    }, [targetComponents]);

    return null; 

    
    // const pins = [
    //     // { name: "Pin 1", x: 40, y: 60 },
    //     // { name: "Pin 2", x: 70, y: 30 },
    // ];

    // return (
    //     <div>
    //         <hr />
    //         {/* <Dashboard /> */}
    //         {/* <MapImage imageUrl={map} pins={pins} /> */}
    //     </div>
    //  );
}

export default App; 