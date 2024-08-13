import { useEffect, useState } from "react";
import "./sidebar.css";

import { Link, useLocation } from "react-router-dom";
import logoImage from "../../imgs/logo.png";
import { getAuthToken, logout } from "../util/auth";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Sidebar({
  tabs,
  id,
  serial,
  bid,
  setChangeLang,
  changeLang,
}) {
  // this state handles the navigation between sidebar tabs

  const [t] = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState({})

  const location = useLocation();

  // this function handles the navigation between sidebar tabs

  function handleClick(index) {

    

       setCurrentIndex(index);
     
    

    if (index === 5) {
     console.log(currentIndex)
      logout();
      const token = getAuthToken();
         
      async function handleLogout() {
       
        try{
          setLoading(true)
          const res = await axios.post('https://soaken.neuecode.com/api/logout' , {
             headers : {
              Authorization : `Bearer ${token}`
             }
          })
          console.log(res)
          setLoading(false)
        } catch(error){
            setError(error)
            setLoading(false)
        }
      }
    }
  }

  function handleChange(){
      if(currentIndex === 6){
       setCurrentIndex(6)
        window.localStorage.getItem('lang') === "ar" ? window.localStorage.setItem('lang' , 'en') : window.localStorage.setItem('lang' , 'ar') 

      }
    }
  


// checking the active index

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentIndex(0);
    } else if (location.pathname === "/cars") {
      setCurrentIndex(1);
    } else if (
      location.pathname === "/shipments" ||
      location.pathname === `/shipments/${id}/booking` ||
      location.pathname === `/bookings/${serial}/booking`
    ) {
      setCurrentIndex(2);
    } else if (
      location.pathname === "/bookings" ||
      location.pathname === `/shipments/mybookings/${bid}`
    ) {
      setCurrentIndex(3);
    } else {
      setCurrentIndex(4);
    }
  }, [location.pathname, id, serial, bid]);
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
      <div
        id="docs-sidebar"
        className={`hs-overlay lg:col-span-1 bg-white hidden  [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform  fixed top-0  bottom-0 z-[60] w-64   pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 `}
      >
        <a
          className="flex  items-center    text-lg  ps-2"
          href="/"
          aria-label="Brand"
        >
          <img
            src={logoImage}
            style={{ width: "30px", height: "30px" }}
            alt="logo"
          />
          <p className="ms-2 -mt-5 flex flex-col justify-center items-start">
            <span
              className=" font-semibold text-xl relative top-1"
              style={{ color: "#04036B", fontFamily: "Cairo ExtraLight" }}
            >
              سواكن للنقل و التجارة
            </span>
            <span
              className="text-[7px]   uppercase font-normal"
              style={{
                fontFamily: "Inter , sans-serif",
                width: "128px",
                whiteSpace: "nowrap",
              }}
            >
              Swakin Marina for Shipping & Trading
            </span>
          </p>
        </a>

        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5" >
            {tabs && tabs.length > 0
              ? tabs.map((tab, index) => (
                  <li key={tab?.text}>
                    <Link
                      style={{
                        color: "#2E3441",
                        fontFamily: window.localStorage.getItem('lang') === "ar" ? 'Alamari' : 'Inter , sans-serif',
                      }}
                      className={` flex items-center gap-x-3.5 py-2 px-2.5  rounded-lg  ${
                        currentIndex === index ? "active" : ""
                      }`}
                      onClick={() => handleClick(index)}
                      to={tab?.to}
                    >
                      <span className={currentIndex === index ? "active" : ""}>
                        {tab?.icon}
                      </span>
                      <span onClick={handleChange}>{t(tab?.text)}</span>
                    </Link>
                  </li>
                ))
              : null}
          </ul>
        </nav>
      </div>
    </>
  );
}
