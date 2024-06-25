import React, { useRef, useState } from "react";
import useOutsideClickHook from "../dashboard/useOutsideClick";
import Navbar from "../sidebar/navbar/Navbar";
import { sideTabs } from "../sidebar/SideTabs";
import "./cars.css";
import CarItem from "./CarItem";
import "../dashboard/modal.css";
import RegisterModal from "../../UI/RegisterModal";

const Cars = () => {
  const ref = useRef();

  const [carName, setCarName] = useState("");
  const [carArName, setCarArName] = useState("");
  const [carArModel, setCarArModel] = useState("");
  const [carModel, setCarModel] = useState("");

  useOutsideClickHook(ref, () => setShowContent(false));

  const [showContent, setShowContent] = useState(false);

  if (showContent) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  function handleReset() {
    setCarName("");
    setCarArName("");
    setCarModel("");
    setCarArModel("");
    setShowContent(false);
  }
  function handleSubmit() {
    setShowContent(false);
  }
  return (
    <>
      <Navbar navName={sideTabs[1]?.text} />
      {showContent && (
        <div className="modal relative block" ref={ref}>
          <RegisterModal
            setShowContent={setShowContent}
            setCarName={setCarName}
            setCarModel={setCarModel}
            setCarArName={setCarArName}
            setCarArModel={setCarArModel}
            carName={carName}
            carModel={carModel}
            carArName={carArName}
            carArModel={carArModel}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />
        </div>
      )}
      <div>
        <div className="ms-[282px] bg-[#E5E7EB]  p-5 font-bold text-2xl flex justify-between">
          <h1>Cars</h1>
          <button
            onClick={() => setShowContent(true)}
            className="  bg-[#04036B] flex py-2 w-[150px] car-btn"
            style={{ borderRadius: "5px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="ms-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                fill="white"
              />
            </svg>
            <span className=" ms-2 text-white text-sm">Add a new car</span>
          </button>
        </div>
        <div className="bg-[#E5E7EB] ms-[282px] h-auto">
          <div class=" flex items-center gap-[15px] h-auto" style={{width: 'calc(100% - 20px)'}}>
            <CarItem />
            <CarItem />
            <CarItem />
          </div>
          <div class=" flex items-center  gap-[15px] h-auto " style={{width: 'calc(100% - 20px)'}}>
            <CarItem />
            <CarItem />
            <CarItem />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cars;
