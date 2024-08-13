import "./navbar.css";
import logoImage from "../../../imgs/logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAuthToken, logout } from "../../util/auth";
import { useState } from "react";
import axios from "axios";

export default function Navbar({
  navName,
  username,
  setChangeLang,
  changeLang,
}) {
  const [t] = useTranslation();
  const [openBurgerIcon , setOpenBurgerIcon] = useState(false);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState({})
  const token = getAuthToken();

  // logout functionality
  const auth = {headers : {Authorization : `Bearer ${token}`}};
  async function handleLogout() {
    localStorage.removeItem('token')
    try{
      setLoading(true)
      const res = await axios.post('https://soaken.neuecode.com/api/logout', auth)
      setLoading(false)
    } catch(error){
        setError(error)
        setLoading(false)
    }
  }
      // toggling burger icon
  function handleBurgerIcon(){
    setOpenBurgerIcon(!openBurgerIcon)
  }

  function handleChangeLang(){

    window.localStorage.getItem('lang') === "ar" ? window.localStorage.setItem('lang' , 'en') : window.localStorage.setItem('lang' , 'ar') 
  }
     
   
  // network error
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
      <header class="flex lg:hidden w-screen justify-start flex-nowrap  bg-white text-sm py-4">
        <nav
          class=" w-full  flex items-center justify-between nav"
          aria-label="Global"
        >
          <Link
            className="flex  items-center    text-lg  ps-2"
            to="/"
            aria-label="Brand"
          >
            <img
              src={logoImage}
              style={{ width: "30px", height: "30px" }}
              alt="logo"
            />
            <p className="ms-2 flex flex-col justify-center items-start">
              <span
                className=" font-semibold text-xl relative top-1"
                style={{
                  color: "#04036B",
                  fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                }}
              >
                سواكن للنقل و التجارة
              </span>
              <span
                className="text-[7px]   uppercase font-normal"
                style={{
                  fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                  width: "128px",
                  whiteSpace: "nowrap",
                }}
              >
                Swakin Marina for Shipping & Trading
              </span>
            </p>
          </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
              fill="none"
              className={`burger-icon hidden cursor-pointer relative end-[22px] top-[10px] `}
              onClick={handleBurgerIcon}
            >
              <path
                d="M4 18L20 18"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M4 12L20 12"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          <div
            className={` links-first md:flex  relative  end-[50px] flex-row items-center gap-[20px]`}
            style={{ fontFamily: "Almarai" }}
          >
            <Link class="font-medium text-gray-600" to="/">
              {t("Dashboard")}
            </Link>
            <Link
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              to="/cars"
            >
              {t("Cars")}
            </Link>
            <Link
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              to="/shipments"
            >
              {t("Shipments")}
            </Link>
            <Link
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              to="/bookings"
            >
              {t("Bookings")}
            </Link>
            <Link
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              to="/Profile"
            >
              {t("Profile")}
            </Link>
            <Link
              onClick={ handleChangeLang}
              class="font-medium  text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
            >
              {window.localStorage.getItem('lang') === "en" ? "العربية" : "English"}
            </Link>
            <Link
              onClick={handleLogout}
              class="font-medium  text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
            >
              {t("Logout")}
            </Link>
          </div>
        </nav>
      </header>
      <div
            className={` ${openBurgerIcon ? 'flex' : 'hidden'} ${changeLang ? 'ps-4' : 'ps-5'} bg-white  relative links flex-col items-center gap-[20px]`}
            style={{ fontFamily: "Almarai" }}
          >
            <Link class="font-medium text-gray-600" to="/">
              {t("Dashboard")}
            </Link>
            <Link
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              to="/cars"
            >
              {t("Cars")}
            </Link>
            <Link
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              to="/shipments"
            >
              {t("Shipments")}
            </Link>
            <Link
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              to="/bookings"
            >
              {t("Bookings")}
            </Link>
            <Link
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              to="/Profile"
            >
              {t("Profile")}
            </Link>
            <Link
              onClick={handleChangeLang}
              class="font-medium  text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
            >
               {window.localStorage.getItem('lang') === "en" ? "العربية" : "English"}
            </Link>
            <Link
              onClick={handleLogout}
              class="font-medium  mb-2 text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
            >
              {t("Logout")}
            </Link>
          </div>

      <ol
        className="navbar "
        style={{
          backgroundColor: "white",
          border: "1px solid #E2E8F0",
        }}
      >
        <li
          className="inline-flex items-center"
          style={{ width: "100%", border: "1px solid #E2E8F0" }}
        >
          <a
            className="starter flex items-center justify-between text-sm  text-black focus:outline-none  dark:text-neutral-500   ps-5 h-16 cursor-text"
            style={{ width: "100%" }}
          >
            <span className=" flex justify-between items-center  w-full">
              <span
                className=" font-medium text-[#4B5563]"
                style={{
                  fontFamily: changeLang ? "Almarai" : "Inter , sans-serif",
                }}
              >
                {navName}
              </span>
              <span
                className=" text-[#BFDBFE] whitespace-nowrap bg-[#1D4ED8] me-7 block w-[40px] h-[40px] py-3 text-center  "
                style={{ borderRadius: "50%", lineHeight: "15px" }}
              >
                {username}
              </span>
            </span>
          </a>
        </li>
      </ol>
    </>
  );
}
