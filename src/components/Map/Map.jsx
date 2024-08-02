import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import markerPhoto from "../../imgs/marker-photo.png";
import './map.css';
import axios from "axios";
import { getAuthToken } from "../util/auth";
import { useTranslation } from "react-i18next";

export default function Map({ bookingSerial }) {
  const [loading, setLoading] = useState(false);
  const [bookingsData, setBookingsData] = useState({});
  const [error, setError] = useState({});
  const [lat, setLat] = useState(29.6);
  const [long, setLong] = useState(32.4);

  const [map, setMap] = useState(null);
  const [t] = useTranslation();
// function to get all shipment details
  async function getBookingsDetails() {
    const token = getAuthToken();
    try {
      setLoading(true);
      const res = await axios.get(
        `https://soaken.neuecode.com/api/get-bookings/${bookingSerial}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      console.log(res.data.data.shipment);

      setLat(res.data.data.shipment.lat);
      setLong(res.data.data.shipment.long);
   

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error)
    }
  }

  // sending request with every 3 seconds with new longitude and latitude of the ship

  useEffect(() => {
    const interval = setInterval(function () {
      getBookingsDetails();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  console.log(lat, long);

  // make position for marker and map

  const center = { lat: lat, lng: long };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  console.log(isLoaded);

  // network error

  if (error && error.message === "Network Error") {
    return (
      <>
        <div className=" flex flex-col justify-center items-center w-screen h-screen gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100px"
            height="100px"
            viewBox="0 0 16 16"
          >
            <g fill="#2e3436">
              <path
                d="m 8 1.992188 c -2.617188 0 -5.238281 0.933593 -7.195312 2.808593 l -0.496094 0.480469 c -0.3984378 0.378906 -0.410156 1.011719 -0.03125 1.410156 c 0.382812 0.398438 1.015625 0.410156 1.414062 0.027344 l 0.5 -0.476562 c 3.085938 -2.953126 8.53125 -2.953126 11.617188 0 l 0.5 0.476562 c 0.398437 0.382812 1.03125 0.371094 1.414062 -0.027344 c 0.378906 -0.398437 0.367188 -1.03125 -0.03125 -1.410156 l -0.496094 -0.480469 c -1.957031 -1.875 -4.578124 -2.808593 -7.195312 -2.808593 z m -0.03125 4.007812 c -1.570312 0.011719 -3.128906 0.628906 -4.207031 1.8125 l -0.5 0.550781 c -0.375 0.40625 -0.347657 1.042969 0.0625 1.414063 c 0.410156 0.371094 1.042969 0.339844 1.414062 -0.070313 l 0.5 -0.542969 c 1.242188 -1.363281 3.992188 -1.492187 5.398438 -0.128906 c 0.121093 -0.023437 0.242187 -0.035156 0.363281 -0.035156 c 0.53125 0 1.039062 0.210938 1.414062 0.585938 l 0.222657 0.222656 c 0.011719 -0.011719 0.023437 -0.019532 0.039062 -0.03125 c 0.40625 -0.371094 0.4375 -1.007813 0.0625 -1.414063 l -0.5 -0.550781 c -1.125 -1.230469 -2.703125 -1.824219 -4.269531 -1.8125 z m 0.03125 4 c -0.511719 0 -1.023438 0.195312 -1.414062 0.585938 c -0.78125 0.78125 -0.78125 2.046874 0 2.828124 s 2.046874 0.78125 2.828124 0 c 0.210938 -0.210937 0.359376 -0.453124 0.457032 -0.714843 l -0.285156 -0.285157 c -0.554688 -0.554687 -0.707032 -1.367187 -0.46875 -2.070312 c -0.335938 -0.226562 -0.726563 -0.34375 -1.117188 -0.34375 z m 0 0"
                fill-opacity="0.34902"
              />
              <path d="m 11 10 c -0.265625 0 -0.519531 0.105469 -0.707031 0.292969 c -0.390625 0.390625 -0.390625 1.023437 0 1.414062 l 1.292969 1.292969 l -1.292969 1.292969 c -0.390625 0.390625 -0.390625 1.023437 0 1.414062 s 1.023437 0.390625 1.414062 0 l 1.292969 -1.292969 l 1.292969 1.292969 c 0.390625 0.390625 1.023437 0.390625 1.414062 0 s 0.390625 -1.023437 0 -1.414062 l -1.292969 -1.292969 l 1.292969 -1.292969 c 0.390625 -0.390625 0.390625 -1.023437 0 -1.414062 c -0.1875 -0.1875 -0.441406 -0.292969 -0.707031 -0.292969 s -0.519531 0.105469 -0.707031 0.292969 l -1.292969 1.292969 l -1.292969 -1.292969 c -0.1875 -0.1875 -0.441406 -0.292969 -0.707031 -0.292969 z m 0 0" />
            </g>
          </svg>
          <h1 className="text-red-500 font-semibold  ">{t(error.message)}</h1>
          <p className=" text-red-500 font-semibold">
            {t('please check your connection !!!')}
          </p>
        </div>
      </>
    );
  }
  return (
     <>
      <div className=" ms-[100px]   lg:ms-[256px]">
        {!isLoaded ? (
          "loading"
        ) : (
          <>
            <div className="w-[92vw] md:w-[95vw] justify-map lg:w-[74vw] xl:w-[80vw]">
              <GoogleMap
                center={center}
                zoom={15}
                onLoad={(map) => setMap(map)}
                mapContainerStyle={{  height: "100vh"   }}
              >
               

                <Marker
                  position={center}
                  icon={{
                    url : markerPhoto,
                    scaledSize : new window.google.maps.Size(26 , 37)
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
