import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import * as parkData from './map.json'

const DeliverItems = () => {

    const [viewport, setviewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        zoom: 10,
        width: '100vw',
        height: '100vh'
    });

    const [selectedPark, setSelectedPark] = useState(null);

    useEffect(() => {
        const listener = e => {
            if (e.key === 'Escape') {
                setSelectedPark(null);
            }
        };
        window.addEventListener('keydown', listener);

        return () => {
            window.removeEventListener('keydown', listener);
        };
    }, [])

    return (
        <>
            <ReactMapGL {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={viewport => {
                    setviewport(viewport)
                }}
            >
                {parkData.features.map(park => (
                    <Marker key={park.properties.PARK_ID} latitude={park.geometry.coordinates[1]} longitude={park.geometry.coordinates[0]}>
                        <button className="marker-btn" onClick={(e) => {
                            e.preventDefault();
                            setSelectedPark(park);
                        }
                        }>
                            <img src="/public/favicon.ico" alt="marker" />
                        </button>
                    </Marker>
                ))}
                {selectedPark ? (
                    <Popup latitude={selectedPark.geometry.coordinates[1]}
                        longitude={selectedPark.geometry.coordinates[0]}
                        onClose={() => {
                            setSelectedPark(null);
                        }
                        }>
                        <h2>{selectedPark.properties.NAME}</h2>
                        <p>{selectedPark.properties.DESCRIPTIO}</p>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </>
    );
}

export default DeliverItems;
