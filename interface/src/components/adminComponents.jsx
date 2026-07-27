import api from '../api/axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminComponents = ({ clicked }) => {
  const [Loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [department, setDepartment] = useState({
    name: '',
    doctorName: '',
    description: '',
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    console.log(e.target.files);
    setDepartment({
      ...department,
      image: e.target.files[0],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit');
    const formData = new FormData();

    formData.append('name', department.name);
    formData.append('doctorName', department.doctorName);
    formData.append('description', department.description);
    formData.append('image', department.image);
    setLoading(true);
    try {
      await api.post('/departments', formData);
      navigate('/departments');
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const handleDelete = async (e, id) => {
    setLoading(true);
    try {
      await api.delete(`/departments/${id}`);
      setDepartments((prev) =>
        prev.filter((department) => department._id !== id),
      );
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setShowModel(false);
  };
  const handleAppointmentStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, { status });

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id ? { ...appointment, status } : appointment,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);

      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== id),
      );

      setShowAppointmentModal(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/users');
        setUsers(data);
      } catch (err) {
        console.log(err || 'Failed to get USers');
      }
      setLoading(false);
    };

    getUsers();
  }, []);
  useEffect(() => {
    const getDepartments = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/departments');
        setDepartments(data);
      } catch (err) {
        console.log(err || 'Failed to get Departments');
      }
      setLoading(false);
    };

    getDepartments();
  }, []);
  useEffect(() => {
    const getAppointments = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/appointments');
        setAppointments(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, []);
  let content;
  if (Loading) {
    content = (
      <div className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex items-center justify-center">
        <p className="text-3xl text-white font-bold">Loading...</p>
      </div>
    );
  }

  switch (clicked) {
    case 'Add Department':
      content = (
        <div className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex justify-center items-center p-8">
          <form
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl space-y-5"
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl font-bold text-[#012553] text-center">
              Add Department
            </h2>

            <div>
              <label className="block mb-2 font-semibold">
                Department Name
              </label>
              <input
                type="text"
                placeholder="Enter department name"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#14B8A6]"
                required
                name="name"
                value={department.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Doctor Name</label>
              <input
                type="text"
                placeholder="Enter doctor's name"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#14B8A6]"
                required
                name="doctorName"
                value={department.doctorName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Description</label>
              <textarea
                rows={4}
                placeholder="Department description..."
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#14B8A6]"
                required
                name="description"
                value={department.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Department Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={handleImageChange}
              />
            </div>

            <button
              className="w-full bg-[#14B8A6] hover:bg-[#0f9b8c] text-white font-bold py-3 rounded-lg transition"
              type="submit"
            >
              Add Department
            </button>
          </form>
        </div>
      );
      break;
    case 'Edit Department':
      content = (
        <div className=" min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] p-8 flex flex-col gap-4">
          {departments.map((department) => {
            return (
              <div
                key={department._id}
                className="flex gap-4 rounded-2xl bg-white shadow-2xl border border-gray-100 p-5"
              >
                {/*container*/}
                <div className="flex gap-2">
                  {/*image div*/}
                  <div className="max-w-[450px]">
                    <img src={department.image} alt={department.name} />
                  </div>
                  {/*information div*/}
                  <div className="flex flex-col pl-6">
                    <div className="text-[#14B8A6] font-semibold uppercase tracking-widest pt-6">
                      Department
                    </div>
                    <h1 className="text-5xl font-bold text-[#012553] mt-2 ">
                      {department.name}
                    </h1>
                    <div className="w-20 h-1 bg-[#14B8A6] rounded-full mt-2"></div>
                    <div className="mt-4">
                      <h2 className="text-xl font-semibold text-[#012553]">
                        Doctor
                      </h2>

                      <p className="text-2xl text-gray-700 mt-2">
                        Dr. {department.doctorName}
                      </p>
                    </div>
                    <div className="mt-4">
                      <h2 className="text-xl font-semibold text-[#012553]">
                        Description
                      </h2>

                      <p className="text-2xl text-gray-700 mt-2">
                        {department.description}
                      </p>
                    </div>
                  </div>
                </div>
                {/*actions*/}
                <div className="flex flex-col justify-center items-center gap-4 min-w-[170px] border-l border-gray-200 pl-6 ml-auto">
                  <Link
                    to={`/edit_department/${department._id}`}
                    className="w-full"
                  >
                    <button className="w-full flex items-center justify-center gap-2 bg-[#14B8A6] hover:bg-[#0fa392] text-white py-3 px-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      ✏️ Edit Department
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      setShowModel(true);
                      setSelectedDepartment(department);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 px-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    🗑️ Delete Department
                  </button>
                </div>
              </div>
            );
          })}
          {/*show Models*/}
          {showModel && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => {
                console.log('overlay');
                setShowModel(false);
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
              >
                <h2 className="text-2xl font-bold text-[#012553] mb-3">
                  Confirm Delete
                </h2>

                <p className="text-gray-600 mb-8">
                  Are you sure you will delete this department?
                </p>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowModel(false)}
                    className="px-6 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={(e) => handleDelete(e, selectedDepartment._id)}
                    className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
      break;
    case 'Control Appointments':
      content = (
        <div className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] p-8 flex flex-col gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="flex rounded-2xl bg-white shadow-2xl border border-gray-100 p-6"
            >
              <div className="flex-1">
                <div className="text-[#14B8A6] font-semibold uppercase tracking-widest">
                  Appointment
                </div>

                <h2 className="text-4xl font-bold text-[#012553] mt-2">
                  {appointment.userId.name}
                </h2>

                <div className="w-20 h-1 bg-[#14B8A6] rounded-full mt-2"></div>

                <div className="mt-5 space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#012553] text-lg">
                      Department
                    </h3>

                    <p className="text-xl text-gray-700">
                      {appointment.departmentId.name}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#012553] text-lg">
                      Doctor
                    </h3>

                    <p className="text-xl text-gray-700">
                      Dr. {appointment.departmentId.doctorName}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#012553] text-lg">
                      Status
                    </h3>

                    <span
                      className={`inline-block mt-2 px-4 py-2 rounded-full font-semibold
                  ${
                    appointment.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : appointment.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                  }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 border-l border-gray-200 pl-6 min-w-[220px]">
                <button
                  disabled={appointment.status === 'confirmed'}
                  onClick={() =>
                    handleAppointmentStatus(appointment._id, 'confirmed')
                  }
                  className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-3 rounded-xl font-semibold transition"
                >
                  Accept
                </button>

                <button
                  disabled={appointment.status === 'cancelled'}
                  onClick={() =>
                    handleAppointmentStatus(appointment._id, 'cancelled')
                  }
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 rounded-xl font-semibold transition"
                >
                  Reject
                </button>

                <button
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setShowAppointmentModal(true);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {showAppointmentModal && (
            <div
              onClick={() => setShowAppointmentModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
              >
                <h2 className="text-2xl font-bold text-[#012553] mb-3">
                  Confirm Delete
                </h2>

                <p className="text-gray-600 mb-8">
                  Are you sure you want to delete this appointment?
                </p>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowAppointmentModal(false)}
                    className="px-6 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteAppointment(selectedAppointment._id)
                    }
                    className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
      break;
    default:
      content = (
        <div className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] ">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Users</h1>

            <div className="overflow-x-auto rounded-xl bg-white shadow-lg">
              <table className="w-full">
                <thead className="bg-[#012553] text-white">
                  <tr>
                    <th className="p-4 text-left">#</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Phone</th>
                    <th className="p-4 text-left">Role</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="border-b hover:bg-slate-100 transition"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.phone}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.role === 'admin'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
  }

  return <>{content}</>;
};

export default AdminComponents;
