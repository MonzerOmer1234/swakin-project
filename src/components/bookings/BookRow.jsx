import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function BookRow({
  bid,
  sid,
  quantity,
  discount,
  total,
  tax,
  status,
}) {
  const [closeActions, setCloseActions] = useState(true);
  const [t] = useTranslation();
  return (
    <tr>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937] dark:text-neutral-200 text-center">
        {bid}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937] dark:text-neutral-200 text-center">
        {sid}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937] dark:text-neutral-200 text-center">
        {quantity}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937] dark:text-neutral-200 text-center">
        {discount}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937] dark:text-neutral-200 text-center">
        {total}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937] dark:text-neutral-200 text-center">
        {tax}
      </td>
      <td class="px-6 py-4 flex justify-center whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-center">
        <div
          className={`${
            status === "Pending"
              ? " bg-[#E5E7EB]"
              : status === "Completed"
              ? " bg-[#CCFBF1]"
              : "bg-[#FECACA]"
          } flex items-center w-[120px] h-[28px]  py-5 ps-5 rounded-full ms-2`}
        >
          <span
            style={{ width: "5px", height: "5px", borderRadius: "50%" }}
            className={` block mt-[3px]  ${
              status === "Pending"
                ? " bg-[#1F2937]"
                : status === "Completed"
                ? " bg-[#115E59]"
                : "bg-[#EF4444]"
            }`}
          ></span>
          <span
            className={` block mt-[3px] ms-3 font-medium ${
              status === "Pending"
                ? " text-[#1F2937]"
                : status === "Completed"
                ? " text-[#115E59]"
                : "text-[#EF4444]"
            }`}
          >
            {status}
          </span>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
        <div class="relative inline-block text-left">
          <div>
            <button
              onClick={() => setCloseActions(!closeActions)}
              type="button"
              class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900   hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
           <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
<path d="M12 12H12.01M12 6H12.01M12 18H12.01M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18ZM13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </button>
          </div>

          <div
            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg  ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            {
              !closeActions &&  <div class="py-1" role="none">
              <Link
                to={`/shipments/mybookings/${sid}`}
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
              >
                {t('Show Booking details')}
              </Link>
              <Link
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="menu-item-1"
              >
                {t('Cancel Booking')}
              </Link>
           
            </div>
            }
          </div>
        </div>
      </td>
    </tr>
  );
}