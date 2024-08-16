import { sideTabs } from "../sidebar/SideTabs";
import "../sidebar/sidebar.css";
import Navbar from "../sidebar/navbar/Navbar";
import ReactLoading from "react-loading";
import "react-loading-skeleton/dist/skeleton.css";
import "../shipment/shipment.css";

import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../util/auth";
import { PhoneInput } from "react-international-phone";

export default function Profile({
  username,
  changeLang,
  setChangeLang,
  name,
  email,
  phone,
  getUserData,
  profileImage,
  password,
}) {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [updateError, setUpdateError] = useState({});
  const [userData, setUserData] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState(name ? name : "");
  const [userEmail, setUserEmail] = useState(email ? email : "");
  const [userPhone, setUserPhone] = useState(phone ? phone : "");
  const [userPassword, setUserPassword] = useState(null);
  const [userPasswordConfirmation, setUserPasswordConfirmation] =
    useState(null);
  const [changeName, setChangeName] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);

  console.log(profileImage);
  console.log(name);

  console.log(profilePic);

  const formData = new FormData();
  formData.append("name", userName);
  formData.append("email", userEmail);
  formData.append("phone", userPhone);
  profilePic && formData.append("profile_pic", profilePic);
  userPassword && formData.append("password", userPassword);
  userPasswordConfirmation &&
    formData.append("password_confirmation", userPasswordConfirmation);

  // handling the update profile

  async function handleUpdateProfile() {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://soaken.neuecode.com/api/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getUserData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setUpdateError(error);
      console.log(error);
      console.log(updateError);
      setLoading(false);
    }
  }

  const token = getAuthToken();

  // laoding

  // network error
  if (updateError && updateError.message === "Network Error") {
    return (
      <>
        <div
          className=" flex flex-col justify-center items-center w-screen h-screen gap-4"
          style={{ fontFamily: changeLang && "Alamari" }}
        >
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
            {t(updateError.message)}
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
      <div className="lg:col-span-12 lg:ms-[255px]">
        <Navbar
          navName={t(sideTabs[4].text)}
          username={username}
          changeLang={changeLang}
          setChangeLang={setChangeLang}
        />
        <div className="  flex justify-start mx-[20px] items-center relative info">
          <div className=" mt-[10px] w-full   flex flex-col shipment-info justify-start ">
            <div
              className={`receipient-info basic-details h-auto bg-white w-[95%]`}
              style={{ border: "1px solid #F1F1F2", borderRadius: "8px" }}
            >
              <h1
                className=" p-4 font-bold text-[#353B47] receipt-info"
                style={{
                  fontFamily:
                    window.localStorage.getItem("lang") === "ar"
                      ? "Almarai"
                      : "Inter , sans-serif",
                }}
              >
                {t("Basic Details")}
              </h1>

              <div className=" flex flex-col items-center justify-start">
                <div className="flex items-center ">
                  <div className="img  ms-[100px]">
                    {userData && (
                      <img
                        src={`https://soaken.neuecode.com/storage/${
                          profilePic === null ? profileImage : profilePic
                        }`}
                        alt="user-profile"
                        className="ms-[100px] sm:ms-0"
                        style={{
                          borderRadius: "50%",
                          width: "100px",
                          height: "100px",
                          maxWidth: "100px",
                        }}
                      />
                    )}
                  </div>
                  <form action="POST" className=" ms-[20px] sm:ms-[20px]">
                    <label
                      htmlFor="upload-image"
                      className="relative top-[4px] start-[50px] sm:top-0 sm:start-0"
                    >
                      {t("change")}
                    </label>
                    <input
                      type="file"
                      name="profile_pic"
                      id="upload-image"
                      accept=".png , .jpg , .jpeg"
                      className="opacity-0"
                      onChange={(e) => setProfilePic(e.target.files[0])}
                      required
                    />
                    {updateError.message ===
                      "Request failed with status code 422" && (
                      <h1 className=" text-red-500 error">
                        {t(updateError.response.data.error.profile_pic)}
                      </h1>
                    )}
                  </form>
                </div>

                <form method="POST" className=" mt-[20px] ms-[50px] w-[388px]">
                  <div>
                    <label
                      htmlFor=""
                      className=" text-[#1F2937] font-normal text-[14px] "
                      style={{
                        fontFamily:
                          window.localStorage.getItem("lang") === "ar"
                            ? "Almarai"
                            : "Inter , sans-serif",
                      }}
                    >
                      {t("Full Name")}
                    </label>
                    <div class="my-[10px] space-y-3 input-flex flex items-center">
                      <input
                        type="text"
                        name="name"
                        value={userName}
                        required
                        onChange={(e) => setUserName(e.target.value)}
                        class={`py-3 px-4 block w-full rounded-lg text-sm bg-[#FFFFFF] `}
                        readOnly={!changeName}
                        style={{
                          boxShadow: " 0 0 1px 0 gray",
                          border: "1px solid #E5E7EB",
                        }}
                      />

                      <a
                        className={`ms-5 text-sm underline cursor-pointer change`}
                        onClick={() => setChangeName(!changeName)}
                      >
                        {t("change")}
                      </a>
                    </div>
                    {updateError.message ===
                      "Request failed with status code 422" && (
                      <h1 className=" text-red-500 error">
                        {t(updateError.response.data.error.name)}
                      </h1>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className=" text-[#1F2937] font-normal text-[14px] "
                      style={{
                        fontFamily:
                          window.localStorage.getItem("lang") === "ar"
                            ? "Almarai"
                            : "Inter , sans-serif",
                      }}
                    >
                      {t("Email Address")}
                    </label>
                    <div class="my-[10px] space-y-3 input-flex flex items-center">
                      <input
                        name="email"
                        type="email"
                        value={userEmail}
                        required
                        readOnly={!changeEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        class="py-3 px-4 block w-full  rounded-lg text-sm bg-white"
                        style={{
                          boxShadow: " 0 0 1px 0 gray",
                          border: "1px solid #E5E7EB",
                        }}
                      />

                      <a
                        className="ms-5 text-sm underline cursor-pointer change"
                        onClick={() => setChangeEmail(!changeEmail)}
                      >
                        {t("change")}
                      </a>
                    </div>
                    {updateError.message ===
                      "Request failed with status code 422" && (
                      <h1 className=" text-red-500 error">
                        {t(updateError.response.data.error.email)}
                      </h1>
                    )}
                  </div>

                  <label
                    htmlFor=""
                    className=" text-[#1F2937] font-normal text-[14px] "
                    style={{
                      fontFamily:
                        window.localStorage.getItem("lang") === "ar"
                          ? "Almarai"
                          : "Inter , sans-serif",
                    }}
                  >
                    <div className=" flex justify-between phone-box">
                      <span>{t("Phone Number")}</span>
                    </div>
                  </label>
                  <div class="relative my-[10px]  .phone-div h-[44px]">
                    <PhoneInput
                      inputProps={{
                        minLength: "14",
                        maxLength: "14",
                      }}
                      required
                      defaultCountry="qa"
                      style={{ width: "323px" }}
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.substring(1))}
                      className={`input-profile`}
                    />
                    {updateError.message ===
                      "Request failed with status code 422" && (
                      <h1 className=" text-red-500 error">
                        {t(updateError.response.data.error.phone)}
                      </h1>
                    )}
                  </div>

                  <div className="w-[323px]">
                    <label
                      htmlFor=""
                      className=" text-[#1F2937] font-normal text-[14px] "
                      style={{
                        fontFamily:
                          window.localStorage.getItem("lang") === "ar"
                            ? "Almarai"
                            : "Inter , sans-serif",
                      }}
                    >
                      {t("Password")}
                    </label>
                    <div class="my-[10px] space-y-3 flex items-center input-flex">
                      <input
                        name="password"
                        type="password"
                        value={userPassword}
                        minLength={"8"}
                        required
                        onChange={(e) => setUserPassword(e.target.value)}
                        class="py-3 px-4 block w-full  rounded-lg text-sm bg-white"
                        style={{
                          boxShadow: " 0 0 1px 0 gray",
                          border: "1px solid #E5E7EB",
                        }}
                      />
                    </div>
                    {updateError.message ===
                      "Request failed with status code 422" && (
                      <h1 className=" text-red-500 error">
                        {t(updateError.response.data.error.password)}
                      </h1>
                    )}
                  </div>
                  <div className="w-[323px]">
                    <label
                      htmlFor=""
                      className=" text-[#1F2937] font-normal text-[14px] "
                      style={{
                        fontFamily:
                          window.localStorage.getItem("lang") === "ar"
                            ? "Almarai"
                            : "Inter , sans-serif",
                      }}
                    >
                      {t("Confirm Password")}
                    </label>
                    <div class="my-[10px] space-y-3 flex items-center input-flex">
                      <input
                        name="password_confirmation"
                        type="password"
                        minLength={"8"}
                        value={userPasswordConfirmation}
                        required
                        onChange={(e) =>
                          setUserPasswordConfirmation(e.target.value)
                        }
                        class="py-3 px-4 block w-full  rounded-lg text-sm bg-white"
                        style={{
                          boxShadow: " 0 0 1px 0 gray",
                          border: "1px solid #E5E7EB",
                        }}
                      />
                    </div>
                    {updateError.message ===
                      "Request failed with status code 422" && (
                      <h1 className=" text-red-500 error">
                        {t(
                          updateError.response.data.error.password_confirmation
                        )}
                      </h1>
                    )}
                  </div>
                </form>
                <div className="flex w-[95%]">
                  <button
                    onClick={handleUpdateProfile}
                    type="submit"
                    className=" ms-auto  update-profile  p-3 mb-3 relative   text-[white] bg-[#04036B] booking-btn"
                    style={{
                      border: "1px solid #1F2937",
                      borderRadius: "8px",
                      fontFamily:
                        window.localStorage.getItem("lang") === "ar"
                          ? "Almarai"
                          : "Inter , sans-serif",
                    }}
                  >
                    {t("update profile")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
