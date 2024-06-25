import React from "react";
import Navbar from "../sidebar/navbar/Navbar";
import "./dashboard.css";

import { sideTabs } from "../sidebar/SideTabs";
import DashboardContentOne from "./DashboardContentOne";
import DashboardContentTwo from "./DashboardContentTwo";
import DashboardContentThree from "./DashboardContentThree";

const Dashboard = () => {
  return (
    <>
      <Navbar navName={sideTabs[0].text} />
      <div
        style={{
          backgroundColor: "#E5E7EB",
          marginLeft: "282px",
          width: "100%",
          height : 'auto'
        }}
      >
        <h1
          className=" font-bold p-5"
          style={{
            fontSize: "20px",
            color: "#353B47",
            fontFamily: "Inter , sans-serif",
          }}
        >
          welcome back , <br /> <span className=" text-3xl">Ahmed</span>
        </h1>

        <div className=" ms-[8px] flex items-start gap-[15px] flex-wrap overflow-hidden " style={{width : 'calc(100% - 290px)'}}>

          <div style={{width : 'calc(50% - 15px)'}}>

            <DashboardContentOne/>
            <DashboardContentThree/>

          </div>
          <div className=" bg-white w-[50%]">

          <h1 className=" p-[20px] text-[#353B47] font-bold" style={{fontFamily :'Inter , sans-serif'}}>Upcoming Shipments</h1>

          <DashboardContentTwo/>
          <DashboardContentTwo/>


          </div>

        </div>
 
      </div>
    </>
  );
};

export default Dashboard;
