import { useState, useEffect } from 'react';
import api from '../api/axios';
const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setloading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  useEffect(() => {
    const getApp = async () => {
      setloading(true);
      try {
        const result = await api.get('/appointment/my');

        setAppointments(result.data);
      } catch (err) {
        console.log(err.data);
      }
      setloading(false);
    };
    getApp();
  }, []);
  const handleCancelAppointment = async () => {
    const id = selectedAppointment._id;
    try {
      await api.put(`appointment/${id}/cancel`);
      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== id),
      );
    } catch (err) {
      console.log(err.data);
    }
    setShowModel(false);
    setSelectedAppointment(null);
  };
  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex items-center justify-center">
          <p className="text-3xl text-white font-bold">Loading...</p>
        </div>
      </>
    );
  }
  if (appointments.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex items-center justify-center">
          <p className="text-4xl text-white font-bold">No Appointments Yet</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className={`min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex flex-col gap-5 py-12 px-4 transition-all duration-300 ${
          showModel ? 'blur-sm pointer-events-none select-none' : ''
        }`}
      >
        <h1 className="text-5xl font-bold text-white text-center mb-10">
          My Appointments
        </h1>
        {appointments.map((appointment) => {
          return (
            <div
              key={appointment._id}
              className="bg-white rounded-2xl shadow-xl p-6 flex justify-between items-center hover:shadow-2xl transition"
            >
              <div>
                <div className="p-2  text-[#14B8A6] text-xl ">
                  Department:{' '}
                  <span className="text-black">
                    {appointment.departmentId.name}
                  </span>
                </div>
                <div className="p-2  text-[#14B8A6] text-xl ">
                  Date:{' '}
                  <span className="text-black">
                    {new Date(appointment.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="p-2 text-[#14B8A6] text-xl">
                  Doctor:{' '}
                  <span className="text-black">
                    Dr. {appointment.departmentId.doctorName}
                  </span>
                </div>
                <div className="p-2 text-[#14B8A6] text-xl">
                  Slot: <span className="text-black">{appointment.Slot}</span>
                </div>
                <div className="p-2">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      appointment.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
              <div className="p-8 ">
                <button
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setShowModel(true);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {showModel && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 z-40"></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-2xl w-[420px] p-8">
              <h2 className="text-3xl font-bold text-[#012553]">
                Cancel Appointment
              </h2>

              <p className="mt-5 text-gray-600 leading-7">
                Are you sure you want to cancel this appointment?
              </p>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setShowModel(false)}
                  className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  No
                </button>

                <button
                  onClick={handleCancelAppointment}
                  className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyAppointmentsPage;
