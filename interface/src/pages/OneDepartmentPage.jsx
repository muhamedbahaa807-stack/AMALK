import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';

const OneDepartmentPage = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const getOneDep = async () => {
      try {
        const result = await api.get(`/departments/${id}`);
        setDepartment(result.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    getOneDep();
  }, [id]);

  if (!department) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6]">
        <h1 className="text-3xl text-white font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid md:grid-cols-2">
        <div className="h-[600px]">
          <img
            src={department.image}
            alt={department.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-10 flex flex-col justify-center">
          <span className="text-[#14B8A6] font-semibold uppercase tracking-widest">
            Department
          </span>

          <h1 className="text-5xl font-bold text-[#012553] mt-2">
            {department.name}
          </h1>

          <div className="w-20 h-1 bg-[#14B8A6] rounded-full mt-4"></div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-[#012553]">Doctor</h2>

            <p className="text-2xl text-gray-700 mt-2">
              Dr. {department.doctorName}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-[#012553]">
              Description
            </h2>

            <p className="text-gray-600 leading-8 mt-3">
              {department.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneDepartmentPage;
