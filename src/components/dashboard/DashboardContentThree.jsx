import { useState, useRef, useEffect } from "react";
import useOutsideClickHook from "./useOutsideClick";
import "./modal.css";

export default function DashboardContentThree() {
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
      {showContent && (
        <div className="modal relative block" ref={ref}>
          <div className="overlay" onClick={() => setShowContent(false)}></div>
          <div className="modal-content">
            <h1 className=" text-center top-10 relative font-bold text-lg">
              Car Info
            </h1>
            <span
              className=" absolute right-0 top-14 pe-3 font-bold text-2xl cursor-pointer"
              onClick={() => setShowContent(false)}
            >
              x
            </span>
            <form action="" onSubmit={handleSubmit} method="POST">
              <div className="flex gap-2 p-3 mt-8">
                <div>
                  <label htmlFor="" className="mb-2">
                    Car Name -EN
                  </label>
                  <input
                    type="text"
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                    className={`ps-3 mb-2 mt-2 `}
                    required={carArName.length === 0}
                    style={{
                      border: "1px solid rgba(128,128,128, 0.19)",
                      borderRadius: "5px",
                      height: "50px",
                      width: "300px",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="">Car Name - AR</label>
                  <input
                    type="text"
                    value={carArName}
                    onChange={(e) => setCarArName(e.target.value)}
                    required={carName.length === 0}
                    className={`ps-3 mt-2 mb-2`}
                    style={{
                      border: "1px solid rgba(128,128,128, 0.19)",
                      borderRadius: "5px",
                      height: "50px",
                      width: "300px",
                    }}
                  />
                </div>
              </div>
              <div className="flex  gap-2 p-3">
                <div>
                  <label htmlFor="" className="mb-2">
                    Car Model -EN
                  </label>
                  <input
                    required={carArModel.length === 0}
                    className={`ps-3 my-2 `}
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    style={{
                      border: "1px solid rgba(128,128,128, 0.19)",
                      borderRadius: "5px",
                      height: "50px",
                      width: "300px",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="">Car Model - AR</label>
                  <input
                    className={`ps-3 my-2`}
                    type="text"
                    value={carArModel}
                    onChange={(e) => setCarArModel(e.target.value)}
                    required={carModel.length === 0}
                    style={{
                      border: "1px solid rgba(128,128,128, 0.19)",
                      borderRadius: "5px",
                      height: "50px",
                      width: "300px",
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="ms-2">
                  <label htmlFor="" className=" mb-4">
                    Model Year
                  </label>
                  <input
                    type="text"
                    required
                    className="block mt-4 ps-3 my-2"
                    style={{
                      border: "1px solid rgba(128,128,128, 0.19)",
                      borderRadius: "5px",
                      height: "50px",
                      width: "620px",
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="ms-2">
                  <label htmlFor="" className=" mb-4">
                    Color
                  </label>
                  <input
                    type="text"
                    required
                    className="block my-4 ps-3 "
                    style={{
                      border: "1px solid rgba(128,128,128, 0.19)",
                      borderRadius: "5px",
                      height: "50px",
                      width: "620px",
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="ms-2">
                  <label htmlFor="" className=" mt-4">
                    Chassis Number
                  </label>
                  <input
                    type="text"
                    required
                    className="block my-4 ps-3"
                    style={{
                      border: "1px solid rgba(128,128,128, 0.19)",
                      borderRadius: "5px",
                      height: "50px",
                      width: "620px",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="ms-2">
                  <form className="max-w-sm">
                    <label for="file-input" className=" my-4 ">
                      Choose Image Upload
                    </label>
                    <input
                      type="file"
                      required
                      name="file-input"
                      id="file-input"
                      className="mt-3 block w-[630px] border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10   disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
              file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                    />
                  </form>
                  <div className="flex justify-end p-5 gap-5 mt-[-10px]">
                    <input
                      onClick={handleReset}
                      type="reset"
                      value="Cancel"
                      className="p-3 cursor-pointer h-[45px]"
                      style={{
                        boxShadow: "0 0 10px #ddd",
                        borderRadius: "5px",
                        border: "1px solid rgba(128,128,128,0.19)",
                      }}
                    />
                    <input
                      type="submit"
                      value="Add car"
                      className="bg-blue-600 text-white p-3 mb-2 text-center cursor-pointer"
                      style={{ lineHeight: "20px", borderRadius: "5px" }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div
        style={{ height: "400px", boxShadow: "0  0 10px #ddd" , borderRadius :'5px' }}
        className=" p-6"
      >
        <div className="flex items-center justify-between car-header">
          <h1>Cars</h1>
          <button
            onClick={() => setShowContent(true)}
            className="  bg-blue-800 flex py-2 w-[150px] car-btn"
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
            <span className=" ms-2 text-white">Add a new car</span>
          </button>
        </div>
        <div className="flex mt-5 text-sm justify-between gap-2 bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-2 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
          <p className=" text-gray-500">
            <span className=" font-bold text-blue-800">Marcedes Benz</span>
            <br />
            model - C Class - C220
          </p>
          <div className=" text-sm">
            <span>Chassis Number</span>
            <br />
            <span className=" text-gray-500">3235546645789</span>
          </div>
        </div>
        <div className="flex mt-5 text-sm justify-between gap-2 bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-2 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
          <p className=" text-gray-500">
            <span className=" font-bold text-blue-800">Marcedes Benz</span>
            <br />
            model - C Class - C220
          </p>
          <div className=" text-sm">
            <span>Chassis Number</span>
            <br />
            <span className=" text-gray-500">3235546645789</span>
          </div>
        </div>
      </div>
    </>
  );
}
