/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import MainStack from './Presentation/stacks/MainStack';
import {GlobalProvider} from '@presentation/context/global.context';
import {AuthProvider} from '@presentation/context/auth.context';

function App(): JSX.Element {
  const [onboarding, setOnboarding] = React.useState<boolean>(false); // [state, setState]
  const [globalState, setGlobalState] = React.useState({
    onboarding,
    setOnboarding,
  } as any);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        // our api calls will be here.
        new Promise((resolve: any) => setTimeout(resolve, 4000)); // wait for 4 secs
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hide();
      }
    }
    prepare();
  });

  return (
    <GlobalProvider value={{globalState, setGlobalState}}>
      <AuthProvider value={{isAuthenticated, setIsAuthenticated}}>
        <MainStack />
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
