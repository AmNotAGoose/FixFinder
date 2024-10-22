import React, { useEffect, useState } from 'react';
import { useMap, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ repairShopLocations, listingLocations, allLocations, userLocation }) => {
    const FitBounds = () => {
        const map = useMap();
    
        useEffect(() => {
            if (allLocations.length > 0) {
                const bounds = allLocations.map(location => location.location);
                map.fitBounds(bounds);
            }
        }, [map, allLocations]);
    
        return null;
    };

    return (
        <MapContainer center={userLocation} zoom={17} style={{ height: '100vh', width: '50vw', zIndex: 0 }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {console.log(repairShopLocations)}
            {repairShopLocations.map((location) => (
                <Marker key={location.id} position={location.location}>
                    <Popup>
                        <strong>{location.title}</strong>
                        <br />
                        {location.details}
                    </Popup>
                </Marker>
            ))}
            {listingLocations.map((location) => (
                <Marker key={location.id} position={location.location}>
                    <Popup>
                        <strong>{location.title}</strong>
                        <br />
                        {location.details}
                    </Popup>
                </Marker>
            ))}
            {<FitBounds />}
        </MapContainer>
    );
};

export default Map;
