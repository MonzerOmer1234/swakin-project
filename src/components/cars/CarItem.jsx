import carImg from '../../imgs/marcedes.jpg';

export default function CarItem(){
    return <>
    <div class="col-span-4 details" style={{ boxShadow: "0  0 10px #ddd" }}>
          <div className="p-5 flex">
            <div>
              <img src={carImg} alt="" style={{width : '100px' , height : '100px'}} />
            </div>
            <div className='ms-5'>

            <h1 className=" text-center font-bold text-xl">Marceds Benz</h1>
            <h1 className=" text-center font-bold text-xl">مرسيدس بنز</h1>
            <p className="text-center text-gray-500">C-class C 220 D</p>
            </div>
          </div>
          <div>
            <p className="p-5 me-5 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g id="SVGRepo_bluegCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z"
                    fill="blue"
                    fill-opacity="0.24"
                  />{" "}
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="15"
                    rx="2"
                    stroke="blue"
                    stroke-width="1.2"
                  />{" "}
                  <path
                    d="M7 3L7 6"
                    stroke="blue"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />{" "}
                  <path
                    d="M17 3L17 6"
                    stroke="blue"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />{" "}
                  <rect
                    x="7"
                    y="12"
                    width="4"
                    height="2"
                    rx="0.5"
                    fill="blue"
                  />{" "}
                  <rect
                    x="7"
                    y="16"
                    width="4"
                    height="2"
                    rx="0.5"
                    fill="blue"
                  />{" "}
                  <rect
                    x="13"
                    y="12"
                    width="4"
                    height="2"
                    rx="0.5"
                    fill="blue"
                  />{" "}
                  <rect
                    x="13"
                    y="16"
                    width="4"
                    height="2"
                    rx="0.5"
                    fill="blue"
                  />{" "}
                </g>
              </svg>
              <span className="ms-3 text-gray-500">2024</span>
            </p>
          </div>
          <div>
            <p className="p-5 me-5 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g id="SVGRepo_bluegCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.20348 2.00378C9.46407 2.00378 10.5067 3.10742 10.6786 4.54241L19.1622 13.0259L11.384 20.8041C10.2124 21.9757 8.31291 21.9757 7.14134 20.8041L2.8987 16.5615C1.72713 15.3899 1.72713 13.4904 2.8987 12.3188L5.70348 9.51404V4.96099C5.70348 3.32777 6.82277 2.00378 8.20348 2.00378ZM8.70348 4.96099V6.51404L7.70348 7.51404V4.96099C7.70348 4.63435 7.92734 4.36955 8.20348 4.36955C8.47963 4.36955 8.70348 4.63435 8.70348 4.96099ZM8.70348 10.8754V9.34247L4.31291 13.733C3.92239 14.1236 3.92239 14.7567 4.31291 15.1473L8.55555 19.3899C8.94608 19.7804 9.57924 19.7804 9.96977 19.3899L16.3337 13.0259L10.7035 7.39569V10.8754C10.7035 10.9184 10.7027 10.9612 10.7012 11.0038H8.69168C8.69941 10.9625 8.70348 10.9195 8.70348 10.8754Z"
                    fill="blue"
                  />{" "}
                  <path
                    d="M16.8586 16.8749C15.687 18.0465 15.687 19.946 16.8586 21.1175C18.0302 22.2891 19.9297 22.2891 21.1013 21.1175C22.2728 19.946 22.2728 18.0465 21.1013 16.8749L18.9799 14.7536L16.8586 16.8749Z"
                    fill="blue"
                  />{" "}
                </g>
              </svg>

              <span className="ms-3 text-gray-500">Color : Black</span>
            </p>
          </div>
          <div>
            <p className="p-5 me-5 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g id="SVGRepo_bluegCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M13 21L17 3"
                    stroke="blue"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M7 21L11 3"
                    stroke="blue"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M20 9L4 9"
                    stroke="blue"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M4 15L20 15"
                    stroke="blue"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                </g>
              </svg>

              <span className="ms-3 text-gray-500 text-sm">
                Chassis Number : 3452398949233
              </span>
            </p>
          </div>
          <div className="p-5 flex flex-wrap update items-center justify-between">
            <button
              className="text-center flex bg-green-300 p-1"
              style={{ borderRadius: "5px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(34 197 94)"
              >
                &lt; id="SVGRepo_bCarrier" stroke-width="0"&gt;&lt;
                id="SVGRepo_tracerCarrier" stroke-linecap="round"
                stroke-linejoin="round"&gt;&lt; id="SVGRepo_iconCarrier"&gt;{" "}
                <path
                  d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                  stroke=""
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M21 21H12"
                  stroke=""
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
              </svg>
              <span className=" ms-2 text-green-600">Edit Car Info</span>
            </button>
            <button className=" text-center flex bg-red-400 p-1" style={{borderRadius : '5px'}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M10 11V17"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 11V17"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 7H20"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
               <span className=" ms-2">Delete Car</span>
            </button>
          </div>
        </div>
    
    </>
}