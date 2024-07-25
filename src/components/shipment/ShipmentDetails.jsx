import { useParams, useNavigate, Link } from "react-router-dom";
import SideTabs from "../sidebar/SideTabs";
import "../sidebar/sidebar.css";
import Navbar from "../sidebar/navbar/Navbar";
import "./shipment.css";
import { PhoneInput } from "react-international-phone";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../util/auth";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";


export default function ShipmentDetails({
  availableSeats,
  serialNumber,
  username,
  receipentName,
  receipentPhone,
  setReceipentName,
  setReceipentPhone,
  specifiedCars,
  setSpecifiedCars,
  changeLang,
  setChangeLang,
 
}) {
  console.log(availableSeats);
  const [carData, setCarData] = useState([]);
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState({})
  const [t] = useTranslation();
  const navigate = useNavigate();
 
    async function getCarData () {
      const token = getAuthToken();
      try{
      setLoading(true)
        const res = await axios.get("https://soaken.neuecode.com/api/get-cars", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        setCarData(res.data.data);
        setLoading(false)
      }catch(error){
        setError(error)
        setLoading(false)
      }
      }


  useEffect(() => {
    getCarData();
  }, []);
  const { id } = useParams();



console.log(carData)
  function handleCars(e) {
    console.log(e.target.options);
    const updatedOptions = [...e.target.options]
      .filter((option) => option.selected)
      .map((x) => x.value);
    console.log("updatedOptions", updatedOptions);
    const newUpdatedOptions = updatedOptions.map((option) => Number(option));
    setSpecifiedCars(newUpdatedOptions);
  }

  function handleSubmit() {
    console.log(receipentName);
    console.log(receipentPhone);
    console.log(specifiedCars);
    console.log("submitted");

    navigate(`/bookings/${serialNumber}/booking`);
  }
 
  if ( error &&  error.message === "Network Error") {
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

  console.log(id);
  return (
    <>
     
            
      <SideTabs id={id}  changeLang={changeLang} setChangeLang={setChangeLang} />
      <div className="lg:col-span-12 lg:ms-[255px]">
        <Navbar navName={ <p>
              <span className="text-[#4B5563]"> {t('Shipments')} </span>{" "}
              <span className="text-[#1F2937] font-medium" style={{fontFamily: 'Inter , sans-serif'}}>/ {id} / {t('booking')} </span>{" "}
            </p>} username={username} />

        <div className="content bg-[#E5E7EB] p-5 h-[850px]">
          <h1
            className="mb-[50px] font-bold text-[#353B47]"
            style={{ fontFamily: "Inter , sans-serif" }}
          >
           {}
          </h1>

          <div
            data-hs-stepper='{"currentIndex": 2}'
            className=" flex justify-center"
          >
            <ul className="relative flex flex-row">
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
                  <span className="size-7 ms-[0.5rem] flex justify-center items-center flex-shrink-0  font-medium  rounded-full group-focus:bg-gray-200 bg-[#F3F4F6] hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600 dark:bg-neutral-700 dark:text-white dark:group-focus:bg-gray-600 dark:hs-stepper-active:bg-blue-500 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500 dark:hs-stepper-completed:group-focus:bg-teal-600">
                    <span className="hs-stepper-success:hidden hs-stepper-completed:hidden text-[#1F2937]">
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

          <div className={`flex justify-center mt-3 ${changeLang ? 'ms-[-92px]' : 'ms-[-55px]'}  `}>
            <span
              className="font-bold  text-[#353B47]"
              style={{ fontFamily: "Inter , sans-serif" }}
            >
             {t('Car Details')}
            </span>
            <span
              className="font-bold text-[#353B47] relative start-[85px]"
              style={{ fontFamily: "Inter , sans-serif" }}
            >
             {t('Checkout')}
            </span>
          </div>

          <form action="" onSubmit={handleSubmit} method="POST">
            <div
              className="shipment-details mt-[24px] bg-[white]  "
              style={{ borderRadius: "8px" }}
            >
              <h1
                className=" p-4 font-bold text-[#353B47] relative shipment-header"
                style={{
                  fontFamily: "Inter , sans-serif",
                }}
              >
              {t('Shipment Details')}
              </h1>

              <div className="  flex justify-center items-center relative info">
                <div className=" mt-[48px] flex flex-col shipment-info justify-center items-center">
                  <div
                    className="receipient-info  h-[236px]"
                    style={{ border: "1px solid #F1F1F2" }}
                  >
                    <h1
                      className=" p-4 font-bold text-[#353B47] receipt-info"
                      style={{
                        fontFamily: "Inter , sans-serif",
                      }}
                    >
                     {t('Shipment Receipent info')}
                    </h1>

                    <label
                      htmlFor=""
                      className=" text-[#1F2937] data flex justify-between font-normal text-[14px] ps-3 "
                      style={{ fontFamily: "Inter , sans-serif" }}
                    >
                      <span>{t('Full Name')}</span>
                      <span
                        className=" me-[20px] text-[#6B7280] font-medium"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                        {t('Required')}
                      </span>
                    </label>
                    <div class="my-[10px] space-y-3 ps-3">
                      <input
                        type="text"
                        name="name"
                        value={receipentName}
                        onChange={(e) =>
                          setReceipentName((prev) => e.target.value)
                        }
                        required
                        class="py-3 input-data px-4 block w-[380px] me-[20px] border-[#E5E7EB] rounded-lg text-sm bg-[#FFFFFF]"
                        style={{ boxShadow: " 0 0 1px 0 gray" }}
                      />
                    </div>
                    <label
                      htmlFor=""
                      className=" text-[#1F2937] data flex justify-between font-normal text-[14px] ps-3 "
                      style={{ fontFamily: "Inter , sans-serif" }}
                    >
                      <span>{t('Phone Number')}</span>
                      <span
                        className=" me-[20px] text-[#6B7280] font-medium"
                        style={{ fontFamily: "Inter , sans-serif" }}
                      >
                         {t('Required')}
                      </span>
                    </label>
                    <div class="relative my-[10px] w-[380px] .phone-div h-[44px] ps-3">
                      <PhoneInput
                        style={{ width: "380px" }}
                        type="text"
                        name="phone"
                        required
                        value={receipentPhone}
                        onChange={(e) =>
                          setReceipentPhone((prev) => e.substring(1))
                        }
                        className="input-data"
                      />
                    </div>
                  </div>
                  <div className=" mt-3">
                    <p
                      className=" text-[#1F2937] font-semibold "
                      style={{ fontFamily: "Inter , sans-serif" }}
                    >
                      {t('Select Cars to be shiped')}
                    </p>
                    <select
                      onChange={handleCars}
                      multiple
                      required
                      value={specifiedCars}
                      options={carData}
                      class="py-2 px-3 pe-9 block w-full  rounded-lg text-sm "
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      {carData &&
                        carData.length > 0 &&
                        carData.map((car) => (
                          <option value={car.id} key={car.id}>
                            {car.car_name_ar}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center  md:flex-row gap-5 md:gap-0  justify-between p-5 mt-[50px]">
                <p>
                  {t('Available Seats')}
                  <span
                    className=" text-[#1F2937] font-bold ms-2"
                    style={{ fontFamily: "Inter , sans-serif" }}
                  >
                    {availableSeats}
                  </span>
                </p>

                <div className="flex">
                  <Link
                    className=" ms-auto me-5 p-3 relative -top-2  text-[#1F2937] booking-btn font-semibold"
                    style={{
                      border: "1px solid #1F2937",
                      borderRadius: "8px",
                      fontFamily: "Inter , sans-serif",
                    }}
                    to="/shipments"
                  >
                    {t('Cancel Booking')}
                  </Link>
                  <button
                    onSubmit={handleSubmit}
                    type="submit"
                    className=" md:ms-auto me-5 p-3 relative -top-2  text-[white] bg-[#04036B] booking-btn"
                    style={{ border: "1px solid #1F2937", borderRadius: "8px" }}
                  >
                    {t('Next')}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
