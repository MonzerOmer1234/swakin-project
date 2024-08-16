import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import markerPhoto from "../../imgs/marker-photo.png";
import "./map.css";
import axios from "axios";
import { getAuthToken } from "../util/auth";
import { useTranslation } from "react-i18next";

export default function Map({ lat, long }) {
  console.log(lat, long);

  const [map, setMap] = useState(null);
  const [t] = useTranslation();

  const center = { lat: lat, lng: long };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  console.log(isLoaded);

  return (
    <>
      <div className=" ms-[100px]   lg:ms-[256px]">
        {!isLoaded ? (
          "loading"
        ) : (
          <>
            <div className="w-[92vw] md:w-[95vw] justify-map  lg:w-[74vw] xl:w-[80vw]">
              <GoogleMap
                center={center}
                zoom={15}
                onLoad={(map) => setMap(map)}
                mapContainerStyle={{ height: "100vh" }}
              >
                <Marker
                  position={center}
                  icon={{
                    url: markerPhoto,
                    scaledSize: new window.google.maps.Size(26, 37),
                  }}
                />
              </GoogleMap>
            </div>
          </>
        )}
      </div>
    </>
  );
}
