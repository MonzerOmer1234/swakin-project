import axios from "axios";
import { useEffect, useState } from "react";
import { getAuthToken } from "../util/auth";
import { useTranslation } from "react-i18next";
import ReactLoading from 'react-loading'
import { Link } from "react-router-dom";

export default function DashboardContentOne({ changeLang }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [status, setStatus] = useState({});
  const [shipmentData, setShipmentData] = useState({});
  const [stops, setStops] = useState([]);
  const [activeBooking, setActiveBooking] = useState({});
  const [bookingSerial , setBookingSerial] = useState(0)

  const [t] = useTranslation();

  const token = getAuthToken();

  // get all data to get the active booking
  async function getData() {
    try {
      setLoading(true);
      const res = await axios.get("https://soaken.neuecode.com/api/get-data", {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      });

      console.log(res);
      setActiveBooking(res.data.data.active_booking);
      setBookingSerial(res.data.data.active_booking.serial_no)
      setStatus(res.data.data.active_booking.status);
      setShipmentData(res.data.data.active_booking.shipment);
      setStops(res.data.data.active_booking.shipment.shipment_location_point);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  // loading
  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
     <ReactLoading type="spin" color="#1D4ED8"/>
      </div>
    );
  }

  // error of network
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
  console.log(activeBooking);
  console.log(status);
  console.log(shipmentData);
  console.log(stops);
  console.log(bookingSerial)

  return (
    <>
      {activeBooking ? (
        <div
          style={{
            height: "auto",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #E5E7EB",
            marginBottom: "20px",
          }}
          className="me-[20px] lg:me-0 "
        >
          <div className="flex p-4 ">
            <h1
              className="font-semibold "
              style={{
                color: "#353B47",
                fontFamily: window.localStorage.getItem('lang') === "ar"  ||
                !window.localStorage.getItem("lang")  ? "Almarai" : "Inter , sans-serif",
              }}
            >
              {t("Active Booking")}
            </h1>
            <a
              className=" ms-10 h-[30px] rounded-full w-[161px] flex items-center justify-center "
              style={{ backgroundColor: "#CCFBF1" , color : '#115E59' }}
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
              <span
                style={{
                  color: "#1F2937",
                  fontFamily: "Almarai",
                  whiteSpace: "nowrap",
                }}
              >
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
                    className={`relative top-[-12px] ${
                      window.localStorage.getItem('lang') === "ar"  ||
                      !window.localStorage.getItem("lang")  ? "start-[20px]" : "end-[-20px]"
                    } font-medium text-gray-800 dark:text-white`}
                  >
                    <p
                      style={{ color: "#1F2937", fontFamily: "Almarai" }}
                      className="font-semibold"
                    >
                      {t("start")} : {shipmentData.start_location}
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
              {stops.map((stop) => (
                <li className=" flex ">
                  <div className="min-w-7 min-h-7 text-xs ">
                    <span
                      className="size-2 mt-[10px] ms-[10px] flex justify-center items-center flex-shrink-0  font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white"
                      style={{ backgroundColor: stop.is_stop === 0 ? '#9CA3AF' : "#14B8A6" }}
                    ></span>
                    <div className="mt-[4px] ms-[13px] w-[1px]  h-[44px] flex-1 bg-[#E5E7EB] group-last:hidden dark:bg-neutral-700"></div>
                  </div>
                  <div
                    className="my-3"
                    style={{ fontFamily: "Inter , sans-serif" }}
                  >
                    <span
                      className={`relative top-[-12px] ${
                        !changeLang ? "start-[20px]" : "end-[-20px]"
                      } font-medium text-gray-800 dark:text-white`}
                    >
                      <p
                        style={{ color: "#1F2937", fontFamily: "Almarai" }}
                        className="font-semibold"
                      >
                        {t("stop")}: {stop.location_point.name_en}
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
                    className={` relative top-[-12px] ${
                      window.localStorage.getItem('lang') === "ar"  ||!window.localStorage.getItem("lang") ? "start-[20px]" : "end-[-20px]"
                    } font-medium text-gray-800 dark:text-white`}
                  >
                    <p
                      style={{ color: "#1F2937", fontFamily: "Almarai" }}
                      className="font-semibold"
                    >
                      {t("Destination")}: {shipmentData.end_location}
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
            <div className="flex p-4 booking">
                    <Link
                        to={`/shipments/mybookings/${bookingSerial}`}
                      className=" ms-auto -me-2 p-3 relative top-2 text-[#1F2937] booking-btn"
                      style={{
                        border: "1px solid #1F2937",
                        borderRadius: "8px",
                        fontFamily: window.localStorage.getItem('lang') === "ar"  ||!window.localStorage.getItem("lang")
                          ? "Almarai"
                          : "Inter , sans-serif",
                      }}
                    >
                      {t("Track Your Shipment")}
                    </Link>
                  </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "auto",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #E5E7EB",
            marginBottom: "20px",
          }}
          className="me-[20px] lg:me-0 "
        >
          <div className="flex p-4 justify-center items-center ">
          <div class="fi-ta-empty-state-content mx-auto grid max-w-lg justify-items-center text-center">
        <div class="fi-ta-empty-state-icon-ctn mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-500/20">
              <svg class="fi-ta-empty-state-icon h-6 w-6 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
</svg>
        </div>

        <h4 class="fi-ta-empty-state-heading text-base font-semibold leading-6 text-gray-950 dark:text-white">
        {t('No active Booking Available')}
</h4>

     

    </div>
          </div>

          
        </div>
      )}
    </>
  );
}
