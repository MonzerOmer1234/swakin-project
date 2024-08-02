import { getAuthToken } from "../components/util/auth";
import { useEffect } from "react";
import "./modal.css";
import axios from "axios";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
export default function DeleteModal({
  setShowDeleteModal,
  id,
  getCarData,
  changeLang,
}) {
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [t] = useTranslation();

  const token = getAuthToken();

  // functionality of deleting car after taking confirmation of the user

  async function handleDeleteCar(id) {
    try {
      setDeleting(true);
      await axios.delete(`https://soaken.neuecode.com/api/delete-cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDeleting(false);
      setShowDeleteModal(false);
      getCarData();
    } catch (error) {
      console.log(error);

      // handling network error

      if (error.message === "Network Error") {
        setDeleteError(error.message);
        return;
      }

      setDeleteError(error.response.data);

      setDeleting(false);
    }
  }
  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError && deleteError.message);
    }
  }, [deleteError]);

  console.log(deleteError);

  // network error

  if (deleteError && deleteError === "Network Error") {
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
          <h1 className="text-red-500 font-semibold  ">
            {t(deleteError.message)}
          </h1>
          <p className=" text-red-500 font-semibold">
            {t('please check your connection !!!')}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {deleting ? (
        <div className={`${changeLang ? "delete-overlay-ar" : "overlay"}`}>
          <div className=" flex justify-center items-center relative top-2/4">
            <SkeletonTheme baseColor="gray" highlightColor="#444">
              <p>
                <Skeleton count={10} width={"200px"} />
              </p>
            </SkeletonTheme>
          </div>
        </div>
      ) : deleteError ? (
        <ToastContainer />
      ) : (
        <div className={`${changeLang ? "delete-overlay-ar" : "overlay"}`}>
          <div className={`delete-modal-content`}>
            <div className="  top-[30px] relative mb-[25px] flex justify-center  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M10 11V17"
                    stroke="#d9534f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M14 11V17"
                    stroke="#d9534f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M4 7H20"
                    stroke="#d9534f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                    stroke="#d9534f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                    stroke="#d9534f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                </g>
              </svg>
            </div>
            <span
              onClick={() => setShowDeleteModal(false)}
              className=" absolute right-[20px] top-[20px] pe-3 font-bold text-xl cursor-pointer"
            >
              x
            </span>
            <p
              className={` text-red-700 py-5  md:px-[80px] font-bold delete-text whitespace-nowrap `}
            >
              {t("Are you sure you want to delete this car ?")}
            </p>
            <div className="flex mt-4 justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="  p-3 relative -top-2  text-[#1F2937] booking-btn font-semibold"
                style={{
                  border: "1px solid #1F2937",
                  borderRadius: "8px",
                  fontFamily: "Inter , sans-serif",
                }}
              >
                {t("Cancel")}
              </button>
              <button
                onClick={() => handleDeleteCar(id)}
                className="  p-3 relative -top-2  text-[white] bg-red-700  booking-btn"
                style={{ border: "1px solid red", borderRadius: "8px" }}
              >
                {t("Delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
