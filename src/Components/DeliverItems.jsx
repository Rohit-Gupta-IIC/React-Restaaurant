import React, { useRef, useState } from "react";
import ReactMapGL, { GeolocateControl } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import DeckGL, { GeoJsonLayer } from 'deck.gl'

const DeliverItems = () => {

    const [viewport, setviewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        zoom: 1,
        width: '100vw',
        height: '100vh',
        transitionDuration: 100
    });

    const geolocateControlStyle = {
        right: 10,
        top: 10
    };

    const [search, setSearch] = useState(null);

    const mapref = useRef()

    const handleOnResult = event => {
        setSearch(new GeoJsonLayer({
            id: "search-result",
            data: event.result.geometry,
            getFillColor: [255, 0, 0, 128],
            getRadius: 1000,
            pointRadiusMinPixels: 10,
            pointRadiusMaxPixels: 10
        })
        )
    }

    const handleGeocoderViewportChange = viewport => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };
        console.log("Updating")

        return setviewport({
            ...viewport,
            ...geocoderDefaultOverrides,
        });
    }

    return (
        <>
            <ReactMapGL
                {...viewport}
                ref={mapref}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={viewport => {
                    setviewport(viewport)
                }}
            >
                <GeolocateControl
                    style={geolocateControlStyle}
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                />
                <Geocoder
                    mapRef={mapref}
                    onResult={handleOnResult}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    position='top-left'
                />
            </ReactMapGL>
            <DeckGL {...viewport} layers={[search]} />
        </>
    );
}

export default DeliverItems;
