import React, {useEffect} from 'react';
import AsyncStorageService from '@presentation/storage/asyncStorage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '@presentation/views/onboarding/Onboarding';
import DashboardStack from './DashbooardStack';
import DetailRecipeView from '@presentation/views/dashboard/DetailRecipe.view';
import RegisterView from '@presentation/views/auth/Register.view';
import LoginView from '@presentation/views/auth/Login.view';
import Test from '@presentation/views/test';
import {useAuthContext} from '@presentation/context/auth.context';
import SearchView from '@presentation/views/dashboard/Seach.view';

const Stack = createNativeStackNavigator();

const MainStack: React.FC = () => {
  const {isAuthenticated} = useAuthContext();
  const [onboarding, setOnboarding] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const getOnboarding = async (): Promise<void> => {
    await AsyncStorageService.getItem('@onboarding')
      .then((res: any) => {
        if (res == 'true') {
          setOnboarding(true);
        }
      })
      .catch((err: any) => {
        console.warn(err);
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getOnboarding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      {loading ? null : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: 'white'},
          }}>
          {
            // if onboarding is true, show home screen
            onboarding == true || isAuthenticated === true ? null : (
              <Stack.Screen name="Onboarding" component={Onboarding} />
            )
          }
          <Stack.Screen name="DashboardStack" component={DashboardStack} />
          <Stack.Screen
            name="Search"
            component={SearchView}
            options={{
              animation: 'slide_from_right',
              animationDuration: 10,
              animationTypeForReplace: 'pop',
            }}
          />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="DetailRecipe" component={DetailRecipeView} />
          {isAuthenticated === true ? null : (
            <>
              <Stack.Screen name="Register" component={RegisterView} />
              <Stack.Screen name="Login" component={LoginView} />
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainStack;
