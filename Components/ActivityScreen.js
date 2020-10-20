
import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import firebase from 'firebase';

//Lokalt
import ActivityListItem from './ActivityListItem';

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
})

export default class ActivityScreen extends React.Component {
    state = {
        activities: {},
    };

componentDidMount () {
    firebase
        .database()
        .ref('/activities/')
        .on('value', snapshot => {
            this.setState({ activities: snapshot.val() });
        });
}

handleSelectActivity = id => {
    this.props.navigation.navigate('ActivityDetails', { id });
};

render() {
    const { activities } = this.state;
    //Viser ingenting hvis det ikke er noe data
    if (!activities) {
        return null;
    }
    // Flatlist forventer et array. Derfor tar vi alle values fra aktivitiet-objektet, og bruker det som array til listen
    const activityArray = Object.values(activities);

    //Vi skal også bruke alle IDer, så vi tar med alle keys også
    const activityKeys = Object.keys(activities);
    
    return (
    <ImageBackground style={styles.background}
    source={require('../assets/hei.jpg')}>
        <View>
            <FlatList 
                 data={activityArray}
                    //Bruker activityKey til å finne ID på den aktuelle aktivitet, og returnerer dette som key, og gir
                    //det med som ID til ActivityListItem
                 keyExtractor={(item, index) => activityKeys[index]}
                 renderItem={({item, index}) => (
                    
                <ActivityListItem 
                    activity={item}
                    id={activityKeys[index]}
                    onSelect={this.handleSelectActivity}
                />
              )}
            />
        </View>
    </ImageBackground>
    );
}
    

}
