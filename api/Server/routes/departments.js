import { Router } from 'express';
import { verfiyAccessToken, isAdmin } from '../utils/middlewares.js';
import {
  departmentValidayionSchema,
  departmentUpdateSchema,
} from '../utils/validation.js';
import Department from '../../models/Department.js';
import Appointment from '../../models/Appointment.js';
import { validationResult, checkSchema, matchedData } from 'express-validator';
import { upload } from '../utils/middlewares.js';
import cloudinary from '../config/cloudinary.js';

const router = Router();

const ALL_SLOTS = [
  { id: 1, time: '12:00 PM - 01:30 PM' },
  { id: 2, time: '01:30 PM - 03:00 PM' },
  { id: 3, time: '03:00 PM - 04:30 PM' },
  { id: 4, time: '04:30 PM - 06:00 PM' },
  { id: 5, time: '06:00 PM - 07:30 PM' },
  { id: 6, time: '07:30 PM - 09:00 PM' },
];

router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json(departments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post(
  '/departments',
  verfiyAccessToken,
  isAdmin,
  upload.single('image'),

  async (req, res) => {
    const { body } = req;
    const result = await cloudinary.uploader.upload(req.file.path);
    body.image = result.secure_url;
    try {
      const newDepartment = await Department.create(body);
      console.log(newDepartment);
      return res.status(201).json(newDepartment);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
);

router.get('/departments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    return res.status(200).json(department);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid Department ID format' });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put(
  '/departments/:id',
  verfiyAccessToken,
  isAdmin,
  checkSchema(departmentUpdateSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array() });
    }
    try {
      const { id } = req.params;
      const dataToUpdate = matchedData(req);
      if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ error: 'No data provided to update' });
      }
      const updatedDepartment = await Department.findByIdAndUpdate(
        id,
        { $set: dataToUpdate },
        { new: true, runValidators: true },
      );

      if (!updatedDepartment) {
        return res.status(404).json({ error: 'Department not found' });
      }

      return res.status(200).json({
        msg: 'Department updated successfully',
        department: updatedDepartment,
      });
    } catch (err) {
      console.error(err);

      if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid Department ID format' });
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

router.get('/departments/:id/available-slots', async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
      return res
        .status(400)
        .json({ error: 'Date query parameter (?date=YYYY-MM-DD) is required' });
    }

    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const parsedDate = new Date(date);
    const dayOfWeek = parsedDate.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.status(200).json({
        msg: 'Weekend (Saturday and Sunday) are days off. No slots available.',
        availableSlots: [],
      });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await Appointment.find({
      departmentId: id,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: 'cancelled' },
    });

    const bookedSlotIds = existingAppointments.map((app) => app.Slot);

    const availableSlots = ALL_SLOTS.filter(
      (slot) => !bookedSlotIds.includes(slot.id),
    );

    return res.status(200).json({
      date,
      totalAvailable: availableSlots.length,
      availableSlots,
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid Department ID format' });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete(
  '/departments/:id',
  verfiyAccessToken,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      const deletedDepartment = await Department.findByIdAndDelete(id);

      if (!deletedDepartment) {
        return res.status(404).json({ error: 'Department not found' });
      }

      await Appointment.deleteMany({ departmentId: id });

      return res.status(200).json({
        msg: 'Department and its related appointments deleted successfully',
        department: deletedDepartment,
      });
    } catch (err) {
      console.error(err);

      if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid Department ID format' });
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);
export default router;
