import React from 'react';

export const AuthContext = React.createContext({});
export const AuthProvider = AuthContext.Provider;

export const useAuthContext = () => {
  return React.useContext(AuthContext);
};
