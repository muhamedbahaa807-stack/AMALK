import { Router } from 'express';
import { verfiyAccessToken, isAdmin } from '../utils/middlewares.js';
import Appointment from '../../models/Appointment.js';
import {
  appointmentSchema,
  appointmentStatusSchema,
} from '../utils/validation.js';
import { checkSchema, validationResult } from 'express-validator';
const router = Router();

router.post(
  '/appointment',
  verfiyAccessToken,
  checkSchema(appointmentSchema),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: result.array(),
      });
    }

    try {
      const { departmentId, date, Slot } = req.body;
      const userId = req.user._id;

      const department = await Department.findById(departmentId);

      if (!department) {
        return res.status(404).json({
          message: 'Department not found',
        });
      }

      const bookingDate = new Date(date);

      const dayOfWeek = bookingDate.getDay();

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return res.status(400).json({
          message: 'Cannot book on weekends (Saturday and Sunday)',
        });
      }

      const startOfDay = new Date(bookingDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(bookingDate);
      endOfDay.setHours(23, 59, 59, 999);

      const userAppointment = await Appointment.findOne({
        userId,
        departmentId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        status: {
          $ne: 'cancelled',
        },
      });

      if (userAppointment) {
        return res.status(400).json({
          message:
            'You already have an appointment in this department on this date',
        });
      }

      const isSlotTaken = await Appointment.findOne({
        departmentId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        Slot,
        status: {
          $ne: 'cancelled',
        },
      });

      if (isSlotTaken) {
        return res.status(400).json({
          message: 'This time slot is already booked for this department',
        });
      }

      const appointment = await Appointment.create({
        userId,
        departmentId,
        date: bookingDate,
        Slot,
        status: 'pending',
      });

      return res.status(201).json({
        message: 'Appointment booked successfully',
        appointment,
      });
    } catch (err) {
      console.error(err);

      if (err.name === 'CastError') {
        return res.status(400).json({
          message: 'Invalid Department ID format',
        });
      }

      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
);

router.get('/appointment/my', verfiyAccessToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const myAppointments = await Appointment.find({ userId })
      .populate('departmentId', 'name doctorName')
      .sort({ date: 1 })
      .lean();

    return res.status(200).json(myAppointments);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});
router.put('/appointment/:id/cancel', verfiyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found',
      });
    }

    if (
      appointment.userId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        message: 'Unauthorized to cancel this appointment',
      });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({
        message: 'Appointment is already cancelled',
      });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    return res.status(200).json({
      message: 'Appointment cancelled successfully',
      appointment,
    });
  } catch (err) {
    console.error(err);

    if (err.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid Appointment ID format',
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.get('/appointments', verfiyAccessToken, isAdmin, async (req, res) => {
  try {
    const allAppointments = await Appointment.find()
      .populate('userId', 'name email')
      .populate('departmentId', 'name doctorName')
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(allAppointments);
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.put(
  '/appointments/:id/status',
  verfiyAccessToken,
  isAdmin,
  checkSchema(appointmentStatusSchema),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        error: result.array(),
      });
    }

    try {
      const { id } = req.params;
      const { status } = req.body;

      const appointment = await Appointment.findById(id);

      if (!appointment) {
        return res.status(404).json({
          message: 'Appointment not found',
        });
      }

      if (appointment.status === status) {
        return res.status(400).json({
          message: `Appointment is already ${status}`,
        });
      }

      appointment.status = status;
      await appointment.save();

      return res.status(200).json({
        message: `Appointment status updated to ${status} successfully`,
        appointment,
      });
    } catch (err) {
      console.error(err);

      if (err.name === 'CastError') {
        return res.status(400).json({
          message: 'Invalid Appointment ID format',
        });
      }

      return res.status(500).json({
        message: 'Internal Server Error',
      });
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
          message: 'Appointment not found',
        });
      }

      await appointment.deleteOne();

      return res.status(200).json({
        message: 'Appointment deleted successfully',
      });
    } catch (err) {
      console.error(err);

      if (err.name === 'CastError') {
        return res.status(400).json({
          message: 'Invalid Appointment ID format',
        });
      }

      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
);
export default router;
