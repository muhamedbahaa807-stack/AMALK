import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaFileAlt, FaStethoscope } from 'react-icons/fa';
import api from '../api/axios';

const Edit_Department = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    doctorName: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const { data } = await api.get(`/departments/${id}`);

        setFormData({
          name: data.name,
          doctorName: data.doctorName,
          description: data.description,
        });
      } catch (err) {
        if (err.response.data.error) {
          setError(err.response.data.error[0].msg);
        } else {
          setError(err.response.data.message);
        }
      } finally {
        setPageLoading(false);
      }
    };

    getDepartment();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      await api.put(`/departments/${id}`, formData);

      navigate('/admin');
    } catch (err) {
      console.log(err.response?.data || err.message);
      setError('Failed to update department.');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6]">
        <h1 className="text-white text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] min-h-screen flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-[#012553]">Edit Department</h1>

          <p className="text-gray-500 mt-2">Update department information</p>
        </div>

        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Department Name"
                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#14B8A6] outline-none"
              />
            </div>

            <div className="relative">
              <FaStethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                placeholder="Doctor Name"
                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#14B8A6] outline-none"
              />
            </div>

            <div className="relative">
              <FaFileAlt className="absolute left-4 top-5 text-gray-400" />

              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full pl-11 pr-4 py-3 border rounded-xl resize-none focus:ring-2 focus:ring-[#14B8A6] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#14B8A6] hover:bg-[#0fa392] text-white py-3 rounded-xl font-bold transition"
            >
              {loading ? 'Updating...' : 'Update Department'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit_Department;
