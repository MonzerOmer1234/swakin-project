import axios from "axios";
import { useEffect, useState } from "react";

import { getAuthToken } from "../components/util/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import "./modal.css";

export default function RegisterModal({
  setShowContent,

  getCarData,
  id,
  carDetails,
  changeLang,
}) {
  const [mode, setMode] = useState("");

  const [sending, setSending] = useState(false);
  const [error, setError] = useState({});
  const [networkError, setNetworkError] = useState({});

  const [sendingUpdate, setSendngUpdate] = useState(false);

  const [updateError, setUpdateError] = useState({});

  const [carImage, setCarImage] = useState(null);
  const [carName, setCarName] = useState(
    carDetails ? carDetails.car_name_ar : ""
  );
  const [carModel, setCarModel] = useState(
    carDetails ? carDetails.model_ar : ""
  );
  const [year, setYear] = useState(carDetails ? carDetails.year : "");
  const [carColor, setCarColor] = useState(
    carDetails ? carDetails.car_color : ""
  );
  const [carChassisNo, setCarChassisNo] = useState(
    carDetails ? carDetails.chassis_no : ""
  );

  const [t] = useTranslation();

  console.log(carDetails);

  function handleReset() {
    setCarName("");
    setCarChassisNo("");
    setCarColor("");
    setCarImage(null);
    setYear("");

    setCarModel("");

    setShowContent(false);
  }

  // functionality of sending new car  and updating car based on the details and send to the server
  const token = getAuthToken();

  const formdata = new FormData();
  async function handleSubmit(event) {
    event.preventDefault();

    formdata.append("car_name_ar", carName);
    formdata.append("model_ar", carModel);
    formdata.append("year", year);
    formdata.append("car_color", carColor);
    carImage && formdata.append("image", carImage);
    formdata.append("chassis_no", carChassisNo);
    if (Object.keys(carDetails).length === 0) {
      try {
        setSending(true);
        const res = await axios.post(
          "https://soaken.neuecode.com/api/add-cars",
          formdata,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSending(false);
        setError({});
        console.log(error);
        setShowContent(false);
        getCarData();
      } catch (error) {
        console.log(error);
        setError(error.response.data.error);
        console.log(error);
        setSending(false);
        setShowContent(true);
        if (networkError) {
          setNetworkError(error);
          setSending(false);
          return;
        }
      }
    } else {
      formdata.append("car_id", id);

      try {
        setSendngUpdate(true);
        const res = await axios.post(
          `https://soaken.neuecode.com/api/update-cars`,

          formdata,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSending(false);
        setError({});
        setShowContent(false);
        getCarData();
      } catch (error) {
        console.log(error);
        setUpdateError(error.response.data.error);
        setSendngUpdate(false);
        setShowContent(true);
        console.log(updateError);
        if (networkError) {
          setNetworkError(error);
          setSendngUpdate(false);
          return;
        }
      }
    }
  }

  console.log(carDetails.data);

  // changing modes depending on details of car

  useEffect(() => {
    if (Object.keys(carDetails).length === 0) {
      setMode(changeLang ? "اضافة عربة" : "Add car");
    } else {
      setMode(changeLang ? "تحديث السيارة" : "Update car");
    }
  }, [carDetails, setMode, changeLang]);

  // making error toasters

  useEffect(() => {
    if (error) {
      toast.error(error.year && t(error.year.toString()));
      toast.error(error.chassis_no && t(error.chassis_no.toString()));

      toast.error(error.image && t(error.image.toString()));
    }
  }, [error, error.chassis_no, error.image , t]);
  useEffect(() => {
    if (updateError) {
      toast.error(updateError.year && t(updateError.year.toString()));
      toast.error(
        updateError.chassis_no && t(updateError.chassis_no.toString()));

      toast.error(updateError.image && t(updateError.image.toString()));
    }
  }, [updateError, updateError.chassis_no, updateError.image , t]);


  
// handling network errors.
  if (networkError && networkError.message === "Network Error") {
    return (
      <>
        <div className=" flex flex-col justify-center bg-white z-[100] items-center w-screen h-screen gap-4">
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
          <h1 className="text-red-500 font-semibold  ">
            {t(networkError.message)}
          </h1>
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

      <div
        className={`${changeLang ? "overlay-ar" : "overlay"}`}
        onClick={() => setShowContent(false)}
      ></div>
      <div className={`${changeLang ? "modal-content-ar " : "modal-content"}`}>
        <h1 className=" text-center top-[30px] relative font-bold text-lg mb-[25px]">
          {t("Car Info")}
        </h1>

        <span
          className=" absolute right-[20px] top-[20px] pe-3  text-xl cursor-pointer"
          onClick={() => setShowContent(false)}
        >
          x
        </span>
        <form
          action=""
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col gap-[2px]"
        >
          <div className="ms-[30px] mt-3 ">
            <label htmlFor="">{t("Car Name")}</label>
            <input
              name="car_name_ar"
              value={carName}
              type="text"
              onChange={(e) => setCarName(e.target.value)}
              className={`block mt-[15px] ps-3 `}
              required
              style={{
                border:
                  error.car_name_ar || updateError.car_name_ar
                    ? "1px solid red "
                    : "1px solid rgba(128,128,128, 0.19)",
                borderRadius: "5px",
                height: "50px",
                width: "calc(100% - 30px)",
              }}
            />
          </div>

          <div className="ms-[30px] mt-[20px]">
            <label htmlFor="">{t("Car Model")}</label>
            <input
              name="model_ar"
              value={carModel}
              required
              className={`block ps-3 mt-[15px] `}
              type="text"
              onChange={(e) => setCarModel(e.target.value)}
              style={{
                border:
                  error.model_ar || updateError.model_ar
                    ? "1px solid red "
                    : "1px solid rgba(128,128,128, 0.19)",
                borderRadius: "5px",
                height: "50px",
                width: "calc(100% - 30px)",
              }}
            />
          </div>

          <div>
            <div className="ms-[30px] mt-[20px]">
              <label htmlFor="">{t("Model Year")}</label>
              <input
                name="year"
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                className="block mt-[15px] ms-1 ps-3 "
                style={{
                  border:
                    error.year || updateError.year
                      ? "1px solid red "
                      : "1px solid rgba(128,128,128, 0.19)",
                  borderRadius: "5px",
                  height: "50px",
                  width: "calc(100% - 30px)",
                }}
              />
            </div>
          </div>
          <div>
            <div className="ms-[30px] mt-[20px]">
              <label htmlFor="" className="ms-1">
                {t("Color")}
              </label>
              <input
                name="car_color"
                value={carColor}
                type="text"
                onChange={(e) => setCarColor(e.target.value)}
                required
                className="block mt-[15px] ps-3 ms-1 "
                style={{
                  border:
                    error.car_color || updateError.car_color
                      ? "1px solid red "
                      : "1px solid rgba(128,128,128, 0.19)",
                  borderRadius: "5px",
                  height: "50px",
                  width: "calc(100% - 30px)",
                }}
              />
            </div>
          </div>
          <div>
            <div className="ms-[30px] mt-[20px]">
              <label htmlFor="" className=" mb-2">
                {t("Chassis Number")}
              </label>
              <input
                name="chassis_no"
                value={carChassisNo}
                onChange={(e) => setCarChassisNo(e.target.value)}
                type="text"
                required
                className="block mt-[15px] ps-3 ms-1"
                style={{
                  border:
                    error.chassis_no || updateError.chassis_no
                      ? "1px solid red "
                      : "1px solid rgba(128,128,128, 0.19)",
                  borderRadius: "5px",
                  height: "50px",
                  width: "calc(100% - 30px)",
                }}
              />
            </div>
          </div>

          <div>
            <div className="ms-[30px] mt-[20px]">
              <form className="max-w-sm">
                <label for="file-input " className=" mb-2">
                  {t("Choose Image Upload")}
                </label>
                <input
                  type="file"
                  onChange={(e) => setCarImage(e.target.files[0])}
                  required
                  name="image"
                  id="file-input"
                  className="mt-[15px] ms-1 block image-div w-[396px] border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10   disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
              file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                  style={{
                    border:
                      error.image || updateError.image
                        ? "1px solid red "
                        : "1px solid rgba(128,128,128, 0.19)",
                  }}
                />
              </form>
              <div
                className="flex w-[480px] ms-[20px] justify-end  gap-[10px] mt-[16px]"
                style={{ width: "calc(100% - 20px)" }}
              >
                <input
                  onClick={handleReset}
                  type="reset"
                  value={t("Cancel")}
                  className="p-3 cursor-pointer h-[45px]"
                  style={{
                    boxShadow: "0 0 10px #ddd",
                    borderRadius: "5px",
                    border: "1px solid rgba(128,128,128,0.19)",
                  }}
                />
                <input
                  type="submit"
                  value={sending || sendingUpdate ? t("Submitting ...") : mode}
                  className="bg-[#04036B] text-white p-3 mb-2 text-center cursor-pointer"
                  style={{ lineHeight: "20px", borderRadius: "5px" }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
