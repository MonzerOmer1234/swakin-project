import { useState, useRef} from "react";
import useOutsideClickHook from "./useOutsideClick";
import "./modal.css";
import RegisterModal from "../../UI/RegisterModal";
import marcedesCar from "../../imgs/mrs.png";

export default function DashboardContentThree() {
  const ref = useRef();

  const [carName, setCarName] = useState("");

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
   
    setCarModel("");
   
    setShowContent(false);
  }
  function handleSubmit() {
    setShowContent(false);
  }

  return (
    <>
      {showContent && (
        <div className="modal relative block" ref={ref}>
          <RegisterModal
            setShowContent={setShowContent}
            setCarName={setCarName}
            setCarModel={setCarModel}
          
            carName={carName}
            carModel={carModel}
           
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />
        </div>
      )}

      <div
        style={{
          height: "auto",
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #E5E7EB",
        }}
        className=" p-6"
      >
        <div className="flex items-center justify-between car-header">
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
        <div className="flex mt-5 text-sm justify-between gap-2 bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-2 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
          <p className=" text-gray-500">
            <div className="flex items-center">
              <img
                src={marcedesCar}
                alt="marcedes car"
                width={"53px"}
                height={"53px"}
              />
              <span className=" font-bold text-[#1F2937] ms-3">
                Marcedes Benz
                <br />
                model - C Class - C220
              </span>
            </div>
          </p>
          <div className=" text-sm">
            <span
              className="text-[#1F2937] font-bold "
              style={{ fontFamily: "Inter , sans-serif" }}
            >
              Chassis Number
            </span>
            <br />
            <span className=" text-gray-500">3235546645789</span>
          </div>
        </div>
        <div className="flex mt-5 text-sm justify-between gap-2 bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-2 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
          <p className=" text-gray-500">
            <div className="flex items-center">
              <img
                src={marcedesCar}
                alt="marcedes car"
                width={"53px"}
                height={"53px"}
              />
              <span className=" font-bold text-[#1F2937] ms-3">
                Marcedes Benz
                <br />
                model - C Class - C220
              </span>
            </div>
          </p>
          <div className=" text-sm">
            <span
              className="text-[#1F2937] font-bold"
              style={{ fontFamily: "Inter , sans-serif" }}
            >
              Chassis Number
            </span>
            <br />
            <span className=" text-gray-500">3235546645789</span>
          </div>
        </div>
      </div>
    </>
  );
}
