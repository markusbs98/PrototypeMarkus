import firebase from 'firebase';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign, Entypo, EvilIcons, Feather } from '@expo/vector-icons';

//Lokalt
import ActivityScreen from "./Components/ActivityScreen";
import AddActivityScreen from "./Components/AddActivityScreen";
import ActivityDetails from "./Components/ActivityDetails";
import EditActivity from "./Components/EditActivity";
import ProfileScreen from './Components/ProfileScreen';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

//Oppretter StackNavigator for ActivityScreen som fører brukeren videre til Details & Edit
const StackNavigator = createStackNavigator(
    {
      ActivityScreen: { screen: ActivityScreen },
      ActivityDetails: { screen: ActivityDetails },
        EditActivity: {screen: EditActivity}
    },
    { initialRouteKey: 'ActivityScreen' }
);
//Oppretter StackNavigator for SignUp som fører brukeren videre til Login dersom brukeren ikke er registrert
const UserStack = createStackNavigator (
    {
    SignUp: {screen: SignUp},
    Login: { screen: Login },
    },
    { initialRouteKey: 'SignUp'}
);
//Oppretter TabNavigator
const TabNavigator = createBottomTabNavigator({
  //Henter StackNavigatoren som er opprettet ovenfor
    Main: {screen: StackNavigator,
      navigationOptions: {
        
        // Tekst og icon for screen i TabNavigator
        tabBarLabel:"Activities",
          tabBarIcon: ({ tintColor }) => (
              <EvilIcons name="navicon" size={24} color={tintColor} />
          )
      },
  },
Add: {screen: AddActivityScreen,
      navigationOptions: {
          tabBarLabel:"Add Activity",
          tabBarIcon: ({ tintColor }) => (
              <Entypo name="add-to-list" size={24} color={tintColor} />
          )
      },
  },
  
UserStack: {screen: UserStack,
    navigationOptions: {
        tabBarLabel:"Sign up",
        tabBarIcon: ({ tintColor }) => (
            <Feather name="user-plus" size={24} color={tintColor} />
                )
            },
        },
Profile: {screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel:"Profile",
            tabBarIcon: ({ tintColor }) => (
                    <Feather name="user" size={24} color={tintColor} />
                )
            },
        },
        
});
const AppContainer = createAppContainer(TabNavigator);


export default class App extends React.Component {
state = {user:null}

 UNSAFE_componentWillMount() {
    const firebaseConfig = {
        apiKey: "AIzaSyB_HooS5tMKwo3sv-1MbdhxrX7WRwwYN60",
        authDomain: "myproto2-base.firebaseapp.com",
        databaseURL: "https://myproto2-base.firebaseio.com",
        projectId: "myproto2-base",
        storageBucket: "myproto2-base.appspot.com",
        messagingSenderId: "190889424726",
        appId: "1:190889424726:web:34adfbbd41ac1f311808f7",
        measurementId: "G-SF57Z1L6X8"

    };

    // Vi kontrollerer at det ikke allerede er en initialiseret instans av firebase
    // Så unngår vi feilen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
    if (firebase.apps.length ===0 ) {
    firebase.initializeApp(firebaseConfig);
}
firebase.auth().onAuthStateChanged (user => { this.setState({ user });
});

 }
 render() {
     return <AppContainer />;
}
}
