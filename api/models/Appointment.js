import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departments",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  Slot: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

appointmentSchema.index({ userId: 1, departmentId: 1, date: 1 }, { unique: true });

const Appointment = mongoose.model("Appointments", appointmentSchema);
export default Appointment;