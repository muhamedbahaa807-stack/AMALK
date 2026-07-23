import DepartmentCard from '../components/DepartmentCard';
import { useEffect, useState } from 'react';
import api from '../api/axios';
const DepartmentsPage = () => {
  const [departments, setdepartments] = useState([]);
  useEffect(() => {
    const getDep = async () => {
      try {
        const result = await api.get('/departments');
        setdepartments(result.data);
      } catch {
        console.log(err);
      }
    };
    getDep();
  }, []);
  return (
    <>
      <section className="bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6]">
        <div className="min-h-screen ">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 m-5 mt-0 p-5">
            {departments.map((department) => {
              return (
                <DepartmentCard key={department._id} department={department} />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default DepartmentsPage;
