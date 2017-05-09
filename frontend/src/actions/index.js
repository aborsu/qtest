export const login = user => ({
  type: 'LOGIN_USER',
  payload: user,
});

export const logout = () => ({
  type: 'LOGOUT_USER',
});
