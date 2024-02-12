import React from "react";

const MapImage = ({ imageUrl }) => {
    const pins = [
        { name: "Pin 1", x: 40, y: 60 },
        { name: "Pin 232142", x: 90, y: 30 },
      ];
    return (
        <div className="pin-overlayed-image-container">
            <img src={imageUrl} className="image"/>
            {pins.map((pin, index) => (
                <div key={index} className="pin" style={{ top: `${pin.y}%`, left: `${pin.x}%` }}>
                    {pin.name}
                </div>
            ))}
        </div>
    )
}

export default MapImage