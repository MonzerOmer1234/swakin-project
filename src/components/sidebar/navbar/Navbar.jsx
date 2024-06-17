export default function Navbar({navName}){


    return <>
    <ol className="flex items-center whitespace-nowrap w-full   border-slate-300" style={{marginLeft : '262px' , boxShadow: '0 0 10px #ddd'}}>
  <li className="inline-flex items-center">
    <a  className="flex items-center text-sm  text-black focus:outline-none  dark:text-neutral-500   ps-10 h-16 cursor-text" href="#">
      {navName}
    </a>
  
  </li>

</ol>
    </>
}