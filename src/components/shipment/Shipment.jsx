import React, { useState, useEffect } from "react";
import Navbar from "../sidebar/navbar/Navbar";
import { sideTabs } from "../sidebar/SideTabs";
import axios from "axios";

import ReactLoading from 'react-loading';
import "react-loading-skeleton/dist/skeleton.css";

import "./shipment.css";
import { getAuthToken } from "../util/auth";
import DashboardContentTwo from "../dashboard/DashboardContentTwo";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
const Shipment = ({
  setAvailableSeats,
  setSerialNumber,
  setStartLocation,
  setEndLocation,
  setStop,
  setTravelDate,
  setArrivalDate,
  setCarsNums,
  setPrice,
  setShipName,
  setShipmentId,
  username,
  travelDate,
  shipName,
  serialNumber,
  changeLang,
  setChangeLang,
  setLat,
  setLong,
  
}) => {
  const [shipmentsData, setShipmentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [shipmentLoading, setShipmentLoading] = useState(false);
  const [shipmentError, setShipmentError] = useState({});
  const [shName, setShName] = useState("");
  const [shipmentDetail, setShipmentDetail] = useState([]);
  const [t] = useTranslation();
 



  const token = getAuthToken();

  // filtering shipments based on ship name



  const handleSubmit = async function (event) {
    event.preventDefault();
    try {
      setShipmentLoading(true);
      const res = await axios.get(
        `https://soaken.neuecode.com/api/get-shipments?ship_name=${shName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data.data);

      setShipmentDetail(res.data.data);

      setShipmentLoading(false);
    } catch (error) {
      console.log(error);
      setShipmentLoading(false);
    }
  };
  // get all shipments
  async function getShipmentsData() {
    const token = getAuthToken();
    try {
      setLoading(true);
      const res = await axios.get(
        "https://soaken.neuecode.com/api/get-shipments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShipmentsData(res.data.data);
      setLoading(false);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getShipmentsData();
  }, []);

  // loading
  if (loading) {
    return (
      <div
        className={`flex h-screen bg-[#E5E7EB] justify-center items-center relative ${
          changeLang ? "lg:right-[200px]" : "lg:left-[200px]"
        } top-[100px] w-screen`}
      >
      <ReactLoading type="spin" color="#1D4ED8"/>
      </div>
    );
  }
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
      <div className="lg:col-span-12 lg:ms-[255px]">
        <Navbar
          setChangeLang={setChangeLang}
          changeLang={changeLang}
          navName={t(sideTabs[2]?.text)}
          username={username}
        />

        <div
          style={{ fontFamily: changeLang ? "Almarai" : "Inter , sans-serif " }}
          className=" flex gap-3 md:gap-0 flex-col md:flex-row justify-between  items-center p-5 bg-[#E5E7EB]"
        >
          <h1 className=" font-bold text-2xl">{t("Shipments")}</h1>

          <form class="md:ms-auto" onSubmit={handleSubmit}>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("Search with ship name")}
                required
                value={shName}
                onChange={(e) => setShName(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div className="lg:p-5  parent grid grid-cols-12 gap-[20px] bg-[#E5E7EB] ">
          {shName.length === 0 || shipmentDetail.length === 0
            ? shipmentsData.map((shipment) => (
                <DashboardContentTwo
               
                  setSerialNumber={setSerialNumber}
                  setAvailableSeats={setAvailableSeats}
                  setStartLocation={setStartLocation}
                  setEndLocation={setEndLocation}
                  setStop={setStop}
                  setPrice={setPrice}
                  setTravelDate={setTravelDate}
                  setArrivalDate={setArrivalDate}
                  setCarsNums={setCarsNums}
                  setShipName={setShipName}
                  setShipmentId={setShipmentId}
                  key={shipment.id}
                  shipmentId={shipment.id}
                  serialNo={shipment.serial_no}
                  price={shipment.price}
                  shipmentName={shipment.ship_name}
                  startLocation={shipment.start_location}
                  endLocation={shipment.end_location}
                  travelDate={shipment.travel_date}
                  arrivalDate={shipment.arrival_date}
                  carNumbers={shipment.cars_no}
                  stopPoints={shipment.shipment_location_point}
                  status={shipment.status.name_en}
                  changeLang={changeLang}
                />
              ))
            : shipmentDetail.map((detail) => (
                <DashboardContentTwo
                 
                  setSerialNumber={setSerialNumber}
                  setAvailableSeats={setAvailableSeats}
                  setStartLocation={setStartLocation}
                  setEndLocation={setEndLocation}
                  setStop={setStop}
                  setPrice={setPrice}
                  setTravelDate={setTravelDate}
                  setArrivalDate={setArrivalDate}
                  setCarsNums={setCarsNums}
                  setShipName={setShipName}
                  key={shipmentDetail[0].id}
                  serialNo={shipmentDetail[0].serial_no}
                  price={shipmentDetail[0].price}
                  shipmentName={shipmentDetail[0].ship_name}
                  startLocation={shipmentDetail[0].start_location}
                  endLocation={shipmentDetail[0].end_location}
                  travelDate={shipmentDetail[0].travel_date}
                  arrivalDate={shipmentDetail[0].arrival_date}
                  carNumbers={shipmentDetail[0].cars_no}
                  stopPoints={shipmentDetail[0].shipment_location_point}
                  setShipmentId={setShipmentId}
                  shipmentId={shipmentDetail[0].id}
                  changeLang={changeLang}
                />
              ))}

          {(!shipmentDetail || !shipmentsData) && (
            <div
              style={{

                height: "auto",
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                marginBottom: "20px",
                transform: "translateY(-50%)",
              }}
              className="mx-[60px] flex justify-center items-center lg:me-[225px] relative top-[200px] lg:block lg:w-[400px] lg:start-56 "
            >
              <div className="p-4 ">
                <div class="fi-ta-empty-state-content mx-auto grid max-w-lg justify-items-center text-center">
                  <div class="fi-ta-empty-state-icon-ctn mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-500/20">
                    <svg
                      class="fi-ta-empty-state-icon h-6 w-6 text-gray-500 dark:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>

                  <h4 class="fi-ta-empty-state-heading text-base font-semibold leading-6 text-gray-950 dark:text-white">
                    {t("No shipments available")}
                  </h4>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shipment;
