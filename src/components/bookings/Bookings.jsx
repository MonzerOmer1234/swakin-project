import React, { useEffect, useState } from "react";
import Navbar from "../sidebar/navbar/Navbar";
import BookRow from "./BookRow";
import axios from "axios";
import { getAuthToken } from "../util/auth";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";

const Bookings = ({
  username,
  serialNumber,
  setBookingSerial,
  changeLang,
  setChangeLang,
}) => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingStatus , setBookingStatus] = useState('')
  const [bookingStatusId , setBookingStatusId] = useState(0)
  const [error, setError] = useState({});
  const [status , setStatus] = useState('')
  const [t] = useTranslation();
  const token = getAuthToken();
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
      // you have to write code here
    }
  }
  useEffect(() => {
    getBookings();
  }, []);

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
                            style={{fontFamily : changeLang ? 'Almarai' : 'Inter , sans-serif'}}
                          >
                            {t("BOOKING SERIAL")}
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{fontFamily : changeLang ? 'Almarai' : 'Inter , sans-serif'}}
                          >
                            {t("SHIPMENT SERIAL")}
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{fontFamily : changeLang ? 'Almarai' : 'Inter , sans-serif'}}
                          >
                            {t("CAR QUANTITY")}
                          </th>

                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{fontFamily : changeLang ? 'Almarai' : 'Inter , sans-serif'}}
                          >
                            {t("DISCOUNT")}
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{fontFamily : changeLang ? 'Almarai' : 'Inter , sans-serif'}}
                          >
                            {t("TOTAL")}
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{fontFamily : changeLang ? 'Almarai' : 'Inter , sans-serif'}}
                          >
                            {t("TAX")}
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{fontFamily : changeLang ? 'Almarai' : 'Inter , sans-serif'}}
                          >
                            {t("Status")}
                          </th>

                          <th
                            scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                            style={{fontFamily : changeLang ? 'Almarai' : 'Inter , sans-serif'}}
                          >
                            {t("ACTION")}
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                        {bookings &&
                          bookings.length > 0 &&
                          bookings.map((booking) => (
                            <BookRow
                            getBookings = {getBookings}
                              changeLang={changeLang}
                              setBookingSerial={setBookingSerial}
                              bid={booking.serial_no}
                              sid={booking.shipment.serial_no}
                              quantity={booking.car_qty}
                              discount={booking.discount}
                              total={booking.total}
                              tax={booking.tax}
                              status={booking.status.name_en}
                              bSId = {booking.booking_status_id}
                            />
                          ))}
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
