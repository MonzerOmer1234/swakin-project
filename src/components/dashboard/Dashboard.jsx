import React, { useEffect, useState } from "react";
import Navbar from "../sidebar/navbar/Navbar";

import "./dashboard.css";
import ReactLoading from "react-loading";

import { sideTabs } from "../sidebar/SideTabs";
import DashboardContentOne from "./DashboardContentOne";
import DashboardContentTwo from "./DashboardContentTwo";
import DashboardContentThree from "./DashboardContentThree";
import axios from "axios";
import { getAuthToken } from "../util/auth";
import { useTranslation } from "react-i18next";

const Dashboard = ({
  username,
  fullName,
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
  changeLang,
  setChangeLang,
  setLat,
  setLong,
}) => {
  const [shipmentsData, setShipmentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const [t] = useTranslation();

  // calling api to get upcoming shipments

  async function getShipmentsData() {
    const token = getAuthToken();
    try {
      const res = await axios.get("https://soaken.neuecode.com/api/get-data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);

      setShipmentsData(res.data.data.upcoming_shipments);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    getShipmentsData();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <ReactLoading type="spin" color="#1D4ED8" />
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
          <h1 className="text-red-500 font-semibold  ">{t(error.message)}</h1>
          <p className=" text-red-500 font-semibold">
            {t("please check your connection !!!")}
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
          navName={t(sideTabs[0].text)}
          username={username}
        />
        <div
          style={{
            backgroundColor: "#E5E7EB",
            width: "100%",
            height: "auto",
          }}
        >
          <h1
            className=" font-bold p-5"
            style={{
              fontSize: "20px",
              color: "#353B47",
              fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
            }}
          >
            {t("Welcome back")} , <br />{" "}
            <span className=" text-3xl">{fullName}</span>
          </h1>

          <div className=" ms-[20px]  flex flex-col flex-wrap gap-5  lg:grid lg:grid-cols-12  ">
            <div className=" lg:col-span-6 ">
              <DashboardContentOne changeLang={changeLang} />
              <DashboardContentThree changeLang={changeLang} />
            </div>
            <div
              className=" bg-white lg:col-span-6 me-[20px]"
              style={{ borderRadius: "8px" }}
            >
              <h1
                className=" p-[20px] text-[#353B47] font-bold"
                style={{
                  fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                }}
              >
                {t("Upcoming Shipments")}
              </h1>
              {shipmentsData && shipmentsData.length > 0 ? (
                shipmentsData.map((shipment) => (
                  <DashboardContentTwo
                    changeLang={changeLang}
                    key={shipment.id}
                    serialNo={shipment.serial_no}
                    price={shipment.price}
                    shipmentName={shipment.ship_name}
                    status={shipment.status.name_en}
                    startLocation={shipment.start_location}
                    stopPoints={shipment.shipment_location_point}
                    endLocation={shipment.end_location}
                    travelDate={shipment.travel_date}
                    arrivalDate={shipment.arrival_date}
                    carNumbers={shipment.cars_no}
                    setStop={setStop}
                    setSerialNumber={setSerialNumber}
                    setAvailableSeats={setAvailableSeats}
                    setStartLocation={setStartLocation}
                    setEndLocation={setEndLocation}
                    setPrice={setPrice}
                    setShipmentId={setShipmentId}
                    shipmentId={shipment.id}
                    setTravelDate={setTravelDate}
                    setArrivalDate={setArrivalDate}
                    setCarsNums={setCarsNums}
                    setShipName={setShipName}
                  />
                ))
              ) : (
                <div
                  style={{
                    height: "auto",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    marginBottom: "20px",
                  }}
                  className=" w-[60%] mx-[85px] sm:mx-[100px] md:mx-[150px] lg:mx-[40px] lg:me-0 lg:w-[80%]  "
                >
                  <div className="flex p-4 justify-center items-center ">
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
                        {t("No upcoming shipments Available")}
                      </h4>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
