import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Upload from '../views/Upload';
import MyFiles from '../views/MyFiles';
import ProfPicUpload from '../views/ProfPicUpload';
import Update from '../views/Update';
import AuthLoading from '../views/AuthLoading';
import Login from '../views/Login';
import Loading from '../views/Loading';
import Kartta from '../views/Map';
import Favourites from "../views/Favourites";
import { Icon, Container } from 'native-base';
const iconBackgroundColor = '#3F51B5';
const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Profile,
    Upload
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Profile') {
          iconName = 'person';
        } else if (routeName === 'Upload') {
          iconName = 'cloud-upload';
        }

        // You can return any component that you like here!
        return (
          <Container>
            {routeName === 'Home' && (
              <Icon
                name={iconName}
                size={25}
                style={{ backgroundColor: iconBackgroundColor, color: 'grey' }}
              />
            )}
            {routeName === 'Profile' && (
              <Icon
                name={iconName}
                size={25}
                style={{ backgroundColor: iconBackgroundColor, color: 'blue' }}
              />
            )}
            {routeName === 'Upload' && (
              <Icon
                name={iconName}
                size={25}
                style={{
                  backgroundColor: iconBackgroundColor,
                  color: 'lightgreen'
                }}
              />
            )}
          </Container>
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: 'lime',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: '#3F51B5'
      }
    }
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
      screen: Single,
      navigationOptions: {
        header: null
      }
    },
    Logout: {
      screen: Login
    },
    MyFiles: {
      screen: MyFiles,
      navigationOptions: {
        header: null
      }
    },
    Favourites: {
      screen: Favourites,
      navigationOptions: {
        header: null
      }
    },
    Update: {
      screen: Update,
      navigationOptions: {
        header: null
      }
    },
    ProfPicUpload: {
      screen: ProfPicUpload,
      navigationOptions: {
        header: null
      }
    },
    Kartta: {
      screen: Kartta,
      navigationOptions: {
        header: null
      }
    }
  }
);

const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: StackNavigator,
    Auth: Login,
    Loading: {
      screen: Loading,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default createAppContainer(Navigator);
