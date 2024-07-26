import "./navbar.css";
import logoImage from "../../../imgs/logo.png";
import { Link } from "react-router-dom";

export default function Navbar({ navName, username , setChangeLang }) {
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
          </Link>
          <div class="flex relative end-[20px] flex-row items-center gap-[20px]  ">
            <Link class="font-medium text-gray-600" to="/">
              Dashboard
            </Link>
            <Link
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              to="/cars"
            >
              Cars
            </Link>
            <Link
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              to="/shipments"
            >
              Shipments
            </Link>
            <Link
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              to='/bookings'
            >
              Bookings
            </Link>
            <Link
             onClick={()=>setChangeLang(true)}
          
              class="font-medium  text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              
            >
              العربية
            </Link>
          </div>
        </nav>
      </header>

      <ol
        className="navbar "
        style={{
          
          backgroundColor: "white",
          border: "1px solid #E2E8F0",
        }}
      >
        <li className="inline-flex items-center" style={{ width: "100%" , border: "1px solid #E2E8F0" }}>
          <a
            className="flex items-center justify-between text-sm  text-black focus:outline-none  dark:text-neutral-500   ps-5 h-16 cursor-text"
            style={{ width: "100%" }}
          >
            <span className=" flex justify-between items-center  w-full">
              <span className=" font-medium text-[#4B5563]" style={{fontFamily: 'Inter , sans-serif'}}>{navName}</span>
              <span
                className=" text-[#BFDBFE] bg-[#1D4ED8] block w-[30px] h-[30px] py-3 text-center  "
                style={{ borderRadius: "50%", lineHeight: "5px" }}
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
