import { FaRegHospital } from 'react-icons/fa';
const Hero = () => {
  return (
    <section className="relative h-[300px] overflow-hidden rounded-[40%] bg-[#EEF6FF] transition-all duration-500 hover:rounded-[0%]">
      <div className="relative z-10 flex flex-col items-center pt-10">
        <FaRegHospital className="text-6xl text-[#14B8A6] m-4 text-center" />
        <h1 className="text-4xl font-bold text-[#14B8A6]">
          Welcome to{' '}
          <span className="text-[#012553] bg-[#EEF6FF] p-[2px] rounded-[4px]">
            {' '}
            AMALK{' '}
          </span>
          Hospital
        </h1>
        <p className="mt-4 text-lg text-[#121212]">
          Providing quality healthcare services with compassion and excellence.
        </p>
      </div>
    </section>
  );
};

export default Hero;
