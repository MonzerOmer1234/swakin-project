import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import "./App.css";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SideTabs, { sideTabs } from "./components/sidebar/SideTabs";
import Dashboard from "./components/dashboard/Dashboard";
import Cars from "./components/cars/Cars";
import Shipment from "./components/shipment/Shipment";
import Bookings from "./components/bookings/Bookings";
import Signup from "./components/auth/Signup";
import SignIn from "./components/auth/SignIn";
import { useEffect, useState, useCallback } from "react";
import ProtectedRoutes, { getAuthToken } from "./components/util/auth";
import ShipmentDetails from "./components/shipment/ShipmentDetails";
import BookingDetails from "./components/bookings/BookingDetails";
import SingleBookingDetail from "./components/bookings/SingleBookingDetail";
import i18n from "./i18n";

function App() {
  // share the data across the entire application

  const [path, setPath] = useState("");
  const [availableSeats, setAvailableSeats] = useState(0);
  const [serialNumber, setSerialNumber] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [stop, setStop] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [carsNums, setCarsNums] = useState("");
  const [price, setPrice] = useState(0);
  const [username, setUsername] = useState("");
  const [shipName, setShipName] = useState("");
  const [receipentName, setReceipentName] = useState("");
  const [receipentPhone, setReceipentPhone] = useState("");
  const [specifiedCars, setSpecifiedCars] = useState([]);
  const [shipmentId, setShipmentId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [changeLang, setChangeLang] = useState(false);
  const [bookingSerial , setBookingSerial] = useState("")

  // get user data

  console.log(changeLang);
  console.log(typeof setChangeLang);

 
  useEffect(() => {
    if (changeLang) {
      i18n.changeLanguage("ar");
      
      document.body.style.direction = "rtl";
    } else {
      i18n.changeLanguage("en");
     
      document.body.style.direction = "ltr";
    }
  }, [changeLang]);

  const token = getAuthToken();
  const getUserData = useCallback(
    async function () {
      try {
        setLoading(true);
        const res = await axios.get("https://soaken.neuecode.com/api/user", {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        });
        setUsername(res.data.name);
        setLoading(false);

        console.log(res);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token, getUserData]);

  function mainpulateUserName(name) {
    const newNameArray = name.split(" ");
    let newName = "";
    for (let i = 0; i < newNameArray.length; i++) {
      newName += newNameArray[i].charAt(0) + " ";
      newName = newName.toUpperCase();
    }

    return newName;
  }
  

 


  const newName = mainpulateUserName(username);

  const location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
  }, [path, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <SkeletonTheme baseColor="gray" highlightColor="#444">
          <p>
            <Skeleton count={10} width={"400px"} />
          </p>
        </SkeletonTheme>
      </div>
    );
  }
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
          <h1 className="text-red-500 font-semibold  ">{error.message}</h1>
          <p className=" text-red-500 font-semibold">
            please check your connection !!!
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {path !== "/sign-up" && path !== "/sign-in" ? (
        <>
          <div className=" lg:grid w-full lg:grid-cols-12 h-screen bg-[#E5E7EB] ">

            <SideTabs changeLang={changeLang} setChangeLang= {setChangeLang} />
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/"
                  errorElement={<h1>error occurred</h1>}
                  element={
                    <Dashboard
                      changeLang={changeLang}
                      setChangeLang={setChangeLang}
                      setAvailableSeats={setAvailableSeats}
                      setSerialNumber={setSerialNumber}
                      setStartLocation={setStartLocation}
                      setEndLocation={setEndLocation}
                      setStop={setStop}
                      setTravelDate={setTravelDate}
                      setArrivalDate={setArrivalDate}
                      setCarsNums={setCarsNums}
                      setPrice={setPrice}
                      setShipName={setShipName}
                      setShipmentId={setShipmentId}
                      fullName={username}
                      username={newName}
                    />
                  }
                />

                <Route path="/cars" element={<Cars username={newName}  changeLang={changeLang}  setChangeLang={setChangeLang}/>} />
                <Route
                  path="/shipments"
                  element={
                    <Shipment
                    setChangeLang={setChangeLang}
                      changeLang={changeLang}
                      username={newName}
                      setAvailableSeats={setAvailableSeats}
                      setSerialNumber={setSerialNumber}
                      setStartLocation={setStartLocation}
                      setEndLocation={setEndLocation}
                      setStop={setStop}
                      setTravelDate={setTravelDate}
                      setArrivalDate={setArrivalDate}
                      setCarsNums={setCarsNums}
                      setPrice={setPrice}
                      setShipName={setShipName}
                      setShipmentId={setShipmentId}
                      travelDate={travelDate}
                      serialNumber={serialNumber}
                      shipName={shipName}
                    />
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <Bookings  setChangeLang={setChangeLang}  changeLang={changeLang} username={newName} serialNumber={serialNumber} setBookingSerial={setBookingSerial} />
                  }
                />
              </Route>

              <Route
                path="/shipments/:id/booking"
                element={
                  <ShipmentDetails
                  
                    changeLang={changeLang}
                    username={newName}
                    availableSeats={availableSeats}
                    serialNumber={serialNumber}
                    receipentName={receipentName}
                    receipentPhone={receipentPhone}
                    specifiedCars={specifiedCars}
                    setReceipentName={setReceipentName}
                    setReceipentPhone={setReceipentPhone}
                    setSpecifiedCars={setSpecifiedCars}
                    setChangeLang= {setChangeLang} 
                  />
                }
              />
              <Route
                path="/bookings/:serial/booking"
                element={
                  <BookingDetails
                   changeLang={changeLang}
                   setChangeLang= {setChangeLang} 
                    username={newName}
                    availableSeats={availableSeats}
                    serialNumber={serialNumber}
                    startLocation={startLocation}
                    endLocation={endLocation}
                    stop={stop}
                    travelDate={travelDate}
                    arrivalDate={arrivalDate}
                    carsNums={carsNums}
                    price={price}
                    receipentName={receipentName}
                    receipentPhone={receipentPhone}
                    specifiedCars={specifiedCars}
                    shipmentId={shipmentId}
                  />
                }
              />
              <Route
                path="/shipments/mybookings/:sid"
                element={
                  <SingleBookingDetail
                  changeLang={changeLang}
                    username={newName}
                    startLocation={startLocation}
                    endLocation={endLocation}
                    stop={stop}
                    arrivalDate={arrivalDate}
                    travelDate={travelDate}
                    carsNums={carsNums}
                    setChangeLang={setChangeLang}
                    receipentName={receipentName}
                    specifiedCars={specifiedCars}
                    bookingSerial={bookingSerial}
                  />
                }
              />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/sign-up" element={<Signup  changeLang={changeLang}/>} />
          <Route path="/sign-in" element={<SignIn  changeLang={changeLang}/>} />
        </Routes>
      )}
    </>
  );
}

export default App;
