import { Link, useNavigate } from "react-router-dom";

import "react-international-phone/style.css";

import ReactLoading from "react-loading";

import logo from "../../imgs/logo.png";

import "./sign-up.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../util/auth";
import { PhoneInput } from "react-international-phone";
import { useTranslation } from "react-i18next";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();
const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

export default function Signup({ changeLang }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState("");
  const [info, setInfo] = useState({});
  const [error, setError] = useState({});
  const [t] = useTranslation();

  const isValid = isPhoneValid(`+${phone}`);

  const navigate = useNavigate();

  // get the token in the local storage to access protected routes

  const returnedToken = getAuthToken();

  // handling the submission of the sign up form

  async function handleSubmit(event) {
    event.preventDefault();
    const formdata = {
      name,
      email,
      password,
      phone,
      password_confirmation: passwordConfirmation,
    };
    console.log(formdata);
    // get the users data to be registered
    try {
      setLoading(true);
      const res = await axios.post(
        "https://soaken.neuecode.com/api/register",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${returnedToken}`,
          },
        }
      );

      console.log(res);
      const token = res.data.data.token;
      localStorage.setItem("token", token);

      setInfo(res);
      setLoading(false);
      navigate("/");

      console.log(res);
    } catch (error) {
      // catching form errors
      console.log(error);
      setError(error);
      setLoading(false);
    }
    console.log(error);
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <ReactLoading type="spin" color="#1D4ED8" />
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
          <h1 className="text-red-500 font-semibold  ">{t(error.message)}</h1>
          <p className=" text-red-500 font-semibold">
            {t("please check your connection !!!")}
          </p>
        </div>
      </>
    );
  }

  return (
    <div
      className={`sign-up-box   h-[900px]  bg-[#E5E7EB]`}
      style={{
        fontFamily:
          window.localStorage.getItem("lang") === "ar" ||
          !window.localStorage.getItem("lang")
            ? "Almarai"
            : "",
      }}
    >
      <div className=" flex justify-center items-start relative  top-[50px] ">
        <img src={logo} style={{ width: "30px", height: "30px" }} alt="logo" />
        <p className="ms-2 flex flex-col justify-center items-start">
          <span
            className=" font-bold text-xl relative mb-1"
            style={{
              color: "#04036B",
              fontFamily:
                window.localStorage.getItem("lang") === "ar" ||
                !window.localStorage.getItem("lang")
                  ? "Almarai"
                  : "Cairo ExtraLight",
            }}
          >
            سواكن للنقل و التجارة
          </span>
          <span
            className="text-[7px]   uppercase font-normal"
            style={{
              fontFamily:
                window.localStorage.getItem("lang") === "ar" ||
                !window.localStorage.getItem("lang")
                  ? "Almarai"
                  : "Inter, sans-serif",
              width: "128px",
              whiteSpace: "nowrap",
            }}
          >
            Swakin Marina for Shipping & Trading
          </span>
        </p>
      </div>
      <div
        className=" flex flex-col sign-up-container  w-[436px] mx-auto top-[100px]   bg-[white] relative"
        style={{ borderRadius: "15px" }}
      >
        <div className=" pt-[20px]  relative header">
          <h1
            className="text-center text-[#1F2937] font-bold text-[24px] mb-2"
            style={{
              fontFamily:
                window.localStorage.getItem("lang") === "ar" ||
                !window.localStorage.getItem("lang")
                  ? "Almarai"
                  : "Inter,sans-serif",
            }}
          >
            {t("Sign Up")}
          </h1>
          <p
            className=" text-[#515661] text-center font-normal text-[14px]"
            style={{
              fontFamily:
                window.localStorage.getItem("lang") === "ar" ||
                !window.localStorage.getItem("lang")
                  ? "Almarai"
                  : "Inter , sans-serif",
            }}
          >
            {t("Already have an account?")}{" "}
            <Link to={"/sign-in"} className=" text-[#2A2981] font-medium">
              {t("Sign In")}
            </Link>
          </p>
        </div>
        <form
          method="POST"
          onSubmit={handleSubmit}
          className=" mt-[20px] ms-[20px] w-[388px]"
        >
          <div>
            <label
              htmlFor=""
              className=" text-[#1F2937] font-normal text-[14px] "
              style={{
                fontFamily:
                  window.localStorage.getItem("lang") === "ar" ||
                  !window.localStorage.getItem("lang")
                    ? "Almarai"
                    : "Inter , sans-serif",
              }}
            >
              {t("Full Name")}
            </label>
            <div class="my-[10px] space-y-3">
              <input
                type="text"
                name="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                class="py-3 px-4 block w-full  rounded-lg text-sm bg-[#FFFFFF]"
                style={{
                  boxShadow: " 0 0 1px 0 gray",
                  border: "1px solid #E5E7EB",
                }}
              />
              {error.message === "Request failed with status code 422" && (
                <h1 className=" text-red-500 error">
                  {error.response.data.error.name}
                </h1>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[#1F2937] font-normal text-[14px] "
              style={{
                fontFamily:
                  window.localStorage.getItem("lang") === "ar" ||
                  !window.localStorage.getItem("lang")
                    ? "Almarai"
                    : "Inter , sans-serif",
              }}
            >
              {t("Email Address")}
            </label>
            <div class="my-[10px] space-y-3">
              <input
                name="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                class="py-3 px-4 block w-full  rounded-lg text-sm bg-white"
                style={{
                  boxShadow: " 0 0 1px 0 gray",
                  border: "1px solid #E5E7EB",
                }}
              />
              {error.message === "Request failed with status code 422" && (
                <h1 className=" text-red-500 error">
                  {t(error.response.data.error.email)}
                </h1>
              )}
            </div>
          </div>

          <label
            htmlFor=""
            className=" text-[#1F2937] font-normal text-[14px] "
            style={{
              fontFamily:
                window.localStorage.getItem("lang") === "ar" ||
                !window.localStorage.getItem("lang")
                  ? "Almarai"
                  : "Inter , sans-serif",
            }}
          >
            <div className=" flex justify-between phone-box">
              <span>{t("Phone Number")}</span>
              <span className="text-[#6B7280]">{t("Required")}</span>
            </div>
          </label>
          <div class="relative my-[10px]  .phone-div h-[44px]">
            <PhoneInput
              defaultCountry="qa"
              style={{ width: "388px" , border : isValid ? '1px solid green' : '' }}
              value={phone}
              required
              onChange={(e) => setPhone(e.substring(1))}
              className={`phone-input ${
                (window.localStorage.getItem("lang") === "ar" ||
                  !window.localStorage.getItem("lang")) &&
                "phone-input-ar"
              }`}
            />

          
            {error.message === "Request failed with status code 422" && (
              <h1 className=" text-red-500 error">
                {t(error.response.data.error.phone)}
              </h1>
            )}
          </div>
          <div className={`${!error ? "mt-[40px]" : ""}`}>
            <label
              htmlFor=""
              className={`text-[#1F2937] font-normal text-[14px] `}
              style={{
                fontFamily:
                  window.localStorage.getItem("lang") === "ar" ||
                  !window.localStorage.getItem("lang")
                    ? "Almarai"
                    : "Inter , sans-serif",
              }}
            >
              {t("Password")}
            </label>
            <div class={`my-[10px] space-y-3 `}>
              <input
                placeholder={t("write at least 8 characters")}
                type="password"
                name="password"
                required
                minLength={"8"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="py-3 px-4 block w-full  rounded-lg text-sm bg-white"
                style={{
                  boxShadow: " 0 0 1px 0 gray",
                  border: "1px solid #E5E7EB",
                }}
              />
              {error.message === "Request failed with status code 422" && (
                <h1 className=" text-red-500 error">
                  {t(error.response.data.error.password)}
                </h1>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[#1F2937] font-normal text-[14px] "
              style={{
                fontFamily:
                  window.localStorage.getItem("lang") === "ar" ||
                  !window.localStorage.getItem("lang")
                    ? "Almarai"
                    : "Inter , sans-serif",
              }}
            >
              {t("Confirm Password")}
            </label>
            <div class="my-[10px] space-y-3">
              <input
                placeholder={t("repeat the password")}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                minLength={"8"}
                type="password"
                name="password_confirmation"
                class="py-3 px-4 block w-full  rounded-lg text-sm bg-white"
                style={{
                  boxShadow: " 0 0 1px 0 gray",
                  border: "1px solid #E5E7EB",
                }}
              />
              {error.message === "Request failed with status code 422" && (
                <h1 className=" text-red-500 error">
                  {t(error.response.data.error.password_confirmation)}
                </h1>
              )}
            </div>
          </div>
          <div class="my-[20px] space-y-3">
            <input
              type="submit"
              value={t("Sign Up")}
              class={`py-3 px-4 block w-full font-semibold  text-[15px] rounded-lg text-sm bg-[#04036B] text-white`}
              style={{
                boxShadow: " 0 0 1px 0 gray",
                fontFamily:
                  window.localStorage.getItem("lang") === "ar" ||
                  !window.localStorage.getItem("lang")
                    ? "Almarai"
                    : "Inter , sans-serif",
                cursor: "pointer",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
