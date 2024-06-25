export default function DashboardContentTwo() {
  return (
    <>
      <div
        style={{
          height: "auto",
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #F1F1F2",
          marginBottom: '20px',
          marginLeft : '20px',
          marginTop :'20px',
          width : '90%'
        }}
      >
        
        <div
          className="container  m-5  flex  gap-4 items-center"
          
        >
          <div className="bg-[#F1F1F2] h-[20px] w-[20px]">
            <svg
              className="size-4 my-[0.5px] ms-[0.5px]"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.42 12.3699C21.29 12.7199 21.83 13.7499 21.63 14.6599L21.22 16.5199C20.51 19.7199 18 21.9999 14.38 21.9999H9.61998C5.99998 21.9999 3.48999 19.7199 2.77999 16.5199L2.36998 14.6599C2.16998 13.7499 2.70997 12.7199 3.57997 12.3699L4.99999 11.7999L10.51 9.58993C11.47 9.20993 12.53 9.20993 13.49 9.58993L19 11.7999L20.42 12.3699Z" />
              <path d="M12 22V10" />
              <path d="M19 8V11.8L13.49 9.59C12.53 9.21 11.47 9.21 10.51 9.59L5 11.8V8C5 6.35 6.35 5 8 5H16C17.65 5 19 6.35 19 8Z" />
              <path d="M14.5 5H9.5V3C9.5 2.45 9.95 2 10.5 2H13.5C14.05 2 14.5 2.45 14.5 3V5Z" />
            </svg>
          </div>
          <span className="font-bold text-[#1F2937]">Journey #4545</span>
          <a
            href="#status"
            className="  h-[30px] bg-[#CCFBF1] rounded-full w-[80px] flex items-center justify-center "
          >
            <span
              className="block bg-[#115E59] rounded-full me-[5px] mt-[4px]"
              style={{ width: "5px", height: "5px", borderRadius: "50%" }}
            ></span>{" "}
            <span className="text-[#115E59]">status</span>
          </a>
          <span className=" ms-auto me-[2.25rem] font-bold text-[#1F2937]">12,500SR</span>
        </div>
        <p className="mt-5 ps-6 flex items-center gap-4">
          {" "}
          <svg
            className="size-4 my-[0.5px] ms-[0.5px]"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.42 12.3699C21.29 12.7199 21.83 13.7499 21.63 14.6599L21.22 16.5199C20.51 19.7199 18 21.9999 14.38 21.9999H9.61998C5.99998 21.9999 3.48999 19.7199 2.77999 16.5199L2.36998 14.6599C2.16998 13.7499 2.70997 12.7199 3.57997 12.3699L4.99999 11.7999L10.51 9.58993C11.47 9.20993 12.53 9.20993 13.49 9.58993L19 11.7999L20.42 12.3699Z" />
            <path d="M12 22V10" />
            <path d="M19 8V11.8L13.49 9.59C12.53 9.21 11.47 9.21 10.51 9.59L5 11.8V8C5 6.35 6.35 5 8 5H16C17.65 5 19 6.35 19 8Z" />
            <path d="M14.5 5H9.5V3C9.5 2.45 9.95 2 10.5 2H13.5C14.05 2 14.5 2.45 14.5 3V5Z" />
          </svg>
          <span className=" text-[#1F2937]">Ship Name</span>
          <span className=" font-bold text-[#1F2937]">New Titanic 3224</span>
        </p>
        <ol
          className="flex items-center whitespace-nowrap py-3 ps-6 mt-5 ms-7  w-[87%] "
          style={{
            border: "1px solid rgba(128, 128, 128, 0.19)",
            borderRadius: "8px",
          }}
        >
          <li className="inline-flex items-center">
            <a
              className="flex flex-col items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
              href="#"
            >
              start Location <br />{" "}
              <span className=" font-bold block text-[#1F2937]">Dubai</span>
            </a>
            <svg
              className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </li>
          <li className="inline-flex items-center">
            <a
              className="flex flex-col items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
              href="#"
            >
              Stop <br />{" "}
              <span className=" font-bold text-[#1F2937]">Egypt</span>
            </a>
            <svg
              className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </li>
          <li
            className="flex flex-col items-center text-sm font-semibold text-gray-500 truncate dark:text-neutral-200"
            aria-current="page"
          >
            Destination <br />
            <span className=" font-bold text-[#1F2937]">Portsudan</span>
          </li>
        </ol>
        <div
          className="ms-2 w-[90%] mt-4"
          style={{ borderBottom: "1px solid rgba(128 , 128 , 128 , 0.19)" }}
        >
          <div className="flex gap-3 ms-5 items-center mt-10 ">
            <p
              className=" text-gray-600 font-bold bg-[#F5F6F6] p-2 "
              style={{ borderRadius: "5px" , fontFamily: 'Inter , sans-serif'}}
            >
              Departure Date <span className=" text-[#1F2937]">23-05-2024</span>
            </p>
            <p
              className="text-gray-600 font-bold  bg-[#F5F6F6] p-2"
              style={{ borderRadius: "5px" , fontFamily: 'Inter , sans-serif' }}
            >
              Duration <span className=" text-[#1F2937]">4 Days</span>
            </p>
          </div>
          <div className="flex ms-5 mb-3 gap-3 items-center mt-10 ">
            <p
              className=" text-gray-600 font-bold bg-[#F5F6F6] p-2 "
              style={{ borderRadius: "5px" }}
            >
              Arrival At <span className=" text-[#1F2937]">23-05-2024</span>
            </p>
            <p
              className="text-gray-600 font-bold bg-[#F5F6F6] p-2"
              style={{ borderRadius: "5px" }}
            >
              Number of cars <span className=" text-[#1F2937]">50</span>
            </p>
          </div>
        </div>
        <div className="flex ms-5 p-6 items-center">
          <p>
            Available Seats : <span className=" text-[#1F2937]"> 4</span>
          </p>
          <button
            className=" bg-[#04036B] ms-auto text-white p-3 book-btn"
            style={{ borderRadius: "5px" }}
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}
