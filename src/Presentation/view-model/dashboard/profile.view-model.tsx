import {useState} from 'react';
import AsyncStorageService from '@presentation/storage/asyncStorage';
import {useAuthContext} from '@presentation/context/auth.context';
import {useNavigation} from '@react-navigation/native';

const ProfileViewModel = () => {
  const navigation = useNavigation();

  const {setIsAuthenticated, setUser, user, isAuthenticated} = useAuthContext();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showModalOption, setShowModalOption] = useState<boolean>(false);

  const toggleModalOption = () => {
    setShowModalOption(!showModalOption);
  };

  const handleLogout = async () => {
    Promise.all([
      AsyncStorageService.removeItem('@accessToken'),
      AsyncStorageService.removeItem('@refreshToken'),
      AsyncStorageService.removeItem('@role'),
      setIsAuthenticated(false),
      setUser(null),
    ]).then(() => {
      navigation.navigate('Login' as never);
    });
  };

  return {
    isEdit,
    setIsEdit,
    showModalOption,
    setShowModalOption,
    toggleModalOption,
    handleLogout,
    user,
    isAuthenticated,
  };
};

export default ProfileViewModel;
