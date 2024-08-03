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
import Map from "../Map/Map";
import DeleteModal from "../../UI/DeleteModal";
import CancelBookingModal from "../../UI/CancelBookingModal";
import ReactLoading from "react-loading";
import { useRef } from "react";

export default function SingleBookingDetail({
  username,
  startLocation,
  endLocation,

  changeLang,
  setChangeLang,

  specifiedCars,
   
  bookingState,
  setBookingState,
  bookingStatusId,
  showCancelBookingModal,
  setShowCancelBookingModal,


}) {
  const { bid } = useParams();
  const [carData, setCarData] = useState([]);
  const [error, setError] = useState({});

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);
  const [t] = useTranslation();
  const [bookingData, setBookingData] = useState({});

  const [shipmentData, setShipmentData] = useState({});
  const [stop, setStop] = useState([]);
  const [lat, setLat] = useState(29.6);
  const [long, setLong] = useState(32.4);
  const [status , setStatus] = useState({})
  const carIds = specifiedCars.join(",");
   

  console.log(bid);



  const token = getAuthToken();

  async function getCarData() {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://soaken.neuecode.com/api/get-cars?cars=${carIds}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);

      setCarData(res.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  const getBookings = useCallback(
    async function () {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://soaken.neuecode.com/api/get-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res);
        setBookings(res.data.data);
      
     
        console.log(bookings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        // you have to write code here
      }
    },
    [bookings, token]
  );

  useEffect(() => {
    getBookings();

    getCarData();
  }, []);

  const getBookingsDetails = useCallback(async function () {
    const token = getAuthToken();
    try {
      const res = await axios.get(
        `https://soaken.neuecode.com/api/get-bookings/${bid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setBookingData(res.data.data);
      console.log(res.data.data.shipment);
      setShipmentData(res.data.data.shipment);
      setStatus(res.data.data.status)
      setStop(res.data.data.shipment.shipment_location_point);

      setLat(res.data.data.shipment.lat);
      setLong(res.data.data.shipment.long);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }, [bid]);

  // cancel booking and get the latest booking statuses.
  const handleCancelBooking = useCallback(
    async function () {
      const formData = { serial_no: bid };
      const token = getAuthToken();
      const res = await axios.post(
        "https://soaken.neuecode.com/api/cancel-bookings",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);
      setBookingData(res.data.data);
      setBookingState("Canceled");
      console.log(bookingState);
      getBookings();
      console.log(bookingData);

      console.log(bookingData.booking_status_id);
    },
    [bookingData, bid, getBookings, bookingState, setBookingState]
  );

  useEffect(() => {
    const interval = setInterval(function () {
      getBookingsDetails();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  console.log(bookingData, shipmentData);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <ReactLoading type="spin" color="blue" />
      </div>
    );
  }
  // handing network errors
  // if (error && error.message === "Network Error") {
  //   return (
  //     <>
  //       <div className=" flex flex-col justify-center items-center w-screen h-screen gap-4">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="100px"
  //           height="100px"
  //           viewBox="0 0 16 16"
  //         >
  //           <g fill="#2e3436">
  //             <path
  //               d="m 8 1.992188 c -2.617188 0 -5.238281 0.933593 -7.195312 2.808593 l -0.496094 0.480469 c -0.3984378 0.378906 -0.410156 1.011719 -0.03125 1.410156 c 0.382812 0.398438 1.015625 0.410156 1.414062 0.027344 l 0.5 -0.476562 c 3.085938 -2.953126 8.53125 -2.953126 11.617188 0 l 0.5 0.476562 c 0.398437 0.382812 1.03125 0.371094 1.414062 -0.027344 c 0.378906 -0.398437 0.367188 -1.03125 -0.03125 -1.410156 l -0.496094 -0.480469 c -1.957031 -1.875 -4.578124 -2.808593 -7.195312 -2.808593 z m -0.03125 4.007812 c -1.570312 0.011719 -3.128906 0.628906 -4.207031 1.8125 l -0.5 0.550781 c -0.375 0.40625 -0.347657 1.042969 0.0625 1.414063 c 0.410156 0.371094 1.042969 0.339844 1.414062 -0.070313 l 0.5 -0.542969 c 1.242188 -1.363281 3.992188 -1.492187 5.398438 -0.128906 c 0.121093 -0.023437 0.242187 -0.035156 0.363281 -0.035156 c 0.53125 0 1.039062 0.210938 1.414062 0.585938 l 0.222657 0.222656 c 0.011719 -0.011719 0.023437 -0.019532 0.039062 -0.03125 c 0.40625 -0.371094 0.4375 -1.007813 0.0625 -1.414063 l -0.5 -0.550781 c -1.125 -1.230469 -2.703125 -1.824219 -4.269531 -1.8125 z m 0.03125 4 c -0.511719 0 -1.023438 0.195312 -1.414062 0.585938 c -0.78125 0.78125 -0.78125 2.046874 0 2.828124 s 2.046874 0.78125 2.828124 0 c 0.210938 -0.210937 0.359376 -0.453124 0.457032 -0.714843 l -0.285156 -0.285157 c -0.554688 -0.554687 -0.707032 -1.367187 -0.46875 -2.070312 c -0.335938 -0.226562 -0.726563 -0.34375 -1.117188 -0.34375 z m 0 0"
  //               fill-opacity="0.34902"
  //             />
  //             <path d="m 11 10 c -0.265625 0 -0.519531 0.105469 -0.707031 0.292969 c -0.390625 0.390625 -0.390625 1.023437 0 1.414062 l 1.292969 1.292969 l -1.292969 1.292969 c -0.390625 0.390625 -0.390625 1.023437 0 1.414062 s 1.023437 0.390625 1.414062 0 l 1.292969 -1.292969 l 1.292969 1.292969 c 0.390625 0.390625 1.023437 0.390625 1.414062 0 s 0.390625 -1.023437 0 -1.414062 l -1.292969 -1.292969 l 1.292969 -1.292969 c 0.390625 -0.390625 0.390625 -1.023437 0 -1.414062 c -0.1875 -0.1875 -0.441406 -0.292969 -0.707031 -0.292969 s -0.519531 0.105469 -0.707031 0.292969 l -1.292969 1.292969 l -1.292969 -1.292969 c -0.1875 -0.1875 -0.441406 -0.292969 -0.707031 -0.292969 z m 0 0" />
  //           </g>
  //         </svg>
  //         <h1 className="text-red-500 font-semibold  ">{t(error.message)}</h1>
  //         <p className=" text-red-500 font-semibold">
  //           {t("please check your connection !!!")}
  //         </p>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      {showCancelBookingModal && (
        <CancelBookingModal
          bookings={bookings}
          setBookings={setBookings}
          setShowCancelBookingModal={setShowCancelBookingModal}
          bookingData={bookingData}
          setBookingData={setBookingData}
          bookingState={bookingState}
          setBookingState={setBookingState}
          bookingSerial={bid}
          changeLang={changeLang}
        />
      )}
      <SideTabs
        sid={bid}
        changeLang={changeLang}
        setChangeLang={setChangeLang}
      />
      <div className="lg:col-span-12 lg:ms-[256px]">
        <Navbar
          setChangeLang={setChangeLang}
          changeLang={changeLang}
          navName={
            <p>
              <span
                className="text-[#4B5563]"
                style={{
                  fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                }}
              >
                {t("Shipments")}{" "}
              </span>{" "}
              <span
                className="text-[#1F2937] font-medium"
                style={{
                  fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                }}
              >
                /{t("mybookings")}/ {bid}{" "}
              </span>{" "}
            </p>
          }
          username={username}
        />

        <div className="content bg-[#E5E7EB] h-auto  p-5 ">
          <h1
            className="mb-[50px] font-bold text-[#353B47]"
            style={{
              fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
            }}
          >
            {t("Booking Details")}
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
                    style={{
                      fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                    }}
                  >
                    {t("Booking Details")}
                  </h1>
                  <p className="flex flex-col md:flex-row text-center md:text-start justify-between top-5 relative w-full">
                    <span className="mb-2">
                      <span
                        className=" block mb-2 text-[#4B5563] font-medium"
                        style={{
                          fontFamily: changeLang
                            ? "Almarai"
                            : "Inter , sans-serif",
                        }}
                      >
                        {t("Booking Serial")}
                      </span>
                      <span
                        className=" text-[#1F2937] font-bold"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        {bookingData.serial_no}
                      </span>
                    </span>
                    <span className="mb-2">
                      <span
                        className=" block mb-2 text-[#4B5563] font-medium whitespace-nowrap"
                        style={{
                          fontFamily: changeLang
                            ? "Almarai"
                            : "Inter , sans-serif",
                        }}
                      >
                        {t("Booking For")}
                      </span>
                      <span
                        className=" text-[#1F2937] font-bold whitespace-nowrap"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        {bookingData.recipient_name}
                      </span>
                    </span>
                  </p>
                  <p className="flex justify-between top-5 relative w-full text-center md:text-start flex-col md:flex-row ">
                    <span>
                      <span
                        className=" block mb-2 text-[#4B5563] font-medium"
                        style={{
                          fontFamily: changeLang
                            ? "Almarai"
                            : "Inter , sans-serif",
                        }}
                      >
                        {t("Insurance Policy")}
                      </span>
                      <span
                        className=" text-[#1F2937] font-bold"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        {bookingData.policy}
                      </span>
                    </span>
                    <span className=" relative md:end-[54px]">
                      <span
                        className=" block mb-2 text-[#4B5563] font-medium"
                        style={{
                          fontFamily: changeLang
                            ? "Almarai"
                            : "Inter , sans-serif",
                        }}
                      >
                        {t("Cars")}
                      </span>
                      <span
                        className=" text-[#1F2937] font-bold"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        {bookingData.car_qty}
                      </span>
                    </span>
                  </p>
                </div>
                <div class="flex m-3 flex-col   bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                  <h1
                    className=" text-[#353B47] font-bold"
                    style={{
                      fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                    }}
                  >
                    {t("Shipment Details")}
                  </h1>

                  <ol
                    className="flex flex-col places sm:flex-row  justify-between sm:gap-0 items-center journey-details whitespace-nowrap py-3 ps-6 mt-5 mx-7  lg:me-0  lg:w-[91%]"
                    style={{
                      border: "1px solid rgba(128, 128, 128, 0.19)",
                      borderRadius: "8px",
                    }}
                  >
                    <li
                      className="places"
                      style={{
                        fontFamily: changeLang
                          ? "Almarai"
                          : "Inter , sans-serif",
                      }}
                    >
                      <a
                        className="flex  flex-col   items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                        href="#"
                      >
                        {t("start Location")} <br />{" "}
                        <span className=" font-bold block text-[#1F2937]">
                          {shipmentData.start_location}
                        </span>
                      </a>
                    </li>

                    <span className="hidden sm:inline dest"> {t(">")}</span>
                    <li
                      className=" flex flex-col places sm:flex-row  lg:ms-0"
                      style={{
                        fontFamily: changeLang
                          ? "Almarai"
                          : "Inter , sans-serif",
                      }}
                    >
                      {stop.map((point) => (
                        <>
                          <a className="inline-flex flex-col ps-3   items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
                            {t("stop")}
                            <br />{" "}
                            <span className=" font-bold text-[#1F2937]">
                              {point.location_point.name_ar}
                            </span>
                          </a>
                          <span className="hidden sm:inline relative top-3 ms-[10px] dest">
                            {" "}
                            {t(">")}
                          </span>
                        </>
                      ))}
                    </li>
                    <li
                      className=" flex-col items-center text-sm font-semibold text-gray-500 truncate dark:text-neutral-200"
                      aria-current="page"
                      style={{
                        fontFamily: changeLang
                          ? "Almarai"
                          : "Inter , sans-serif",
                      }}
                    >
                      <span
                        className={`relative final-place  sm:ms-0 ${
                          changeLang ? "ms-[35px]" : "ms-5"
                        }`}
                      >
                        {t("Destination")}{" "}
                      </span>{" "}
                      <br />
                      <span className=" font-bold text-[#1F2937]">
                        {shipmentData.end_location}
                      </span>
                    </li>
                  </ol>
                  <p className=" flex flex-col gap-4 ms-[40px] sm:ms-0 sm:gap-0 sm:flex-row mt-[50px] justify-between w-[90%]  ">
                    <span
                      className="text-center sm:text-start"
                      style={{
                        fontFamily: changeLang
                          ? "Almarai"
                          : "Inter , sans-serif",
                      }}
                    >
                      <span className="text-[#4B5563] ">
                        {t("Departure Date")} <br />
                      </span>
                      <span
                        className=" text-[#1F2937] font-bold"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        {shipmentData.travel_date}
                      </span>
                    </span>
                    <span
                      className="text-center sm:text-start"
                      style={{
                        fontFamily: changeLang
                          ? "Almarai"
                          : "Inter , sans-serif",
                      }}
                    >
                      <span className="text-[#4B5563]">
                        {t("Arrival Date")} <br />
                      </span>
                      <span
                        className=" text-[#1F2937] font-bold "
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        {shipmentData.arrival_date}
                      </span>
                    </span>
                    <span
                      className="text-center sm:text-start"
                      style={{
                        fontFamily: changeLang
                          ? "Almarai"
                          : "Inter , sans-serif",
                      }}
                    >
                      <span className="text-[#4B5563]">
                        {t("Duration")} <br />
                      </span>
                      <span
                        className=" text-[#1F2937] font-bold"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        {getDaysDiff(
                          shipmentData.travel_date,
                          shipmentData.arrival_date
                        )}{" "}
                        {t("Days")}
                      </span>
                    </span>
                  </p>
                  <p
                    className=" mt-[20px] ms-[40px] sm:ms-0 text-center sm:text-start"
                    style={{
                      fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                    }}
                  >
                    <span className="text-[#4B5563]">
                      {t("Number of cars")} <br />
                    </span>
                    <span
                      className=" text-[#1F2937] ms-[40px] sm:ms-0 font-bold relative end-7 sm:end-0"
                      style={{ fontFamily: "Inter , sans-serif" }}
                    >
                      {shipmentData.cars_no}
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
                      style={{
                        fontFamily: changeLang
                          ? "Almarai"
                          : "Inter , sans-serif",
                      }}
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
                              style={{
                                fontFamily: changeLang
                                  ? "Almarai"
                                  : "Inter , sans-serif",
                              }}
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
                      fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                    }}
                  >
                    {t("Shipment Tracking")}
                  </h1>
                  <a className=" ms-10 h-[30px] rounded-full w-[80px] flex items-center justify-center ">
                    <span
                      className={`block  rounded-full me-[5px] mt-[4px]`}
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                      }}
                    ></span>{" "}
                    <span
                      className={`p-3 ms-10 ${
                        changeLang
                          ? "w-fit h-[55px]  rounded-[50px] whitespace-nowrap"
                          : "rounded-[50px] whitespace-nowrap"
                      } `}
                      style={{
                        color:
                          status.name_en === "Pending" ||
                          status.name_en === "On Progress"
                            ? "#1F2937"
                            : status.name_en === "Completed" ||
                              status.name_en === "Confirmed"
                            ? "#115E59"
                            : "#EF4444",
                        fontFamily: changeLang
                          ? "Almarai"
                          : "Inter , sans-serif",
                        backgroundColor:
                          status.name_en === "Pending" ||
                          status.name_en === "On Progress"
                            ? " #E5E7EB"
                            : status.name_en === "Completed" ||
                              status.name_en === "Confirmed"
                            ? "#CCFBF1"
                            : "#FECACA",
                      }}
                    >
                      {" "}
                      {t(status.name_en)}
                    </span>
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
                        <span
                          className={` relative top-[-12px] ${
                            changeLang ? "left-[-20px]" : "left-[20px]"
                          } font-medium text-gray-800 dark:text-white`}
                        >
                          <p
                            style={{
                              color: "#1F2937",
                              fontFamily: changeLang
                                ? "Almarai"
                                : "Inter , sans-serif",
                            }}
                            className="font-semibold"
                          >
                            {t("start")}: {startLocation}
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
                    {stop.map((point) => (
                      <li className=" flex ">
                        <div className="min-w-7 min-h-7 text-xs ">
                          <span
                            className="size-2 mt-[10px] ms-[10px] flex justify-center items-center flex-shrink-0  font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white"
                            style={{
                              backgroundColor:
                                point.is_stop === 0 ? "#9CA3AF" : "#14B8A6",
                            }}
                          ></span>
                          <div className="mt-[4px] ms-[13px] w-[1px]  h-[44px] flex-1 bg-[#E5E7EB] group-last:hidden dark:bg-neutral-700"></div>
                        </div>
                        <div
                          className="my-3"
                          style={{
                            fontFamily: changeLang
                              ? "Almarai"
                              : "Inter , sans-serif",
                          }}
                        >
                          <span
                            className={`relative top-[-12px] ${
                              changeLang ? "left-[-20px]" : "left-[20px]"
                            }  font-medium text-gray-800 dark:text-white`}
                          >
                            <p
                              style={{ color: "#1F2937" }}
                              className="font-semibold "
                            >
                              {t("stop")}:{point.location_point.name_en}
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
                    ))}

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
                        <span
                          className={`relative top-[-12px] ${
                            changeLang ? "left-[-20px]" : "left-[20px]"
                          }  font-medium text-gray-800 dark:text-white`}
                        >
                          <p
                            style={{
                              color: "#1F2937",
                              fontFamily: changeLang
                                ? "Almarai"
                                : "Inter , sans-serif",
                            }}
                            className="font-semibold"
                          >
                            {t("Destination")}: {endLocation}
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
                {bookingState !== "Canceled" && (
                  <div className="flex booking">
                    <button
                      onClick={() => setShowCancelBookingModal(true)}
                      className=" ms-auto me-5 p-3 relative -top-2  text-[#1F2937] booking-btn"
                      style={{
                        border: "1px solid #1F2937",
                        borderRadius: "8px",
                        fontFamily: changeLang
                          ? "Almarai"
                          : "Inter , sans-serif",
                      }}
                    >
                      {t("Cancel Booking")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" ms-[-80px] lg:ms-[20px]" style={{ width: "80vw" }}>
        {bookingStatusId === 3 && <Map lat={lat} long={long} />}
      </div>
    </>
  );
}
