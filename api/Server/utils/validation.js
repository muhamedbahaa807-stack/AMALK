export const validSchema = {
  name: {
    isLength: {
      Options: {
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
};

export const updateSchema = {
  name: {
    isLength: {
      Options: { min: 3, max: 32 },
      errorMessage: 'Name must be between 3-32 letters',
    },
    optional: true,
    isString: { errorMessage: 'Name must be string' },
  },
  email: {
    isEmail: { errorMessage: 'Email must be correct' },
    optional: true,
  },
};

export const departmentValidayionSchema = {
  name: {
    isLength: {
      Options: { min: 3, max: 32 },
      errorMessage: 'Name must be between 3-32 letters',
    },
    notEmpty: {
      errorMessage: 'Name must be included',
    },
    isString: { errorMessage: 'Name must be string' },
  },
  doctorName: {
    isLength: {
      Options: { min: 3, max: 32 },
      errorMessage: 'Name must be between 3-32 letters',
    },
    isString: { errorMessage: 'Name must be string' },
  },
  description: {
    notEmpty: {
      errorMessage: 'description must be included',
    },
    isString: {
      errorMessage: 'description must be string',
    },
  },
  image: {
    notEmpty: {
      errorMessage: 'image must be included',
    },
    isString: {
      errorMessage: 'image must be string',
    },
    isURL: {
      errorMessage: 'Image must be a valid Cloudinary URL',
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
  image: {
    optional: true,
    isURL: { errorMessage: 'Image must be a valid Cloudinary URL' },
  },
};
