import * as React from 'react';
import {Button, Text, View, TextInput, ActivityIndicator, StyleSheet, ImageBackground} from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 40,
    },
    background: {
        flex: 1,
    },
});

export default class SignUp extends React.Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };

    startLoading = () => this.setState ({ isLoading: true });
    endLoading = () => this.setState ({ isLoading: false});
    setError = () => this.setState ({ errorMessage });
    clearError = () => this.setState ({ errorMessage: null });

    handleChangeEmail = email => this.setState ({ email });
    handleChangePassword = password => this.setState ({ password });

    handleSubmit = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(result);
            this.endLoading();
            this.setState ({ isCompleted: true });
        } catch (error) {
            this.setError(error.message);
            this.endLoading();
        }
    };
    

    render = () => {
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            return <Text> You are now logged in. </Text>;
        }
        return (
            <ImageBackground style={styles.background}
            source={require('../assets/hei.jpg')}>
            <View>
                <TextInput 
                placeholder="email"
                value={email}
                onChangeText={this.handleChangeEmail}
                style={styles.inputField}
                />
                <TextInput 
                placeholder="password"
                value={password}
                onChangeText={this.handleChangePassword}
                secureTextEntry
                style={styles.inputField}
                />
                {errorMessage && (
                    <Text style={styles.error}> Error: {errorMessage} </Text>
                )}
                {this.renderButton()}
            </View>
            </ImageBackground>
        );
    };
    renderButton = () => {
        const { isLoading } = this.state;
        if( isLoading ) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.handleSubmit} title="Login here! "/>
    };
}