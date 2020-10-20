import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
    ImageBackground
} from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
    
    container: { 
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
        marginTop: 16, },
    
    row: { 
        flexDirection: 'row', 
        height: 30, 
        margin: 10 },
    
    label: { 
        fontWeight: 'bold', 
        width: 100 },
    
    input: { 
        borderWidth: 1, 
        flex: 1 },

    background: {
        flex: 1,
    },
    
    
});



export default class AddActivityScreen extends React.Component {
    state = {category: "", people: "", price: "", description: "" };

handleCategoryChange = (text) => this.setState({category: text});
handlePeopleChange = (text) => this.setState({people: text});
handlePriceChange = (text) => this.setState({price: text});
handleDescriptionChange = (text) => this.setState({description: text});

//Lagrer den intastede informasjon i Firebase Database
handleSave = () => {
    const { category, people, price, description } = this.state;
    try {
        const reference = firebase
        .database()
        .ref("/activities/")
        .push({ category, people, price, description })

        Alert.alert('Saved');
        this.setState({
            category: "",
            people: "",
            price: "",
            description: "",
        });
    } catch (error) {
        Alert.alert('Error');
    }
};

render () {
    const { category, people, price, description } = this.state;

    return (
    <ImageBackground style={styles.background}
    source={require('../assets/hei.jpg')}>
        <SafeAreaView style={styles.container}>
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
                <Button title="Add activity" onPress={this.handleSave} />
            </ScrollView>
        </SafeAreaView>
    </ImageBackground>
    );
}
}
