// @ts-ignore
export const keycloakEnabled = (config) => {
  if (!config.auth) return false;
  return (Object.keys(config.auth).length > 0);
};

// @ts-ignore
export const onKeycloakTokens = ({ token, refreshToken }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};