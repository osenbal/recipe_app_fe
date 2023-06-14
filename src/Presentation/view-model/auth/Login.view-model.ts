import {useState} from 'react';
import {ToastAndroid} from 'react-native';
import LoginUsecase from '@domain/interactors/auth/LoginUsecase';
import AuthAPI from '@data/auth/AuthAPI';
import {ILoginResponse} from '@domain/entity/auth/structures/LoginResponse';
import AsyncStorageService from '@presentation/storage/asyncStorage';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '@presentation/context/auth.context';

interface IErrors {
  email: string | null;
  password: string | null;
}

export default function LoginViewModel() {
  const navigation = useNavigation();
  const loginUsecase = new LoginUsecase(new AuthAPI());
  const {setIsAuthenticated} = useAuthContext();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const [erros, setErros] = useState<IErrors>({
    email: null,
    password: null,
  });

  const toggleHiddenPassword = () => setHiddenPassword(!hiddenPassword);

  const login = async () => {
    try {
      if (!email && !password) {
        setErros((prev: any) => ({
          ...prev,
          email: 'Email is required',
          password: 'Password is required',
        }));
        return;
      } else if (!email) {
        if (password) {
          setErros((prev: any) => ({
            ...prev,
            password: null,
          }));
        }
        setErros((prev: any) => ({
          ...prev,
          email: 'Email is required',
        }));
        return;
      } else if (!password) {
        if (email) {
          setErros((prev: any) => ({
            ...prev,
            email: null,
          }));
        }
        setErros((prev: any) => ({
          ...prev,
          password: 'Password is required',
        }));
        return;
      } else {
        setErros((prev: any) => ({
          ...prev,
          email: null,
          password: null,
        }));
      }

      setIsLoadingLogin(true);
      // call usecase login
      const loginResponse: ILoginResponse = await loginUsecase.execute(
        email,
        password,
      );

      console.log('================');
      console.log('login');
      console.log('email: ', email);
      console.log('password: ', password);
      console.log('loginResponse: ', loginResponse);
      console.log('================');

      // handle response login
      if (loginResponse.status == 403) {
        if (loginResponse.message == 'Invalid password') {
          setErros((prev: any) => ({
            ...prev,
            password: 'Password is not valid',
          }));
          return;
        } else if (loginResponse.message == 'Invalid email') {
          setErros((prev: any) => ({
            ...prev,
            email: 'User not found',
          }));
          return;
        }
      } else if (loginResponse.status == 404) {
        if (loginResponse.message == 'User not found') {
          setErros((prev: any) => ({
            ...prev,
            email: 'User not found',
          }));
          return;
        }
      } else if (loginResponse.status == 200) {
        setErros((prev: any) => ({
          ...prev,
          email: null,
          password: null,
        }));

        // store token to storage
        if (loginResponse.body) {
          await AsyncStorageService.setItem(
            '@accessToken',
            loginResponse.body?.token.accessToken,
          );
          await AsyncStorageService.setItem(
            '@refreshToken',
            loginResponse.body?.token.refreshToken,
          );
          await AsyncStorageService.setItem(
            '@role',
            JSON.stringify(loginResponse.body?.role),
          );

          await AsyncStorageService.setItem('@onboarding', 'true');
          // navigate to home
          navigation.navigate('DashboardStack' as never);
          setIsAuthenticated(true);
        }
      }
    } catch (error: any) {
      console.log('Login Error :', error);
      ToastAndroid.show(JSON.stringify(error?.message), ToastAndroid.SHORT);
      throw error;
    } finally {
      setIsLoadingLogin(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    hiddenPassword,
    setHiddenPassword,
    toggleHiddenPassword,
    erros,
    setErros,
    isLoadingLogin,
    setIsLoadingLogin,
    login,
  };
}
