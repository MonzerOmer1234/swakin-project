import React from "react";
import Navbar from "../sidebar/navbar/Navbar";
import BookRow from "./BookRow";

const Bookings = () => {
  return (
    <>
      <Navbar navName={"Shipments /  #4545 /  Booking"} />
      <h1 className="ms-[278px] p-6 font-bold text-xl">My Bookings</h1>
      <div className=" my-[50px] ms-[270px] w-100">
      <div class="flex  flex-col" style={{border : '1px solid rgba(128,128,128,.19)' , borderRadius: '5px' }}>
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3  text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-center"
                    >
                      BOOKING ID
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      SHIPMENT ID
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      CAR QUANTITY
                    </th>
                    
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      DISCOUNT
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Tax
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                 <BookRow bid='59803544' sid='#4545' quantity= '1' discount='20%' total='12000SR' tax='150SR' status='pending'/>
                 <BookRow bid='59803544' sid='#4545' quantity= '1' discount='20%' total='12000SR' tax='150SR' status='completed'/>
                 <BookRow bid='59803544' sid='#4545' quantity= '1' discount='20%' total='12000SR' tax='150SR' status='cancelled'/>
                 <BookRow bid='59803544' sid='#4545' quantity= '1' discount='20%' total='12000SR' tax='150SR' status='completed'/>
                 <BookRow bid='59803544' sid='#4545' quantity= '1' discount='20%' total='12000SR' tax='150SR' status='completed'/>

                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Bookings;
