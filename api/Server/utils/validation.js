export const validSchema = {
  name: {
    isLength: {
      options: {
        min: 3,
        max: 32,
      },
      errorMessage: 'Name must be between 3-32 letters',
    },
    notEmpty: {
      errorMessage: 'Name must be included',
    },
    isString: {
      errorMessage: 'Name must be string',
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Email must be correct',
    },
    notEmpty: {
      errorMessage: 'Email must be included',
    },
  },
  phone: {
    isLength: {
      options: {
        min: 11,
        max: 11,
      },
      errorMessage: 'Enter correct phone Number',
    },
    notEmpty: {
      errorMessage: 'Phone must be included',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'New password is required',
    },
    isLength: {
      options: {
        min: 8,
        max: 32,
      },
      errorMessage: 'Password must be between 8 and 32 characters',
    },
    matches: {
      options: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]+$/,
      ],
      errorMessage:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  },
};

export const updateSchema = {
  name: {
    isLength: {
      options: { min: 3, max: 32 },
      errorMessage: 'Name must be between 3-32 letters',
    },
    optional: true,
    isString: { errorMessage: 'Name must be string' },
  },
  email: {
    isEmail: { errorMessage: 'Email must be correct' },
    optional: true,
  },
  phone: {
    isLength: {
      options: {
        min: 11,
        max: 11,
      },
      errorMessage: 'Enter correct phone Number',
    },
    optional: true,
  },
};

export const changePasswordSchema = {
  currentPassword: {
    notEmpty: {
      errorMessage: 'Current password is required',
    },
  },

  newPassword: {
    notEmpty: {
      errorMessage: 'New password is required',
    },
    isLength: {
      options: {
        min: 8,
        max: 32,
      },
      errorMessage: 'Password must be between 8 and 32 characters',
    },
    matches: {
      options: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]+$/,
      ],
      errorMessage:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  },
};

export const departmentValidayionSchema = {
  name: {
    isLength: {
      options: { min: 3, max: 32 },
      errorMessage: 'Department name must be between 3-32 letters',
    },
    notEmpty: {
      errorMessage: 'Department name must be included',
    },
    isString: { errorMessage: 'Department name must be string' },
  },
  doctorName: {
    isLength: {
      options: { min: 3, max: 32 },
      errorMessage: 'Doctor name must be between 3-32 letters',
    },
    isString: { errorMessage: 'Doctor name must be string' },
  },
  description: {
    notEmpty: {
      errorMessage: 'Description must be included',
    },
    isString: {
      errorMessage: 'Description must be string',
    },
  },
};

export const departmentUpdateSchema = {
  name: {
    optional: true,
    isString: { errorMessage: 'Name must be a string' },
    isLength: { options: { min: 2 }, errorMessage: 'Name is too short' },
  },
  doctorName: {
    optional: true,
    isString: { errorMessage: 'Doctor name must be a string' },
  },
  description: {
    optional: true,
    isString: { errorMessage: 'Description must be a string' },
  },
};

export const appointmentSchema = {
  departmentId: {
    notEmpty: {
      errorMessage: 'Department is required',
    },
    isMongoId: {
      errorMessage: 'Invalid Department ID',
    },
  },

  date: {
    notEmpty: {
      errorMessage: 'Date is required',
    },
    isISO8601: {
      errorMessage: 'Date must be in YYYY-MM-DD format',
    },
    toDate: true,
  },

  Slot: {
    notEmpty: {
      errorMessage: 'Slot is required',
    },
    isInt: {
      options: {
        min: 1,
        max: 6,
      },
      errorMessage: 'Slot must be a number between 1 and 6',
    },
    toInt: true,
  },
};

export const appointmentStatusSchema = {
  status: {
    notEmpty: {
      errorMessage: 'Status is required',
    },
    isIn: {
      options: [['pending', 'confirmed', 'cancelled']],
      errorMessage: 'Invalid status',
    },
  },
};
