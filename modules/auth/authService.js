// authService.js

const authService = {
  comparePassword: async (inputPassword, storedPassword) => {
    return compare(inputPassword, storedPassword);
  },
};

export default authService;
