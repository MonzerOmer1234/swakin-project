export default function RegisterModal({setCarArModel , setCarArName , setCarModel , setCarName , carArModel , carArName , setShowContent , carName , carModel , handleReset , handleSubmit}){
  return <>
  {/* 
  
<button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-custom-backdrop-modal">
  Open modal
</button>

<div id="hs-custom-backdrop-modal" class="hs-overlay hs-overlay-backdrop-open:bg-blue-950/90 hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
  <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
    <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
        <h3 class="font-bold text-gray-800 dark:text-white">
          Modal title
        </h3>
        <button type="button" class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700" data-hs-overlay="#hs-custom-backdrop-modal">
          <span class="sr-only">Close</span>
          <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      <div class="p-4 overflow-y-auto">
        <p class="mt-1 text-gray-800 dark:text-neutral-400">
          This is a wider card with supporting text below as a natural lead-in to additional content.
        </p>
      </div>
      <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
        <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" data-hs-overlay="#hs-custom-backdrop-modal">
          Close
        </button>
        <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          Save changes
        </button>
      </div>
    </div>
  </div>
</div>
  
  */}
    <div className="overlay" onClick={() => setShowContent(false)}></div>
          <div className="modal-content">
            <h1 className=" text-center top-6 relative font-bold text-lg">
              Car Info
            </h1>
            <span
              className=" absolute right-0 top-1 pe-3 font-bold text-2xl cursor-pointer"
              onClick={() => setShowContent(false)}
            >
              x
            </span>
            <form action="" onSubmit={handleSubmit} method="POST">
              <div className="flex gap-2 p-3 mt-8">
                <div>
                  <label htmlFor="" className="mb-2">
                    Car Name
                  </label>
                  <input
                    type="text"
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                    className={`block ps-3 mt-4 `}
                    required
                    style={{
                      border: "1px solid rgba(128,128,128, 0.19)",
                      borderRadius: "5px",
                      height: "50px",
                      width: "450px",
                    }}
                  />
                </div>
            
              </div>
              <div className="flex  gap-2 p-3">
                <div>
                  <label htmlFor="" className="mb-2">
                    Car Model
                  </label>
                  <input
                    required
                    className={`block ps-3 mt-4 `}
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    style={{
                      border: "1px solid rgba(128,128,128, 0.19)",
                      borderRadius: "5px",
                      height: "50px",
                      width: "450px",
                    }}
                  />
                </div>
              
              </div>
              <div>
                <div className="ms-2">
                  <label htmlFor="" className=" mb-2">
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
                      width: "450px",
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="ms-2">
                  <label htmlFor="" className=" mb-2">
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
                      width: "450px",
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="ms-2">
                  <label htmlFor="" className=" mt-2">
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
                      width: "450px",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="ms-2">
                  <form className="max-w-sm">
                    <label for="file-input" className=" my-2 ">
                      Choose Image Upload
                    </label>
                    <input
                      type="file"
                      required
                      name="file-input"
                      id="file-input"
                      className="mt-3 block w-[450px] border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10   disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
              file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                    />
                  </form>
                  <div className="flex justify-end px-5 pt-6 gap-5 mt-[-10px]">
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
                      className="bg-[#04036B] text-white p-3 mb-2 text-center cursor-pointer"
                      style={{ lineHeight: "20px", borderRadius: "5px" }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
  </>
} 