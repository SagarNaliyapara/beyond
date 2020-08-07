import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import Route from './Route'
import { delayConfiguration } from 'pusher-redux/react-native'
import configureStore from './config/store'
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import config from './config/app-config'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { View, Text } from 'react-native';
import { getNotificationPermission } from './src/utils/NotificationPermission';
const store = configureStore()
delayConfiguration(store, config.pusherAppId, config.pusherOptions)


const App = () => {

  const [expoPushToken, setExpoPushToken] = useState('');

  let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Tajawal-Bold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Tajawal-Medium.ttf'),
    'Copperplate': require('./assets/fonts/Copperplate.ttf')
  });
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);

  async function registerForPushNotificationsAsync() {
    const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
      return  await Notifications.getExpoPushTokenAsync();
  }

  // return (
  //   <SafeAreaProvider>
  //     <SafeAreaView>
  //       <View style={{
  //         flex: 1,
  //         marginTop: 100,
  //         height: '100%',
  //         width: '100%',
  //         backgroundColor: '#fff',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}>
  //         <Text>Open up App.js to start working on your app!</Text>
  //       </View>
  //     </SafeAreaView>
  //   </SafeAreaProvider>
  // )
  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: 'never', bottom: 'never' }}>
          <AppLoading />
        </SafeAreaView>
      </SafeAreaProvider>);
  } else {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}
          forceInset={{ top: 'never', bottom: 'never' }}>
          <Provider store={store}>
            <Route />
          </Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

}

export default App;

