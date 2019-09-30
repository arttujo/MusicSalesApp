import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../views/Home";
import Profile from "../views/Profile";
import Single from "../views/Single";
import Upload from "../views/Upload"
import MyFiles from "../views/MyFiles"
import Update from "../views/Update"
import AuthLoading from "../views/AuthLoading";
import Login from "../views/Login";
import { Icon } from "native-base";

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Profile,
    Upload,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "home";
        } else if (routeName === "Profile") {
          iconName = "person";
        } else if (routeName === "Upload") {
            iconName = "cloud-upload"
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} />;
      }
    })
  }
);

const StackNavigator = createStackNavigator(
  // RouteConfigs
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        header: null // this will hide the header
      }
    },
    Single: {
      screen: Single
    },
    Logout: {
      screen: Login
    },
    MyFiles:{
      screen: MyFiles
    },
    Update:{
      screen: Update
    }
  }
);

const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: StackNavigator,
    Auth: Login,
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(Navigator);
