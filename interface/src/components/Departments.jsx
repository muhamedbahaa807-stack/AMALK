import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DepartmentCard from './DepartmentCard.jsx';
import { useState, useEffect } from 'react';
import api from '../api/axios.js';

const Departments = () => {
  const [departments, setdepartments] = useState([]);

  useEffect(() => {
    const fetchdep = async () => {
      try {
        const { data } = await api.get('/departments');
        setdepartments(data);
      } catch (error) {
        console.error(
          'failed to fetch departments:',
          error.response?.data?.message,
        );
      }
    };

    fetchdep();
  }, []);

  return (
    <section className="bg-[#012553] py-16 px-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Departments</h2>
          <div className="h-1 w-20 bg-[#14B8A6] rounded-full"></div>
        </div>
        <Link
          to="/departments"
          className="text-white hover:text-[#14B8A6] flex items-center gap-2 font-bold"
        >
          View All Departments <FaChevronRight />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {departments.slice(0, 8).map((department) => (
          <DepartmentCard
            key={department._id ?? department.name}
            department={department}
          />
        ))}
      </div>
    </section>
  );
};

export default Departments;
