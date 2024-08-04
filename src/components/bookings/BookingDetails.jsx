import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { getAuthToken } from "../util/auth";
import axios from "axios";
import SideTabs from "../sidebar/SideTabs";
import Navbar from "../sidebar/navbar/Navbar";
import { getDaysDiff } from "../util/calculate-days-diff";
import "./bookings.css";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import "../../UI/modal.css";
import { SpecifedCarsContext } from "../../App";

export default function BookingDetails({
  serialNumber,

  username,
  receipentName,
  receipentPhone,
  specifiedCars,
  setSpecifiedCars,
  shipmentId,
  changeLang,
  setChangeLang,
}) {
  const [carData, setCarData] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { serial } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [stop, setStop] = useState([]);
  const [arrivalDate, setArrivalDate] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [carNums, setCarNums] = useState(0);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [shipemntId, setShipmentId] = useState(0);

  useEffect(() => {
    const data = window.localStorage.getItem("specified_cars");
    setSpecifiedCars(JSON.parse(data));
  }, []);

  const [price, setPrice] = useState(0);

  console.log(stop);
  console.log(specifiedCars);

  async function getShipmentDetails() {
    const token = getAuthToken();
    try {
      setLoading(true);
      const res = await axios.get(
        `https://soaken.neuecode.com/api/get-shipments-details/${serial}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);
      setAvailableSeats(res.data.data.availableSeats);
      setStartLocation(res.data.data.start_location);
      setEndLocation(res.data.data.end_location);
      setArrivalDate(res.data.data.arrival_date);
      setTravelDate(res.data.data.travel_date);
      setStop(res.data.data.shipment_location_point);
      setCarNums(res.data.data.cars_no);
      setPrice(res.data.data.price);
      setShipmentId(res.data.data.id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getShipmentDetails();
  }, [serial]);

  console.log(price);
  console.log(specifiedCars);

  const token = getAuthToken();

  const getCarData = useCallback(
    async function () {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://soaken.neuecode.com/api/get-cars?cars=${specifiedCars.toString()}`,
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
    },
    [specifiedCars, token]
  );

  console.log(carData);

  useEffect(() => {
    getCarData();
  }, [getCarData]);

  console.log(shipmentId);

  async function handleBooking(e) {
    e.preventDefault();
    console.log("booked");

    // const bookingsData = new FormData();

    console.log(receipentName);
    console.log(receipentPhone);
    console.log(shipmentId);

    // functionality of add booking.

    const bookingsData = {
      recipient_name: receipentName,
      recipient_phone: receipentPhone,
      shipment_id: shipemntId,
      car_id: specifiedCars,
    };

    try {
      setLoading(true);
      const res = await axios.post(
        "https://soaken.neuecode.com/api/add-bookings",
        bookingsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      navigate("/bookings");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      setLoading(false);
    }
  }
  // toaster error and warning
  useEffect(() => {
    if (error) {
      toast.error(error.recipient_phone && error.recipient_phone.toString());
      error.recipient_phone &&
        toast.warning(
          "please go to the previous page and fix the recipient phone number"
        );
    }
  }, [error]);

  //  network error

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
      {!changeLang && <ToastContainer />}

      {changeLang && (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      )}
      <SideTabs
        serial={serial}
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
                / {serial} / {t("booking")}{" "}
              </span>{" "}
            </p>
          }
          username={username}
        />

        {loading ? (
          <div className="min-h-screen w-full flex justify-center items-center">
            <ReactLoading type="spin" color="#1D4ED8" />
          </div>
        ) : (
          <div className="content bg-[#E5E7EB] h-auto  p-5 ">
            <h1
              className="mb-[50px] font-bold text-[#353B47]"
              style={{
                fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
              }}
            >
              {t("Booking")}
            </h1>

            <div
              data-hs-stepper='{"currentIndex": 2}'
              className=" flex justify-center"
            >
              <ul className="relative flex flex-row" style={{ width: "300px" }}>
                <li
                  className="flex items-center gap-x-2 shrink basis-0 flex-1 group success"
                  data-hs-stepper-nav-item='{
"index": 1,
"isCompleted": true
}'
                >
                  <span className="min-w-7 min-h-7 group flex flex-col items-center text-xs align-middle">
                    <span className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600 dark:bg-neutral-700 dark:text-white dark:group-focus:bg-gray-600 dark:hs-stepper-active:bg-blue-500 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500 dark:hs-stepper-completed:group-focus:bg-teal-600">
                      <span className="hs-stepper-success:hidden hs-stepper-completed:hidden"></span>
                      1
                    </span>
                  </span>
                  <div className="w-[119px] h-px  bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600 dark:bg-neutral-700 dark:hs-stepper-success:bg-blue-600 dark:hs-stepper-completed:bg-teal-600"></div>
                </li>

                <li
                  className="flex items-center gap-x-2 shrink basis-0 flex-1 group "
                  data-hs-stepper-nav-item='{
"index": 2
}'
                  style={{
                    background: "transparent !important",
                    boxShadow: " 0 0 0 rgba(0 , 0 , 0 , 0.5)",
                  }}
                >
                  <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
                    <span className="size-7 ms-[0.5rem] flex justify-center items-center flex-shrink-0  font-medium  rounded-full group-focus:bg-gray-200 bg-[#2563EB] hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600 dark:bg-neutral-700 dark:text-white dark:group-focus:bg-gray-600 dark:hs-stepper-active:bg-blue-500 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500 dark:hs-stepper-completed:group-focus:bg-teal-600">
                      <span className="hs-stepper-success:hidden hs-stepper-completed:hidden text-white ">
                        2
                      </span>
                      <svg
                        className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center mt-3 w-full gap-[154px]">
              <span
                className={`font-bold  text-[#353B47] ${
                  changeLang ? "ms-[-33px]" : ""
                }`}
                style={{
                  fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                }}
              >
                {t("Car Details")}
              </span>
              <span
                className={`font-bold text-[#353B47] relative ${
                  changeLang ? "end-[70px]" : "end-[64px]"
                }`}
                style={{
                  fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                }}
              >
                {t("Checkout")}
              </span>
            </div>
            <div
              className=" bg-white  mt-[50px] "
              style={{ borderRadius: "8px" }}
            >
              <div
                className="flex flex-col lg:flex-row w-full justify-around bg-[white] me-[256px]"
                style={{ borderRadius: "8px" }}
              >
                <div className="flex flex-col lg:w-[50%]  gap-2">
                  <div class="flex m-3 flex-col   bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                    <h1
                      className=" text-[#353B47] font-bold"
                      style={{
                        fontFamily: changeLang
                          ? "Almarai"
                          : "Inter , sans-serif",
                      }}
                    >
                      {t("Shipment Details")}
                    </h1>

                    <ol
                      className={`flex flex-col sm:flex-row gap-4 lg:gap-2 xl:gap-4   md:overflow-scroll      justify-center  items-center journey-details whitespace-nowrap py-3 mx-7  mt-5 md:mx-3 lg:mx-7  lg:me-0  lg:w-[91%]`}
                      style={{
                        border: "1px solid rgba(128, 128, 128, 0.19)",
                        borderRadius: "8px",
                      }}
                    >
                      <li
                        style={{
                          fontFamily: changeLang
                            ? "Almarai"
                            : "Inter , sans-serif",
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
                          fontFamily: changeLang
                            ? "Almarai"
                            : "Inter , sans-serif",
                        }}
                      >
                        {stop.map((point) => (
                          <>
                            <a className="flex flex-col text-[17px]      items-center text-sm text-gray-500  ">
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
                          changeLang ? "ms-0" : "ms-[40px]"
                        } md:ms-0  sm:relative items-center text-[17px] `}
                        aria-current="page"
                        style={{
                          fontFamily: changeLang
                            ? "Almarai"
                            : "Inter , sans-serif",
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
                    <p className=" flex flex-col items-center ms-[40px] sm:ms-0 gap-4 sm:gap-0 sm:flex-row mt-[50px] justify-between w-[90%]  ">
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
                          {travelDate}
                        </span>
                      </span>
                      <span
                        className="text-center sm:text-start"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
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
                      <span
                        className="text-center sm:text-start"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
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
                    <p
                      className=" mt-[20px] ms-[80px] sm:ms-0 text-center sm:text-start"
                      style={{
                        fontFamily: changeLang
                          ? "Almarai"
                          : "Inter , sans-serif",
                      }}
                    >
                      <span className="text-[#4B5563]">
                        {t("Number of cars")} <br />
                      </span>
                      <span className=" text-[#1F2937] font-bold relative end-7 sm:end-0">
                        {carNums}
                      </span>
                    </p>
                  </div>

                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                    }}
                    className="h-auto mx-4"
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
                      specifiedCars.length !== 0 &&
                      carData.map((car) => (
                        <div className="  mb-[20px]">
                          <div className="flex w-[95%] items-center  ms-3  text-sm justify-between gap-9 bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-2 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                            <p className=" text-gray-500">
                              <div
                                className="flex items-center"
                                style={{
                                  fontFamily: changeLang
                                    ? "Almarai"
                                    : "Inter , sans-serif",
                                }}
                              >
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

                <div class="flex money-details lg:w-[50%]  flex-col m-3 h-fit bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                  <p
                    className=" flex justify-between my-3 relative"
                    style={{
                      fontFamily: changeLang ? "Almarai" : "Cairo , sans-serif",
                    }}
                  >
                    <span className=" text-[#4B5563] ">{t("Total")}</span>
                    <span className="text-[#1F2937] font-bold" name="total">
                      {price * specifiedCars.length} {t("SAR")}
                    </span>
                  </p>
                  <div
                    class="relative bg-[#04036B]"
                    style={{ borderRadius: "8px", marginTop: "50px" }}
                  >
                    <form
                      action="/bookings"
                      onSubmit={handleBooking}
                      method="POST"
                    >
                      <button
                        type="submit"
                        style={{
                          borderRadius: "8px",

                          cursor: "pointer",
                          fontFamily: changeLang
                            ? "Almarai"
                            : "  Inter , sans-serif",
                        }}
                        className="py-3 text-center px-4 block w-full bg-[#04036B] text-white font-semibold"
                      >
                        {t("Complete Booking")}
                      </button>
                    </form>
                    <div class="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center ps-4 pb-4 mt-3">
                <p className="mb-5">
                  {t("Available Seats")}
                  <span
                    className=" font-bold text-[#1F2937] ms-2"
                    style={{ fontFamily: "Inter , sans-serif" }}
                  >
                    {availableSeats}
                  </span>
                </p>
                <Link
                  className=" lg:ms-auto me-5 p-3 relative -top-2  text-[#1F2937] booking-btn font-semibold"
                  style={{
                    border: "1px solid #1F2937",
                    borderRadius: "8px",
                    fontFamily: "Inter , sans-serif",
                  }}
                  to="/shipments"
                >
                  {t("Cancel Booking")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
