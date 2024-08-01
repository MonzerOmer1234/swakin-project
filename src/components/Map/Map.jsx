import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";
import markerPhoto from '../../imgs/marker-photo.png'

export default function Map({lat , long}) {
  const center = { lat: 40.0, lng: 0.0 };

  console.log(lat , long)
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDbmahWQmVcUv5opUDW3Uh25h-wE_vBkrc",
    libraries: ["places"],
  });

  console.log(isLoaded);
  return (
    <>
      <div className="ms-[256px]">
        {!isLoaded ? (
          "loading"
        ) : (
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100vw", height: "100vh" }}
            onLoad={(map) => setMap(map)}
          >
            {/* display markers , directions  , ..etc */}

            <Marker
              position={center}
              // icon={markerPhoto}
              
            />
          </GoogleMap>
        )}
      </div>
    </>
  );
}
