export default function RegisterModal({setCarArModel , setCarArName , setCarModel , setCarName , carArModel , carArName , setShowContent , carName , carModel , handleReset , handleSubmit}){
  return <>
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
  </>
} 