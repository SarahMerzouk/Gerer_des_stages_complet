import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import MapComponent from "./mapComponent";


{/*
1. Verify adress https://developers.google.com/maps/documentation/address-validation/overview?hl=fr (show error is )
2. Turn it into geolocation with latitude and longitude https://developers.google.com/maps/documentation/geocoding/overview?hl=fr
3. Show map https://cloud.google.com/blog/products/maps-platform/introducing-react-components-for-the-maps-javascript-api
*/}

function InternshipMap() {
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const location = useLocation();
    const internship = location.state;
    const adresse = internship.companyadresse;
    const [adresseValide, setAdresseValide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);

    useEffect(() => {
        const validateAddress = async () => {
            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(adresse)}&key=${API_KEY}`
                );

                //console.log(response)

                if (response.data.status === "OK" && (response.data.results[0].geometry.location_type === "ROOFTOP")) {
                    setAdresseValide(true);
                    setLongitude(response.data.results[0].geometry.location.lng)
                    setLatitude(response.data.results[0].geometry.location.lat)
                } else {
                    setAdresseValide(false);
                }

                //console.log(response)


                setLoading(false); // Set loading to false once the validation is complete
            } catch (error) {
                console.error('Error validating address:', error);
                setAdresseValide(false);
                setLoading(false); // Set loading to false in case of an error
                window.location.reload();
            }
        };

        validateAddress();
    }, [adresse, API_KEY]);

    // Conditional rendering based on the value of adresseValide
    return (
        <div>
            {loading && <p>Loading...</p>}
            {!loading && (
                <>
                    {adresseValide ? (
                        <div>
                            <p>Adresse Valide</p>
                            <p>{adresse}</p>
                            <MapComponent lng={longitude} lat={latitude} />
                        </div>
                    ) : (
                        <div>
                            <p>Impossible de trouver l'adresse sur la Carte</p>
                            <p>{adresse}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default InternshipMap;
