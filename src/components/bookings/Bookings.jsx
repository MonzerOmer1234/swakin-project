import React, { useEffect, useState } from "react";
import Navbar from "../sidebar/navbar/Navbar";
import BookRow from "./BookRow";
import axios from "axios";
import { getAuthToken } from "../util/auth";

import ReactLoading from 'react-loading';
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";

const Bookings = ({
  username,
  serialNumber,
  setBookingSerial,
  changeLang,
  setChangeLang,
  setBookingState,
  setPolicy,
  setBookingStatusId,
}) => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingStatus, setBookingStatus] = useState("");


  const [error , setError] = useState({});

  const [status, setStatus] = useState("");
  const [t] = useTranslation();
  const token = getAuthToken();

  // get all bookings
  async function getBookings() {
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
      setError(error)
    }
  }
  useEffect(() => {
    getBookings();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen w-full lg:ms-[700px] flex justify-center items-center">
       <ReactLoading type="spin" color="blue"/>
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
          navName={
            <p>
              {" "}
              <span
                className="text-[#4B5563]"
                style={{
                  fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                }}
              >
                {t("Bookings")}{" "}
              </span>{" "}
            </p>
          }
          username={username}
        />
        <h1
          className="p-6 font-bold text-xl text-[#353B47]  bg-[#E5E7EB]"
          style={{ fontFamily: changeLang ? "Almarai" : "Inter , sans-serif" }}
        >
          {t("My Bookings")}
        </h1>
        <div className="   bg-[#E5E7EB]  ">
          <div className="bg-[#E5E7EB] h-screen">
            <div class="flex  flex-col">
              <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle ">
                  <div
                    class="overflow-x-hidden  bg-white  mt-[20px] mx-[20px]"
                    style={{ borderRadius: "15px" }}
                  >
                    <table
                      class=" divide-y mx-[20px] my-[20px]   divide-gray-200  dark:divide-neutral-700"
                      style={{
                        border: "1px solid rgba(128,128,128,.19)",
                        borderRadius: "8px",
                        width: "calc(100% - 40px)",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3  text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500 text-center"
                            style={{
                              fontFamily: changeLang
                                ? "Almarai"
                                : "Inter , sans-serif",
                            }}
                          >
                            {t("BOOKING SERIAL")}
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{
                              fontFamily: changeLang
                                ? "Almarai"
                                : "Inter , sans-serif",
                            }}
                          >
                            {t("SHIPMENT SERIAL")}
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{
                              fontFamily: changeLang
                                ? "Almarai"
                                : "Inter , sans-serif",
                            }}
                          >
                            {t("CAR QUANTITY")}
                          </th>

                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{
                              fontFamily: changeLang
                                ? "Almarai"
                                : "Inter , sans-serif",
                            }}
                          >
                            {t("DISCOUNT")}
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{
                              fontFamily: changeLang
                                ? "Almarai"
                                : "Inter , sans-serif",
                            }}
                          >
                            {t("TOTAL")}
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{
                              fontFamily: changeLang
                                ? "Almarai"
                                : "Inter , sans-serif",
                            }}
                          >
                            {t("TAX")}
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{
                              fontFamily: changeLang
                                ? "Almarai"
                                : "Inter , sans-serif",
                            }}
                          >
                            {t("Status")}
                          </th>

                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{
                              fontFamily: changeLang
                                ? "Almarai"
                                : "Inter , sans-serif",
                            }}
                          >
                            {t("ACTION")}
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200  dark:divide-neutral-700">
                        {bookings && bookings.length > 0 ? (
                          bookings.map((booking) => (
                            <BookRow
                              getBookings={getBookings}
                              changeLang={changeLang}
                              setBookingSerial={setBookingSerial}
                              bid={booking.serial_no}
                              setBookingStatusId={setBookingStatusId}
                              sid={booking.shipment.serial_no}
                              quantity={booking.car_qty}
                              discount={booking.discount}
                              total={booking.total}
                              tax={booking.tax}
                              status={booking.status.name_en}
                              statusId={booking.status.id}
                              bSId={booking.booking_status_id}
                              policy={booking.policy}
                              setPolicy={setPolicy}
                              setBookingState={setBookingState}
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
                              transform: "translateY(-50%)",
                            }}
                            className={`relative  top-[75px] ${
                              changeLang ? "left-[-400px]" : "left-[400px]"
                            }  px-[20px] h-[100px]`}
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

                                <h4 class="fi-ta-empty-state-heading text-base font-semibold leading-6 text-gray-950 dark:text-white whitespace-nowrap">
                                  {t("No Bookings available")}
                                </h4>
                              </div>
                            </div>
                          </div>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
