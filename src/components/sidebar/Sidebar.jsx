import { useEffect, useState } from "react";
import "./sidebar.css";

import { Link, useLocation } from "react-router-dom";
import logoImage from "../../imgs/logo.png";
import { logout } from "../util/auth";
import { useTranslation } from "react-i18next";

export default function Sidebar({
  tabs,
  id,
  serial,
  sid,
  setChangeLang,
  changeLang,
}) {
  // this state handles the navigation between sidebar tabs

  const [t] = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const location = useLocation();

  // this function handles the navigation between sidebar tabs

  function handleClick(index) {
    setCurrentIndex(index);

    if (index === 4) {
      logout();
    }
  }



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
      location.pathname === `/shipments/mybookings/${sid}`
    ) {
      setCurrentIndex(3);
    } else {
      setCurrentIndex(5);
    }
  }, [location.pathname, id, serial, sid]);

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
          <p className="ms-2 flex flex-col justify-center items-start">
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
          <ul className="space-y-1.5">
            {tabs && tabs.length > 0
              ? tabs.map((tab, index) => (
                  <li key={tab?.text}>
                    <Link
                      style={{
                        color: "#2E3441",
                        fontFamily: "Inter , sans-serif",
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
                      <span onClick={index === 6 ? ()=>setChangeLang(!changeLang) : ()=>setChangeLang(changeLang)}>{t(tab?.text)}</span>
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
