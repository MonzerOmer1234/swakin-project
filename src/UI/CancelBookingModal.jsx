import { getAuthToken } from "../components/util/auth";
import { useCallback, useEffect } from "react";
import "./modal.css";
import axios from "axios";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
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

  const token = getAuthToken();

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
      }
    },
    [bookings, token, setBookings]
  );

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

  useEffect(() => {
    getBookings();
  }, []);
  if (loading) {
    return (
      <div className={`${changeLang ? "delete-overlay-ar" : "overlay"}`}>
        <div className=" flex justify-center items-center relative top-2/4">
          <SkeletonTheme baseColor="gray" highlightColor="#444">
            <p>
              <Skeleton count={10} width={"200px"} />
            </p>
          </SkeletonTheme>
        </div>
      </div>
    );
  }
  console.log(changeLang);

  return (
    <>
      <div
        className={`${changeLang ? "delete-overlay-ar" : "overlay"}`}
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
