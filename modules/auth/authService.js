// authService.js

const authService = {
  comparePassword: async (inputPassword, storedPassword) => {
    return inputPassword === storedPassword;
  },
};

export default authService;
