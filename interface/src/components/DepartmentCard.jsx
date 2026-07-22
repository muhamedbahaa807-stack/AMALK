import { Link } from 'react-router-dom';

const DepartmentCard = ({ department }) => {
  return (
    <Link
      to={`/departments/${department._id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-200 w-full cursor-pointer block"
    >
      <div className="overflow-hidden">
        <img
          src={department.image}
          alt={department.name}
          className="w-full h-[180px] object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-[#012553] truncate">
          {department.name}
        </h2>

        <p className="text-sm text-[#14B8A6] font-medium mt-1 truncate">
          Dr. {department.doctorName}
        </p>

        <p className="text-gray-600 text-sm mt-3 line-clamp-2">
          {department.description}
        </p>
      </div>
    </Link>
  );
};

export default DepartmentCard;
