import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting current location", error);
      }
    );
  }, []);

  if (!currentLocation) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD_c3NcoKXJldWI_VlRduR37Wb0ZKUUQ7w" }}
        center={currentLocation}
        defaultZoom={11}
      >
        <AnyReactComponent
          lat={currentLocation.lat}
          lng={currentLocation.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

export default MapComponent;
