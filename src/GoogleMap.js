import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import "./App.css";

const GoogleMapComponent = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  useEffect(() => {
    console.log("props.longitude: ", props.longitude);
  }, [props.longitude]);

  const center =
    // useMemo(
    // () => (
    { lat: props.latitude, lng: props.longitude };
  //   ),
  // []
  // );

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        />
      )}
    </div>
  );
};

export default GoogleMapComponent;
