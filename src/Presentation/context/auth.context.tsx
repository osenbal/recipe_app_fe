import React from 'react';
import {IUser} from '@domain/entity/user/structures/GetUserResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserUsecase from '@domain/interactors/user/UserUsecase';
import UserAPI from '@data/user/UserAPI';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuth: boolean) => void;
  user: IUser | null;
  setUser: (user: any) => void;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: any) => {
  const userUsecase = new UserUsecase(new UserAPI());

  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const checkAccessToken = async () => {
    const token = await AsyncStorage.getItem('@accessToken');
    if (token) {
      await getUser();
    }
  };

  const getUser = async () => {
    const user = await userUsecase.getUser();
    if (user.body?.user) {
      setUser(user.body.user);
      setIsAuthenticated(true);
    }
  };

  React.useEffect(() => {
    checkAccessToken().finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <AuthContext.Provider
          value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
          }}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};
