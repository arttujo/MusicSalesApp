import React, { useEffect, useState } from 'react';
import { MediaProvider } from './contexts/MediaContext';
import Navigator from './navigators/Navigator';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import Expo, { AppLoading } from 'expo';

const App = () => {
  const [loading, setLoading] = useState(true);
  const loadFont = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    });
    setLoading(false);
  };

  useEffect(() => {
    loadFont();
  }, []);

  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <MediaProvider>
        <Navigator></Navigator>
      </MediaProvider>
    );
  }
};
export default App;
