import { FaRegHospital } from 'react-icons/fa';
const Hero = () => {
  return (
    <section className="relative h-[300px] overflow-hidden  bg-[#EEF6FF] ">
      <div className="relative z-10 flex flex-col items-center pt-10">
        <FaRegHospital className="text-6xl text-[#14B8A6] m-4 text-center" />
        <h1 className="text-4xl p-2 font-bold text-[#14B8A6]">
          Welcome to{' '}
          <span className="text-[#012553] bg-[#EEF6FF] p-[2px] rounded-[4px]">
            {' '}
            AMALK{' '}
          </span>
          Hospital
        </h1>
      </div>
    </section>
  );
};

export default Hero;
