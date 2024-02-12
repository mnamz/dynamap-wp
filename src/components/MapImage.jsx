import React, { useState, useEffect } from "react";
import axios from 'axios';

const MapImage = ({ imageUrl, parentClass }) => {
    const [clickedCoordinates, setClickedCoordinates] = useState(null);
    const [pins, setPins] = useState([]);
    const [popupData, setPopupData] = useState(null);

    useEffect(() => {
        const fetchPins = async () => {
            try {
                const response = await axios.get('/wp-json/api/locations');
                const pinsData = response.data.response.map(item => {
                    const position = JSON.parse(item.position);
                    return {
                        id: item.id,
                        name: item.name,
                        x: position.x,
                        y: position.y,
                        details: item.details
                    };
                });
                setPins(pinsData);
            } catch (error) {
                console.error('Error fetching pins:', error);
            }
        };

        fetchPins();
    }, []);

    const handlePinClick = (pin) => {
        setPopupData(pin);
    };

    const handleMouseLeave = () => {
        setPopupData(null);
    };

    const handleImageClick = (event) => {
        const image = event.target;
        const rect = image.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        console.log(`Clicked at (${x}%, ${y}%)`);
        setClickedCoordinates({ x, y });
        document.getElementById("position").value = JSON.stringify({ x, y });
    };

    const parentClassesArray = Array.from(parentClass);
    const isShortcode = parentClassesArray.includes("shortcode");

    return (
        <div>
            {isShortcode ? (
                <div className="shortcode pin-overlayed-image-container" onMouseLeave={handleMouseLeave}>
                    <img src={imageUrl} className="image"/>
                    {pins.map((pin, index) => (
                        <div key={index} className="pin" style={{ top: `${pin.y}%`, left: `${pin.x}%` }} onClick={() => handlePinClick(pin)}>
                            {pin.name}
                            {popupData && popupData.id === pin.id && (
                                <div className="popup" style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}>
                                    <div className="popup-box">
                                        <h3>{popupData.name}</h3>
                                        <p>{popupData.details}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="pin-overlayed-image-container" onMouseLeave={handleMouseLeave}>
                    <img src={imageUrl} className="image" onClick={handleImageClick}/>
                    {clickedCoordinates && (
                        <div className="selectPin" style={{ top: `${clickedCoordinates.y}%`, left: `${clickedCoordinates.x}%` }}>
                        </div>
                    )}
                    <input type="hidden" name="position" id="position"></input>
                </div>
            )}
        </div>
    );
}

export default MapImage;
