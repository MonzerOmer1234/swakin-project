import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { getAuthToken } from "../components/util/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./modal.css";
import { useTranslation } from "react-i18next";

export default function CarModal({
  setShowContent,
  setCarData,
  handleReset,
  showContent,
  changeLang,
}) {
  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [year, setYear] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carChassisNo, setCarChassisNo] = useState("");
  const [carImage, setCarImage] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState({});
  const [t] = useTranslation();

  console.log(changeLang);

  const token = getAuthToken();
  const getCarData = useCallback(
    async function () {
      const token = getAuthToken();
      const res = await axios.get("https://soaken.neuecode.com/api/get-cars", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCarData(res.data.data);
    },
    [setCarData]
  );

  function handleImage(e) {
    console.log(e.target.files);
    setCarImage(e.target.files[0]);
  }
  if (showContent) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const formdata = new FormData();
  async function handleSubmit(event) {
    event.preventDefault();

    formdata.append("car_name_ar", carName);
    formdata.append("model_ar", carModel);
    formdata.append("year", year);
    formdata.append("car_color", carColor);
    carImage && formdata.append("image", carImage);

    formdata.append("chassis_no", carChassisNo);

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
      setShowContent(false);
      getCarData();
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
      setSending(false);
      setShowContent(true);
    }
  }
  useEffect(() => {
    if (error) {
      toast.error(error.year && error.year.toString());
      toast.error(error.chassis_no && error.chassis_no.toString());

      toast.error(error.image && error.image.toString());
    }
  }, [error, error.chassis_no, error.image]);

  return (
    <>
      <ToastContainer />
      <div
        className={`${changeLang ? "overlay-ar " : "overlay"}`}
        onClick={() => setShowContent(false)}
      ></div>
      <div className={`${changeLang ? "modal-content-ar" : "modal-content"} `}>
        <h1 className=" text-center top-[30px] relative font-bold text-lg mb-[25px]">
          {t("Car Info")}
        </h1>
        <span
          className=" absolute  right-[20px] top-[20px] pe-3  text-xl cursor-pointer"
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
              className={`block mt-[15px] ps-3`}
              required
              style={{
                border: error.car_name_ar
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
              required
              className={`block ps-3 mt-[15px] `}
              type="text"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              style={{
                border: error.model_ar
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
                  border: error.year
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
                type="text"
                value={carColor}
                onChange={(e) => setCarColor(e.target.value)}
                required
                className="block mt-[15px] ps-3 ms-1 "
                style={{
                  border: error.car_color
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
                  border: error.chassis_no
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
                  multiple
                  onChange={handleImage}
                  required
                  name="image"
                  id="file-input"
                  className="mt-[15px] image-div ms-1 block w-[396px] border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10   disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
              file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                  style={{
                    border: error.image
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
                  value={sending ? t("Submitting ...") : t("Add car")}
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
