import api from '../api/axios.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const new_appointmentPage = () => {
  const navigate = useNavigate();
  const [departments, setdepartments] = useState([]);
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({
    departmentId: '',
    date: '',
    Slot: '',
  });
  const today = new Date();
  const availableDates = [];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const dayIndex = date.getDay();

    if (dayIndex >= 1 && dayIndex <= 5) {
      availableDates.push({
        day: days[dayIndex],
        date: formattedDate,
      });
    }
  }
  useEffect(() => {
    const getDep = async () => {
      try {
        const get_departments = await api.get('/departments');
        setdepartments(get_departments.data);
        setFormData({
          departmentId: get_departments.data[0]._id,
          date: availableDates[0].date,
          Slot: '',
        });
      } catch (err) {
        console.log(err);
      }
    };
    getDep();
  }, []);
  useEffect(() => {
    if (!formData.departmentId || !formData.date) return;
    const getAS = async () => {
      try {
        const Aslots = await api.get(
          `/departments/${formData.departmentId}/available-slots`,
          {
            params: {
              date: formData.date,
            },
          },
        );
        const available = Aslots.data.availableSlots;

        setSlots(available);

        setFormData((prev) => ({
          ...prev,
          Slot: available.length > 0 ? available[0].id : '',
        }));
      } catch (err) {
        console.log(err);
      }
    };
    getAS();
  }, [formData.date, formData.departmentId]);
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await api.post('/appointment', formData);
      navigate('/profile');
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 overflow-hidden">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#012553]">
              Book New Appointment
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Select a department, day and available slot to book your
              appointment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="select-dep"
                className="block text-[#012553] font-semibold mb-2"
              >
                Department
              </label>

              <select
                id="select-dep"
                value={formData.departmentId}
                name="departmentId"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white text-gray-700 shadow-sm outline-none transition duration-200 focus:ring-4 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"
              >
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="select-day"
                className="block text-[#012553] font-semibold mb-2"
              >
                Day
              </label>

              <select
                id="select-day"
                value={formData.date}
                name="date"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white text-gray-700 shadow-sm outline-none transition duration-200 focus:ring-4 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"
              >
                {availableDates.map((item) => (
                  <option key={item.date} value={item.date}>
                    {item.day} - {item.date}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="select-Slot"
                className="block text-[#012553] font-semibold mb-2"
              >
                Available Slots
              </label>

              <select
                id="select-Slot"
                value={formData.Slot}
                name="Slot"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white text-gray-700 shadow-sm outline-none transition duration-200 focus:ring-4 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"
              >
                {slots.map((item) => (
                  <option key={item.id} value={item.id}>
                    Slot {item.id} — {item.time}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#14B8A6] hover:bg-[#0F9C8A] text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default new_appointmentPage;
