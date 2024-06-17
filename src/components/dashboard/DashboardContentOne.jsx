export default function DashboardContentOne() {
  return (
    <>
      <div
      
       
        style={{
          height: "530px",
          boxShadow: "0  0 10px #ddd",
          borderRadius: "8px",
          

        }}
      >
        <div className="flex p-4">
          <h1 className="font-bold ">Active Booking</h1>
          <a
            href="#status"
            className=" ms-10 h-[30px] bg-green-200 rounded-full w-[80px] flex items-center justify-center "
          >
            <span
              className="block bg-green-400 rounded-full me-[5px] mt-[4px]"
              style={{ width: "5px", height: "5px", borderRadius: "50%" }}
            ></span>{" "}
            status
          </a>
        </div>
        <p className="p-4">1 AuG , 2024</p>
        <div className="p-4">
          <ul className="relative">
            <li className=" flex ">
              <div className="min-w-7 min-h-7  text-xs">
                <span className="size-7 flex justify-center items-center flex-shrink-0 bg-green-200 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
                  A
                </span>
                <div className="mt-[-1px] ms-3 w-[1px]  h-[60px] flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
              </div>
              <div className="mt-3">
                <span className=" relative top-[-12px] left-[20px] font-medium text-gray-800 dark:text-white">
                  <p>Start: Jeddah Islamic Port</p>
                  <span className="block text-sm text-gray-500">
                    1 AuG , 2024
                  </span>
                </span>
              </div>
            </li>

            <li className=" flex ">
              <div className="min-w-7 min-h-7  text-xs">
                <span className="size-3 ms-2 flex justify-center items-center flex-shrink-0 bg-green-400 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white"></span>
                <div className="mt-[-1px] ms-3 w-[1px]  h-[60px] flex-1 bg-gray-100 group-last:hidden dark:bg-neutral-700"></div>
              </div>
              <div className="mt-3">
                <span className=" relative top-[-12px] left-[20px] font-medium text-gray-800 dark:text-white">
                  <p>Stop: Jeddah Islamic Port</p>
                  <span className="block text-sm text-gray-500">
                    3 AuG , 2024
                  </span>
                </span>
              </div>
            </li>
            <li className=" flex ">
              <div className="min-w-7 min-h-7  text-xs">
                <span className="size-3 ms-2 flex justify-center items-center flex-shrink-0 bg-gray-100  rounded-full dark:bg-neutral-700 dark:text-white"></span>
                <div className="mt-[-1px] ms-3 w-[1px]  h-[60px] flex-1 bg-gray-100 group-last:hidden dark:bg-neutral-700"></div>
              </div>
              <div className="mt-3">
                <span className=" relative top-[-12px] left-[20px] font-medium text-gray-800 dark:text-white">
                  <p>Stop: Egypt Port</p>
                  <span className="block text-sm text-gray-500">
                    6 AuG , 2024
                  </span>
                </span>
              </div>
            </li>
            <li
              className=" flex "
              style={{ borderBottom: "1px solid #80808030" }}
            >
              <div className="min-w-7 min-h-7  text-xs">
                <span className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
                  B
                </span>
                <div className="mt-[-1px] ms-3 w-[1px]  h-[60px] flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
              </div>
              <div className="mt-3">
                <span className=" relative top-[-12px] left-[20px] font-medium text-gray-800 dark:text-white">
                  <p>Destination: Portsudan</p>
                  <span className="block text-sm text-gray-500">
                    1 AuG , 2024
                  </span>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex booking">
          <button
            className=" ms-auto me-5 p-3 h-[50px] text-cyan-950 booking-btn"
            style={{ border: "1px solid rgb(8 51 68)", borderRadius: "5px" }}
          >
            Cancel Booking
          </button>
        </div>
      </div>

    


    </>
  );
}
