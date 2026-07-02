import logo from '../images/logo.png'
import { Link } from 'react-router-dom'

const Nav = () => {
  const posts=[{
   title:'Post 1',
   body:'Body of post.',
   category:'News',
   likes:1,
   tags:['news','events'],
   date:Date()
  },{
   title:'Post 2',
   body:'Body of post.',
   category:'Event',
   likes:2,
   tags:['news','events'],
   date:Date()
  },{
   title:'Post 3',
   body:'Body of post.',
   category:'Tech',
   likes:3,
   tags:['news','events'],
   date:Date()
  },{
   title:'Post 4',
   body:'Body of post.',
   category:'Event',
   likes:4,
   tags:['news','events'],
   date:Date()
  },{
   title:'Post 5',
   body:'Body of post.',
   category:'News',
   likes:5,
   tags:['news','events'],
   date:Date()
  },]
  return (
    <section className="sticky top-0 z-[100] flex h-[45px] w-full items-center justify-between bg-blue-600/75 backdrop-blur-md">
      
        <img
          src={logo}
          alt="Logo"
          className="cursor-pointer pl-6 h-[39px] transition-transform group-hover:rotate-12 "
          />
       <div>
      <button className="cursor-pointer mr-4 h-[35px] rounded-lg border border-white bg-transparent px-3 text-[17px] text-white transition-all duration-300 hover:bg-white/10">
        BOOK
      </button>
      <button className="cursor-pointer mr-4 h-[35px] rounded-lg border border-white bg-transparent px-3 text-[17px] text-white transition-all duration-300 hover:bg-white/10">
        Sign In
      </button>
      </div>   
    </section>
  )
}

export default Nav