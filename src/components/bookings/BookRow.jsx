import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import SingleBookingDetail from "./SingleBookingDetail";

export default function BookRow({
  bid,
  sid,
  quantity,
  discount,
  total,
  tax,
  status,
  setBookingSerial,
  changeLang,
  bSId,
  getBookings,
  setBookingState,
  setPolicy,
  policy,
  setBookingStatusId,
  statusId
}) {
  const [closeActions, setCloseActions] = useState(true);
  const [t] = useTranslation();
  const [bookingData, setBookingData] = useState({});
  console.log(status);

  // click dots for options
  function handleClickDots() {
    setCloseActions(!closeActions);
    setBookingSerial(bid);
    setBookingState(status);
    setBookingStatusId(statusId)
    setPolicy(policy);
  }


  // cancel booking and update the UI

  const handleCancelBooking = useCallback(
    async function () {
      setCloseActions(true);
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
      setBookingData(res);
      getBookings();

      console.log(res);
      console.log(status);
      console.log(bSId);
      console.log(bookingData);
    },
    [status, bSId, bookingData, bid, getBookings]
  );

  return (
    <tr>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937] dark:text-neutral-200 text-center">
        {bid}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937] dark:text-neutral-200 text-center">
        {sid}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937] dark:text-neutral-200 text-center">
        {quantity}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937] dark:text-neutral-200 text-center">
        {discount}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937] dark:text-neutral-200 text-center">
        {total}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937] dark:text-neutral-200 text-center">
        {tax}
      </td>
      <td class="px-6 py-4 flex justify-center whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-center">
        <div
          className={`${
            status === "Pending" 
              ? " bg-[#E5E7EB]"
              : status === "Completed"  || status === "Confirmed" || status === "On Progress"
              ? " bg-[#CCFBF1]"
              : "bg-[#FECACA]"
          } flex items-center w-fit p-[15px] h-[28px]   rounded-full ms-2`}
        >
          <span
            style={{ width: "5px", height: "5px", borderRadius: "50%" }}
            className={` block mt-[3px]  ${
              status === "Pending" 
                ? " bg-[#1F2937]"
                : status === "Completed"  || status === "Confirmed" || status === "On Progress"
                ? " bg-[#115E59]"
                : "bg-[#EF4444]"
            }`}
          ></span>
          <span
            className={` block mt-[3px] ms-3 font-medium ${
              status === "Pending" 
                ? " text-[#1F2937]"
                : status === "Completed" || status === "Confirmed" || status === "On Progress"
                ? " text-[#115E59]"
                : "text-[#EF4444]"
            }`}
          >
            {t(status)}
          </span>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
        <div class="relative inline-block text-left">
          <div>
            <button
              onClick={handleClickDots}
              type="button"
              class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900   hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 12H12.01M12 6H12.01M12 18H12.01M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18ZM13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div
            className={`absolute -mt-[40px] ${!window.localStorage.getItem('lang') === "ar" && 'me-10 w-[200px]'}  ${
              window.localStorage.getItem('lang') === "ar"  ||!window.localStorage.getItem("lang")? "right-[-77px]" : "right-0"
            } z-10 mt-2 ${
              window.localStorage.getItem('lang') === "ar"  ||!window.localStorage.getItem("lang")? " w-40" : "w-56"
            } origin-top-right rounded-md bg-white shadow-lg  ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            {!closeActions && (
              <div class={`py-1 `} role="none">
                <Link
                  
                  to={`/shipments/mybookings/${bid}` }
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                  onClick={() => setCloseActions(true)}
                  style={{
                    fontFamily: window.localStorage.getItem('lang') === "ar"  ||!window.localStorage.getItem("lang")? "Almarai" : "Inter , sans-serif",
                  }}
                >
                 
                  {t("Show Booking details")}
                </Link>
                {status !== "Canceled" && (
                  <Link
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-1"
                    style={{
                      fontFamily: window.localStorage.getItem('lang') === "ar"  ||!window.localStorage.getItem("lang")? "Almarai" : "Inter , sans-serif",
                    }}
                    onClick={handleCancelBooking}
                  >
                    {t("Cancel Booking")}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}
