import React from "react";
import Navbar from "../sidebar/navbar/Navbar";
import BookRow from "./BookRow";

const Bookings = () => {
  return (
    <>
      <Navbar
        navName={
          <p>
            {" "}
            <span className="text-[#4B5563]">Shipments </span>{" "}
            <span className="text-[#1F2937]">/ #4545 / Booking </span>
          </p>
        }
      />
      <h1 className="ms-[282px] p-6 font-bold text-xl text-[#353B47] bg-[#E5E7EB]">
        My Bookings
      </h1>
      <div
        className=" ms-[282px]  bg-[#E5E7EB]"
        style={{ width: "calc(100% - 282px)" }}
      >
        <div className="bg-[#E5E7EB] h-screen">
          <div class="flex  flex-col">
            <div class="-m-1.5 overflow-x-auto">
              <div class="p-1.5 min-w-full inline-block align-middle ">
                <div
                  class="overflow-hidden bg-white mt-[20px] ms-[20px]"
                  style={{ width: "calc(100% - 40px)", borderRadius: "15px" }}
                >
                  <table
                    class=" divide-y ms-[20px] my-[20px]  divide-gray-200  dark:divide-neutral-700"
                    style={{
                      border: "1px solid rgba(128,128,128,.19)",

                      width: "calc(100% - 40px)",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3  text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500 text-center"
                        >
                          BOOKING ID
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                        >
                          SHIPMENT ID
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                        >
                          CAR QUANTITY
                        </th>

                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                        >
                          DISCOUNT
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                        >
                          Tax
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                        >
                          Status
                        </th>

                        <th
                          scope="col"
                          class="px-6 py-3 text-center text-xs font-medium text-[#6B7280] uppercase dark:text-neutral-500"
                        >
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                      <BookRow
                        bid="59803544"
                        sid="#4545"
                        quantity="1"
                        discount="20%"
                        total="12000SR"
                        tax="150SR"
                        status="Pending"
                      />
                      <BookRow
                        bid="59803544"
                        sid="#4545"
                        quantity="1"
                        discount="20%"
                        total="12000SR"
                        tax="150SR"
                        status="Completed"
                      />
                      <BookRow
                        bid="59803544"
                        sid="#4545"
                        quantity="1"
                        discount="20%"
                        total="12000SR"
                        tax="150SR"
                        status="Cancelled"
                      />
                      <BookRow
                        bid="59803544"
                        sid="#4545"
                        quantity="1"
                        discount="20%"
                        total="12000SR"
                        tax="150SR"
                        status="Completed"
                      />
                      <BookRow
                        bid="59803544"
                        sid="#4545"
                        quantity="1"
                        discount="20%"
                        total="12000SR"
                        tax="150SR"
                        status="Completed"
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
