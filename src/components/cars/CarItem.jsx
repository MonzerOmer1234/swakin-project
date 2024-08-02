import axios from "axios";

import { getAuthToken } from "../util/auth";
import { useState } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DeleteModal from "../../UI/DeleteModal";
import { useTranslation } from "react-i18next";

export default function CarItem({
  name,
  model,
  year,
  color,
  chassisNo,
  image,
  id,
  getCarData,
  showContent,
  setShowContent,
  setId,
  setCarDetails,
  setIsEdit,
  changeLang
}) {
  const [pending, setPending] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error , setError] = useState({})
  const [t] = useTranslation();

  const token = getAuthToken();

  // handling the edit and delete of cars

  function handleDelete() {
    setShowDeleteModal(true);
  }

  async function handleShowCar(id){
  try{

     
      setId(id);
      setPending(true);
  
      const res = await axios.get(
        `https://soaken.neuecode.com/api/show-cars/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setCarDetails(res.data.data);
      setShowContent(true);
      setPending(false);
  
      getCarData();
    }
  catch(error){
    setError(error)
    setPending(false)
  }
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
          <h1 className="text-red-500 font-semibold  ">{t(error.message)}</h1>
          <p className=" text-red-500 font-semibold">
            {t('please check your connection !!!')}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {showDeleteModal && (
        <DeleteModal
         changeLang={changeLang}
          setShowDeleteModal={setShowDeleteModal}
          id={id}
          getCarData={getCarData}
        />
      )}
      {pending ? (
        <div className=" flex justify-center items-center relative top-[-10px] md:top-10">
          <SkeletonTheme baseColor="gray" highlightColor="#444">
            <p>
              <Skeleton count={10} width={"200px"} />
            </p>
          </SkeletonTheme>
        </div>
      ) : (
        <div
          class=" details mb-5 ms-3"
          style={{ backgroundColor: "#fff", borderRadius: "8px" }}
        >
          <div className="p-5 flex">
            <div>
              <img
                src={`https://soaken.neuecode.com/storage/${image}`}
                alt=""
                style={{ width: "120px", height: "83px", objectFit: "cover" }}
              />
            </div>
            <div className="ms-5">
              <h1 className=" text-center font-bold text-xl">{name}</h1>
            
              <p className="text-center text-gray-500">{model}</p>
            </div>
          </div>
          <div>
            <p className="p-5 me-5 flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g id="SVGRepo_bluegCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z"
                    fill="#04036B"
                    fill-opacity="0.24"
                  />{" "}
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="15"
                    rx="2"
                    stroke="#04036B"
                    stroke-width="1.2"
                  />{" "}
                  <path
                    d="M7 3L7 6"
                    stroke="#04036B"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />{" "}
                  <path
                    d="M17 3L17 6"
                    stroke="#04036B"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />{" "}
                  <rect
                    x="7"
                    y="12"
                    width="4"
                    height="2"
                    rx="0.5"
                    fill="#04036B"
                  />{" "}
                  <rect
                    x="7"
                    y="16"
                    width="4"
                    height="2"
                    rx="0.5"
                    fill="#04036B"
                  />{" "}
                  <rect
                    x="13"
                    y="12"
                    width="4"
                    height="2"
                    rx="0.5"
                    fill="#04036B"
                  />{" "}
                  <rect
                    x="13"
                    y="16"
                    width="4"
                    height="2"
                    rx="0.5"
                    fill="#04036B"
                  />{" "}
                </g>
              </svg>
              <span className="ms-3 text-[#6B7280]">{year}</span>
            </p>
          </div>
          <div>
            <p className="p-5 me-5 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g id="SVGRepo_bluegCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.20348 2.00378C9.46407 2.00378 10.5067 3.10742 10.6786 4.54241L19.1622 13.0259L11.384 20.8041C10.2124 21.9757 8.31291 21.9757 7.14134 20.8041L2.8987 16.5615C1.72713 15.3899 1.72713 13.4904 2.8987 12.3188L5.70348 9.51404V4.96099C5.70348 3.32777 6.82277 2.00378 8.20348 2.00378ZM8.70348 4.96099V6.51404L7.70348 7.51404V4.96099C7.70348 4.63435 7.92734 4.36955 8.20348 4.36955C8.47963 4.36955 8.70348 4.63435 8.70348 4.96099ZM8.70348 10.8754V9.34247L4.31291 13.733C3.92239 14.1236 3.92239 14.7567 4.31291 15.1473L8.55555 19.3899C8.94608 19.7804 9.57924 19.7804 9.96977 19.3899L16.3337 13.0259L10.7035 7.39569V10.8754C10.7035 10.9184 10.7027 10.9612 10.7012 11.0038H8.69168C8.69941 10.9625 8.70348 10.9195 8.70348 10.8754Z"
                    fill="#04036B"
                  />{" "}
                  <path
                    d="M16.8586 16.8749C15.687 18.0465 15.687 19.946 16.8586 21.1175C18.0302 22.2891 19.9297 22.2891 21.1013 21.1175C22.2728 19.946 22.2728 18.0465 21.1013 16.8749L18.9799 14.7536L16.8586 16.8749Z"
                    fill="#04036B"
                  />{" "}
                </g>
              </svg>

              <span className="ms-3 text-[#6B7280]" style={{fontFamily : changeLang ? 'Almarai' : 'Inter ,sans-serif'}}>{t('Color')} : {color}</span>
            </p>
          </div>
          <div>
            <p className="p-5 me-5 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g id="SVGRepo_bluegCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M13 21L17 3"
                    stroke="#04036B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M7 21L11 3"
                    stroke="#04036B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M20 9L4 9"
                    stroke="#04036B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M4 15L20 15"
                    stroke="#04036B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                </g>
              </svg>

              <span className="ms-3 text-[#6B7280] text-sm whitespace-nowrap" style={{fontFamily : changeLang ? 'Almarai' : 'Inter ,sans-serif'}}>
                {t('Chassis Number')} : {chassisNo}
              </span>
            </p>
          </div>
          <div className={`p-5 flex lg:flex-col gap-4  whitespace-nowrap update items-center ${changeLang ? 'justify-center' : 'justify-between'}`}>
            <button
              className={`justify-center flex bg-[#CCFBF1]`}
              style={{ borderRadius: "8px", width: changeLang  ? "180px" : "157px", height: "auto" }}
              onClick={() => handleShowCar(id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#115E59"

              >
                &lt; id="SVGRepo_bCarrier" stroke-width="0"&gt;&lt;
                id="SVGRepo_tracerCarrier" stroke-linecap="round"
                stroke-linejoin="round"&gt;&lt; id="SVGRepo_iconCarrier"&gt;{" "}
                <path
                  d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                  stroke=""
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M21 21H12"
                  stroke=""
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
              </svg>
              <span className={`ms-2 text-[#115E59] ${changeLang ? 'text-sm ps-2' : ''}  font-semibold `} style={{fontFamily : changeLang ? 'Almarai' : 'Inter ,sans-serif'}}>
                {t('Edit Car Info')}
              </span>
            </button>
            <button
              className=" justify-center flex whitespace-nowrap bg-[#FEE2E2] p-1"
              onClick={handleDelete}
              style={{ borderRadius: "8px", width: "157px", height: "auto" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M10 11V17"
                  stroke="#991B1B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 11V17"
                  stroke="#991B1B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 7H20"
                  stroke="#991B1B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                  stroke="#991B1B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="#991B1B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className=" ms-2 text-[#991B1B]" style={{fontFamily : changeLang ? 'Almarai' : 'Inter ,sans-serif'}}>{t('Delete Car')}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
