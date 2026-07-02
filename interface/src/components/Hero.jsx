import logo from '../images/logo.png'

const Hero = () => {
  return (
    <section className="relative h-[500px] overflow-hidden">
      <div className="absolute left-[-150px] top-[-150px] h-[500px] w-[500px] rounded-[50%] bg-blue-800 opacity-80 blur-[180px]"></div>
      <div className="absolute right-[-150px] top-[-150px] h-[700px] w-[1000px] rounded-[50%] bg-zinc-900 opacity-80 blur-[180px]"></div>

      <div className="relative z-10 flex flex-col items-center pt-10">
        <img src={logo} alt="Logo" className="w-[450px] max-w-[80%]" />
        <p className="mt-3 text-black font-black">This is <span className='text-blue-700'>AMALK</span> hospital website ,you can book,edit and cancel any Reservation</p>
      </div>
    </section>
  )
}

export default Hero