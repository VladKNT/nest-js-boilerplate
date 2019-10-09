export const tokenConfig = {
  access: {
    type: 'TOKEN_TYPE_ACCESS',
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: process.env.JWT_ACCESS_EXPIRY,
  },

  refresh: {
    type: 'TOKEN_TYPE_REFRESH',
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  },
};
