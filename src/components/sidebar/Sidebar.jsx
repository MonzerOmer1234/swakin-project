import { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar({ tabs }) {
  

  const [currentIndex, setCurrentIndex] = useState(0);

  function handleClick(index) {
    setCurrentIndex(index);
  }
  
  return (
    
    <>
      {/* <button
        type="button"
        className="text-gray-500 hover:text-gray-600"
        data-hs-overlay="#docs-sidebar"
        aria-controls="docs-sidebar"
        aria-label="Toggle navigation"
      >
        <span className="sr-only">Toggle Navigation</span>
        <svg
          className="flex-shrink-0 size-4"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button> */}
     <div
      id="docs-sidebar"
      className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64   pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700"
      style={{boxShadow: '0  0 10px #ddd'}}
      >
      
        <a
          className="flex-none text-lg text-blue-700 ps-2"
          href="#"
          aria-label="Brand"
        >
          سواكن للنقل و التجاره
        </a>
       
    
      <nav
        className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5">
          {tabs && tabs.length > 0
            ? tabs.map((tab, index) => (
                <li key={tab?.text}>
                  <Link  className={` flex items-center gap-x-3.5 py-2 px-2.5 text-gray-700 rounded-lg  dark:bg-neutral-700 dark:text-white ${
                      currentIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleClick(index)}
                    to={tab?.to}
                  >
                    {tab?.icon}
                    {tab?.text}</Link>
                 
                   
                  
                </li>
              ))
            : null}
        </ul>
      </nav>
    </div> 
     
      
    </>
  );
}
