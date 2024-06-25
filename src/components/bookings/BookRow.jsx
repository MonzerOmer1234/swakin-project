export default function BookRow({
  bid,
  sid,
  quantity,
  discount,
  total,
  tax,
  status,
}) {
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
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-center">
        <div
          className={`${
            status === "Pending"
              ? " bg-[#E5E7EB]"
              : status === "Completed"
              ? " bg-[#CCFBF1]"
              : "bg-[#FECACA]"
          } flex items-center w-[120px] h-[28px]  py-5 ps-5 rounded-full`}
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
        <svg
          className=" ms-3"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 12H12.01M12 6H12.01M12 18H12.01M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18ZM13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6Z"
            stroke="#1F2937"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </td>
    </tr>
  );
}
