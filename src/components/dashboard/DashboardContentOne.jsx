export default function DashboardContentOne() {
  return (
    <>
      <div
        style={{
          height: "auto",
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #E5E7EB",
          marginBottom: "20px",
        }}
      >
        <div className="flex p-4">
          <h1
            className="font-semibold "
            style={{ color: "#353B47", fontFamily: "Inter , sans-serif" }}
          >
            Active Booking
          </h1>
          <a
            className=" ms-10 h-[30px] rounded-full w-[80px] flex items-center justify-center "
            style={{ backgroundColor: "#CCFBF1" }}
          >
            <span
              className="block  rounded-full me-[5px] mt-[4px]"
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "#115E59",
              }}
            ></span>{" "}
            <span style={{ color: "#115E59" }}>status</span>
          </a>
        </div>
        <p
          className="p-4 -mt-5 font-semibold"
          style={{ color: "#6B7280", fontSize: "12px" }}
        >
          1 AuG , 2024
        </p>
        <div className="p-4">
          <ul className="relative">
            <li className=" flex ">
              <div className="min-w-7 min-h-7  text-xs">
                <span
                  className="size-7 flex justify-center items-center flex-shrink-0  font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white"
                  style={{ backgroundColor: "#CCFBF1" }}
                >
                  A
                </span>
                <div className="mt-[0] ms-[13px] w-[1px]  h-[40px] flex-1 bg-[#E5E7EB] group-last:hidden dark:bg-neutral-700"></div>
              </div>
              <div
                className="my-3 "
                style={{ fontFamily: "Inter , sans-serif" }}
              >
                <span className=" relative top-[-12px] left-[20px] font-medium text-gray-800 dark:text-white">
                  <p style={{ color: "#1F2937" }} className="font-semibold">
                    Start: Jeddah Islamic Port
                  </p>
                  <span
                    className="block text-xs font-semibold"
                    style={{ color: "#6B7280" }}
                  >
                    1 AuG , 2024
                  </span>
                </span>
              </div>
            </li>

            <li className=" flex ">
              <div className="min-w-7 min-h-7 text-xs ">
                <span
                  className="size-2 mt-[10px] ms-[10px] flex justify-center items-center flex-shrink-0  font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white"
                  style={{ backgroundColor: "#14B8A6" }}
                ></span>
                <div className="mt-[4px] ms-[13px] w-[1px]  h-[44px] flex-1 bg-[#E5E7EB] group-last:hidden dark:bg-neutral-700"></div>
              </div>
              <div
                className="my-3"
                style={{ fontFamily: "Inter , sans-serif" }}
              >
                <span className=" relative top-[-12px] left-[20px] font-medium text-gray-800 dark:text-white">
                  <p style={{ color: "#1F2937" }} className="font-semibold">
                    Stop: Jeddah Islamic Port
                  </p>
                  <span
                    className="block text-xs font-semibold"
                    style={{ color: "#6B7280" }}
                  >
                    3 AuG , 2024
                  </span>
                </span>
              </div>
            </li>
            <li className=" flex ">
              <div className="min-w-7 min-h-7 text-xs ">
                <span
                  className="size-2 mt-[10px] ms-[10px] flex justify-center items-center flex-shrink-0  font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white"
                  style={{ backgroundColor: "#9CA3AF" }}
                ></span>
                <div className="mt-[4px] ms-[13px] w-[1px]  h-[42px] flex-1 bg-[#E5E7EB] group-last:hidden dark:bg-neutral-700"></div>
              </div>
              <div
                className="my-3 "
                style={{ fontFamily: "Inter , sans-serif" }}
              >
                <span className=" relative top-[-12px] left-[20px] font-medium text-gray-800 dark:text-white">
                  <p style={{ color: "#1F2937" }} className="font-semibold">
                    Stop: Egypt Port
                  </p>
                  <span
                    className="block text-xs font-semibold"
                    style={{ color: "#6B7280" }}
                  >
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
                <span
                  className="size-7 flex justify-center items-center flex-shrink-0  font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white"
                  style={{ border:  "1px solid #E5E7EB" }}
                >
                  B
                </span>
                <div className="mt-[0] ms-[13px] w-[1px]  h-[30px] flex-1 bg-[#E5E7EB] group-last:hidden dark:bg-neutral-700"></div>
              </div>
              <div
                className="my-3 "
                style={{ fontFamily: "Inter , sans-serif" }}
              >
                <span className=" relative top-[-12px] left-[20px] font-medium text-gray-800 dark:text-white">
                  <p style={{ color: "#1F2937" }} className="font-semibold">
                    Destination: Portsudan
                  </p>
                  <span
                    className="block text-xs font-semibold"
                    style={{ color: "#6B7280" }}
                  >
                    8 AuG , 2024
                  </span>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex booking">
          <button
            className=" ms-auto me-5 p-3 relative -top-2  text-[#1F2937] booking-btn"
            style={{ border: "1px solid #1F2937", borderRadius: "8px" }}
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </>
  );
}
