import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center">
        <h1 className="text-8xl font-extrabold text-[#14B8A6]">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-[#012553]">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-500 leading-7">
          Sorry, the page you are looking for doesn't exist or may have been
          moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-[#14B8A6] hover:bg-[#10998B] text-white font-semibold px-8 py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
