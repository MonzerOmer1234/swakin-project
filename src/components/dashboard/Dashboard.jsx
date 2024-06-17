import React from 'react'
import Navbar from '../sidebar/navbar/Navbar'
import './dashboard.css'

import  { sideTabs } from '../sidebar/SideTabs'
import DashboardContentOne from './DashboardContentOne'
import DashboardContentTwo from './DashboardContentTwo'
import DashboardContentThree from './DashboardContentThree'



const Dashboard = () => {
  return (
    <div className='container w-[calc(100% - 256px)]'>
    <Navbar  navName={sideTabs[0].text}/>
    <div
      style={{ marginLeft: "262px", marginTop: "30px" , width :'100%' }}
      className="h-[1000px] p-5"
    >
<h1 className=" font-bold " style={{ color: "#333", fontSize: "30px" }}>
    welcome back , <br /> Ahmed
  </h1>
  <div className="mt-10 lg:grid lg:gap-2 w-[100%] lg:grid-cols-2 parent">

     <DashboardContentOne/>
     <DashboardContentTwo/>
     <DashboardContentThree/>
     <DashboardContentTwo />
  </div>
    </div>
    
    </div>
  )
}

export default Dashboard