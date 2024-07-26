import { useParams } from "react-router-dom";
import SideTabs from "../sidebar/SideTabs";
import Navbar from "../sidebar/navbar/Navbar";
import { getDaysDiff } from "../util/calculate-days-diff";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../util/auth";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

export default function SingleBookingDetail({
  username,
  startLocation,
  endLocation,
  stop,
  carsNums,
  travelDate,
  arrivalDate,
  changeLang,
  setChangeLang,
  receipentName,
  specifiedCars,
  bookingSerial
}) {
  const { sid } = useParams();
  const [carData, setCarData] = useState([]);
  const [error, setError] = useState({});
  
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation();

  console.log(sid);
  const token = getAuthToken();
  async function getCarData() {
    try {
      setLoading(true);
      const res = await axios.get("https://soaken.neuecode.com/api/get-cars", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);

      setCarData(res.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getCarData();
  }, []);



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
      <SideTabs
        sid={sid}
        changeLang={changeLang}
        setChangeLang={setChangeLang}
      />
      <div className="lg:col-span-12 lg:ms-[256px]">
        <Navbar
          navName={
            <p>
              <span className="text-[#4B5563]">{t("Shipments")} </span>{" "}
              <span
                className="text-[#1F2937] font-medium"
                style={{ fontFamily: "Inter , sans-serif" }}
              >
                /{t("mybookings")}/ {sid}{" "}
              </span>{" "}
            </p>
          }
          username={username}
        />

        <div className="content bg-[#E5E7EB] h-auto  p-5 ">
          <h1
            className="mb-[50px] font-bold text-[#353B47]"
            style={{ fontFamily: "Inter , sans-serif" }}
          >
            {t("Booking")}
          </h1>

          <div
            className=" bg-white  mt-[50px] "
            style={{ borderRadius: "8px" }}
          >
            <div
              className="flex flex-col lg:flex-row w-full justify-bwtween bg-[white] me-[256px]"
              style={{ borderRadius: "8px" }}
            >
              <div className="flex flex-col lg:w-[50%]  gap-2">
                <div class="flex m-3 flex-col h-[340px] md:h-[220px]   bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                  <h1
                    className=" text-[#353B47] font-bold"
                    style={{ fontFamily: "Inter , sans-serif" }}
                  >
                    {t("Booking Details")}
                  </h1>
                  <p className="flex flex-col md:flex-row text-center md:text-start justify-between top-5 relative w-full">
                    <span className="mb-2">
                      <span
                        className=" block mb-2 text-[#4B5563] font-medium"
                        style={{ fontFamily: "Inter,sans-serif" }}
                      >
                        Booking Serial
                      </span>
                      <span className=" text-[#1F2937] font-bold" style={{fontFamily : 'Inter , sans-serif'}}>{bookingSerial}</span>
                    </span>
                    <span className="mb-2">
                      <span
                        className=" block mb-2 text-[#4B5563] font-medium whitespace-nowrap"
                        style={{ fontFamily: "Inter,sans-serif" }}
                      >
                        Booking For
                      </span>
                      <span className=" text-[#1F2937] font-bold" style={{fontFamily : 'Inter , sans-serif'}}>{receipentName}</span>
                    </span>
                  </p>
                  <p className="flex justify-between top-5 relative w-full text-center md:text-start flex-col md:flex-row ">
                    <span>
                      <span
                        className=" block mb-2 text-[#4B5563] font-medium"
                        style={{
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        Insurance Policy
                      </span>
                      <span className=" text-[#1F2937] font-bold" style={{fontFamily : 'Inter , sans-serif'}}>hi</span>
                    </span>
                    <span className=" relative md:end-[54px]">
                      <span
                        className=" block mb-2 text-[#4B5563] font-medium"
                        style={{
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        Cars
                      </span>
                      <span className=" text-[#1F2937] font-bold" style={{fontFamily : 'Inter , sans-serif'}}>{specifiedCars.length}</span>
                    </span>
                  </p>
                </div>
                <div class="flex m-3 flex-col   bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                  <h1
                    className=" text-[#353B47] font-bold"
                    style={{ fontFamily: "Inter , sans-serif" }}
                  >
                    {t("Shipment Details")}
                  </h1>

                  <p
                    className=" flex flex-col sm:flex-row gap-4 sm:gap-0 lg:ps-[20px]  mt-[50px] pt-[10px]  items-center justify-around"
                    style={{ border: "1px solid #E5E7EB", borderRadius: "8px" }}
                  >
                    <span>
                      <span className=" text-[#4B5563]">
                        {t("start Location")} <br />{" "}
                      </span>
                      <span
                        className="text-[#1F2937] font-bold"
                        style={{ fontFamily: "Cairo , sans-serif" }}
                      >
                        {startLocation}
                      </span>
                    </span>

                    <span className="lg:ms-[20px] hidden sm:block">{">"}</span>
                    <span className=" lg:ms-[20px]">
                      <span className=" text-[#4B5563]  ">
                        {t("stop")} <br />{" "}
                      </span>
                      <span
                        className="text-[#1F2937] font-bold"
                        style={{ fontFamily: "Cairo , sans-serif" }}
                      >
                        {stop}
                      </span>
                    </span>
                    <span className=" ms-[10px] hidden sm:block">{">"}</span>
                    <span className=" ms-[30px]">
                      <span className=" text-[#4B5563]">
                        {t("Destination")} <br />{" "}
                      </span>
                      <span
                        className="text-[#1F2937] font-bold"
                        style={{ fontFamily: "Cairo , sans-serif" }}
                      >
                        {endLocation}
                      </span>
                    </span>
                  </p>
                  <p className=" flex flex-col gap-4 sm:gap-0 sm:flex-row mt-[50px] justify-between w-[90%]  ">
                    <span className="text-center sm:text-start">
                      <span className="text-[#4B5563] ">
                        {t("Departure Date")} <br />
                      </span>
                      <span
                        className=" text-[#1F2937] font-bold"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        {travelDate}
                      </span>
                    </span>
                    <span className="text-center sm:text-start">
                      <span className="text-[#4B5563]">
                        {t("Arrival Date")} <br />
                      </span>
                      <span
                        className=" text-[#1F2937] font-bold "
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        {arrivalDate}
                      </span>
                    </span>
                    <span className="text-center sm:text-start">
                      <span className="text-[#4B5563]">
                        {t("Duration")} <br />
                      </span>
                      <span
                        className=" text-[#1F2937] font-bold"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        {getDaysDiff(travelDate, arrivalDate)} {t("Days")}
                      </span>
                    </span>
                  </p>
                  <p className=" mt-[20px] text-center sm:text-start">
                    <span className="text-[#4B5563]">
                      {t("Number of cars")} <br />
                    </span>
                    <span
                      className=" text-[#1F2937] font-bold relative end-7 sm:end-0"
                      style={{ fontFamily: "Inter , sans-serif" }}
                    >
                      {carsNums}
                    </span>
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                  }}
                  className="h-auto mx-4 mb-[20px]"
                >
                  <div className="flex items-center justify-between car-header mb-[20px]">
                    <h1
                      className=" text-[#353B47] font-bold ms-[20px] my-[20px]"
                      style={{ fontFamily: "Inter , sans-serif" }}
                    >
                      {t("Cars")}
                    </h1>
                  </div>
                  {carData &&
                    carData.length > 0 &&
                    carData.map((car) => (
                      <div className="container mb-[20px]">
                        <div className="flex w-[95%]  ms-3  text-sm justify-between gap-9 bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-2 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                          <p className=" text-gray-500">
                            <div className="flex items-center">
                              <img
                                src={`https://soaken.neuecode.com/storage/${car.image}`}
                                alt={`${car.car_name_ar}`}
                                width={"53px"}
                                height={"53px"}
                              />
                              <span className=" font-bold text-[#1F2937] ms-3">
                                {car.car_name_ar}
                                <br />
                                {car.model_ar}
                              </span>
                            </div>
                          </p>
                          <div className=" text-sm">
                            <span
                              className="text-[#1F2937] font-bold "
                              style={{ fontFamily: "Inter , sans-serif" }}
                            >
                              {t("Chassis Number")}
                            </span>
                            <br />
                            <span className=" text-gray-500">
                              {car.chassis_no}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  marginBottom: "20px",
                }}
                className="lg:w-[50%] m-3 h-[503px]"
              >
                <div className="flex p-4 ">
                  <h1
                    className="font-semibold "
                    style={{
                      color: "#353B47",
                      fontFamily: "Inter , sans-serif",
                    }}
                  >
                    {t("Shipment Tracking")}
                  </h1>
                  <a
                    className=" ms-10 h-[30px] rounded-full w-[80px] flex items-center justify-center "
                    style={{ backgroundColor: "#CCFBF1" }}
                  >
                    <span
                      className="block  rounded-full me-[5px] mt-[4px]"
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: "#115E59",
                      }}
                    ></span>{" "}
                    <span style={{ color: "#115E59" }}>{t("status")}</span>
                  </a>
                </div>
                <p
                  className="p-4 -mt-5 font-semibold"
                  style={{ color: "#6B7280", fontSize: "12px" }}
                >
                  1 AuG , 2024
                </p>
                <div className="p-4">
                  <ul className="relative">
                    <li className=" flex ">
                      <div className="min-w-7 min-h-7  text-xs">
                        <span
                          className="size-7 flex justify-center items-center flex-shrink-0  font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white"
                          style={{ backgroundColor: "#CCFBF1" }}
                        >
                          {t("A")}
                        </span>
                        <div className="mt-[0] ms-[13px] w-[1px]  h-[40px] flex-1 bg-[#E5E7EB] group-last:hidden dark:bg-neutral-700"></div>
                      </div>
                      <div
                        className="my-3 "
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        <span className=" relative top-[-12px] left-[20px] font-medium text-gray-800 dark:text-white">
                          <p
                            style={{ color: "#1F2937" }}
                            className="font-semibold"
                          >
                            {t("start")}: Jeddah Islamic Port
                          </p>
                          <span
                            className="block text-xs font-semibold"
                            style={{ color: "#6B7280" }}
                          >
                            1 AuG , 2024
                          </span>
                        </span>
                      </div>
                    </li>

                    <li className=" flex ">
                      <div className="min-w-7 min-h-7 text-xs ">
                        <span
                          className="size-2 mt-[10px] ms-[10px] flex justify-center items-center flex-shrink-0  font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white"
                          style={{ backgroundColor: "#14B8A6" }}
                        ></span>
                        <div className="mt-[4px] ms-[13px] w-[1px]  h-[44px] flex-1 bg-[#E5E7EB] group-last:hidden dark:bg-neutral-700"></div>
                      </div>
                      <div
                        className="my-3"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        <span className=" relative top-[-12px] left-[20px] font-medium text-gray-800 dark:text-white">
                          <p
                            style={{ color: "#1F2937" }}
                            className="font-semibold"
                          >
                            {t("stop")}: Jeddah Islamic Port
                          </p>
                          <span
                            className="block text-xs font-semibold"
                            style={{ color: "#6B7280" }}
                          >
                            3 AuG , 2024
                          </span>
                        </span>
                      </div>
                    </li>

                    <li
                      className=" flex "
                      style={{ borderBottom: "1px solid #80808030" }}
                    >
                      <div className="min-w-7 min-h-7  text-xs">
                        <span
                          className="size-7 flex justify-center items-center flex-shrink-0  font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white"
                          style={{ border: "1px solid #E5E7EB" }}
                        >
                          {t("B")}
                        </span>
                        <div className="mt-[0] ms-[13px] w-[1px]  h-[30px] flex-1 bg-[#E5E7EB] group-last:hidden dark:bg-neutral-700"></div>
                      </div>
                      <div
                        className="my-3 "
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        <span className=" relative top-[-12px] left-[20px] font-medium text-gray-800 dark:text-white">
                          <p
                            style={{ color: "#1F2937" }}
                            className="font-semibold"
                          >
                            {t("Destination")}: Portsudan
                          </p>
                          <span
                            className="block text-xs font-semibold"
                            style={{ color: "#6B7280" }}
                          >
                            8 AuG , 2024
                          </span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex booking">
                  <button
                    className=" ms-auto me-5 p-3 relative -top-2  text-[#1F2937] booking-btn"
                    style={{ border: "1px solid #1F2937", borderRadius: "8px" }}
                  >
                    {t("Cancel Booking")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
