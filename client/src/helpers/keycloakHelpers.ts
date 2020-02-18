export const keycloakEnabled = (config: any) => {
  if (!config.auth) return false;
  return (Object.keys(config.auth).length > 0);
};

export const onKeycloakTokens = ({ token, refreshToken } : { token: string, refreshToken: string}) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};