
import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert, ImageBackground } from 'react-native';
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: {
        width: 100,
        fontWeight: 'bold',

    },
    value: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
});

export default class ActivityDetails extends React.Component {
    state = { activity: null};

    componentDidMount() {
        //Leser ID fra navigasjon-parametre og loader aktiviteten når komponenten starter
        const id = this.props.navigation.getParam('id');
        this.loadActivity(id);
    }

    loadActivity = id => {
        firebase
        .database()
        //ID fra funksjonens argument settes inn i stien vi leser fra
        .ref('/activities/'+id)
        .on('value', asds => {
            this.setState({activity: asds.val() });
        });
    };

    handleEdit = () => {
        //Navigerer videre til EditActivity og sender ID med
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        navigation.navigate('EditActivity', { id });
    };

    confirmDelete = () => {
        if(Platform.OS ==='ios'|| Platform.OS ==='android'){
            Alert.alert('Are you sure? ', 'Do you want to delete the activity?', [
                {text: 'Cancel', style: 'cancel'},
                //Bruker this.handleDelete som eventHandler til onPress
                {text: 'Delete', style: 'destructive', onPress: this.handleDelete},
            ]);
        } else {
            if(confirm('Are you sure you want to delete this activity?')){
                this.handleDelete()
            }
        }
    };

    //Vi sletter den aktuelle aktivitet
    handleDelete = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        try {
            firebase
            .database()
            //Setter aktivitetens ID inn i stien
            .ref(`/activities/${id}`)
            //Og fjerner data fra stien
            .remove();
            //Og går tilbake når det er utført
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };

render () {
    const { activity } = this.state;
    if (!activity) {
        return <Text> No data </Text>;
    }

    return (
   
        <ImageBackground style={styles.background}
    source={require('../assets/hei.jpg')}>

        <View style={styles.container}>
            <Button title="Edit" onPress={this.handleEdit}/>
            <Button title="Delete" onPress={this.handleDelete}/>
            
            <View style={styles.row}>
                <Text style={styles.label}>Category</Text>
                <Text style={styles.value}>{activity.category}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>People</Text>
                <Text style={styles.value}>{activity.people}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Price</Text>
                <Text style={styles.value}>{activity.price}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.value}>{activity.description}</Text>
            </View>
            
        </View>
    </ImageBackground>
    );
}
}
