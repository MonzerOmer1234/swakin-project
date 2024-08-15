import { getAuthToken } from "../components/util/auth";
import { useCallback, useEffect } from "react";
import "./modal.css";
import axios from "axios";
import { useState } from "react";
import ReactLoading from 'react-loading';
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
export default function CancelBookingModal({
  setShowCancelBookingModal,
  bookings,
  setBookings,
  changeLang,
  bookingState,
  setBookingState,
  bookingData,
  setBookingData,
  bookingSerial,
}) {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [error , setError] = useState({})

  const token = getAuthToken();

  // get all bookings to update the ui after cancelling booking

  const getBookings = useCallback(
    async function () {
      try {
        setBookingsLoading(true);
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
        setBookingsLoading(false);
      } catch (error) {
        console.log(error);
        // you have to write code here
        setError(error)
      }
    },
    [bookings, token, setBookings]
  );


  // Cancel booking api

  const handleCancelBooking = useCallback(
    async function () {
      const formData = { serial_no: bookingSerial };
      const token = getAuthToken();
      setLoading(true);
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
      setLoading(false);
      getBookings();
      setShowCancelBookingModal(false);
      console.log(bookingData);

      console.log(bookingData.booking_status_id);
    },
    [
      bookingData,
      bookingSerial,
      getBookings,
      bookingState,
      setBookingData,
      setBookingState,
      setShowCancelBookingModal,
    ]
  );


  // get the latest bookings with each render

  useEffect(() => {
    getBookings();
  }, []);
  // skeleton loading
  if (loading) {
    return (
      <div className={`${window.localStorage.getItem('lang') === "ar"  ||!window.localStorage.getItem("lang") ? "delete-overlay-ar" : "overlay"}`}>
        <div className=" flex justify-center items-center relative top-2/4">
        <ReactLoading type="spin" color="#1D4ED8"/>
        </div>
      </div>
    );
  }
  console.log(changeLang);

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
      <div
        className={`${window.localStorage.getItem('lang') === "ar"  ||!window.localStorage.getItem("lang") ? "delete-overlay-ar" : "overlay"}`}
        onClick={() => setShowCancelBookingModal(false)}
      >
        <div className={`cancel-booking-modal-content`}>
          <div className="  top-[30px] relative mb-[25px] flex justify-center  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#d9534f"
              width="50px"
              height="50px"
              viewBox="0 0 32 32"
              version="1.1"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>cancel</title>{" "}
                <path d="M10.771 8.518c-1.144 0.215-2.83 2.171-2.086 2.915l4.573 4.571-4.573 4.571c-0.915 0.915 1.829 3.656 2.744 2.742l4.573-4.571 4.573 4.571c0.915 0.915 3.658-1.829 2.744-2.742l-4.573-4.571 4.573-4.571c0.915-0.915-1.829-3.656-2.744-2.742l-4.573 4.571-4.573-4.571c-0.173-0.171-0.394-0.223-0.657-0.173v0zM16 1c-8.285 0-15 6.716-15 15s6.715 15 15 15 15-6.716 15-15-6.715-15-15-15zM16 4.75c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25-11.25-5.037-11.25-11.25c0.001-6.213 5.037-11.25 11.25-11.25z" />{" "}
              </g>
            </svg>
          </div>
          <span
            onClick={() => setShowCancelBookingModal(false)}
            className=" absolute right-[20px] top-[20px] pe-3 font-bold text-xl cursor-pointer"
          >
            x
          </span>
          <p
            className={` text-red-700 py-5  md:px-[80px] font-bold  whitespace-nowrap `}
          >
            {t("Are you sure you want to cancel this booking?")}
          </p>
          <div className="flex mt-4 justify-center gap-3">
            <button
              onClick={() => setShowCancelBookingModal(false)}
              className="  p-3 relative -top-2  text-[#1F2937] booking-btn font-semibold"
              style={{
                border: "1px solid #1F2937",
                borderRadius: "8px",
                fontFamily: "Inter , sans-serif",
              }}
            >
              {t("No")}
            </button>
            <button
              onClick={handleCancelBooking}
              className="  p-3 relative -top-2  text-[white] bg-red-700  booking-btn"
              style={{ border: "1px solid red", borderRadius: "8px" }}
            >
              {t("Yes")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
