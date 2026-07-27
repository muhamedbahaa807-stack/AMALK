import { Router } from 'express';
import { verfiyAccessToken, isAdmin } from '../utils/middlewares.js';
import Appointment from '../../models/Appointment.js';
const router = Router();

router.post('/appointment', verfiyAccessToken, async (req, res) => {
  try {
    const { departmentId, date, Slot } = req.body;
    const userId = req.user._id;
    if (!departmentId || !date || !Slot) {
      return res
        .status(400)
        .json({ error: 'All fields (departmentId, date, Slot) are required' });
    }

    if (Slot < 1 || Slot > 6) {
      return res
        .status(400)
        .json({ error: 'Slot must be a number between 1 and 6' });
    }

    const bookingDate = new Date(date);
    const dayOfWeek = bookingDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res
        .status(400)
        .json({ error: 'Cannot book on weekends (Saturday and Sunday)' });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const isSlotTaken = await Appointment.findOne({
      departmentId,
      date: { $gte: startOfDay, $lte: endOfDay },
      Slot,
      status: { $ne: 'cancelled' },
    });

    if (isSlotTaken) {
      return res.status(400).json({
        error: 'This time slot is already booked for this department',
      });
    }

    const newAppointment = new Appointment({
      userId,
      departmentId,
      date: bookingDate,
      Slot,
      status: 'pending', //
    });

    await newAppointment.save();
    return res.status(201).json({
      msg: 'Appointment booked successfully',
      appointment: newAppointment,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/appointment/my', verfiyAccessToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const myAppointments = await Appointment.find({ userId })
      .populate('departmentId', 'name doctorName')
      .sort({ date: 1 });

    return res.status(200).json(myAppointments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/appointment/:id/cancel', verfiyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (
      appointment.userId.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res
        .status(403)
        .json({ error: 'Unauthorized to cancel this appointment' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    return res
      .status(200)
      .json({ msg: 'Appointment cancelled successfully', appointment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put(
  '/appointment/:id/request-edit',
  verfiyAccessToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { newDate, newSlot } = req.body;

      if (!newDate || !newSlot) {
        return res
          .status(400)
          .json({ error: 'New Date and New Slot are required' });
      }

      const appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      if (appointment.userId.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ error: 'Unauthorized to edit this appointment' });
      }

      const startOfDay = new Date(newDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(newDate);
      endOfDay.setHours(23, 59, 59, 999);

      const isSlotTaken = await Appointment.findOne({
        _id: { $ne: id },
        departmentId: appointment.departmentId,
        date: { $gte: startOfDay, $lte: endOfDay },
        Slot: newSlot,
        status: { $ne: 'cancelled' },
      });

      if (isSlotTaken) {
        return res
          .status(400)
          .json({ error: 'The requested new slot is already taken' });
      }

      appointment.date = new Date(newDate);
      appointment.Slot = newSlot;
      appointment.status = 'pending';

      await appointment.save();
      return res.status(200).json({
        msg: 'Edit requested successfully. Awaiting admin confirmation.',
        appointment,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

router.get('/appointments', verfiyAccessToken, isAdmin, async (req, res) => {
  try {
    const allAppointments = await Appointment.find()
      .populate('userId', 'name email')
      .populate('departmentId', 'name doctorName')
      .sort({ createdAt: -1 });
    console.log(allAppointments);
    return res.status(200).json(allAppointments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put(
  '/appointments/:id/status',
  verfiyAccessToken,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status || !['confirmed', 'cancelled', 'pending'].includes(status)) {
        return res.status(400).json({ error: 'Invalid or missing status' });
      }

      const appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      appointment.status = status;
      await appointment.save();

      return res.status(200).json({
        msg: `Appointment status updated to ${status} successfully`,
        appointment,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);
router.delete(
  '/appointments/:id',
  verfiyAccessToken,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      const appointment = await Appointment.findById(id);

      if (!appointment) {
        return res.status(404).json({
          error: 'Appointment not found',
        });
      }

      await appointment.deleteOne();

      return res.status(200).json({
        msg: 'Appointment deleted successfully',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
);
export default router;
