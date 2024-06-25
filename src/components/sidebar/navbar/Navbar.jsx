export default function Navbar({navName}){


    return <>
    <ol className="flex items-center whitespace-nowrap w-full  " style={{marginLeft : '282px' , backgroundColor:'white' , border : '1px solid #E2E8F0'  }}>
  <li className="inline-flex items-center">
    <a  className="flex items-center text-sm  text-black focus:outline-none  dark:text-neutral-500   ps-5 h-16 cursor-text" href="#">
      {navName}
    </a>
  
  </li>

</ol>
    </>
}