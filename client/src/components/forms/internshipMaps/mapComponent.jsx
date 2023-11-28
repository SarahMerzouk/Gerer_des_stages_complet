import React, { useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Marker,
    Pin,
    InfoWindow
} from "@vis.gl/react-google-maps"
import "./css/style.css"


function MapComponent(props) {
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const position = { lat: props.lat, lng : props.lng }

    return (
        <div className="centerMapContainer">
            <APIProvider apiKey={API_KEY}>
                <div className="mapContainer">
                    <Map zoom={12} center={position}> 
                        <Marker position={position}></Marker>
                    </Map>
                </div>
            </APIProvider>
        </div>
    );
}

export default MapComponent;