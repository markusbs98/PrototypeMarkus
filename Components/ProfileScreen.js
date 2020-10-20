import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Button } from 'react-native';
import firebase from 'firebase';

export default class ProfileScreen extends React.Component {
componentDidMount = () => {
    const { user } = firebase.auth();
    this.setState ({ user });
};
handleLogOut = async () => {
    await firebase.auth().signOut();
}

render(){
    const { user } = this.props;
    if (!user) {
        return null;
    }
    return (
    <ImageBackground 
        style={styles.background}
        source={require('../assets/hei.jpg')}>
       <View>
    <Text> Current user: {user.email}</Text>
    <Button onPress={this.handleLogOut} title="Log out"/>
        </View>
    </ImageBackground>
        );
    }
}
