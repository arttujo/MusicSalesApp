
const constraints = {
  'email': {
    presence: true,
    email: true,
    message: '^Please enter a valid email address',
  },
  'password': {
    presence: true,
    length: {
      minimum: 5,
    },
    message: '^Password must be atleast 5 characters',
  },
  'confirm-password': {
    presence: true,
    equality: 'password',
    message: '^Passwords do not match',
  },
  'username': {
    presence: true,
    message: '^Please enter a valid username',
    length: {
      minimum: 3,
      maximum: 20,
    },
  },
};

export default Validation;
