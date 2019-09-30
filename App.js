import React, {useEffect} from "react";
import { MediaProvider } from "./contexts/MediaContext";
import Navigator from "./navigators/Navigator";
import {Ionicons} from "@expo/vector-icons"
import * as Font from "expo-font"

const App = () => {

  const loadFont = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
  };

  useEffect(() => {
    loadFont();
  }, []);

  return (
    <MediaProvider>
      <Navigator></Navigator>
    </MediaProvider>
  );
};

export default App;
