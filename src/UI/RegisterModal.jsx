import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../components/util/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

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
        setError(error.response.data.error);
        console.log(error);
        setSending(false);
        setShowContent(true);
      }
    } else {
      carImage && formdata.append("image", carImage);
      try {
        setSendngUpdate(true);
        const res = await axios.patch(
          `https://soaken.neuecode.com/api/update-cars/${id}`,

          formdata,

          {
            headers: {
              "Content-Type": "application/json",
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
      }
    }
  }

  console.log(carDetails.data);

  useEffect(() => {
    if (Object.keys(carDetails).length === 0) {
      setMode(changeLang ? "اضافة عربة" : "Add car");
    } else {
      setMode(changeLang ? "تحديث السيارة" : "Update car");
    }
  }, [carDetails, setMode, changeLang]);

  useEffect(() => {
    if (error) {
      toast.error(error.year && error.year.toString());
      toast.error(error.chassis_no && error.chassis_no.toString());

      toast.error(error.image && error.image.toString());
    }
  }, [error, error.chassis_no, error.image]);
  useEffect(() => {
    if (updateError) {
      toast.error(updateError.year && updateError.year.toString());
      toast.error(updateError.chassis_no && updateError.chassis_no.toString());

      toast.error(updateError.image && updateError.image.toString());
    }
  }, [updateError, updateError.chassis_no, updateError.image]);

  return (
    <>
      <div
        className={`${changeLang ? "overlay-ar" : "overlay"}`}
        onClick={() => setShowContent(false)}
      ></div>
      <div className={`${changeLang ? "modal-content-ar" : "modal-content"}`}>
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
        {!changeLang ? (
          <ToastContainer />
        ) : (
          <ToastContainer
            position="top-left"
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
      </div>
    </>
  );
}
