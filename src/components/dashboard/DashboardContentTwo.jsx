import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { getDaysDiff } from "../util/calculate-days-diff";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { getAuthToken } from "../util/auth";
import { useEffect } from "react";

export default function DashboardContentTwo({
  serialNo,
  price,
  changeLang,
  startLocation,
  endLocation,
  status,
  shipmentName,
  travelDate,
  arrivalDate,
  setAvailableSeats,
  setSerialNumber,
  carNumbers,
  lat,
  long,
  setStartLocation,
  setEndLocation,
  setTravelDate,
  setArrivalDate,
  setCarsNums,
  setPrice,
  setShipName,
  setShipmentId,
  setStop,
  shipmentId,
  stopPoints,
  setLat,
  setLong,
  specifiedCars,
  setSpecifiedCars
}) {
  console.log(changeLang);

  const [t] = useTranslation();
  const navigate = useNavigate();

  // set all shipment credentials with clicking book now button
  function handleBooking() {
    setAvailableSeats(carNumbers);
    setSerialNumber(serialNo);
    setArrivalDate(arrivalDate);
    setTravelDate(travelDate);
  
    setStartLocation(startLocation);
    setEndLocation(endLocation);
    setStop(stopPoints);
    setCarsNums(carNumbers);
    setPrice(price);
    setShipName(shipmentName);
    setShipmentId(shipmentId);
    window.localStorage.setItem('specified_cars' , '[]')
    // navigate(`/shipments/${serialNo}/booking`);
    
  }
  // const date1 = new Date('7/13/2010');
  // const date2 = new Date('12/15/2010');
  // const diffTime = Math.abs(date2 - date1);
  // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  console.log(stopPoints);

  const diff = getDaysDiff(travelDate, arrivalDate);

  console.log(diff);
  console.log(changeLang);

  return (
    <>
      <div
        style={{
          height: "auto",
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #F1F1F2",
          margin: "20px 20px 20px",
        }}
        className=" col-span-12  md:col-span-6 lg:col-span-6"
      >
        <div className=" mx-1 overflow-scroll  p-6  relative  flex   gap-4 items-center">
          <div className="flex items-center gap-5">
          <div className="bg-[#F1F1F2]  h-[20px] w-[20px]">
            
            <svg
              className="size-4 my-[0.5px] ms-[0.5px]"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.42 12.3699C21.29 12.7199 21.83 13.7499 21.63 14.6599L21.22 16.5199C20.51 19.7199 18 21.9999 14.38 21.9999H9.61998C5.99998 21.9999 3.48999 19.7199 2.77999 16.5199L2.36998 14.6599C2.16998 13.7499 2.70997 12.7199 3.57997 12.3699L4.99999 11.7999L10.51 9.58993C11.47 9.20993 12.53 9.20993 13.49 9.58993L19 11.7999L20.42 12.3699Z" />
              <path d="M12 22V10" />
              <path d="M19 8V11.8L13.49 9.59C12.53 9.21 11.47 9.21 10.51 9.59L5 11.8V8C5 6.35 6.35 5 8 5H16C17.65 5 19 6.35 19 8Z" />
              <path d="M14.5 5H9.5V3C9.5 2.45 9.95 2 10.5 2H13.5C14.05 2 14.5 2.45 14.5 3V5Z" />
            </svg>
          </div>
          <p className=" flex flex-col">
          <span
            className="font-bold text-[#1F2937] whitespace-nowrap  "
            style={{
              fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
            }}
          >
            {" "}
            {t("Journey")} 
          </span>
          <span className=" whitespace-nowrap">{serialNo}</span>
          </p>
         
          <a className="  bg-[#E5E7EB] rounded-full  flex items-center justify-center ">
            <span
              className="block bg-[#E5E7EB] rounded-full mx-[5px] mt-[4px]"
              style={{ width: "5px", height: "5px", borderRadius: "50%" }}
            ></span>{" "}
            <span
              className="text-[#1F2937] whitespace-nowrap p-2"
              style={{
                fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
              }}
            >
              {t(status)}
            </span>
          </a>

          </div>
      
          <span
            className=" ms-auto  font-bold text-[#1F2937] text-sm whitespace-nowrap"
            style={{
              fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
            }}
          >
            {price} {t("SAR")}
          </span>
        </div>

        <div className="flex ms-7 mt-5 items-center gap-4">
          <div>
            <svg
              className="size-4 my-[0.5px] ms-[0.5px]"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.42 12.3699C21.29 12.7199 21.83 13.7499 21.63 14.6599L21.22 16.5199C20.51 19.7199 18 21.9999 14.38 21.9999H9.61998C5.99998 21.9999 3.48999 19.7199 2.77999 16.5199L2.36998 14.6599C2.16998 13.7499 2.70997 12.7199 3.57997 12.3699L4.99999 11.7999L10.51 9.58993C11.47 9.20993 12.53 9.20993 13.49 9.58993L19 11.7999L20.42 12.3699Z" />
              <path d="M12 22V10" />
              <path d="M19 8V11.8L13.49 9.59C12.53 9.21 11.47 9.21 10.51 9.59L5 11.8V8C5 6.35 6.35 5 8 5H16C17.65 5 19 6.35 19 8Z" />
              <path d="M14.5 5H9.5V3C9.5 2.45 9.95 2 10.5 2H13.5C14.05 2 14.5 2.45 14.5 3V5Z" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
            }}
          >
            {t("Ship Name")}
          </span>
          <span
            className=" font-semibold text-[#1F2937] text-lg"
            style={{ fontFamily: "Cairo , sans-serif" }}
          >
            {shipmentName}
          </span>
        </div>

        <ol
          className={`flex flex-col sm:flex-row gap-4 lg:gap-2 xl:gap-4   md:overflow-scroll      justify-center  items-center journey-details whitespace-nowrap py-3 mx-7  mt-5 md:mx-3 lg:mx-7  lg:me-0  lg:w-[91%]`}
          style={{
            border: "1px solid rgba(128, 128, 128, 0.19)",
            borderRadius: "8px",
          }}
        >
          <li
            style={{
              fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
            }}
          >
            <a className="flex  flex-col text-[17px] md:ms-[69px] lg:ms-[130px] xl:ms-[13px]   items-center text-sm text-gray-500">
              {t("start Location")} <br />{" "}
              <span className=" font-bold block text-[#1F2937] ">
                {startLocation}
              </span>
            </a>
          </li>
          <span className="hidden sm:inline "> {t(">")}</span>

          <li
            className=" flex flex-col  sm:flex-row gap-4  sm:relative "
            style={{
              fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
            }}
          >
            {stopPoints.map((point) => (
              <>
                <a className="flex flex-col text-[17px] me-0    items-center text-sm text-gray-500  ">
                  {t("stop")}
                  <br />{" "}
                  <span className=" font-bold text-[#1F2937] ">
                    {point.location_point.name_ar}
                  </span>
                </a>
                <span className="hidden sm:inline relative top-3 ">
                  {" "}
                  {t(">")}
                </span>
              </>
            ))}
          </li>
          <li
            className={`flex-col ${
              changeLang ? "ms-0" : "ms-[50px] sm:ms-[20px]"
            } md:ms-0  sm:relative items-center text-[17px] `}
            aria-current="page"
            style={{
              fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
            }}
          >
            <span
              className={` text-sm text-[#6B7280]  ${
                changeLang ? "ms-[13px] lg:ms-[9px]" : ""
              }`}
            >
              {t("Destination")}{" "}
            </span>{" "}
            <br />
            <span className=" font-bold text-[#1F2937] relative -top-1  ms-[5px] sm:ms-0 md:ms-[5px] xl:ms-0">
              {endLocation}
            </span>
          </li>
        </ol>

        <div className="ms-2 journey-date relative mt-4">
          <div className="flex gap-3 ms-5 items-center mt-10 ">
            <p
              className=" text-gray-600 font-bold bg-[#F5F6F6] p-2  "
              style={{
                borderRadius: "5px",
                fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
              }}
            >
              {t("Departure Date")}{" "}
              <span className=" text-[#1F2937]">{travelDate}</span>
            </p>
            <p
              className="text-gray-600 font-bold  bg-[#F5F6F6] p-2"
              style={{
                borderRadius: "5px",
                fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
              }}
            >
              {t("Duration")}{" "}
              <span className=" text-[#1F2937]">
                {" "}
                {diff} {t("Days")}
              </span>
            </p>
          </div>
          <div
            className="flex ms-5 mb-3 gap-3 items-center mt-10 "
            style={{
              fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
            }}
          >
            <p
              className=" text-gray-600 font-bold bg-[#F5F6F6] p-2 "
              style={{ borderRadius: "5px" }}
            >
              {t("Arrival At")}{" "}
              <span className=" text-[#1F2937]">{arrivalDate}</span>
            </p>
            <p
              className="text-gray-600 font-bold bg-[#F5F6F6] p-2"
              style={{ borderRadius: "5px" }}
            >
              {t("Number of cars")}{" "}
              <span className=" text-[#1F2937]">{carNumbers}</span>
            </p>
          </div>
        </div>
        <div
          className="flex ms-5 p-6 items-center"
          style={{ fontFamily: changeLang ? "Almarai" : "Inter , sans-serif" }}
        >
          <p>
            {t("Available Seats")}:{" "}
            <span
              className=" text-[#1F2937] font-bold"
              style={{ fontFamily: "Inter , sans-serif" }}
            >
              {" "}
              {carNumbers}
            </span>
          </p>
          <Link
            className=" bg-[#04036B] ms-auto text-white p-3 book-btn"
            style={{ borderRadius: "5px" }}
            to={`/shipments/${serialNo}/booking`}
            onClick={handleBooking}
          >
            {t("Book Now")}
          </Link>
        </div>
      </div>
    </>
  );
}
