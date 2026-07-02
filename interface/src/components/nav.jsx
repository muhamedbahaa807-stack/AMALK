import { FaRegHospital } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <section className="sticky top-0 z-[100] flex h-[45px] w-full items-center justify-between bg-[#FFFFFF] backdrop-blur-md">
      <div className="flex items-center gap-2 pl-15 text-[20px] font-bold text-[#012553] tracking-[1px] ">
        <FaRegHospital />
        <p>AMALK</p>  
        </div>  
       <div>
      <button className="cursor-pointer mr-4 h-[35px] rounded-lg border border-white bg-[#012553] px-3 text-[17px] text-white transition-all duration-600 hover:bg-[#000]">
        BOOK
      </button>
      <button className="cursor-pointer mr-4 h-[35px] rounded-lg border border-white bg-[#012553] px-3 text-[17px] text-white transition-all duration-600 hover:bg-[#000]">
        Sign In
      </button>
      </div>   
    </section>
  )
}

export default Nav
