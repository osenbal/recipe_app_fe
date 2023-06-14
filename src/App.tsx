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
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  const [onboarding, setOnboarding] = React.useState<boolean>(false); // [state, setState]
  const [globalState, setGlobalState] = React.useState({
    onboarding,
    setOnboarding,
  } as any);

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
      <AuthProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <MainStack />
        </GestureHandlerRootView>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
