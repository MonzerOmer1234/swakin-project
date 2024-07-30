import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { getAuthToken } from "../util/auth";
import useOutsideClickHook from "./useOutsideClick";
import "../../UI/modal.css";

import CarModal from "../../UI/CarModal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

export default function DashboardContentThree({ setData , changeLang }) {
  const ref = useRef();
  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [year, setYear] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carChassisNo, setCarChassisNo] = useState("");
  const [carImage, setCarImage] = useState("");

  const [carData, setCarData] = useState([]);

  const [carDetails, setCarDetails] = useState({});
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState({})
  const {t} = useTranslation();



  useOutsideClickHook(ref, () => setShowContent(false));

  const [showContent, setShowContent] = useState(false);

  if (showContent) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  function handleReset() {
    setCarName("");
    setCarChassisNo("");
    setCarColor("");
    setCarImage("");
    setYear("");

    setCarModel("");

    setShowContent(false);
  }

  const getCarData = useCallback(async function () {
    try{

      const token = getAuthToken();
      const res = await axios.get("https://soaken.neuecode.com/api/get-cars", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
  
      setCarData(res.data.data);
    } catch(error){
      console.log(error)
    }
  
  }, []);




  useEffect(() => {
    getCarData();
  }, [getCarData]);


  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <SkeletonTheme baseColor="gray" highlightColor="#444">
          <p>
            <Skeleton count={10} width={"400px"} />
          </p>
        </SkeletonTheme>
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
          <h1 className="text-red-500 font-semibold  ">{error.message}</h1>
          <p className=" text-red-500 font-semibold">
            please check your connection !!!
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {showContent && (
        <div className="modal relative block" ref={ref}>
          <CarModal
            changeLang={changeLang}
            setShowContent={setShowContent}
            showContent={showContent}
            setCarName={setCarName}
            setCarModel={setCarModel}
            year={year}
            setYear={setYear}
            setCarColor={setCarColor}
            setCarChassisNo={setCarChassisNo}
            setCarImage={setCarImage}
            carColor={carColor}
            carChassisNo={carChassisNo}
            carImage={carImage}
            carName={carName}
            carModel={carModel}
            handleReset={handleReset}
            setCarData={setCarData}
          />
        </div>
      )}

      <div
        style={{
          height: "auto",
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #E5E7EB",
          fontFamily : changeLang ? 'Almarai' : 'Inter , sans-serif'
       
        }}
        className=" p-6 lg:me-0 me-[20px]"
      >
        <div className="flex items-center justify-between car-header">
          <h1>{t('Cars')}</h1>
          <button
            onClick={() => {
              setShowContent(true);
            }}
            className="  bg-[#04036B] flex py-2 w-[150px] car-btn"
            style={{ borderRadius: "5px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="ms-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                fill="white"
              />
            </svg>
            <span className=" ms-2 text-white text-sm">{t('Add a new car')}</span>
          </button>
        </div>
        {carData &&
          carData.length > 0 &&
          carData.map((car) => (
            <div className="flex mt-5 text-sm justify-between items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-2 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
              <p className=" text-gray-500">
                <div className="flex items-center">
                  <img
                    src={`https://soaken.neuecode.com/storage/${car.image}`}
                    alt={`${car.car_name_ar}`}
                    width={"53px"}
                    height={"53px"}
                    style={{objectFit : 'cover'}}
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
                  className={`text-[#1F2937] font-bold ${changeLang ? 'text-center w-full block':""} `}
                  style={{ fontFamily: changeLang ? 'Almarai' : "Inter , sans-serif" }}
                >
                 {t('Chassis No')}
                </span>
                <br />
                <span className=" text-gray-500">{car.chassis_no}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
