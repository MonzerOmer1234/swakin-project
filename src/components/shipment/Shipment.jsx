import React from "react";
import Navbar from "../sidebar/navbar/Navbar";
import { sideTabs } from "../sidebar/SideTabs";
import DashboardContentOne from "../dashboard/DashboardContentOne";
import DashboardContentTwo from "../dashboard/DashboardContentTwo";
import DashboardContentThree from "../dashboard/DashboardContentThree";
const Shipment = () => {
  return (
    <>
      <Navbar navName={sideTabs[2]?.text} />
      <div className=" flex justify-between items-center p-5 ms-[190px]"  >
        <h1 className="ms-[100px] font-bold text-2xl">Shipment</h1>

      <div className="max-w-sm space-y-3">
        <div>
          <label for="hs-trailing-button-add-on-with-icon" className="sr-only">
            Label
          </label>
          <div className="flex rounded-lg items-center" style={{boxShadow : '0 0  10px #ddd'}}>
          <button
              type="button"
              className="w-[300px] h-[2.875rem] focus:outline-none  flex  ps-5 items-center text-sm font-semibold rounded-e-md border border-transparent"
            >
              <svg
                className=" size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(128,128,128)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
               <span className="ms-7 text-[rgb(128,128,128)]">Search</span>
            </button>
         
          </div>
        </div>
      </div>
      </div>
      <div className='container w-[calc(100% - 256px)]'>
    
    <div
      style={{ marginLeft: "262px", marginTop: "0px" , width :'100%' }}
      className="h-[1000px] p-5"
    >

  <div className="mt-10 lg:grid lg:gap-2 w-[100%] lg:grid-cols-2 parent">

     <DashboardContentTwo/>
     <DashboardContentTwo/>
     <DashboardContentTwo/>
     <DashboardContentTwo />
  </div>
    </div>
    
    </div>

   
    
    </>
  );
};

export default Shipment;
