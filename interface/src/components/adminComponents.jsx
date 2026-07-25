import api from '../api/axios';
import { useState, useEffect } from 'react';
const AdminComponents = ({ clicked }) => {
  const [Loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [department, setDepartment] = useState({
    name: '',
    doctorName: '',
    description: '',
    image: null,
  });
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
  const handleSubmit = async () => {};
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
          <form className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl space-y-5">
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
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Doctor Name</label>
              <input
                type="text"
                placeholder="Enter doctor's name"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#14B8A6]"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Description</label>
              <textarea
                rows={4}
                placeholder="Department description..."
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#14B8A6]"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Department Image
              </label>
              <input type="file" accept="image/*" className="w-full" />
            </div>

            <button
              className="w-full bg-[#14B8A6] hover:bg-[#0f9b8c] text-white font-bold py-3 rounded-lg transition"
              onClick={handleSubmit}
            >
              Add Department
            </button>
          </form>
        </div>
      );
      break;
    case 'Edit Department':
      content = (
        <div className=" min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] ">
          <div> Edit One</div>
        </div>
      );
      break;
    case 'Control Appointments':
      content = (
        <div className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] ">
          <input type="file" />
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
