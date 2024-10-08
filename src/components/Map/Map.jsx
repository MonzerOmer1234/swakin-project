import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import markerPhoto from "../../imgs/marker-photo.png";
import "./map.css";


import { useTranslation } from "react-i18next";

export default function Map({ lat, long }) {

  console.log(lat, long);

  const [map, setMap] = useState(null);
  const [t] = useTranslation();

  console.log(lat , long)

  const center = { lat: lat === null ? 25.4 : +lat, lng: long ===  null ? 51.2 : +long };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDDddelwh-k6njWJbchHGYSouZ8I2dLW84',
    libraries: ["places"],
  });

  console.log(isLoaded);

  return (
    <>
      <div className=" ms-[20px]  lg:ms-[256px]">
        {!isLoaded ? (
          "loading"
        ) : (
          <>
            <div className="w-[94vw] md:w-[95vw] justify-map  lg:w-[72vw] xl:w-[80vw]">
              <GoogleMap
                center={center}
                zoom={15}
                onLoad={(map) => setMap(map)}
                mapContainerStyle={{ height: "400px"  }}
                
                
              >
                <MarkerF
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
