
import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    ImageBackground
} from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: { fontWeight: 'bold', width: 100 },
    input: { borderWidth: 1, flex: 1 },
    background: { flex: 1 }
});

export default class EditActivity extends React.Component{
    state = {
        category: '',
        people: '',
        price: '',
        description: '',
    };

    componentDidMount() {
        const id = this.props.navigation.getParam('id');
        this.loadActivity(id);
    }

    //Her loader bilens data ut fra den ID vi får med navigasjonen.
    loadActivity = id => {
        firebase
        .database()
        .ref('/activities/'+id)
        .once('value', dataObject => {
            const activity = dataObject.val();
            const { category, people, price, description } = activity;
            this.setState({category, people, price, description});
        });
    };

    handleCategoryChange = text => this.setState({category: text});
    handlePeopleChange = text => this.setState({people: text});
    handlePriceChange = text => this.setState({price: text});
    handleDescriptionChange = text => this.setState({description: text});

    updateData = () => {
        //Vi bruker this.props.navigation flere steder så vi pakker den ut en gang for alle.
        const { navigation } = this.props;
        const { category, people, price, description } = this.state;
        const id = navigation.getParam('id');

        try{
            firebase
                .database()
                .ref(`/activities/${id}`)
                //Bruker update så kun de feltene som angis blir endret
                .update({ category, people, price, description });
                //Når aktiviteten er endret, går vi tilbake.
                Alert.alert("Din info er nå oppdatert");
                navigation.goBack();
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    render() {
        const { category, people, price, description } = this.state;
        return (
        <ImageBackground style={styles.background}
            source={require('../assets/hei.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.row}>
                    <Text style={styles.label}> Category </Text>
                    <TextInput 
                    value={category}
                    onChangeText={this.handleCategoryChange}
                    style={styles.input}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> People needed </Text>
                    <TextInput 
                    value={people}
                    onChangeText={this.handlePeopleChange}
                    style={styles.input}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Price </Text>
                    <TextInput 
                    value={price}
                    onChangeText={this.handlePriceChange}
                    style={styles.input}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Description </Text>
                    <TextInput 
                    value={description}
                    onChangeText={this.handleDescriptionChange}
                    style={styles.input}
                    />
                </View>
                <Button title="Press to update activity information" onPress={this.updateData} />
            </ScrollView>

            </View>
        </ImageBackground>
        )
    }
}
