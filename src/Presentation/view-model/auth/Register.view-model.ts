import {useState} from 'react';
import RegisterUsecase from '@domain/interactors/auth/RegisterUsecase';
import AuthAPI from '@data/auth/AuthAPI';
import {ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IRegisterResponse} from '@domain/entity/auth/structures/RegisterResponse';

interface IErrors {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export const RegisterViewModel = () => {
  const navigation = useNavigation();
  const registerUsecase = new RegisterUsecase(new AuthAPI());

  const [type, setType] = useState<1 | 0 | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<IErrors>({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const validatePassword = () => {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  };

  const register = async () => {
    try {
      if (!email && !password && !confirmPassword) {
        setErrors((prev: any) => ({
          ...prev,
          email: 'Email is required',
          password: 'Password is required',
          confirmPassword: 'Confirm password is required',
        }));

        return;
      } else if (!email) {
        setErrors((prev: any) => ({
          ...prev,
          email: 'Email is required',
        }));

        return;
      } else if (!password) {
        setErrors((prev: any) => ({
          ...prev,
          password: 'Password is required',
        }));

        return;
      } else if (!confirmPassword) {
        setErrors((prev: any) => ({
          ...prev,
          confirmPassword: 'Confirm password is required',
        }));

        return;
      }

      if (!validatePassword()) {
        setErrors((prev: any) => ({
          ...prev,
          confirmPassword: 'Confirm password is not match',
        }));

        return;
      }

      setErrors({
        email: null,
        password: null,
        confirmPassword: null,
      });

      if (type === null) {
        return;
      }

      const registerResponse: IRegisterResponse = await registerUsecase.execute(
        email,
        password,
        type,
      );

      ToastAndroid.show(
        `${registerResponse.message || 'Register success'}`,
        ToastAndroid.SHORT,
      );

      if (registerResponse.status === 201) {
        navigation.navigate('Login' as never);
      }
    } catch (error: any) {
      console.log(error, 'error');
      ToastAndroid.show(JSON.stringify(error?.message), ToastAndroid.SHORT);
    }
  };

  return {
    type,
    setType,
    email,
    password,
    setPassword,
    setEmail,
    validatePassword,
    confirmPassword,
    setConfirmPassword,
    register,
    errors,
  };
};
