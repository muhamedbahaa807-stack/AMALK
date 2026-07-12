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
